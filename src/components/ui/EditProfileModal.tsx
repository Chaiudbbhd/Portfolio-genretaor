import { useState } from "react";
import { Eye, Pencil, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TemplatesGrid({ templates }) {
  const [editingTemplate, setEditingTemplate] = useState<any | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 👉 Add your API call here to save portfolio data
    alert("Portfolio updated successfully!");
    setEditingTemplate(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {templates.map((template: any) => (
        <div
          key={template.id}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 relative"
        >
          {/* ✏️ Edit Button (Only for Student Portfolios) */}
          {template.type === "Students" && (
            <Dialog open={editingTemplate?.id === template.id} onOpenChange={(open) => !open && setEditingTemplate(null)}>
              <DialogTrigger asChild>
                <button
                  className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-md hover:bg-purple-100 transition"
                  onClick={() => setEditingTemplate(template)}
                >
                  <Pencil className="h-4 w-4 text-purple-600" />
                </button>
              </DialogTrigger>

              {/* 📝 Edit Form */}
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Portfolio - {template.name}</DialogTitle>
                </DialogHeader>

                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  {/* Upload Photo */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Photo</label>
                    <Input type="file" accept="image/*" />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input placeholder="Enter your name" required />
                  </div>

                  {/* Details / About */}
                  <div>
                    <label className="block text-sm font-medium mb-2">About</label>
                    <Textarea placeholder="Write something about yourself..." required />
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Education</label>
                    <Textarea placeholder="Enter your education details" required />
                  </div>

                  {/* Projects */}
                  <div className="space-y-4">
                    <h3 className="text-md font-semibold">Projects</h3>
                    
                    {/* Project 1 Example */}
                    <div className="border p-4 rounded-lg space-y-3">
                      <Input type="file" accept="image/*" />
                      <Input placeholder="Live URL" type="url" />
                      <Input placeholder="GitHub URL" type="url" />
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Skills</label>
                    <Input placeholder="E.g. React, Java, Node.js" />
                  </div>

                  {/* Submit */}
                  <Button type="submit" className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    Send
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}

          {/* Template Preview Banner */}
          <div className={`h-48 bg-gradient-to-br ${template.color} relative`}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                <h3 className="text-white font-semibold text-lg mb-2">{template.name}</h3>

                {template.link ? (
                  <a href={template.link} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                    disabled
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Template Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{template.name}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{template.description}</p>
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
