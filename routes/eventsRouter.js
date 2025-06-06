import express from 'express';
import { getEvents, getEventsById } from '../controllers/eventsController.js';

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventsById);

export default router;