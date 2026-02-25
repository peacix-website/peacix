import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Users,
  Heart,
  Shield,
  Award,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUsPage = () => {
  const stats = [
    { number: "500+", label: "Clients Helped", icon: Users },
    { number: "95%", label: "Satisfaction Rate", icon: Heart },
    { number: "15+", label: "Years Combined Experience", icon: Award },
    { number: "24/7", label: "Support Available", icon: Shield },
  ];

  const values = [
    {
      title: "Compassionate Care",
      description:
        "We provide empathetic support tailored to each individual's unique needs and circumstances.",
      icon: Heart,
    },
    {
      title: "Professional Excellence",
      description:
        "Our team maintains the highest standards of professional practice and continuous learning.",
      icon: Award,
    },
    {
      title: "Confidential Support",
      description:
        "Your privacy and confidentiality are our absolute priorities in every interaction.",
      icon: Shield,
    },
    {
      title: "Evidence-Based Approach",
      description:
        "All our services are grounded in proven therapeutic techniques and research.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pb-20">
        {/* HERO */}
        <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Peacix
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-primary-foreground/90">
                Empowering minds, healing hearts, transforming lives through
                professional mental health support.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To provide accessible, affordable, and professional mental
                health support to individuals and families, helping them
                navigate life's challenges and achieve emotional well-being.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe everyone deserves quality mental health care,
                regardless of background or circumstances.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To create a world where mental health is prioritized,
                understood, and accessible to all.
              </p>
              <p className="text-lg text-muted-foreground">
                We envision a future where mental wellness is integrated into
                everyday life and seeking help is stigma-free.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-xl shadow-md p-6 text-center border"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT STATS */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-lg text-muted-foreground">
                Numbers that represent our commitment.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRIVACY SECTION */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Our Privacy Commitment
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-6">
                Your confidentiality is the cornerstone of our practice.
              </p>

              <ul className="space-y-3">
                {[
                  "All sessions are completely confidential",
                  "End-to-end encryption for communication",
                  "Strict data protection standards",
                  "No sharing without explicit consent",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Shield className="w-10 h-10 text-accent mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">
                    RCI Registered
                  </h3>
                  <p className="text-primary-foreground/80">
                    Rehabilitation Council of India
                  </p>
                </div>
              </div>
              <p className="text-primary-foreground/90">
                All counselors maintain the highest ethical and professional
                standards of mental health practice.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;