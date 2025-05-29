// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number], // [longitude, latitude]
    },
  },
  { timestamps: true }
);

UserSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", UserSchema);
