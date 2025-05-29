import express from 'express'
import { createIncident  } from '../controllers/incident.controller.js';
import { ValidateUserSignature } from '../utility/AuthUtility/Authenticate.js';

const router = express.Router();

router.post('/create', ValidateUserSignature, createIncident);




export default router;