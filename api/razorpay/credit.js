// api/razorpay/credit.ts
import { supabase } from "@/integrations/supabase/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, plan } = req.body;

    if (!userId || !plan) {
      return res.status(400).json({ error: "Missing userId or plan" });
    }

    // Call Supabase RPC to add credits
    const { data: newCredits, error } = await supabase.rpc("purchase_pack", {
      uid: userId,
      pack: plan, // 'monthly' | 'semiannual' | 'annual'
    });

    if (error) {
      console.error("❌ purchase_pack RPC error:", error);
      return res.status(500).json({ error: "Failed to update credits" });
    }

    res.status(200).json({
      ok: true,
      credits: newCredits,
      plan,
    });
  } catch (err) {
    console.error("❌ Error in credit handler:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
