import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import userRoutes from '../routes/user.routes.js'
import responderRoutes from '../routes/responder.route.js'
import incidentRoutes from '../routes/incident.route.js'
import authRoutes from '../routes/auth.route.js'


export default async (app) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser())

    app.use(cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }));

    
    app.use('/api/user', userRoutes);
    app.use('/api/responder', responderRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/incident', incidentRoutes);

    
    console.log("Helllllooo")
    app.get('/', (req, res) => {
        console.log('In slash route');
        res.send({ message: "Hello from / route" });
    });
    
    
}