import bcrypt from "bcryptjs";
import Responder from "../models/responder.model.js";
import { GenerateStationCode } from "../utility/responderUtility.js";
import Incident from "../models/incident.model.js";

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

export const getAllIncidents = async (req, res) => {
    try {
        const id = req.responder.responderId;

        const responder = await Responder.findById(id);
        const type = responder.type

        const incidents = await Incident.find({
            $or: [
              { requestedResponse: type },
              { requestedResponse: "Both" }
            ]
          });
          

        if (incidents.length === 0) return res.status(400).json({ message: `There are no incidents for ${type}` })
    
        return res.status(200).json({ message: `Incidents for ${type}`, incidents });
    } catch (error) {
        console.log(error);
    }
}

export const getIncidentById = async (req, res) => {
    try {
        const id = req.params.id;

        const incident = await Incident.findById(id);

        if(!incident) return res.status(400).json({message: "Incident not found"})

        return res.status(200).json({message: "Incident found", incident})
    } catch (error) {
        console.log(error);
    }
    //const responderId = req.responder.responderId;
}

export const updateIncident = async (req, res) => {
    try {
        const id = req.params.id;
        const { status, etr } = req.body;
        

        const responderId = req.responder.responderId;
        const validStatuses = ["Reported", "Responding", "Resolved", "Cancelled"];
            
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }


        const updatedIncident = await Incident.findByIdAndUpdate(
            id,
            {
                status: status,
                etr: etr,
                respondingService: responderId
            }, { new: true }
        );

        if (!updatedIncident) {
            return res.status(404).json({ message: "Incident not found" });
        }
        return res.status(200).json(updatedIncident);
    } catch (error) {
        console.log(error); 
        res.status(500).json({ message: "Error updating status" });
    }
    
}