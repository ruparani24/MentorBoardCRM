// routes/mentors.js
import express from "express";
import Mentor from "../models/Mentors.js";  // ✅ correct path & filename

const router = express.Router();

// GET all mentors
router.get("/", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch mentors", error: err.message });
  }
});

// POST new mentor
router.post("/", async (req, res) => {
  try {
    const { fullName, expertise, email, availability, department, experience } = req.body;

    if (!fullName || !expertise || !email) {
      return res.status(400).json({ message: "Full Name, Expertise and Email are required" });
    }

    const newMentor = new Mentor({
      fullName,
      expertise,
      email,
      availability,
      department,
      experience,
    });

    await newMentor.save();
    res.status(201).json(newMentor);
  } catch (err) {
    res.status(500).json({ message: "Failed to add mentor", error: err.message });
  }
});


// DELETE mentors (multiple)
router.delete("/", async (req, res) => {
  try {
    const { ids } = req.body; // expecting { ids: ["id1","id2"] }
    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: "No mentor IDs provided" });
    }

    await Mentor.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Mentor(s) deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete mentor(s)", error: err.message });
  }
});

export default router;
