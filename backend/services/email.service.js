import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendThankYouEmail = async (donation) => {
  if (!donation.email || donation.emailSent) return;

  await transporter.sendMail({
    from: `"Generals Arena" <${process.env.EMAIL_USER}>`,
    to: donation.email,
    subject: "Thank You for Your Giving",
    html: `
      <h2>Dear ${donation.name},</h2>
      <p>Thank you for your generous giving of <strong>KES ${donation.amount}</strong>.</p>
      <p>Your support helps us continue spreading the Gospel.</p>
      <p>God bless you abundantly 🙏</p>
    `,
  });

  donation.emailSent = true;
  await donation.save();
};
