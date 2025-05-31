import Incident from '../models/incident.model.js'
import { generateReferenceNumber } from '../utility/responderUtility.js';

export const createIncident = async (req, res) => {
    try {
        const userId = req.user.id
        console.log(userId);
        const { title, incidentType,  description, location, address, requestedResponse } = req.body;
        const ref = generateReferenceNumber()
        const newIncident = new Incident({
            title,
            description,
            incidentType,
            address,
            location,
            reporter: userId,
            requestedResponse,
            refNum: ref
        })

        const incident = await newIncident.save();
        res.status(201).json({ message: "Incident Created", refNum: incident.refNum });
        
    } catch (error) {
        console.log(error);
    }

}


