"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react"; // ✅ use proper check icons

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Pricing = () => {
  const startPayment = async (amount: number, plan: string) => {
    try {
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Your Website",
        description: `${plan} Subscription`,
        order_id: data.id,
        handler: (response: any) => {
          alert("✅ Payment Successful! ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Demo User",
          email: "demo@example.com",
          contact: "9999999999",
        },
        theme: { color: "#6d28d9" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Razorpay Checkout Error:", error);
      alert("❌ Payment failed. Please try again.");
    }
  };

  const payMonthly = () => startPayment(99, "Monthly");
  const paySemiAnnual = () => startPayment(499, "Semi-Annual");
  const payAnnual = () => startPayment(999, "Annual");

  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for you. All plans include access to
            premium templates and core features.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Monthly */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly</h3>
            <p className="text-gray-600 mb-4">Perfect for quick projects</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">₹99</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="mb-6 space-y-3 text-gray-700">
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Generate up to 2 templates</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Basic editing access</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Email support</li>
            </ul>
            <Button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              onClick={payMonthly}
            >
              Get Started
            </Button>
          </div>

          {/* Semi-Annual */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 shadow-xl rounded-2xl p-10 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 text-sm">
                Most Popular
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Semi-Annual</h3>
            <p className="text-gray-600 mb-4">Great value for ongoing work</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">₹499</span>
              <span className="text-gray-600">/6 months</span>
            </div>
            <ul className="mb-6 space-y-3 text-gray-700">
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Generate up to 6 templates</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Advanced editing access</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Priority email support</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Exclusive template designs</li>
            </ul>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              onClick={paySemiAnnual}
            >
              Get Started
            </Button>
          </div>

          {/* Annual */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-10 relative">
            <div className="absolute -top-2 -right-2">
              <Badge
                variant="destructive"
                className="bg-green-500 hover:bg-green-600"
              >
                Save ₹189
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Annual</h3>
            <p className="text-gray-600 mb-4">Best value for professionals</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">₹999</span>
              <span className="text-gray-600">/12 months</span>
            </div>
            <ul className="mb-6 space-y-3 text-gray-700">
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Generate up to 12 templates</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Unlimited editing</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Premium template library</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> 24/7 priority support</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Early access to new features</li>
            </ul>
            <Button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              onClick={payAnnual}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
