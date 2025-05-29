import User from "../models/user.model.js";
import { GenerateSignature, passwordCompare } from "../utility/userUtility.js";

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await passwordCompare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Username/Password dont match" })
        
        const token = await GenerateSignature(user._id.toString());

        res.cookie("cira_user_auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });

        return res.status(200).json({message: "User Logged In", user: user._id})
  
    } catch (error) {
        console.log(error)
    }
}

export const userLogout = (req, res) => {
    
}