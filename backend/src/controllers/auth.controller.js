import User from "../models/user.model.js";
import Responder from '../models/responder.model.js'
import { GenerateUserSignature, GenerateResSignature, passwordCompare } from "../utility/userUtility.js";

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await passwordCompare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Username/Password dont match" })
        
        const token = await GenerateUserSignature(user._id.toString());

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

export const userLogout = (req, res, next) => {
    try {
        res.cookie("cira_user_auth_token", "", {
            expires: new Date(0),
        })

        return res.status(200).json({message: "User logged out"})
    } catch {
        next(error)
    }
}

export const responderLogin = async (req, res) => {
    try {
        const { stationCode, password } = req.body;

        const responder = await Responder.findOne({ stationCode: stationCode });

        if (!responder) return res.status(400).json({ message: "Responder not found" });

        const isMatch = await passwordCompare(password, responder.password);
        if (!isMatch) return res.status(400).json({ message: "Username/Password dont match" })
        
        const token = await GenerateResSignature(responder._id.toString());

        res.cookie("cira_responder_auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });

        return res.status(200).json({message: "Responder Logged In", responder: responder._id})
  
    } catch (error) {
        console.log(error)
    }
}

export const responderLogout = (req, res, next) => {
    try {
        res.cookie("cira_responder_auth_token", "", {
            expires: new Date(0),
        })

        return res.status(200).json({message: "User logged out"})
    } catch {
        next(error)
    }
}