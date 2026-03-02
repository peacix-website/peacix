import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import CounselorsSection from "@/components/CounselorsSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import WhyChoosePeacix from "@/components/WhyChoosePeacix";
import FAQSection from "@/components/FAQSection";
import Newsletter from "@/components/Newsletter";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Peacix - Professional Mental Health & Counseling Platform</title>
        <meta
          name="description"
          content="Connect with licensed psychologists and counselors online. Professional, confidential, and accessible mental health support. Book your session today."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">

        <main>

          {/* Hero Section */}
          <HeroSection />

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HowItWorks />
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ServicesSection />
          </motion.div>

          {/* Why Choose Peacix */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <WhyChoosePeacix />
          </motion.div>

          {/* Counselors */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CounselorsSection />
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TestimonialsSection />
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PricingSection />
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FAQSection />
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Newsletter />
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactSection />
          </motion.div>

        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;