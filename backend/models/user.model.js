import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    role:{
        type:String,
        enum:["user"],
        dafault: "user"
    },
    lastLogin:{
        type:Date,
        default: Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken: String,
    resetPasswordExpiredAt: Date,
    verificationToken: String,
    verificationTokenExpiredAt: Date,
},{timestamps: true})

export const User = mongoose.model('User', userSchema);

//createdat and updatedat fields will be automatically added into the document