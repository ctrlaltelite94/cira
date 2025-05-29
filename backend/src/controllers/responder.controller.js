import bcrypt from "bcryptjs";
import Responder from "../models/responder.model.js";
import { GenerateStationCode } from "../utility/responderUtility.js";

export const responderRegister = async (req, res) => {
    try {
        const { stationName, type, password, location, contactNumber } = req.body;

        const existingResponder = await Responder.findOne({ stationName: stationName, type: type });

        if (existingResponder) return res.status(400).json({ message: "Station already exists" });

        const stationCode = GenerateStationCode();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newResponder = new Responder({
            stationName,
            type,
            stationCode: stationCode,
            password: hashedPassword,
            location,
            contactNumber
        });

        const savedResponder = await newResponder.save();
        return res.status(201).json(savedResponder);

    } catch (error) {
        console.log(error);
    }


}

export const getIncidents = async (req, res) => {
    res.json('You made it to get responder incident')
}