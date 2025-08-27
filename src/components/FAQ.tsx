
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How quickly can I create my portfolio?",
    answer: "You can have a complete portfolio ready in under 30 minutes! Simply choose a template, fill in your details, and live site will be hosted within minutes and url will be sent to your mail."
  },
  {
    question: "What's included in the downloaded file?",
    answer: "You get a complete website package with HTML, CSS, JavaScript files, and all your uploaded images. It's ready to upload to any web hosting service."
  },
  {
    question: "Can I edit my portfolio after downloading?",
    answer: "Yes! You can log back into your account anytime to make changes and send back you detailes for chaituchaitinya2005@gmail.com during your subscription period."
  },
  {
    question: "Do I need coding knowledge?",
    answer: "Not at all! Our platform is designed for everyone. Simply fill out forms, upload images, and we handle all the technical aspects."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets through our secure payment gateway."
  },
  {
    question: "Is there a free trial?",
    answer: "You can preview templates and edit your portfolio for free. Payment is only required when you want to download your completed website."
  },
  {
    question: "Can I use my portfolio for commercial purposes?",
    answer: "Absolutely! Once you download your portfolio, you own it completely and can use it for any purpose, including commercial use."
  },
  {
    question: "Do you offer refunds?",
    answer: "No, we dont't offer any refunds if you're not satisfied with your purchase. Contact our support team for assistance."
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about creating your portfolio
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-gray-50 rounded-lg px-6 border-0"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-purple-600 py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
