import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CounselorCard from "@/components/CounselorCard";
import { toast } from "@/components/ui/use-toast";
import { counselorApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";

const CounselorsSection = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const response = await counselorApi.getAllCounselors();
        setCounselors(response.data);
      } catch (error) {
        console.error("Error fetching counselors:", error);
        toast({
          title: "Error",
          description:
            "Failed to load counselors. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  const handleViewAll = () => {
    navigate("/counselors");
  };

  if (loading) {
    return (
      <section
        id="counselors"
        className="py-20 bg-gradient-to-br from-background to-[hsl(var(--secondary)/0.08)]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary)/0.15)] rounded-full mb-4">
              <span className="text-sm font-medium text-foreground">
                Licensed Professionals
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Meet our{" "}
              <span className="text-primary">
                licensed experts
              </span>{" "}
              for every concern
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Loading experienced professionals dedicated to your mental well-being...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden h-96 animate-pulse"
              >
                <div className="h-64 bg-border/40" />
                <div className="p-6 space-y-4">
                  <div className="h-5 bg-border/40 rounded" />
                  <div className="h-4 bg-border/40 rounded w-3/4" />
                  <div className="h-10 bg-border/40 rounded mt-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="counselors"
      className="py-20 bg-gradient-to-br from-background to-[hsl(var(--secondary)/0.08)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary)/0.15)] rounded-full mb-4">
            <span className="text-sm font-medium text-foreground">
              Licensed Professionals
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Meet our{" "}
            <span className="text-primary">
              licensed experts
            </span>{" "}
            for every concern
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our team of qualified professionals is ready to support you on your mental health journey
          </p>
        </motion.div>

        {/* Counselor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-14">
          {counselors.slice(0, 3).map((counselor, index) => (
            <motion.div
              key={counselor._id || counselor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CounselorCard {...counselor} />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button size="lg" onClick={handleViewAll} className="px-8">
            Find Your Expert
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CounselorsSection;