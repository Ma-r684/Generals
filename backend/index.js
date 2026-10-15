import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from './db/connectDB.js';
import ouathRoutes from './routes/ouath.js'
import authRoutes from './routes/auth.route.js';
import eventRoutes from './routes/event.route.js';
import devotionRoutes from "./routes/devotion.route.js";
import sermonRoutes from './routes/sermon.route.js';
import contactRoutes from "./routes/contact.route.js";
import donationRoutes from "./routes/donation.route.js";
import newsletterRoutes from "./routes/newsletter.route.js";


dotenv.config();

const app = express();

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
STRIPE WEBHOOK (MUST COME BEFORE express.json())
 */
app.post(
  "/api/donations/stripe/webhook",
  express.raw({ type: "application/json" })
);

/* 
   NORMAL MIDDLEWARES
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// VERY IMPORTANT: Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", ouathRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/devotion", devotionRoutes);
app.use("/api/sermon", sermonRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/newsletter", newsletterRoutes);

/*
   SERVER START
*/

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to DB:", err);
  });
