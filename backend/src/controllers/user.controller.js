import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const userRegister = async (req, res) => {

    const { name, phone, email, password, location } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) return res.status(400).json({ message: "User already exists" })
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        phone,
        email,
        password: hashedPassword,
        location
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser)
}

export const profile = (req, res) => {
    console.log({message: "You are in profile route"})
}

export const myIncidents = (req, res) => {
    try {
        
    } catch (error) {
        
    }
}