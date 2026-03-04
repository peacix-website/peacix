import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GuidesPage = () => {

  const guides = [
    "Stress Management Guide",
    "Mindfulness Basics",
    "Healthy Habit Building",
    "Emotional Awareness",
    "Student Mental Health Toolkit"
  ];

  return (
    <div className="min-h-screen bg-background">

      

      <main className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-4xl font-bold text-foreground mb-10">
          Guides
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {guides.map((guide, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="font-semibold text-lg">
                {guide}
              </h3>
            </div>
          ))}

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default GuidesPage;