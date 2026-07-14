import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";
import Project from "../models/Project.js";
import sendEmail from "../utils/sendEmail.js";

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
      receipt: `receipt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
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
      const updatedOrder = await Order.findByIdAndUpdate(orderId, {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "Completed",
      }, { new: true });

      // Send purchase confirmation email
      if (updatedOrder && updatedOrder.customerEmail) {
        try {
          const project = await Project.findById(updatedOrder.project);
          const projectTitle = project ? project.title : 'your project';

          const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #06b6d4;">Payment Successful! 🎉</h2>
              <p>Hi ${updatedOrder.customerName},</p>
              <p>Your purchase of <strong>${projectTitle}</strong> has been confirmed.</p>
              <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 4px 0;"><strong>Order ID:</strong> ${updatedOrder.razorpayOrderId}</p>
                <p style="margin: 4px 0;"><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
                <p style="margin: 4px 0;"><strong>Amount:</strong> ₹${updatedOrder.amount}</p>
              </div>
              <p>Thank you for your purchase! If you have any questions, feel free to reach out.</p>
              <p style="margin-top: 30px; font-size: 12px; color: #888;">— The Buy Your Project Team</p>
            </div>
          `;

          await sendEmail({
            email: updatedOrder.customerEmail,
            subject: `Purchase Confirmed — ${projectTitle}`,
            message: `Hi ${updatedOrder.customerName}, your purchase of ${projectTitle} for ₹${updatedOrder.amount} was successful. Payment ID: ${razorpay_payment_id}`,
            html
          });
        } catch (emailErr) {
          console.error("Purchase confirmation email failed:", emailErr);
          // Don't fail the payment verification if email fails
        }
      }

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

