import express from 'express'
import { userRegister, profile } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', profile);

router.post('/register', userRegister);





export default router;