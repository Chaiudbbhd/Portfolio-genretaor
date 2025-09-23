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

const useRazorpayCheckout = (setCredits?: React.Dispatch<React.SetStateAction<number>>) => {
  const { user, isLoggedIn } = useAuth();

  const openRazorpay = useCallback(
    async ({ amount, plan }: OpenRazorpayProps) => {
      if (!isLoggedIn || !user) {
        alert("❌ Please login first");
        return;
      }

      try {
        const orderRes = await fetch("/api/razorpay/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });

        const order = await orderRes.json();
        if (!order.id) {
          alert("❌ Failed to create order");
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: "INR",
          name: "Portfolio Builder",
          description: `${plan} Subscription`,
          order_id: order.id,
          handler: async (response: any) => {
            try {
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

              // ✅ Update credits via Supabase RPC
              const { data, error } = await supabase.rpc("purchase_pack", {
                uid: user.id,
                pack: plan,
              });

              if (error) {
                console.error("purchase_pack error:", error);
                alert("⚠️ Payment verified but credits update failed");
                return;
              }

              alert(`✅ ${plan} pack purchased! New balance: ${data} credits`);

              // ✅ Call setCredits if provided
              if (setCredits) setCredits(data);
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

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Checkout error:", error);
        alert("❌ Payment failed to initialize");
      }
    },
    [user, isLoggedIn, setCredits]
  );

  return openRazorpay;
};

export default useRazorpayCheckout;
