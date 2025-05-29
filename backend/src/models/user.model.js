import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    address: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    password: String
  },
  {
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt
        }
    },
    timestamps: true
}
);

// For geo queries on location.coordinates
UserSchema.index({ "location.coordinates": "2dsphere" });

const User = mongoose.model("User", UserSchema);
export default User;
