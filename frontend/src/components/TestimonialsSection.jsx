import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      name: "Rahul Mehta",
      profession: "Software Engineer",
      rating: 5,
      feedback:
        "Peacix helped me overcome my anxiety and work-related stress. The counselors are professional and empathetic.",
    },
    {
      name: "Sneha Reddy",
      profession: "College Student",
      rating: 5,
      feedback:
        "The sessions helped me manage exam pressure and improve my focus. I felt heard and supported.",
    },
    {
      name: "Arjun Patel",
      profession: "Business Owner",
      rating: 5,
      feedback:
        "Career counseling gave me clarity and practical tools to handle business challenges confidently.",
    },
    {
      name: "Divya Kumar",
      profession: "Marketing Manager",
      rating: 5,
      feedback:
        "Relationship counseling helped rebuild trust and communication. Forever grateful.",
    },
    {
      name: "Vikram Shah",
      profession: "Teacher",
      rating: 5,
      feedback:
        "Convenient, professional, and effective. The video sessions fit perfectly into my schedule.",
    },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 rounded-full mb-4">
            <span className="text-sm font-medium text-foreground">
              Client Stories
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Hear from <span className="text-primary">real clients</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from people who transformed their mental health journey.
          </p>
        </motion.div>

        <div className="relative">

          {/* Scroll Buttons */}
          <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10">
            <Button
              onClick={() => scroll("left")}
              variant="outline"
              size="icon"
              className="rounded-full shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </Button>
          </div>

          <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10">
            <Button
              onClick={() => scroll("right")}
              variant="outline"
              size="icon"
              className="rounded-full shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </Button>
          </div>

          {/* Testimonials */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex-shrink-0 w-80 md:w-96 bg-card border border-border rounded-3xl p-8 shadow-sm snap-center relative"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.feedback}"
                </p>

                {/* Author */}
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.profession}
                  </p>
                </div>

                {/* Decorative Quote */}
                <div className="absolute top-6 right-6 text-5xl text-primary/10 font-serif">
                  "
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Hint */}
        <div className="md:hidden mt-6 text-center text-sm text-muted-foreground">
          Swipe to see more →
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;