import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import Incident from '../models/incident.model.js'
import { GenerateUserSignature } from "../utility/userUtility.js";

export const userRegister = async (req, res) => {

    try {
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

    const token = await GenerateUserSignature(newUser._id);

    res.cookie("cira_auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    res.status(201).json({message: "User registered", user: savedUser})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Something went wrong"})
    }
}

export const profile = (req, res) => {
    console.log({message: "You are in profile route"})
}

export const myIncidents = async (req, res) => {
    
    try {
        const id = req.user.userId;
        const incidents = await Incident.find({ reporter: id })
        
        return res.status(200).json(incidents);
    } catch (error) {
        console.log(error)
    }
}