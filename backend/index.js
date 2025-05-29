import express from "express";
import App from "./src/services/ExpressApp.js";
import dbConn from './src/services/db.js'
import "dotenv/config";

const StartServer = async () => {
  const app = express();
  const PORT = 3000;

  await App(app);
  await dbConn();

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

StartServer();
