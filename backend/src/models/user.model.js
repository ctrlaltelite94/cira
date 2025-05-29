import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          required: true,
        },
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// For geo queries on location.coordinates
UserSchema.index({ "location.coordinates": "2dsphere" });

const User = mongoose.model("User", UserSchema);
export default User;
