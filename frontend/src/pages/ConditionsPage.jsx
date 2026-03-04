import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Heart, Users, Book, Shield, Sun } from "lucide-react";
import Footer from "@/components/Footer";

const ConditionsPage = () => {
  const conditions = [
    {
      icon: Brain,
      title: "Anxiety Disorders",
      description: "Excessive worry, fear, or nervousness that interferes with daily life.",
      symptoms: [
        "Persistent worrying",
        "Restlessness",
        "Difficulty concentrating",
        "Sleep disturbances"
      ],
      link: "/conditions/anxiety"
    },
    {
      icon: Heart,
      title: "Depression",
      description: "Persistent feelings of sadness, hopelessness, and loss of interest.",
      symptoms: [
        "Low mood",
        "Loss of interest",
        "Fatigue",
        "Changes in appetite"
      ],
      link: "/conditions/depression"
    },
    {
      icon: Users,
      title: "Relationship Issues",
      description: "Challenges in communication, trust, or connection with others.",
      symptoms: [
        "Communication breakdown",
        "Trust issues",
        "Frequent conflicts",
        "Emotional distance"
      ],
      link: "/conditions/relationships"
    },
    {
      icon: Shield,
      title: "Trauma & PTSD",
      description: "Emotional and psychological response to traumatic events.",
      symptoms: [
        "Flashbacks",
        "Avoidance behaviors",
        "Hypervigilance",
        "Emotional numbness"
      ],
      link: "/conditions/trauma"
    },
    {
      icon: Book,
      title: "Stress Management",
      description: "Difficulty coping with life pressures and daily stressors.",
      symptoms: [
        "Overwhelming feelings",
        "Physical tension",
        "Irritability",
        "Burnout"
      ],
      link: "/conditions/stress"
    },
    {
      icon: Sun,
      title: "Self-Esteem Issues",
      description: "Negative self-perception and lack of confidence.",
      symptoms: [
        "Self-doubt",
        "Negative self-talk",
        "Perfectionism",
        "Social anxiety"
      ],
      link: "/conditions/self-esteem"
    }
  ];

  const supportApproaches = [
    {
      title: "Cognitive Behavioral Therapy (CBT)",
      description: "Evidence-based approach to identify and change negative thought patterns.",
      icon: Brain
    },
    {
      title: "Person-Centered Therapy",
      description: "Compassionate, non-judgmental support tailored to your unique needs.",
      icon: Heart
    },
    {
      title: "Solution-Focused Therapy",
      description: "Goal-oriented approach to develop practical solutions.",
      icon: Shield
    },
    {
      title: "Mindfulness-Based Therapy",
      description: "Techniques to stay present and manage overwhelming emotions.",
      icon: Sun
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-20 space-y-20">

        {/* HERO */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Mental Health Conditions
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Understanding common mental health challenges and how professional support can help.
          </p>
        </section>

        {/* CONDITIONS GRID */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/15 rounded-lg flex items-center justify-center mb-4">
                  <condition.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {condition.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4">
                  {condition.description}
                </p>

                <div className="space-y-2 mb-4">
                  <p className="text-xs font-medium text-foreground">Common Symptoms:</p>
                  <ul className="space-y-1">
                    {condition.symptoms.map((symptom, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 bg-accent rounded-full mt-1 flex-shrink-0"></span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={condition.link}
                  className="flex items-center text-primary font-medium text-sm hover:opacity-80 transition"
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* SUPPORT APPROACHES */}
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-10 border border-border">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              Therapeutic Approaches We Use
            </h2>
            <p className="text-muted-foreground">
              Evidence-based methods tailored to your specific condition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportApproaches.map((approach, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <div className="w-14 h-14 bg-secondary/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <approach.icon className="w-7 h-7 text-secondary" />
                </div>

                <h3 className="font-semibold text-foreground mb-2">
                  {approach.title}
                </h3>

                <p className="text-muted-foreground text-sm">
                  {approach.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-card border border-border rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Need Professional Support?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our licensed counselors specialize in treating these conditions with personalized, 
            evidence-based approaches. You don't have to face this alone.
          </p>
          <Link
            to="/counselors"
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition"
          >
            Find a Counselor
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ConditionsPage;
