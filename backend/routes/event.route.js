import express from "express";
import multer from "multer";
import path from "path";

import {
  createEvent,
  getEvents,
  deleteEvent,
} from "../controllers/events.controller.js";

const eventRouter = express.Router();

// Storage Engine
const storage = multer.diskStorage({
  destination: "uploads/events",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Routes
eventRouter.post("/add", upload.single("media"), createEvent);
eventRouter.get("/list", getEvents);
eventRouter.delete("/:id", deleteEvent);

export default eventRouter;
