import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { Calendar } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Finding Peace in Difficult Times",
    content: `
      Life can sometimes feel overwhelming. But finding peace starts
      from within. Take small steps daily — breathing exercises,
      mindful reflection, and gratitude journaling can transform your
      emotional state.
      
      Remember: difficult times are temporary, but inner strength lasts.
    `,
    date: "March 2, 2026",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
  },
  {
    id: 2,
    title: "Understanding Anxiety and How to Manage It",
    content: `
      Anxiety is a natural human response. But when unmanaged, it can
      interfere with daily life. Learning grounding techniques and
      speaking to a counselor can significantly help.
      
      You are not alone in this journey.
    `,
    date: "February 25, 2026",
    image:
      "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f",
  },
  {
    id: 3,
    title: "The Importance of Emotional Wellness",
    content: `
      Emotional wellness impacts relationships, productivity, and
      self-esteem. Therapy, self-awareness, and emotional literacy
      are powerful tools for growth.
      
      Investing in your mental health is investing in your future.
    `,
    date: "February 15, 2026",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogPosts.find((post) => post.id === Number(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Blog not found.
      </div>
    );
  }

  return (
    <>
      <main className="bg-background text-foreground min-h-screen">

        {/* HERO IMAGE */}
        <div className="w-full h-[350px] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto px-6 py-16">

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            {blog.title}
          </motion.h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Calendar className="w-4 h-4" />
            {blog.date}
          </div>

          <p className="leading-8 text-lg text-muted-foreground whitespace-pre-line">
            {blog.content}
          </p>

          <Link
            to="/blog"
            className="inline-block mt-10 text-primary font-medium hover:underline"
          >
            ← Back to Blog
          </Link>

        </div>

      </main>

      <Footer />
    </>
  );
};

export default BlogDetail;