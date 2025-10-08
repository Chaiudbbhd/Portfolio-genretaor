"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown } from "lucide-react";
import useRazorpayCheckout from "../hooks/useRazorpayCheckout";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Pricing = () => {
  const openRazorpay = useRazorpayCheckout();

  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">
          Choose Your Plan
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Monthly Plan */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-10 hover:shadow-xl transition-all">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-3 rounded-xl">
                <Zap className="w-6 h-6 text-gray-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Monthly</h3>
            <p className="text-gray-600 mb-4">Perfect for quick projects</p>
            <p className="text-4xl font-bold mb-6">₹199</p>
            <ul className="mb-6 space-y-3 text-gray-700">
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Access to all templates</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Generate up to 2 templates</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Unlimited edits</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Live preview</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Download as ZIP</li>
            </ul>
            <Button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              onClick={() => openRazorpay({ amount: 99, plan: "monthly" })}
            >
              Get Started
            </Button>
          </div>

          {/* Semi-Annual Plan */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-400 shadow-xl rounded-2xl p-10 hover:scale-105 transform transition-transform duration-300 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 text-sm">Most Popular</Badge>
            </div>
            <div className="absolute -top-2 -right-2">
              <Badge className="bg-green-500 text-white px-3 py-1 text-xs">Save ₹95</Badge>
            </div>
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Semi-Annual</h3>
            <p className="text-gray-600 mb-4">Great value for ongoing work</p>
            <p className="text-4xl font-bold mb-6">₹499</p>
            <ul className="mb-6 space-y-3 text-gray-700">
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Everything in Monthly</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Generate up to 6 templates</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Priority support</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Advanced customization</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Multiple downloads</li>
            </ul>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              onClick={() => openRazorpay({ amount: 499, plan: "semiannual" })}
            >
              Get Started
            </Button>
          </div>

          {/* Annual Plan */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-10 hover:shadow-xl transition-all relative">
            <div className="absolute -top-2 -right-2">
              <Badge className="bg-green-500 text-white px-3 py-1 text-xs">Save ₹189</Badge>
            </div>
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-3 rounded-xl">
                <Crown className="w-6 h-6 text-gray-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Annual</h3>
            <p className="text-gray-600 mb-4">Best value for professionals</p>
            <p className="text-4xl font-bold mb-6">₹999</p>
            <ul className="mb-6 space-y-3 text-gray-700">
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Everything in Semi-Annual</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Generate up to 12 templates</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Unlimited editing</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Premium templates</li>
              <li className="flex items-center gap-2"><Check className="text-green-600 h-5 w-5" /> Custom domain help</li>
            </ul>
            <Button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              onClick={() => openRazorpay({ amount: 999, plan: "annual" })}
            >
              Get Started
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};
