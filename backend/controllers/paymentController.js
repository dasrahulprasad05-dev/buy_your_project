import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_123", // Fallback for dev without env
  key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_secret_123",
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/checkout
// @access  Public
export const checkout = async (req, res, next) => {
  try {
    const { amount, customerName, customerEmail, projectId } = req.body;

    const options = {
      amount: Number(amount) * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Math.random() * 1000}`,
    };

    const order = await razorpay.orders.create(options);

    // Save order details to DB (Pending status)
    const newOrder = await Order.create({
      customerName,
      customerEmail,
      project: projectId,
      amount,
      razorpayOrderId: order.id,
      status: "Pending",
    });

    res.status(200).json({
      success: true,
      order,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Public
export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "rzp_secret_123")
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update order in DB
      await Order.findByIdAndUpdate(orderId, {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "Completed",
      });

      res.status(200).json({
        success: true,
        message: "Payment successful",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
