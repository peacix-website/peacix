import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, Shield, Award, Zap } from "lucide-react";
import BookingForm from "@/components/BookingForm";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "support@peacix.com",
      description: "We respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8510055849",
      description: "Mon-Sat: 9AM - 9PM",
    },
    {
      icon: Clock,
      title: "Office Hours",
      value: "Mon-Sat: 9AM - 9PM",
      description: "Sunday: 10AM - 6PM",
    },
  ];

  const trustBadges = [
    { icon: Shield, text: "HIPAA Compliant" },
    { icon: Award, text: "Licensed Professionals" },
    { icon: Zap, text: "Quick Response" },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-background to-[hsl(var(--primary)/0.05)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Book Your Session
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take the first step towards better mental health. We’re here to support you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Booking Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl border border-border shadow-sm p-8"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Schedule Your Appointment
            </h3>
            <BookingForm />
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-card rounded-3xl border border-border shadow-sm p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-[hsl(var(--primary)/0.15)] rounded-xl p-3">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {info.title}
                      </p>
                      <p className="text-foreground">{info.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Section */}
            <div className="rounded-3xl p-8 text-foreground bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-border shadow-sm">
              <h3 className="text-xl font-semibold mb-6">
                Why Choose Peacix?
              </h3>

              <div className="space-y-4">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <badge.icon className="w-6 h-6 text-primary" />
                    <span className="font-medium">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Response Time Guarantee:</strong> We’ll contact you
                  within 24 hours to confirm your appointment.
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-card rounded-3xl border border-border shadow-sm p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Our Location
              </h3>

              <p className="text-muted-foreground mb-4">
                Shalimar City <br />
                Shahibabad, Ghaziabad, UP, 201005 <br />
                India
              </p>

              <div className="bg-[hsl(var(--accent)/0.15)] rounded-xl p-4 text-center">
                <p className="text-sm text-foreground">
                  Virtual sessions available nationwide
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
