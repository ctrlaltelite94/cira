import express from 'express'
import { userRegister, profile, myIncidents } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', profile);

router.post('/register', userRegister);

router.get('/myincidents', myIncidents)



export default router;