// api/razorpay/verify.js
import crypto from "crypto";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Validate input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ ok: false, message: "Missing payment fields" });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error("Razorpay secret missing in environment variables");
      return res.status(500).json({ ok: false, message: "Razorpay secret missing" });
    }

    // Generate expected signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    // Verify signature
    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({ ok: true, message: "Payment verified successfully" });
    } else {
      console.warn("Razorpay signature mismatch", { razorpay_order_id, razorpay_payment_id });
      return res.status(400).json({ ok: false, message: "Signature mismatch" });
    }
  } catch (err) {
    console.error("Error verifying Razorpay payment:", err);
    return res.status(500).json({ ok: false, message: "Internal server error", details: err.message });
  }
}
