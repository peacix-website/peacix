import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CounselorCard from "@/components/CounselorCard";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { getFeaturedExperts } from "@/lib/expertsApi";

const CounselorsSection = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const data = await getFeaturedExperts(3);

        const transformed = data.map((c) => ({
          id: c.id,
          full_name: c.profile?.full_name || "Expert",
          avatar_url:
            c.profile?.avatar_url ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              c.profile?.full_name || "Expert"
            )}`,
          headline: c.headline || c.bio || "Licensed Mental Health Professional",
          avg_rating: c.avg_rating || 0,
          total_reviews: c.total_reviews || 0,
          session_rate_cents: c.session_rate_cents || 0,
          currency: c.currency || "USD",
          specializations: c.specialization || c.clinician_type,
        }));

        setCounselors(transformed);
      } catch (error) {
        console.error("Error fetching counselors:", error);

        toast({
          title: "Error",
          description: "Failed to load counselors.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  const handleViewAll = () => {
    navigate("/experts");
  };

  if (loading) {
    return (
      <section
        id="counselors"
        className="py-20 bg-gradient-to-br from-background to-[hsl(var(--secondary)/0.08)]"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            Loading our licensed experts...
          </h2>
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

        {/* Counselors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-14">

          {counselors.map((counselor, index) => (
            <motion.div
              key={counselor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CounselorCard {...counselor} />
            </motion.div>
          ))}

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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