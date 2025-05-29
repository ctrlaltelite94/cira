import express from 'express'
import { getIncidents, responderRegister } from '../controllers/responder.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Olaaaaa" })
    console.log('Inside responder route')
})
router.post('/register', responderRegister)

router.get('/getincidents', getIncidents);

export default router;