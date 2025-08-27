
import { Zap, Palette, Download, Shield, Eye, Code } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Setup",
    description: "Get your portfolio ready in under 5 minutes with our intuitive editor"
  },
  {
    icon: Palette,
    title: "Professional Templates",
    description: "Choose from 5 carefully crafted templates for different styles and industries"
  },
  {
    icon: Eye,
    title: "Live Preview",
    description: "See your changes instantly with real-time preview as you customize"
  },
  {
    icon: Download,
    title: "Complete Download",
    description: "Get a full website package with HTML, CSS, JS, and all your assets"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and protected with enterprise-grade security"
  },
  {
    icon: Code,
    title: "Ready to Deploy",
    description: "Downloaded portfolios work on any hosting platform - no setup required"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides all the tools and features you need to create a professional portfolio that stands out
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
