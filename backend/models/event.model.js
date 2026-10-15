import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type:String,
            required:true,
        },
        eventDate:{
            type: Date,
            required: true,
        },
        mediaType:{
            type: String,
            enum: ["image", "video"],
            required: true,
        },
        mediaUrl:{
            type: String,
            required: true,
        },
    },
    {timestamps: true}
)
export default mongoose.model("Event", eventSchema)