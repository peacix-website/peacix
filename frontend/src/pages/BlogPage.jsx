import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Finding Peace in Difficult Times",
    excerpt:
      "Learn practical steps to maintain emotional balance during stressful situations.",
    date: "March 2, 2026",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
  },
  {
    id: 2,
    title: "Understanding Anxiety and How to Manage It",
    excerpt:
      "An in-depth guide to understanding anxiety and daily coping techniques.",
    date: "February 25, 2026",
    image:
      "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f",
  },
  {
    id: 3,
    title: "The Importance of Emotional Wellness",
    excerpt:
      "Why emotional health matters and how therapy can help you grow.",
    date: "February 15, 2026",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
  },
];

const BlogPage = ({ session }) => {
  return (
    <>
      

      <main className="bg-background text-foreground">

        {/* HERO */}
        <section className="py-20 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Our Blog
          </motion.h1>

          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Insights, reflections, and expert advice to guide your mental wellness journey.
          </p>
        </section>

        {/* BLOG GRID */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground mt-3 text-sm">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>

                  <Link
                    to={`/blog/${post.id}`}
                    className="mt-6 inline-block text-primary font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default BlogPage;