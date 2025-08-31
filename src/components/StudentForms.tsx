import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { formsConfig } from "@/config/formsConfig";
import { AuthDialog } from "@/components/AuthDialog";

interface Props {
  templateId: number;
  onSubmit?: (data: any, e?: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  isLoggedIn?: boolean;
}

export const StudentForms = ({ templateId, onSubmit, isLoggedIn = false }: Props) => {
  const template = formsConfig[templateId];
  const [showAuth, setShowAuth] = useState(false);
  const [credits, setCredits] = useState<number | null>(null); // Added state to track credits

  if (!template) return <p>No form defined for this template.</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!isLoggedIn) {
    setShowAuth(true);
    return;
  }

  // Check credits before submitting
  if (credits !== null && credits <= 0) {
    alert("❌ You have 0 credits. Please buy a plan to submit this form.");
    return;
  }

  const formData = new FormData(e.target as HTMLFormElement);

  try {
    const res = await fetch("http://localhost:4001/api/sendMail", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (result.success) alert("✅ Email sent successfully!");
    else alert("❌ Failed: " + result.error);

    if (onSubmit) {
      const data = Object.fromEntries(formData.entries());

      // Call the onSubmit handler
      await onSubmit({ templateId, ...data }, e);

      // Deduct a credit
      const deductRes = await fetch("/api/template/use", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });

      const deductData = await deductRes.json();
      if (deductData.success) {
        // Refresh credits
        const userRes = await fetch("/api/user/me");
        const userData = await userRes.json();
        setCredits(userData.credits);
      } else {
        alert("❌ Could not deduct credit: " + deductData.error);
      }
    }
  } catch (err) {
    console.error(err);
    alert("❌ Something went wrong");
  }
};


  const handleEditAttempt = () => {
    if (!isLoggedIn) setShowAuth(true);
  };

  const renderField = (field: any, prefix = "") => {
    const name = prefix ? `${prefix}_${field.name}` : field.name;

    switch (field.type) {
      case "text":
        return (
          <Input
            key={name}
            name={name}
            placeholder={field.label}
            required={field.required}
            onFocus={handleEditAttempt}
            disabled={!isLoggedIn}
          />
        );

      case "file":
        return (
          <div key={name} className="flex flex-col mb-4">
            <span className="text-sm font-medium text-gray-700 mb-1">
              {field.name === "photo"
                ? "Upload File: Your Photo"
                : field.name === "resume"
                ? "Upload File: Your Resume"
                : "Upload File"}
            </span>
            <Input
              type="file"
              name={name}
              accept={field.name === "resume" ? ".pdf,.doc,.docx" : "image/*"}
              required={field.required}
              className="block w-full"
              onClick={!isLoggedIn ? handleEditAttempt : undefined}
            />
          </div>
        );

      case "textarea":
        return (
          <Textarea
            key={name}
            name={name}
            placeholder={field.label}
            required={field.required}
            onFocus={handleEditAttempt}
            disabled={!isLoggedIn}
          />
        );

      default:
        return null;
    }
  };

  const LinksSection = () => (
    <div className="grid grid-cols-2 gap-4">
      {["github", "linkedin", "gmail", "instagram", "facebook", "twitter", "youtube"].map(
        (key) => (
          <Input
            key={key}
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1) + " URL"}
            onFocus={handleEditAttempt}
            disabled={!isLoggedIn}
          />
        )
      )}
    </div>
  );

  return (
    <>
      {showAuth && (
        <AuthDialog>
          <Button className="hidden" />
        </AuthDialog>
      )}

      <div className="relative">
        {!isLoggedIn && (
          <div
            className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center"
            onClick={handleEditAttempt}
          >
            <p className="text-gray-700 font-medium text-lg">Please sign in to edit</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-h-[75vh] overflow-y-auto p-2 pointer-events-auto"
        >
          <input type="hidden" name="to" value="lpklpk984@gmail.com" />
          <input
            type="hidden"
            name="subject"
            value={`New submission - ${template?.title || "Form"}`}
          />

          {template.fields.map((f) => renderField(f))}

          <Accordion type="multiple" className="w-full">
            {template.accordions.map((acc, idx) => (
              <AccordionItem key={idx} value={`acc-${idx}`}>
                <AccordionTrigger>{acc.title}</AccordionTrigger>
                <AccordionContent>
                  {acc.content === "links" && <LinksSection />}
                  {acc.fields &&
                    (!acc.repeat
                      ? acc.fields.map((f) => renderField(f))
                      : Array.from({ length: acc.repeat }).map((_, i) => (
                          <div
                            key={i}
                            className="border p-3 rounded-md grid grid-cols-2 gap-3 mb-3"
                          >
                            {acc.fields.map((f) =>
                              renderField(f, `${acc.title.toLowerCase()}${i + 1}`)
                            )}
                          </div>
                        )))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button
            type="submit"
            className="w-full bg-purple-600 text-white rounded-md"
            onClick={!isLoggedIn ? handleEditAttempt : undefined}
          >
            Send
          </Button>
        </form>

        {credits !== null && (
          <p className="text-sm text-right text-gray-600 mt-2">Remaining Credits: {credits}</p>
        )}
      </div>
    </>
  );
};
