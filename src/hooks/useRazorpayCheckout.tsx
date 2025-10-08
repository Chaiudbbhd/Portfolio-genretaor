// hooks/useRazorpayCheckout.tsx
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
        // --- 1. Create Razorpay order via API ---
        const orderRes = await fetch("/api/razorpay/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            notes: { plan },
          }),
        });

        const { order, key } = await orderRes.json();

        if (!order?.id || !key) {
          console.error("Order creation failed:", { order, key });
          alert("❌ Failed to create order");
          return;
        }

        // --- 2. Razorpay Checkout options ---
        const options = {
          key, // dynamic public key from API
          amount: order.amount,
          currency: "INR",
          name: "Portfolio Builder",
          description: `${plan} Subscription`,
          order_id: order.id,
          handler: async (response: any) => {
            try {
              // --- 3. Verify payment ---
              const verifyRes = await fetch("/api/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              });
              const verify = await verifyRes.json();

              if (!verify.ok) {
                alert("❌ Payment Verification Failed!");
                return;
              }

              // --- 4. Update credits via Supabase RPC ---
              const { data: newCredits, error } = await supabase.rpc(
                "purchase_pack",
                { uid: user.id, pack: plan }
              );

              if (error) {
                console.error("purchase_pack error:", error);
                alert("⚠️ Payment verified but credits update failed");
                return;
              }

              alert(`✅ ${plan} pack purchased! New balance: ${newCredits} credits`);

            } catch (err) {
              console.error("Verification error:", err);
              alert("❌ Could not verify payment");
            }
          },
          prefill: {
            name: user?.email?.split("@")[0] || "User",
            email: user?.email || "",
          },
          theme: { color: "#3399cc" },
        };

        // --- 5. Open Razorpay Checkout ---
        const rzp = new window.Razorpay(options);
        rzp.open();

      } catch (error) {
        console.error("Checkout error:", error);
        alert("❌ Payment failed to initialize");
      }
    },
    [user, isLoggedIn]
  );

  return openRazorpay;
};

export default useRazorpayCheckout;
