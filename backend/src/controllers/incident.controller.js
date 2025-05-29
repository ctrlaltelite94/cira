import Incident from '../models/incident.model.js'

export const createIncident = (req, res) => {
    try {
        const { title, description, location, reporter, requestedResponse } = req.body;
        
        const newIncident = new Incident({
            title,
            description,
            location,
            reporter,
            requestedResponse,
        })

        res.json(newIncident);
        
    } catch (error) {
        
    }
    

}