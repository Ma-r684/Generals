import Donation from "../models/donation.model.js";
import PDFDocument from "pdfkit";

import { createStripeCheckout, verifyStripeWebhook } from "../services/stripe.service.js";
import { initiateSTKPush } from "../services/mpesa.service.js";
import { sendThankYouEmail } from "../services/email.service.js";
import { sendThankYouSMS } from "../services/sms.service.js";

/* 1️⃣ M-PESA */
export const mpesaStkPush = async (req, res) => {
  try {
    const { name, phone, amount, frequency, message } = req.body;

    if (!name || !phone || !amount || amount < 1)
      return res.status(400).json({ error: "Invalid input" });

    const donation = await Donation.create({
      name,
      phone,
      amount,
      frequency,
      message,
      method: "mpesa",
    });

    const response = await initiateSTKPush(donation);

    donation.mpesaCheckoutRequestID = response.CheckoutRequestID;
    await donation.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "M-Pesa failed" });
  }
};

/* 2️⃣ STRIPE */
export const createStripeSession = async (req, res) => {
  try {
    const { name, email, amount, frequency, message } = req.body;

    if (!name || !email || !amount || amount < 1)
      return res.status(400).json({ error: "Invalid input" });

    const donation = await Donation.create({
      name,
      email,
      amount,
      frequency,
      message,
      method: "online",
    });

    const session = await createStripeCheckout(donation);

    donation.stripeSessionId = session.id;
    await donation.save();

    res.json({ url: session.url });
  } catch {
    res.status(500).json({ error: "Stripe failed" });
  }
};

/* 3️⃣ STRIPE WEBHOOK */
export const stripeWebhook = async (req, res) => {
  try {
    const event = verifyStripeWebhook(req);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const donation = await Donation.findOne({
        stripeSessionId: session.id,
      });

      if (!donation || donation.webhookProcessed)
        return res.json({ received: true });

      donation.status = "completed";
      donation.transactionId = session.payment_intent;
      donation.webhookProcessed = true;

      await donation.save();
      await sendThankYouEmail(donation);
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error`);
  }
};

/* 4️⃣ M-PESA CALLBACK */
export const mpesaCallback = async (req, res) => {
  try {
    const callback = req.body?.Body?.stkCallback;

    if (!callback || callback.ResultCode !== 0)
      return res.status(200).json({ message: "Failed" });

    const donation = await Donation.findOne({
      mpesaCheckoutRequestID: callback.CheckoutRequestID,
    });

    if (!donation || donation.webhookProcessed)
      return res.json({ message: "Already processed" });

    const receipt = callback.CallbackMetadata.Item.find(
      (i) => i.Name === "MpesaReceiptNumber"
    )?.Value;

    donation.status = "completed";
    donation.transactionId = receipt;
    donation.webhookProcessed = true;

    await donation.save();
    await sendThankYouSMS(donation);

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Callback failed" });
  }
};

/* 5️⃣ GET DONATIONS */
export const getAllDonations = async (req, res) => {
  const donations = await Donation.find().sort({ createdAt: -1 });
  res.json({ success: true, donations });
};

/* 6️⃣ PDF REPORT */

export const generateDonationReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = { status: "completed" };

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate + "T23:59:59.999Z"),
      };
    }

    const donations = await Donation.find(filter).sort({ createdAt: -1 });

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=giving-report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(18).text("Giving Report", { align: "center" });
    doc.moveDown();

    if (startDate && endDate) {
      doc
        .fontSize(12)
        .text(`From: ${startDate}  To: ${endDate}`, {
          align: "center",
        });
      doc.moveDown(2);
    }

    let total = 0;

    if (donations.length === 0) {
      doc.text("No donations recorded for this period.", {
        align: "center",
      });
    } else {
      donations.forEach((d) => {
        total += d.amount;

        doc.text(
          `${d.name} | KES ${d.amount} | ${d.method} | ${new Date(
            d.createdAt
          ).toLocaleDateString()}`
        );
      });
    }

    doc.moveDown(2);
    doc.text(`Total: KES ${total}`, { align: "right" });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate report" });
  }
};