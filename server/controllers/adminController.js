import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Load secret safely
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

//Admin Register
export const adminRegister = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate fields
    if (!username || !password) {
      return res.status(400).json({ message: "Username and Password required!" });
    }

    // Check if admin exists
    const exists = await Admin.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({
      message: "Admin registered successfully!",
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Admin register failed!", error: err.message });
  }
};

// ADMIN LOGIN
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate fields
    if (!username || !password) {
      return res.status(400).json({ message: "Username and Password required!" });
    }

    // Find admin
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found!" });

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful!",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed!", error: err.message });
  }
};
