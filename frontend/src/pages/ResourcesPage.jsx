import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ResourcesPage = () => {

  const blogs = [
    {
      title: "Understanding Anxiety",
      desc: "Learn the early signs of anxiety and how to manage them."
    },
    {
      title: "Mental Health in Daily Life",
      desc: "Small daily habits that improve mental wellbeing."
    },
    {
      title: "How Therapy Helps",
      desc: "Understanding the benefits of professional counseling."
    }
  ];

  const guides = [
    {
      title: "Stress Management Guide",
      desc: "Practical strategies to handle stress effectively."
    },
    {
      title: "Building Healthy Habits",
      desc: "Create routines that support mental wellness."
    },
    {
      title: "Mindfulness Basics",
      desc: "Beginner guide to mindfulness and calmness."
    }
  ];

  const faqs = [
    {
      q: "How do online counseling sessions work?",
      a: "Sessions happen via secure video calls with professional counselors."
    },
    {
      q: "Are sessions confidential?",
      a: "Yes, all sessions are private and secure."
    },
    {
      q: "How long is each session?",
      a: "Typically between 45–60 minutes."
    }
  ];

  return (
    <div className="min-h-screen bg-background">

      

      <main className="max-w-7xl mx-auto px-6 py-20 space-y-20">

        {/* HERO */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Resources
          </h1>
          <p className="text-muted-foreground text-lg">
            Learn, grow, and explore helpful mental health knowledge.
          </p>
        </section>

        {/* BLOG PREVIEW */}
        <section>

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Blog
            </h2>

            <Link
              to="/blog"
              className="flex items-center text-primary font-medium"
            >
              View all <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {blog.title}
                </h3>

                <p className="text-muted-foreground text-sm">
                  {blog.desc}
                </p>
              </div>
            ))}

          </div>

        </section>

        {/* GUIDES PREVIEW */}
        <section>

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Guides
            </h2>

            <Link
              to="/guides"
              className="flex items-center text-primary font-medium"
            >
              View all <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {guides.map((guide, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {guide.title}
                </h3>

                <p className="text-muted-foreground text-sm">
                  {guide.desc}
                </p>
              </div>
            ))}

          </div>

        </section>

        {/* FAQ PREVIEW */}
        <section>

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              FAQs
            </h2>

            <Link
              to="/faqs"
              className="flex items-center text-primary font-medium"
            >
              View all <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="font-semibold text-foreground mb-2">
                  {faq.q}
                </h3>

                <p className="text-muted-foreground text-sm">
                  {faq.a}
                </p>
              </div>
            ))}

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
};

export default ResourcesPage;