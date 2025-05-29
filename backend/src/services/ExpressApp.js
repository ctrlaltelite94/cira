import express from 'express';
import cookieParser from 'cookie-parser';
//import cors from 'cors'

import userRoutes from '../routes/user.routes.js'
import incidentRoutes from '../routes/incident.route.js'
export default async (app) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser())

    // app.use(cors({
    //     origin: process.env.FRONTEND_URL,
    //     credentials: true,
    // }));

    
    app.use('/api/user', userRoutes)
    app.use('/api/incident', incidentRoutes)
    
    console.log("Helllllooo")
    app.get('/', (req, res) => {
        console.log('In slash route');
        res.send({ message: "Hello from / route" });
    });
    
    
}