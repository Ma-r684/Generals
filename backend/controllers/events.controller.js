import Event from "../models/event.model.js";
import fs from "fs";
import path from "path";

// ➜ Add Event
const createEvent = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        message: "Event media is required",
      });
    }

    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      eventDate: req.body.eventDate,
      mediaType: req.body.mediaType,
      mediaUrl: req.file.filename,
    });

    await event.save();

    res.json({
      success: true,
      message: "Event Added",
      data: event,
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error creating event",
    });
  }
};

// ➜ List Events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });

    res.json({
      success: true,
      data: events,
    });

  } catch (error) {
    res.json({
      success: false,
      message: "Error fetching events",
    });
  }
};

// ➜ Delete Event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.json({
        success: false,
        message: "Event not found",
      });
    }

    // Delete file
    fs.unlinkSync(`uploads/events/${event.mediaUrl}`);

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Event Removed",
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error deleting event",
    });
  }
};

export { createEvent, getEvents, deleteEvent };
