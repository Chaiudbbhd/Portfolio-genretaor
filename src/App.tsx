// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { StudentForms } from "./components/StudentForms";
import { AuthProvider } from "./context/AuthContext"; // ✅ added

const queryClient = new QueryClient();

const App = () => {
  const handleFormSubmit = async (form: HTMLFormElement) => {
  try {
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    const res = await fetch("/api/razorpay/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ Mail sent successfully!");
    } else {
      alert("❌ Failed: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Something went wrong");
  }
};


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* ✅ No isLoggedIn here — StudentForms will handle it via context */}
              <Route
                path="/form"
                element={
                  <StudentForms
                    templateId={3}
                    onSubmit={(data, e) => {
                      if (e) {
                        handleFormSubmit(e.target as HTMLFormElement);
                      }
                    }}
                  />
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
