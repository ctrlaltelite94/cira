import express from "express";
import App from "./services/ExpressApp.js";
import dbConn from './services/db.js'
import "dotenv/config";


const StartServer = async () => {
  const app = express();
  app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    next();
  });
  const PORT = process.env.PORT | 3001;

  
  await App(app);
  await dbConn();


  

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

StartServer();
