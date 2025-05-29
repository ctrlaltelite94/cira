import express from 'express'
import { createIncident  } from '../controllers/incident.controller.js';
import { Authenticate } from '../middleware/userAuth.js';

const router = express.Router();

router.post('/create', Authenticate, createIncident);



export default router;