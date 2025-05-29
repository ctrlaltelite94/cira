import express from 'express'
import { userRegister } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', userRegister)