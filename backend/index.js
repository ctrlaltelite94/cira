import express from "express";
import App from "./src/services/ExpressApp.js";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/cira");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const StartServer = async () => {
  const app = express();
  const PORT = 3000;

  await App(app);

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

StartServer();
