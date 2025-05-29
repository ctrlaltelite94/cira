import express from 'express'
import { userRegister, profile, myIncidents } from '../controllers/user.controller.js';
import { Authenticate } from '../middleware/userAuth.js';
import { ValidateUserSignature } from '../utility/AuthUtility/Authenticate.js';

const router = express.Router();

router.get('/', profile);

router.post('/register', userRegister);

router.get('/myincidents', ValidateUserSignature, myIncidents)



export default router;