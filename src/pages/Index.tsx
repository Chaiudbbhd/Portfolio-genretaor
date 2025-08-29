import React from "react";
import useRazorpayCheckout from "../hooks/useRazorpayCheckout";

import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Templates } from "@/components/Templates";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const Index = () => {
  const openRazorpay = useRazorpayCheckout();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 🔹 Navbar/Header */}
      <Header />

      {/* 🔹 Hero Section */}
      <Hero />

      {/* 🔹 Features */}
      <Features />

      {/* 🔹 Templates Showcase */}
      <Templates />

      {/* 🔹 Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Plan 1 - ₹99 */}
            <div className="bg-slate-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold">Starter</h3>
              <p className="mt-2 text-gray-500">Perfect for trying things out</p>
              <p className="mt-6 text-4xl font-bold">₹99</p>
              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✅ Generate up to 2 templates</li>
                <li>✅ Basic customization</li>
                <li>❌ No advanced analytics</li>
                <li>❌ Limited support</li>
              </ul>
              <button
                onClick={() => openRazorpay(99)}
                className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Get Starter
              </button>
            </div>

            {/* Plan 2 - ₹499 */}
            <div className="bg-slate-50 p-8 rounded-2xl shadow-lg border-2 border-blue-600">
              <h3 className="text-2xl font-semibold">Pro</h3>
              <p className="mt-2 text-gray-500">For professionals & creators</p>
              <p className="mt-6 text-4xl font-bold">₹499</p>
              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✅ Generate up to 6 templates</li>
                <li>✅ Advanced customization</li>
                <li>✅ Access to premium layouts</li>
                <li>✅ Priority support</li>
              </ul>
              <button
                onClick={() => openRazorpay(499)}
                className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Get Pro
              </button>
            </div>

            {/* Plan 3 - ₹999 */}
            <div className="bg-slate-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold">Ultimate</h3>
              <p className="mt-2 text-gray-500">Best for businesses & unlimited access</p>
              <p className="mt-6 text-4xl font-bold">₹999</p>
              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✅ Generate up to 12 templates</li>
                <li>✅ Unlimited editing times</li>
                <li>✅ All premium layouts & features</li>
                <li>✅ Dedicated support</li>
              </ul>
              <button
                onClick={() => openRazorpay(999)}
                className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Get Ultimate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Testimonials */}
      <Testimonials />

      {/* 🔹 FAQ */}
      <FAQ />

      {/* 🔹 Footer */}
      <Footer />
    </div>
  );
};

export default Index;
