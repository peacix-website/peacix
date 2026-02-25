import React from "react";
import { motion } from "framer-motion";
import { Calendar, Video, User, FileText, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: User,
      title: "Find Your Expert",
      description:
        "Use our advanced matching system to find the right therapist based on your specific needs and preferences.",
    },
    {
      number: 2,
      icon: Calendar,
      title: "Schedule Conveniently",
      description:
        "Book appointments that fit your schedule with flexible timing options including same-day availability.",
    },
    {
      number: 3,
      icon: Video,
      title: "Connect Securely",
      description:
        "Join your session from anywhere through our secure and confidential platform.",
    },
  ];

  return (
    <section className="py-20 bg-background">
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
              Simple Process
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Get started in{" "}
            <span className="text-primary">three simple steps</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process ensures you can access the support you need quickly and easily.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center bg-card border border-border rounded-3xl p-8 shadow-sm"
            >
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>

                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-sm font-semibold text-foreground">
                    {step.number}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>

              <p className="text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-secondary/15 border border-border rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <CheckCircle className="w-6 h-6 text-accent" />
              <span className="text-lg font-semibold text-foreground">
                No waiting lists — same day appointments available
              </span>
            </div>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              We prioritize your immediate needs with flexible scheduling and quick access to care.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;