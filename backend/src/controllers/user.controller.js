// controllers/userController.js

import User from "../models/user.model.js";

// Register a new user
export const userRegister = async (req, res) => {
  try {
    const { name, phone, email, longitude, latitude } = req.body;

    // Basic input validation
    if (
      !name ||
      !phone ||
      !email ||
      longitude === undefined ||
      latitude === undefined
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists by email or phone
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Create new user
    const newUser = new User({
      name,
      phone,
      email,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    // Save user to database
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const profile = (req, res) => {
  console.log({ message: "You are in profile route" });
};
