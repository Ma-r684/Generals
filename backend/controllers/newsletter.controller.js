import { Newsletter } from "../models/newsletter.model.js";
import { sendNewsletterWelcomeEmail } from "../utils/sendEmail.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }
    const existing = await Newsletter.findOne({ email });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "You are already subscribed to our newsletter.",
      });
    }
    const newSubscriber = await Newsletter.create({ email });

    sendNewsletterWelcomeEmail(email).catch((err) => {
      console.error("Welcome email failed:", err.message);
    });

    return res.status(201).json({
      success: true,
      message: "Successfully subscribed to monthly newsletter 🎉 Check your email.",
      subscriber: newSubscriber,
    });

  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
