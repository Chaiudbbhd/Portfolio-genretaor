import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for JSON payloads

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Email Route
app.post("/api/sendMail", upload.any(), async (req, res) => {
  try {
    const { to, subject } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "lpklpk984@gmail.com",
        pass: process.env.EMAIL_PASS || "YOUR_APP_PASSWORD",
      },
    });

    const attachments = (req.files || []).map((file) => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
    }));

    const text = Object.entries(req.body)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    await transporter.sendMail({
      from: process.env.EMAIL_USER || "lpklpk984@gmail.com",
      to,
      subject,
      text,
      attachments,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.json({ success: false, error: error.message });
  }
});

// JWT Auth Middleware
import auth from "./middleware/auth.js"; // create auth.js to verify JWT

// Credit System Routes
import paymentRoutes from "./routes/payment.js";
import templateRoutes from "./routes/template.js";

app.use("/api/payment", auth, paymentRoutes);
app.use("/api/template", auth, templateRoutes);

// ========================
// Removed `/api/user/me` route
// ========================

//nothing here

// Server start
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
