import mongoose from "mongoose";

const devotionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    scripture: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category:{
        type: String,
        required: false,
    },
    image: {
      type: String, // stores filename only
    },
  },
  { timestamps: true }
);

const Devotion = mongoose.model("Devotion", devotionSchema);

export default Devotion;
