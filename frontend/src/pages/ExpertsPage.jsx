import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { getExperts } from "@/lib/expertsApi";

const ExpertsPage = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const data = await getExperts();

        const transformed = data.map((e) => ({
          ...e,
          name: e.profile?.full_name || "Unknown",
          image:
  e.profile?.avatar_url ||
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    e.profile?.full_name || "Expert"
  )}`,
          bio: e.bio || "",
          experience: e.years_of_experience || 0,
          rating: e.avg_rating || 0,
        }));

        setExperts(transformed);
      } catch (error) {
        console.error("Error loading experts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading experts...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-center mb-12">
          Find Your Expert
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {experts.map((expert) => (
            <motion.div
              key={expert.id}
              whileHover={{ y: -5 }}
              className="border rounded-xl overflow-hidden shadow-sm"
            >
              <img
                src={expert.image}
                alt={expert.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-6 space-y-3">

                <h3 className="text-xl font-semibold">
                  {expert.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {expert.bio}
                </p>

                {expert.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                    <span>{expert.rating}</span>
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={() => navigate(`/expert/${expert.id}`)}
                >
                  View Profile
                </Button>

              </div>
            </motion.div>
          ))}

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default ExpertsPage;