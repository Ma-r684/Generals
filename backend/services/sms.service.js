import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendThankYouSMS = async (donation) => {
  if (!donation.phone || donation.smsSent) return;

  await axios.post(
    "https://api.africastalking.com/version1/messaging",
    `username=${process.env.AT_USERNAME}&to=${donation.phone}&message=Dear ${donation.name}, thank you for donating KES ${donation.amount}. God bless you 🙏`,
    {
      headers: {
        apiKey: process.env.AT_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  donation.smsSent = true;
  await donation.save();
};
