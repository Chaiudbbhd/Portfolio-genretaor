import Razorpay from "razorpay";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, plan, notes } = req.body;

    // Validate amount
    if (amount === undefined || amount === null) {
      return res.status(400).json({ error: "Missing amount" });
    }
    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Get Razorpay credentials
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("Razorpay credentials missing:", { keyId, keySecret });
      return res.status(500).json({ error: "Razorpay credentials not configured" });
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Prepare order payload
    const orderPayload = {
      amount: Math.round(numericAmount * 100), // convert to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: notes || (plan ? { plan } : {}),
    };

    // Create order
    let order;
    try {
      order = await razorpay.orders.create(orderPayload);
    } catch (err) {
      console.error("Razorpay order creation failed:", err);
      return res.status(500).json({ error: "Razorpay order creation failed", details: err.message });
    }

    // Return order and public key to frontend
    return res.status(200).json({ order, key: keyId });
  } catch (err) {
    console.error("Unexpected server error in Razorpay handler:", err);
    return res.status(500).json({ error: "Unexpected server error", details: err.message });
  }
}
