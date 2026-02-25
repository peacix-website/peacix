import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Heart,
  GraduationCap,
  ArrowRight,
  Users,
  FileText,
  Headphones,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      icon: Users,
      title: "Individual Therapy",
      price: "₹1299/session",
      description:
        "One-on-one counseling sessions with licensed therapists for personalized support.",
      features: [
        "Personalized approach",
        "Flexible scheduling",
        "Evidence-based therapy",
      ],
    },
    {
      icon: Heart,
      title: "Relationship Counseling",
      price: "₹1599/session",
      description:
        "Couples and family therapy to strengthen connections and improve communication.",
      features: [
        "Couples therapy",
        "Family systems",
        "Communication skills",
      ],
    },
    {
      icon: Briefcase,
      title: "Career Guidance",
      price: "₹1499/session",
      description:
        "Professional counseling for career transitions and workplace development.",
      features: [
        "Career planning",
        "Workplace support",
        "Leadership coaching",
      ],
    },
    {
      icon: GraduationCap,
      title: "Student Support",
      price: "₹1199/session",
      description:
        "Specialized counseling for academic stress and life transitions.",
      features: [
        "Academic stress",
        "Peer pressure",
        "Exam anxiety",
      ],
    },
  ];

  const handleLearnMore = (serviceName) => {
    toast({
      title: `Selected: ${serviceName}`,
      description: "Detailed service information is coming soon!",
      duration: 3000,
    });
  };

  return (
    <section id="services" className="py-20 bg-background">
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
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Comprehensive Care
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Find the right expert for{" "}
            <span className="text-primary">every age</span> &{" "}
            <span className="text-secondary">concern</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In-person & online options available for individuals and families.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-3xl p-8 shadow-sm transition"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary/15 rounded-2xl flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <span className="text-sm font-semibold text-primary">
                      {service.price}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-5">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleLearnMore(service.title)}
                    className="flex items-center gap-2 text-primary font-medium hover:opacity-80 transition"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-card border border-border rounded-3xl p-10 max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Need Immediate Support?
            </h3>

            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our comprehensive mental health programs are designed to meet
              your specific needs with care and confidentiality.
            </p>

            <Button>
              <Headphones className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;