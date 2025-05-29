import express from 'express'
import { userLogin, userLogout } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', userLogin )
router.post('/logout', userLogout )