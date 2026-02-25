import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Shield,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Soft Brand Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10 -z-10"></div>

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center min-h-[600px]">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="space-y-6">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 rounded-full mx-auto lg:mx-0">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Mental Healthcare Ecosystem
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
                A mental healthcare ecosystem for the way we live,{" "}
                <span className="text-primary">feel</span>, and{" "}
                <span className="text-secondary">connect</span>
              </h1>

              {/* Paragraph */}
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                We follow the bio-psycho-social model because your body,
                mind, and environment all shape how you feel.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={scrollToContact}
                size="lg"
              >
                Find Your Expert
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
              >
                Learn More
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 max-w-lg mx-auto lg:mx-0">
              <Feature icon={<Calendar />} text="Easy Booking" />
              <Feature icon={<Shield />} text="100% Confidential" />
              <Feature icon={<MessageCircle />} text="24/7 Support" />
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="bg-card rounded-3xl shadow-sm p-8 border border-border max-w-md w-full">
              <div className="text-center">

                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-primary" />
                </div>

                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Find The Right Expert
                </h3>

                <p className="text-muted-foreground">
                  For every age & concern
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-muted-foreground justify-center lg:justify-start">
    {React.cloneElement(icon, { className: "w-5 h-5 text-primary" })}
    <span className="text-sm">{text}</span>
  </div>
);

export default HeroSection;