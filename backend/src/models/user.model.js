// models/User.js
import mongoose from "mongoose";

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

const User = mongoose.model("User", UserSchema);
export default User;
