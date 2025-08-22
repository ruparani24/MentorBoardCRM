// models/Mentees.js
import mongoose from "mongoose";

const menteeSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String },           // e.g., Computer Science, Class 12
    mentorAssigned: { type: String },       // name of mentor
    yearLevel: { type: String },            // e.g., 1st Year, 2nd Year
    interests: [{ type: String }],          // array of interests
    availability: { type: String },         // e.g., Morning, Evening, Weekends

    // 👇 Optional fields for extra info / popup
    contactInfo: { type: String },
    linkedIn: { type: String },
    description: { type: String },
    languages: [{ type: String }],
    meetingMode: { type: String, enum: ["Online", "Offline", "Hybrid"] },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default mongoose.model("Mentee", menteeSchema);
