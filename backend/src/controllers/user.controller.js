import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const userRegister = async (req, res) => {
  try {
    const { name, phone, email, password, latitude, longitude } = req.body;

    if (
      !name ||
      !phone ||
      !email ||
      !password ||
      latitude == null ||
      longitude == null
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    const savedUser = await user.save();
    res.status(201).json({ message: "User registered", user: savedUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const profile = (req, res) => {
  console.log({ message: "You are in profile route" });
};
