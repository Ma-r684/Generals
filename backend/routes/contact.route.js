import express from "express";
import {
  createContact,
  getAllContacts,
  getSingleContact,
  markAsRead,
  replyToContact,
  getUnreadCount,
   deleteContact
} from "../controllers/contact.controller.js";

const router = express.Router();

// Public
router.post("/", createContact);

// Admin
router.get("/", getAllContacts);
router.get("/:id", getSingleContact);
router.get("/unread-count", getUnreadCount);
router.put("/:id/read", markAsRead);
router.put("/:id/reply", replyToContact);
router.delete("/:id", deleteContact);

export default router;
