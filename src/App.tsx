// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { StudentForms } from "./components/StudentForms";

const queryClient = new QueryClient();

const App = () => {
  // Parent handler for form submission
  const handleFormSubmit = async (form: HTMLFormElement) => {
    try {
      const formData = new FormData(form); // includes text + files

      const res = await fetch("http://localhost:4001/api/sendMail", {
        method: "POST",
        body: formData, // don't set headers for FormData
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Mail sent!");
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
        <BrowserRouter>
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<Index />} />

            {/* Form Route */}
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

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
