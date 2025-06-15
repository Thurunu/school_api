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

export const createEvent = async (req, res) => {
  try {
    const { title, desc, img, date } = req.body;
    console.log(req.body);
    const upcommingEvent = new Event({
      title,
      desc,
      img,
      date,
    });

    const saveEvent = await upcommingEvent.save();
    res.status(201).json(saveEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event." });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, desc, img, date } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(eventId, {
      title,
      desc,
      img,
      date,
    }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};
