import React from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const PricingSection = () => {
  const pricingTiers = [
    {
      name: "Basic",
      price: "₹499",
      period: "per session",
      description: "Perfect for getting started",
      features: [
        "Single 45-minute session",
        "Chat support access",
        "Email follow-up",
        "Basic assessment tools",
      ],
      popular: false,
    },
    {
      name: "Standard",
      price: "₹799",
      period: "per session",
      description: "Most popular choice",
      features: [
        "Single 60-minute session",
        "Priority scheduling",
        "Chat & video support",
        "Personalized care plan",
        "Progress tracking",
        "Resource materials",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "₹1299",
      period: "per session",
      description: "Comprehensive care package",
      features: [
        "Extended 90-minute session",
        "Priority 24/7 support",
        "Unlimited chat access",
        "Customized therapy plan",
        "Weekly check-ins",
        "Emergency support",
        "Family session included",
      ],
      popular: false,
    },
  ];

  const handleChoosePlan = (planName) => {
    toast({
      title: `${planName} Plan Selected`,
      description:
        "You'll be redirected to the booking form to complete your session request.",
      duration: 3000,
    });

    setTimeout(() => {
      const element = document.querySelector("#contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  return (
    <section id="pricing" className="py-20 bg-background">
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
              Flexible Options
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Simple, transparent{" "}
            <span className="text-primary">pricing</span> for everyone
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the option that fits your needs. No hidden fees.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative bg-card border border-border rounded-3xl shadow-sm ${
                tier.popular ? "ring-2 ring-primary scale-105" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Most Popular
                </div>
              )}

              {/* Top Section */}
              <div className="p-8 text-center border-b border-border">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {tier.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {tier.description}
                </p>

                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-semibold text-primary">
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground">
                    {tier.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleChoosePlan(tier.name)}
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                >
                  Choose Plan
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            All plans include secure sessions and 100% confidentiality.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingSection;