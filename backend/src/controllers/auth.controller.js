import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password." });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 🔐 Store token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access (protects against XSS)
      secure: false, // set to true in production (HTTPS)
      sameSite: "strict", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const userLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "strict",
  });
  return res.status(200).json({ message: "User logged out, cookie cleared." });
};
