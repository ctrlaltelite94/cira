import express from 'express';

export default async (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/', (req, res) => {
        res.send({message: "Hello from App"})
    })
}