import express from 'express'
import { responderLogin, responderLogout, userLogin, userLogout } from '../controllers/auth.controller.js';
import { validateToken } from '../utility/AuthUtility/Authenticate.js';

const router = express.Router();

router.post('/user/login', userLogin)
router.post('/logout', userLogout)
router.post('/responder/login', responderLogin);
router.get("/validate-token", validateToken);



export default router;