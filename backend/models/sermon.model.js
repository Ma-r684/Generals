import mongoose from "mongoose";

const sermonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    preacher: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["audio", "video"],
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Sermon = mongoose.model("Sermon", sermonSchema);

export default Sermon;
