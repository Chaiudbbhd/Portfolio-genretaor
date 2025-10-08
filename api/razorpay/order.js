import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, notes } = req.body;

    if (amount === undefined || amount === null) {
      return res.status(400).json({ error: "Missing amount" });
    }

    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("Missing Razorpay credentials:", { keyId, keySecret });
      return res.status(500).json({ error: "Razorpay credentials not configured" });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const orderPayload = {
      amount: Math.round(numericAmount * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: notes || {},
    };

    let order;
    try {
      order = await razorpay.orders.create(orderPayload);
    } catch (err) {
      console.error("Razorpay order creation failed:", err);
      return res.status(500).json({ error: "Razorpay order creation failed", details: err.message });
    }

    return res.status(200).json({
      order,
      key: keyId, // ✅ send public key to frontend
    });
  } catch (err) {
    console.error("Unexpected error in Razorpay handler:", err);
    return res.status(500).json({ error: "Unexpected server error", details: err.message });
  }
}
