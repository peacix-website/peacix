import React from "react";
import { motion } from "framer-motion";
import { Headphones, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MeditationSection from "@/components/meditation/MeditationSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MeditationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          
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
              <Headphones className="w-10 h-10 text-accent" />
              <h1 className="text-4xl font-bold text-foreground">
                Meditation & Mindfulness
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guided meditations for stress relief, better sleep, 
              and mental clarity.
            </p>
          </motion.div>

          {/* Meditation Section */}
          <MeditationSection />
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MeditationPage;
