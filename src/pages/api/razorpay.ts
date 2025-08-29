import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!, 
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: req.body.amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
