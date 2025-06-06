import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import newsFeeedRouter from './routes/newsFeedRouter.js';
import galleryRouter from './routes/galleryRouter.js';
import eventsRouter from './routes/eventsRouter.js';

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const connectDB  = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
};

connectDB();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API is working");
    console.log("API is Running !")
});

app.use("/api/news-feed", newsFeeedRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/events", eventsRouter);


app.listen(port, () => {console.log(`Server is running on port ${port}`);});
