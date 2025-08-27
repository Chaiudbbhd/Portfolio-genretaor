
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap } from "lucide-react";

const plans = [
  {
    name: "Monthly",
    price: "₹99",
    period: "/month",
    description: "Perfect for quick projects",
    features: [
      "Access to all templates",
      "Unlimited edits",
      "Live preview",
      "Download as ZIP",
      "24/7 support"
    ],
    icon: Zap,
    popular: false
  },
  {
    name: "Semi-Annual",
    price: "₹499",
    period: "/6 months",
    description: "Great value for ongoing work",
    features: [
      "Everything in Monthly",
      "Priority support",
      "Advanced customization",
      "Multiple downloads",
      "Extended validity"
    ],
    icon: Crown,
    popular: true,
    savings: "Save ₹95"
  },
  {
    name: "Annual",
    price: "₹999",
    period: "/12 months",
    description: "Best value for professionals",
    features: [
      "Everything in Semi-Annual",
      "Premium templates",
      "Custom domain help",
      "SEO optimization",
      "Analytics integration"
    ],
    icon: Crown,
    popular: false,
    savings: "Save ₹189"
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for you. All plans include access to our premium templates and features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 shadow-xl' 
                  : 'bg-white border border-gray-200 shadow-lg'
              } hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 text-sm">
                    Most Popular
                  </Badge>
                </div>
              )}

              {plan.savings && (
                <div className="absolute -top-2 -right-2">
                  <Badge variant="destructive" className="bg-green-500 hover:bg-green-600">
                    {plan.savings}
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                    : 'bg-gray-100'
                }`}>
                  <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full py-3 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
