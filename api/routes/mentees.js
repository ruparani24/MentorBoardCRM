// routes/mentees.js
import express from "express";
import Mentee from "../models/Mentees.js"; // ✅ make sure this model exists

const router = express.Router();

// GET all mentees
router.get("/", async (req, res) => {
  try {
    const mentees = await Mentee.find();
    res.json(mentees);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch mentees", error: err.message });
  }
});

// POST new mentee
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      department,
      mentorAssigned,
      yearLevel,
      interests,
      availability,
    } = req.body;

    // basic validation
    if (!fullName || !email) {
      return res
        .status(400)
        .json({ message: "Full Name and Email are required" });
    }

    const newMentee = new Mentee({
      fullName,
      email,
      department,
      mentorAssigned,
      yearLevel,
      interests,
      availability,
    });

    await newMentee.save();
    res.status(201).json(newMentee);
  } catch (err) {
    res.status(500).json({ message: "Failed to add mentee", error: err.message });
  }
});

// DELETE mentees (multiple)
router.delete("/", async (req, res) => {
  try {
    const { ids } = req.body; // expecting { ids: ["id1","id2"] }
    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: "No mentee IDs provided" });
    }

    await Mentee.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Mentee(s) deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete mentee(s)", error: err.message });
  }
});

export default router;
