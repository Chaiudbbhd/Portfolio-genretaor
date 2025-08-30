// src/components/StudentForms.tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface Props {
  templateId: number;
  onSubmit: (data: any) => void;
}

export const StudentForms = ({ templateId, onSubmit }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onSubmit({ templateId, ...data });
  };

  // reusable links block
  const LinksSection = () => (
    <div className="grid grid-cols-2 gap-4">
      <Input name="github" placeholder="GitHub URL" />
      <Input name="linkedin" placeholder="LinkedIn URL" />
      <Input name="gmail" placeholder="Gmail" />
      <Input name="instagram" placeholder="Instagram URL" />
      <Input name="facebook" placeholder="Facebook URL" />
      <Input name="twitter" placeholder="Twitter URL" />
      <Input name="youtube" placeholder="YouTube URL" />
    </div>
  );

  // 🟢 Minimal Elegance (id: 3)
  if (templateId === 3) {
    return (
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-h-[75vh] overflow-y-auto p-2"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input type="file" name="photo" accept="image/*" required />
          <Input name="name" placeholder="Your Name" required />
        </div>
        <Textarea name="about" placeholder="About you" required />

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="links">
            <AccordionTrigger>Links</AccordionTrigger>
            <AccordionContent>
              <LinksSection />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="projects">
            <AccordionTrigger>Projects (3)</AccordionTrigger>
            <AccordionContent>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border p-3 rounded-md grid grid-cols-2 gap-3 mb-3"
                >
                  <Input
                    name={`project${i}_title`}
                    placeholder={`Project ${i} Title`}
                  />
                  <Input
                    type="file"
                    name={`project${i}_image`}
                    accept="image/*"
                  />
                  <Input name={`project${i}_live`} placeholder="Live URL" />
                  <Input
                    name={`project${i}_code`}
                    placeholder="Repository URL"
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          type="submit"
          className="w-full bg-purple-600 text-white rounded-md"
        >
          Send
        </Button>
      </form>
    );
  }

  // 🟢 Blog Writer (id: 8)
  if (templateId === 8) {
    return (
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-h-[75vh] overflow-y-auto p-2"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input type="file" name="photo" accept="image/*" required />
          <Input name="name" placeholder="Your Name" required />
        </div>
        <Input type="file" name="resume" accept=".pdf" />

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="links">
            <AccordionTrigger>Links</AccordionTrigger>
            <AccordionContent>
              <LinksSection />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="skills">
            <AccordionTrigger>Skills</AccordionTrigger>
            <AccordionContent>
              <Textarea name="skills" placeholder="Technical Skills" />
              <Textarea name="techstack" placeholder="Tech Stack Known" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="projects">
            <AccordionTrigger>Projects (6)</AccordionTrigger>
            <AccordionContent>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="border p-3 rounded-md grid grid-cols-2 gap-3 mb-3"
                >
                  <Input
                    name={`project${i}_title`}
                    placeholder={`Project ${i} Title`}
                  />
                  <Input
                    type="file"
                    name={`project${i}_image`}
                    accept="image/*"
                  />
                  <Input name={`project${i}_live`} placeholder="Live URL" />
                  <Input
                    name={`project${i}_code`}
                    placeholder="Repository URL"
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="articles">
            <AccordionTrigger>Articles (6)</AccordionTrigger>
            <AccordionContent>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="border p-3 rounded-md space-y-3 mb-3"
                >
                  <Input
                    type="file"
                    name={`article${i}_image`}
                    accept="image/*"
                  />
                  <Textarea
                    name={`article${i}_content`}
                    placeholder={`Article ${i} Content`}
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          type="submit"
          className="w-full bg-purple-600 text-white rounded-md"
        >
          Send
        </Button>
      </form>
    );
  }

  // 🟢 Gaming Vault (id: 24)
  if (templateId === 24) {
    return (
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-h-[75vh] overflow-y-auto p-2"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input type="file" name="photo" accept="image/*" required />
          <Input name="name" placeholder="Your Name" required />
        </div>
        <Textarea name="about" placeholder="About you" required />

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="links">
            <AccordionTrigger>Links</AccordionTrigger>
            <AccordionContent>
              <LinksSection />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="projects">
            <AccordionTrigger>Projects (3)</AccordionTrigger>
            <AccordionContent>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border p-3 rounded-md grid grid-cols-2 gap-3 mb-3"
                >
                  <Input
                    name={`project${i}_title`}
                    placeholder={`Project ${i} Title`}
                  />
                  <Input
                    type="file"
                    name={`project${i}_image`}
                    accept="image/*"
                  />
                  <Input name={`project${i}_live`} placeholder="Live URL" />
                  <Input
                    name={`project${i}_code`}
                    placeholder="Repository URL"
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          type="submit"
          className="w-full bg-purple-600 text-white rounded-md"
        >
          Send
        </Button>
      </form>
    );
  }

  return <p>No form defined for this template.</p>;
};
