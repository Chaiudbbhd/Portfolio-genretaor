import { useCallback } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const useRazorpayCheckout = () => {
  const openRazorpay = useCallback(async (amount: number) => {
    try {
      // 1. Create order from backend (API route)
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

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // frontend key (env)
        amount: order.amount,
        currency: "INR",
        name: "Portfolio Builder",
        description: "Payment for premium template",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // 3. Verify payment with backend
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const verify = await verifyRes.json();

            if (verify.ok) {
              alert("✅ Payment Verified!");
            } else {
              alert("❌ Payment Verification Failed!");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("❌ Could not verify payment");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("❌ Payment failed to initialize");
    }
  }, []);

  return openRazorpay;
};

export default useRazorpayCheckout;
