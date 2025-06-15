import express from 'express';
import { getNews, getNewsById, createNews, deleteNews, updateNews } from '../controllers/newsFeedController.js';

const router = express.Router();

router.get("/", getNews);
router.get("/:id", getNewsById);
router.post('/create', createNews);
router.delete('/delete/:id', deleteNews);
router.put('/update/:id', updateNews);

export default router;