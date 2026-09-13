import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  const { username, role, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, role: "user", password: hashed });
    res.status(201).json({ message: "User created!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Registration failed!" });
  }
};
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed!" });
  }
};
