import axios from "axios";
import dotenv from "dotenv";
import { getAccessToken } from "../utils/mpesa.js";

dotenv.config();

export const initiateSTKPush = async (donation) => {
  const token = await getAccessToken();

  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);

  const password = Buffer.from(
    process.env.MPESA_SHORTCODE +
      process.env.MPESA_PASSKEY +
      timestamp
  ).toString("base64");

  const url =
    process.env.MPESA_ENV === "production"
      ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
      : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const response = await axios.post(
    url,
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: donation.amount,
      PartyA: donation.phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: donation.phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: "Generals Arena",
      TransactionDesc: "Gospel Partnership Giving",
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};
