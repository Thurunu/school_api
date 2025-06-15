import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import newsFeeedRouter from "./routes/newsFeedRouter.js";
import galleryRouter from "./routes/galleryRouter.js";
import eventsRouter from "./routes/eventsRouter.js";
import libraryRouter from "./routes/libraryRouter.js";

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectDB();

// CORS Setup
const allowedOrigins = [process.env.CLIENT_ORIGIN || "http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:5173"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// Middleware
app.use(express.json({ limit: "2mb" }));

// API Routes
app.use("/api/news-feed", newsFeeedRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/events", eventsRouter);
app.use("/api/library", libraryRouter);

// Serve React Frontend in Production
// if(process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(frontendPath,"frontend", "dist", "index.html"));
//   });
// }
// const frontendPath = path.join(__dirname, "../frontend/dist");
// app.use(express.static(frontendPath));


// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
