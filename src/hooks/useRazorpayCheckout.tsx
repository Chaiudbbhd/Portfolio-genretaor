// hooks/useRazorpayCheckout.ts
import { useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface OpenRazorpayProps {
  amount: number;
  plan: "monthly" | "semiannual" | "annual";
}

const useRazorpayCheckout = () => {
  const { user, isLoggedIn } = useAuth();

  const openRazorpay = useCallback(
    async ({ amount, plan }: OpenRazorpayProps) => {
      if (!isLoggedIn || !user) {
        alert("❌ Please login first");
        return;
      }

      if (!amount || amount <= 0) {
        alert("❌ Invalid payment amount");
        return;
      }

      try {
        // 1️⃣ Create Razorpay order
        const res = await fetch("/api/razorpay/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, plan }),
        });

        const data = await res.json();

        if (!data?.order || !data?.key) {
          console.error("Order creation failed:", data);
          alert("❌ Failed to create order");
          return;
        }

        const options = {
          key: data.key, // Public key
          amount: data.order.amount,
          currency: "INR",
          name: "Portfolio Builder",
          description: `${plan} Subscription`,
          order_id: data.order.id,
          prefill: {
            name: user.email?.split("@")[0] || "User",
            email: user.email || "",
          },
          theme: { color: "#3399cc" },
          handler: async (response: any) => {
            try {
              // 2️⃣ Verify payment
              const verifyRes = await fetch("/api/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              });

              const verifyData = await verifyRes.json();
              if (!verifyData.ok) {
                alert("❌ Payment verification failed");
                return;
              }

              // 3️⃣ Update credits via Supabase RPC
              const { data: newCredits, error } = await supabase.rpc("purchase_pack", {
                uid: user.id,
                pack: plan,
              });

              if (error) {
                console.error("Supabase update error:", error);
                alert("⚠️ Payment verified, but credits update failed");
                return;
              }

              alert(`✅ ${plan} plan purchased! New balance: ${newCredits} credits`);
            } catch (err) {
              console.error("Payment verification error:", err);
              alert("❌ Could not verify payment");
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Razorpay checkout initialization error:", err);
        alert("❌ Payment failed to initialize");
      }
    },
    [user, isLoggedIn]
  );

  return openRazorpay;
};

export default useRazorpayCheckout;
