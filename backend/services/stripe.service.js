import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeCheckout = async (donation) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: donation.email,
    line_items: [
      {
        price_data: {
          currency: "kes",
          product_data: { name: "Gospel Partnership Giving" },
          unit_amount: donation.amount * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      donationId: donation._id.toString(),
    },
    success_url: process.env.FRONTEND_URL + "/success",
    cancel_url: process.env.FRONTEND_URL + "/cancel",
  });

  return session;
};

export const verifyStripeWebhook = (req) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  return stripe.webhooks.constructEvent(
    req.body,
    req.headers["stripe-signature"],
    process.env.STRIPE_WEBHOOK_SECRET
  );
};
