import Incident from '../models/incident.model.js'

export const createIncident = async (req, res) => {
    try {
        const { title, incidenType,  description, location, reporter, requestedResponse } = req.body;
        
        const newIncident = new Incident({
            title,
            description,
            incidenType,
            location,
            reporter,
            requestedResponse,
        })

        const incident = await newIncident.save();
        res.status(201).json({ message: "Incident created", incident });
        
    } catch (error) {
        console.log(error);
    }

}

export const getAllIncidents = (req, res) => {

}
