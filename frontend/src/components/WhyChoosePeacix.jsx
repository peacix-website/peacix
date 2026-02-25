import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Users, Award, Heart, Clock } from "lucide-react";

const WhyChoosePeacix = () => {
  const features = [
    {
      icon: Shield,
      title: "Licensed Professionals",
      description:
        "All our counselors are RCI registered and licensed to practice",
    },
    {
      icon: Users,
      title: "Personalized Approach",
      description:
        "Tailored counseling sessions based on your unique needs and goals",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description:
        "Book sessions at your convenience with 24/7 availability",
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description:
        "Empathetic support in a safe, non-judgmental environment",
    },
    {
      icon: Award,
      title: "Proven Results",
      description:
        "Evidence-based therapies with track record of positive outcomes",
    },
    {
      icon: CheckCircle,
      title: "Confidential & Secure",
      description:
        "Your privacy is our priority with end-to-end encryption",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-muted via-secondary-muted to-accent-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">
              Our Approach
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why <span className="text-primary">thousands</span> trust us for
            their mental health
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with our professional, compassionate, and
            results-driven approach to mental health support
          </p>
        </motion.div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>

              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* COMMITMENT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-card rounded-2xl shadow-lg p-8 md:p-12 border"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Our Commitment to You
              </h3>

              <p className="text-muted-foreground mb-6">
                At Peacix, we're committed to making mental health support
                accessible, affordable, and effective for everyone.
                Our holistic approach combines professional expertise with
                compassionate care to help you achieve lasting wellness.
              </p>

              <ul className="space-y-3">
                {[
                  "Personalized treatment plans",
                  "Ongoing support and resources",
                  "Transparent pricing with no hidden fees",
                  "Continuous professional development",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-primary-foreground">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">95%</div>
                <div className="text-xl mb-4">
                  Client Satisfaction Rate
                </div>
                <div className="text-primary-foreground/80">
                  Based on feedback from our community of clients who have
                  experienced positive outcomes through our services.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoosePeacix;