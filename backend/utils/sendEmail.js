import nodemailer from "nodemailer";

export const sendNewsletterWelcomeEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Generals Arena" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thank You for Subscribing 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to Generals Arena Newsletter!</h2>
        <p>Thank you for subscribing to our monthly updates.</p>
        <p>You’ll now receive inspiring devotionals, events and announcements.</p>
        <br/>
        <p>Stay blessed,</p>
        <strong>Generals Arena Team</strong>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
