
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-8">
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Your Portfolio in Minutes
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Create Stunning
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
            Portfolios
          </span>
          Without Coding
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Choose from professional templates, customize with your details, and download your 
          complete portfolio website. Perfect for students, freelancers, and professionals.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
  size="lg"
  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4"
  onClick={() => {
    const target = document.getElementById("templates");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  Start Building Now
  <ArrowRight className="ml-2 h-5 w-5" />
</Button>

          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-4 border-2"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        {/* Hero Image/Preview */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 shadow-2xl">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg mb-4"></div>
                  <h3 className="font-semibold text-gray-900 mb-2">Modern Template</h3>
                  <p className="text-gray-600 text-sm">Clean, professional design</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg mb-4"></div>
                  <h3 className="font-semibold text-gray-900 mb-2">Creative Template</h3>
                  <p className="text-gray-600 text-sm">Bold, artistic showcase</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                  <div className="w-12 h-12 bg-green-600 rounded-lg mb-4"></div>
                  <h3 className="font-semibold text-gray-900 mb-2">Minimal Template</h3>
                  <p className="text-gray-600 text-sm">Simple, elegant layout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
