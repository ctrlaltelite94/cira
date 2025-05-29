// models/Responder.js
const mongoose = require("mongoose");

const ResponderSchema = new mongoose.Schema(
  {
    name: String,
    type: { type: String, enum: ["Police", "Ambulance"], required: true },
    unitNumber: String,
    status: {
      type: String,
      enum: ["Available", "Dispatched", "Unavailable"],
      default: "Available",
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
    contactNumber: String,
  },
  { timestamps: true }
);

ResponderSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Responder", ResponderSchema);
