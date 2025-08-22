// models/mentor.js
import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    expertise: { type: String, required: true },
    department: { type: String },
    experience: { type: String },
    availability: { type: String },

    // 👇 New fields for popup
    contactInfo: { type: String },
    linkedIn: { type: String },
    description: { type: String },
    languages: [{ type: String }],
    meetingMode: { type: String, enum: ["Online", "Offline", "Hybrid"] },
    capacityTotal: { type: Number, default: 0 },
    capacityAvailable: { type: Number, default: 0 },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default mongoose.model("Mentor", mentorSchema);
