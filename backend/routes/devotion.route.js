import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  createDevotion,
  listDevotions,
  removeDevotion,
  getSingleDevotion,
} from "../controllers/devotion.controller.js";
import { updateDevotion } from "../controllers/devotion.controller.js";


const router = express.Router();

const uploadDir = "uploads/devotion";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createDevotion);
router.get("/list", listDevotions);
router.get("/:id", getSingleDevotion);
router.post("/update", upload.single("image"), updateDevotion);
router.delete("/remove", removeDevotion);

export default router;
