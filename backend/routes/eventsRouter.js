import express from 'express';
import { getEvents, getEventsById, createEvent, updateEvent, deleteEvent } from '../controllers/eventsController.js';

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventsById);
router.post("/create", createEvent);
router.put("/update/:id", updateEvent);
router.delete('/delete/:id', deleteEvent) 

export default router;