import mongoose from 'mongoose'

const IncidentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    // Manual address input
    address: {
      type: String,
      required: false, // Optional: only if user inputs it manually
    },

    // GeoJSON Point for geospatial queries
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: false,
      },
    },

    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    requestedResponse: {
      type: String,
      enum: ["Police", "Ambulance", "Both"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Reported", "In Progress", "Resolved", "Cancelled"],
      default: "Reported",
    },
  },
  { timestamps: true }
);

// Geo index for geospatial queries
IncidentSchema.index({ location: '2dsphere' });

const Incident = mongoose.model("Incident", IncidentSchema);
export default Incident;
