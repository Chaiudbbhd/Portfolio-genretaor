
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Clean, corporate design perfect for business professionals",
    tags: ["Modern", "Corporate", "Clean"],
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    name: "Creative Portfolio",
    description: "Bold, artistic layout ideal for designers and creatives",
    tags: ["Creative", "Artistic", "Bold"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "Minimal Elegance",
    description: "Simple, elegant design that focuses on your content",
    tags: ["Minimal", "Elegant", "Simple"],
    color: "from-gray-500 to-gray-600"
  },
  {
    id: 4,
    name: "Tech Developer",
    description: "Perfect for developers and tech professionals",
    tags: ["Tech", "Developer", "Modern"],
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 5,
    name: "Freelancer Pro",
    description: "Versatile design great for freelancers in any field",
    tags: ["Freelancer", "Versatile", "Professional"],
    color: "from-orange-500 to-red-500"
  }
];

export const Templates = () => {
  return (
    <section id="templates" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Template</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select from our collection of professionally designed templates, each crafted for different industries and styles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div 
              key={template.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              <div className={`h-48 bg-gradient-to-br ${template.color} relative`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                    <h3 className="text-white font-semibold text-lg mb-2">{template.name}</h3>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {template.description}
                </p>
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
      </div>
    </section>
  );
};
