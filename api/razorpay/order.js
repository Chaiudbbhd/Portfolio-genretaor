// pages/api/razorpay/order.js
import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, notes } = req.body;

    // --- 1. Validate amount ---
    if (amount === undefined || amount === null) {
      return res.status(400).json({ error: "Missing amount" });
    }

    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // --- 2. Validate environment variables ---
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("Missing Razorpay credentials:", { keyId, keySecret });
      return res.status(500).json({ error: "Razorpay credentials not configured" });
    }

    console.log("Razorpay keys found:", !!keyId, !!keySecret);

    // --- 3. Initialize Razorpay instance ---
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // --- 4. Create order payload ---
    const orderPayload = {
      amount: Math.round(numericAmount * 100), // convert rupees to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: notes || {},
    };

    console.log("Creating Razorpay order with payload:", orderPayload);

    // --- 5. Create order ---
    let order;
    try {
      order = await razorpay.orders.create(orderPayload);
    } catch (err) {
      console.error("Razorpay order creation failed:", err);
      return res.status(500).json({ error: "Razorpay order creation failed", details: err.message });
    }

    console.log("Razorpay order created successfully:", order.id);
    return res.status(200).json(order);
  } catch (err) {
    console.error("Unexpected error in Razorpay handler:", err);
    return res.status(500).json({ error: "Unexpected server error", details: err.message });
  }
}
