import express from 'express'
import { getAllIncidents, getIncidentById, responderRegister, updateIncident } from '../controllers/responder.controller.js';
import { ValidateResponderSignature } from '../utility/AuthUtility/Authenticate.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Olaaaaa" })
    console.log('Inside responder route')
})
router.post('/register', responderRegister)

router.get('/getincidents', ValidateResponderSignature, getAllIncidents);

router.get('/incident/:id', ValidateResponderSignature, getIncidentById);

router.patch('/incident/:id', ValidateResponderSignature, updateIncident )

export default router;