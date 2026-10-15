import express from "express";
import {
  createStripeSession,
  stripeWebhook,
} from "../controllers/stripe.controller.js";

import {
  initiateSTK,
  mpesaCallback,
} from "../controllers/mpesa.controller.js";

const router = express.Router();

router.post("/stripe", createStripeSession);
router.post("/stripe/webhook", stripeWebhook);

router.post("/mpesa", initiateSTK);
router.post("/mpesa/callback", mpesaCallback);

export default router;