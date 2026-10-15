import Stripe from "stripe";
import Donation from "../models/donation.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeSession = async (req, res) => {
  const { name, amount, frequency, message } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "kes",
        product_data: {
          name: "Church Giving",
        },
        unit_amount: amount * 100,
      },
      quantity: 1,
    }],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  });

  await Donation.create({
    name,
    amount,
    method: "card",
    frequency,
    message,
    status: "pending",
    transactionId: session.id,
  });

  res.json({ url: session.url });
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send("Webhook Error");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    await Donation.findOneAndUpdate(
      { transactionId: session.id },
      { status: "completed" }
    );
  }

  res.json({ received: true });
};