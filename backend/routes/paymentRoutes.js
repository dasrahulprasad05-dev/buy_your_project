import express from "express";
import { checkout, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout", checkout);
router.post("/verify", verifyPayment);

// Endpoint to get the key id for the frontend
router.get("/key", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID || "rzp_test_123" });
});

export default router;
