import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ramana Babu",
    role: "Software Engineer",
    company: "TCS",
    image: "https://i.ibb.co/Kx6KQhtd/Screenshot-2025-08-29-at-7-45-09-PM.png",
    content:
      "As a Software Engineer at TCS, I needed a portfolio that matched industry standards. PortfolioForge gave me a polished portfolio that stood out in interviews!",
    rating: 5,
  },
  {
    name: "Verma",
    role: "Professor",
    company: "Lendi Institute of Engineering & Technology",
    image: "https://i.ibb.co/YFN7S8Fh/Screenshot-2025-08-29-at-7-46-20-PM.png",
    content:
      "Being a Professor at Lendi, I recommend PortfolioForge to my students. It helps them create professional portfolios in minutes without coding.",
    rating: 4.5,
  },
  {
    name: "Arvind Patnaik",
    role: "Student",
    company: "Raghu Engineering College",
    image: "https://i.ibb.co/V0Mjny0R/arvind.jpg",
    content:
      "As a student preparing for campus placements at Raghu, my portfolio helped me secure multiple interview calls. Super helpful!",
    rating: 5,
  },
  {
    name: "Yugandhar",
    role: "Professor",
    company: "Lendi Engineering College",
    image: "https://i.ibb.co/sJ6n741n/Screenshot-2025-08-29-at-7-45-22-PM.png",
    content:
      "I suggest my students use PortfolioForge. It’s a quick and effective tool for making impressive resumes and portfolios for placements.",
    rating: 4.5,
  },
  {
    name: "Ashok Kumar",
    role: "Student",
    company: "IIT Hyderabad",
    image: "https://i.ibb.co/7NG7cZWW/profile-pic.jpg",
    content:
      "At IIT Hyderabad, competition is tough. My portfolio created with PortfolioForge stood out during internship selections!",
    rating: 4,
  },
];

export const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const speed = 1; // pixels per frame

    const scroll = () => {
      if (!isPaused.current && scrollContainer) {
        scrollContainer.scrollLeft += speed;

        // Reset when it reaches the end
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused.current = true;
    };
    const handleMouseLeave = () => {
      isPaused.current = false;
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Thousands
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Hear from students, engineers, and professors using PortfolioForge 🚀
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-hidden gap-6"
        >
          {/* Duplicate testimonials to create infinite loop effect */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="w-80 flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
                {testimonial.rating % 1 !== 0 && (
                  <Star className="h-5 w-5 text-yellow-400 opacity-70" />
                )}
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role} @ {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
