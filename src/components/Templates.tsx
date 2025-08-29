import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

// 🟢 All templates with category
const templates = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Clean, corporate design perfect for business professionals",
    tags: ["Modern", "Corporate", "Clean"],
    color: "from-blue-500 to-blue-600",
    category: "Professionals",
    link: "https://blog-prasanna.onrender.com/"
  },
  {
    id: 2,
    name: "Creative Portfolio",
    description: "Bold, artistic layout ideal for designers and creatives",
    tags: ["Creative", "Artistic", "Bold"],
    color: "from-purple-500 to-pink-500",
    category: "Designers",
    link: "https://chaiudbbhd.github.io/portfolio-student/"
  },
  {
    id: 3,
    name: "Minimal Elegance",
    description: "Simple, elegant design that focuses on your content",
    tags: ["Minimal", "Elegant", "Simple"],
    color: "from-gray-500 to-gray-600",
    category: "Students",
    link: "https://the-simplefolio.netlify.app/"
  },
  {
    id: 4,
    name: "Tech Developer",
    description: "Perfect for developers and tech professionals",
    tags: ["Tech", "Developer", "Modern"],
    color: "from-green-500 to-emerald-600",
    category: "Developers",
    link: "https://portfolio1-ndem.vercel.app/"
  },
  {
    id: 5,
    name: "Freelancer Pro",
    description: "Versatile design great for freelancers in any field",
    tags: ["Freelancer", "Versatile", "Professional"],
    color: "from-orange-500 to-red-500",
    category: "Professionals"
  },
  {
    id: 6,
    name: "Startup Pitch Deck",
    description: "Dynamic template to showcase startups, products, and investors",
    tags: ["Startup", "Business", "Pitch"],
    color: "from-indigo-500 to-sky-600",
    category: "Professionals"
  },
  {
    id: 7,
    name: "Photography Focus",
    description: "Perfect for photographers with image-first layouts",
    tags: ["Photography", "Gallery", "Visual"],
    color: "from-yellow-400 to-amber-600",
    category: "Designers"
  },
  {
    id: 8,
    name: "Blog Writer",
    description: "Minimal blog layout designed for writers and storytellers",
    tags: ["Blog", "Writer", "Content"],
    color: "from-pink-400 to-rose-600",
    category: "Students"
  },
  {
    id: 9,
    name: "Agency Studio",
    description: "Sleek showcase template for creative agencies and studios",
    tags: ["Agency", "Studio", "Professional"],
    color: "from-teal-500 to-cyan-600",
    category: "Designers"
  },
  {
    id: 10,
    name: "E-commerce Shop",
    description: "Clean product-focused design for online stores",
    tags: ["E-commerce", "Store", "Products"],
    color: "from-red-400 to-pink-600",
    category: "Other"
  },
  {
    id: 11,
    name: "Education Hub",
    description: "Ideal for teachers, courses, and online education content",
    tags: ["Education", "Courses", "Learning"],
    color: "from-lime-500 to-green-700",
    category: "Study"
  },
  {
    id: 12,
    name: "Medical Profile",
    description: "Professional healthcare design for doctors and clinics",
    tags: ["Medical", "Health", "Clinic"],
    color: "from-blue-400 to-cyan-500",
    category: "Other"
  },
  {
    id: 13,
    name: "Gaming Portfolio",
    description: "Bold, neon-themed design for gamers and streamers",
    tags: ["Gaming", "Streamer", "Esports"],
    color: "from-fuchsia-500 to-purple-700",
    category: "Students"
  },
  {
    id: 14,
    name: "Event Landing Page",
    description: "Built for conferences, webinars, and event promotion",
    tags: ["Event", "Conference", "Webinar"],
    color: "from-orange-400 to-yellow-500",
    category: "Other"
  },
  {
    id: 15,
    name: "Non-Profit Cause",
    description: "Empathetic, clean design for NGOs and social causes",
    tags: ["Charity", "Non-Profit", "Cause"],
    color: "from-emerald-400 to-teal-600",
    category: "Other"
  }
];

const categories = ["All", "Students", "Professionals", "Study", "Developers", "Designers", "Other"];

export const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 🟢 Filter templates based on category
  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  return (
    <section id="templates" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Template</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select from our collection of professionally designed templates, each crafted for different industries and styles
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "secondary"}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-6 py-2 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
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

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{template.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
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

        {/* No results */}
        {filteredTemplates.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No templates found in this category.</p>
        )}
      </div>
    </section>
  );
};
