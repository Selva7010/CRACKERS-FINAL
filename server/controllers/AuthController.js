
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/Users.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY || "secret";

// user Register
export const Register = async (req, res) => {
  try {
    const { name, email, password, mobile, address } = req.body;
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exits!" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, mobile, address });
    await user.save();

    res.json(
      { message: "Registered Successfully!", 
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email, 
          mobile: user.mobile, 
          address: user.address } });
  } catch (err) {
    res.status(500).json({ message: "Register failed", error: err.message });
  }
};


// user Login 
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  check fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    //  find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials!" });

    //  compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong Password!" });

    //  generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET || "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed!", error: err.message });
  }
};
