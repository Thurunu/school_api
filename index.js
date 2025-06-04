import express from "express";
import cors from "cors";
import newsFeeedRouter from './routes/newsFeedRouter.js';
import galleryRouter from './routes/galleryRouter.js';

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API is working");
    console.log("API is Running !")
});

app.use("/api/news-feed", newsFeeedRouter);
app.use("/api/gallery", galleryRouter);


app.listen(port, () => {console.log(`Server is running on port ${port}`);});
