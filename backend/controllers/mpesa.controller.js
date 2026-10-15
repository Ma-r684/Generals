import axios from "axios";
import Donation from "../models/donation.model.js";
import { getMpesaToken } from "../config/mpesa.js";

export const initiateSTK = async (req, res) => {
  const { name, phone, amount } = req.body;

  const token = await getMpesaToken();

  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14);

  const password = Buffer.from(
    process.env.MPESA_SHORTCODE +
    process.env.MPESA_PASSKEY +
    timestamp
  ).toString("base64");

  const response = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: "Donation",
      TransactionDesc: "Church Donation",
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  await Donation.create({
    name,
    phone,
    amount,
    method: "mpesa",
    transactionId: response.data.CheckoutRequestID,
  });

  res.json(response.data);
};

export const mpesaCallback = async (req, res) => {
  const data = req.body.Body.stkCallback;

  if (data.ResultCode === 0) {
    await Donation.findOneAndUpdate(
      { transactionId: data.CheckoutRequestID },
      { status: "completed" }
    );
  }

  res.json({ ResultCode: 0, ResultDesc: "Accepted" });
};