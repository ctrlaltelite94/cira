// models/Responder.js
import mongoose from "mongoose";

const ResponderSchema = new mongoose.Schema(
  {
    stationName: String,
    type: { type: String, enum: ["Police", "Ambulance"], required: true },
    stationCode: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    address: {type: String, required: false},
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
    contactNumber: String,
  },
  { timestamps: true }
);

ResponderSchema.index({ location: "2dsphere" });

const Responder = mongoose.model("Responder", ResponderSchema);
export default Responder;