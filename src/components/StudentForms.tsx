// src/components/StudentForms.tsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
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

export const StudentForms = ({ templateId, onSubmit, isLoggedIn }: Props) => {
  const auth = useAuth();
  const canEdit = isLoggedIn ?? auth?.isLoggedIn ?? false;

  const template = formsConfig[templateId];
  const [showAuth, setShowAuth] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [isEdited, setIsEdited] = useState(false); // ✅ track edits

  if (!template) return <p>No form defined for this template.</p>;

  // ✅ Fetch current user credits on mount
  useEffect(() => {
    if (auth?.user?.id) {
      (async () => {
        const { data, error } = await supabase
          .from("users")
          .select("credits")
          .eq("id", auth.user.id)
          .single();

        if (error) {
          console.error("❌ Error fetching credits:", error);
        } else {
          setCredits(data.credits);
        }
      })();
    }
  }, [auth?.user?.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canEdit) {
      setShowAuth(true);
      return;
    }

    if (credits !== null && credits <= 0) {
      alert("❌ You have 0 credits. Please buy a plan to submit this form.");
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      // 1️⃣ Send the email
      const res = await fetch("http://localhost:4001/api/sendMail", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        alert("✅ Email sent successfully!");
      } else {
        alert("❌ Failed: " + result.error);
      }

      // 2️⃣ Call onSubmit (parent callback)
      if (onSubmit) {
        const data = Object.fromEntries(formData.entries());
        await onSubmit({ templateId, ...data }, e);
      }

      // 3️⃣ Deduct credit only if user edited
      if (isEdited) {
        const { data: newCredits, error } = await supabase.rpc("use_template", {
          uid: auth?.user?.id,
          tid: templateId,
        });

        if (error) {
          console.error("❌ Error deducting credit:", error);
          alert("❌ Could not deduct credit.");
        } else {
          setCredits(newCredits);
          setIsEdited(false); // reset for next submission
        }
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    }
  };

  const handleEditAttempt = () => {
    if (!canEdit) setShowAuth(true);
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
            onChange={() => setIsEdited(true)}
            disabled={!canEdit}
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
              onClick={() => setIsEdited(true)}
              onFocus={handleEditAttempt}
              disabled={!canEdit}
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
            onChange={() => setIsEdited(true)}
            disabled={!canEdit}
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
            onChange={() => setIsEdited(true)}
            disabled={!canEdit}
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
        {!canEdit && (
          <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
            <p className="text-gray-700 font-medium text-lg">
              Please sign in to edit
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-h-[75vh] overflow-y-auto p-2"
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
            disabled={!canEdit}
          >
            Send
          </Button>
        </form>

        {credits !== null && (
          <p className="text-sm text-right text-gray-600 mt-2">
            Remaining Credits: {credits}
          </p>
        )}
      </div>
    </>
  );
};
