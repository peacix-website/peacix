import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, PenTool, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import JournalSection from "@/components/journal/JournalSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const JournalPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          
          {/* Back Button & Title */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">
                Your Journal
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A safe space to express your thoughts, track your emotions, 
              and reflect on your journey.
            </p>
          </motion.div>

          {/* Journal Section */}
          <JournalSection />
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JournalPage;
