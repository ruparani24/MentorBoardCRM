import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js"; 
import mentorRoutes from "./routes/mentors.js";
import menteesRoute from "./routes/mentees.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware (CORS must come before routes)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// --- Mentor Routes ---
app.use("/api/mentors", mentorRoutes);
app.use("/api/mentees", menteesRoute); // ✅ important!

// --- Register route ---
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Login route ---
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Test Route ---
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err));
