import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  email: String,
  amount: { type: Number, required: true },
  method: { type: String, enum: ["mpesa", "card"] },
  frequency: String,
  message: String,
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  transactionId: String,
  emailSent: { type: Boolean, default: false },
  smsSent: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Donation", donationSchema);