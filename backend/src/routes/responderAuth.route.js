import express from 'express'
import { responderLogin, responderLogout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', responderLogin);
router.post('/logout', responderLogout);

export default router;