import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Wrong Password",
      });
    }

    // Generate token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    // Send success response
    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const verify = (req,res)=>{
    return res.status(200).json({success:true, user: req.user})
}

export { login, verify };
