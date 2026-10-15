import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name:{type: String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, enum:["admin"], required:true},
    profileImage:{type:String},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}
})

const Admin =mongoose.model("Admin",userSchema)
export default Admin;