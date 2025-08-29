import React from "react";
import useRazorpayCheckout from "../hooks/useRazorpayCheckout";

import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Templates } from "@/components/Templates";
import { Pricing } from "@/components/Pricing";
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
      <Pricing />

      {/* 🔹 Quick Pay Button (Standalone Razorpay Checkout Demo) */}
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-bold">Buy Premium Portfolio Template 🚀</h2>
        <button
          onClick={() => openRazorpay(499)} // amount in INR
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Pay ₹499
        </button>
      </div>

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
