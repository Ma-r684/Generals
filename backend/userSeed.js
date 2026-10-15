
import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const seedAdmin = async () => {
  try {
  
    const hashedPassword = await bcrypt.hash("admin@2018", 10);

    const admin = new Admin({
      name: "Admin",
      email: "thegeneralsarena@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
