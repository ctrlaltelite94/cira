import express from 'express'
import { createIncident, getIncident } from '../controllers/incident.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json("Hellllooo")
    //console.log({message: "Hello from inc route"})
})
router.post('/create', createIncident);



export default router;