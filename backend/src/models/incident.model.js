// models/Incident.js
import mongoose from 'mongoose'

const IncidentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    requestedResponse: { type: String, enum: ["Police", "Ambulance", "Both"] },
    status: {
      type: String,
      enum: ["Reported", "In Progress", "Resolved", "Cancelled"],
      default: "Reported",
    },
  },
  { timestamps: true }
);

IncidentSchema.index({ location: "2dsphere" });

const Incident = mongoose.model("Incident", IncidentSchema)
export default Incident;
