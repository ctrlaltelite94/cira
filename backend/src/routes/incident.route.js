import express from 'express'
import { createIncident, getAllIncidents  } from '../controllers/incident.controller.js';
import { Authenticate } from '../middleware/userAuth.js';

const router = express.Router();

router.post('/create', Authenticate, createIncident);

router.get('/:id', )



export default router;