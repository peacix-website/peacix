import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a counseling session?",
      answer:
        "You can book a session by selecting your preferred counselor, choosing a convenient time slot, and completing the booking form. You'll receive a confirmation email with session details.",
    },
    {
      question: "What types of counseling services do you offer?",
      answer:
        "We offer Online Video Counseling, Career Counseling, Relationship & Family Counseling, and Student Mental Health Support tailored to your needs.",
    },
    {
      question: "Are your counselors licensed and qualified?",
      answer:
        "Yes, all our counselors are registered professionals with valid certifications and experience in their specializations.",
    },
    {
      question: "How much does counseling cost?",
      answer:
        "Our pricing starts at ₹1199 per session. We also provide flexible packages to make mental health care accessible.",
    },
    {
      question: "Is my information confidential?",
      answer:
        "Absolutely. We follow strict privacy standards and secure communication practices to protect your information.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex px-4 py-2 rounded-full bg-primary/15 mb-4">
            <span className="text-sm font-medium text-foreground">
              Common Questions
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Get answers to{" "}
            <span className="text-primary">
              common questions
            </span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our services and support.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm transition hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left"
              >
                <h3 className="text-lg font-medium text-foreground">
                  {faq.question}
                </h3>

                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index
                      ? "rotate-180 text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-muted-foreground mb-6">
            Still have questions? We're here to help.
          </p>

          <Button size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;