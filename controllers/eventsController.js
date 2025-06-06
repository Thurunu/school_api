import Event from '../models/EventsModel.js';

// Get All Events

export const getEvents = async (req, res) => {
    try{
        const newEvent = await Event.find().sort({date: -1}); // Sort by date, newest first
        res.status(200).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Event By Id

export const getEventsById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};