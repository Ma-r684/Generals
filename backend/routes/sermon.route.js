import express from "express";
import multer from "multer";
import {
  uploadSermonFile,
  createSermon,
  listSermons,
  removeSermon,
} from "../controllers/sermon.controller.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadSermonFile);
router.post("/create", createSermon);
router.get("/list", listSermons);
router.post("/remove", removeSermon);

export default router;
