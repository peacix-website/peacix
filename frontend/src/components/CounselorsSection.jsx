import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CounselorCard from "@/components/CounselorCard";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const CounselorsSection = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounselors = async () => {
      const { data, error } = await supabase
        .from("clinician_directory")
        .select("*")
        .order("avg_rating", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Error fetching counselors:", error);
        toast({
          title: "Error",
          description: "Failed to load counselors.",
          variant: "destructive",
        });
      } else {
        setCounselors(data);
      }

      setLoading(false);
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
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Loading our licensed experts...
            </h2>
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
            Meet our <span className="text-primary">licensed experts</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our verified professionals are ready to support your journey.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-14">
          {counselors.slice(0, 3).map((counselor, index) => (
            <motion.div
              key={counselor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CounselorCard
                id={counselor.id}
                full_name={counselor.full_name}
                avatar_url={counselor.avatar_url}
                headline={counselor.headline}
                avg_rating={counselor.avg_rating}
                total_reviews={counselor.total_reviews}
                session_rate_cents={counselor.session_rate_cents}
                currency={counselor.currency}
                specializations={counselor.specializations}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
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