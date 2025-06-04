import express from 'express';
import { getNews, getNewsById } from '../controllers/newsFeedController.js';

const router = express.Router();

router.get("/", getNews);
router.get("/:id", getNewsById);



export default router;