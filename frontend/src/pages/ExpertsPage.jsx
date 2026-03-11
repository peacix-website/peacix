import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, Search, Award, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { getExperts } from "@/lib/expertsApi";

const ExpertsPage = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [language, setLanguage] = useState("");
  const [experience, setExperience] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const data = await getExperts();

        const transformed = data.map((e) => ({
          id: e.id,
          name: e.profile?.full_name || "Expert",
          image:
            e.profile?.avatar_url ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              e.profile?.full_name || "Expert"
            )}`,
          bio: e.bio || "",
          specialization: e.specialization || e.clinician_type,
          languages: e.languages_spoken || [],
          experience: e.years_of_experience || 0,
          rating: e.avg_rating || 0,
          reviews: e.total_reviews || 0,
          rate: e.session_rate_cents || 0,
          verified: e.is_verified || false,
          acceptsNewPatients: e.accepts_new_patients || false,
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

  /* -------- FILTERING -------- */

  const filteredExperts = useMemo(() => {
    return experts.filter((expert) => {
      const matchesSearch =
        !search ||
        expert.name.toLowerCase().includes(search.toLowerCase()) ||
        expert.bio.toLowerCase().includes(search.toLowerCase());

      const matchesSpec =
        !specialization ||
        expert.specialization?.toLowerCase().includes(specialization.toLowerCase());

      const matchesLang =
        !language ||
        expert.languages.some((l) =>
          l.toLowerCase().includes(language.toLowerCase())
        );

      const matchesExp =
        !experience || expert.experience >= Number(experience);

      return matchesSearch && matchesSpec && matchesLang && matchesExp;
    });
  }, [experts, search, specialization, language, experience]);

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

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-10">
          Find Your Expert
        </h1>

        {/* FILTER BAR */}

        <div className="grid md:grid-cols-4 gap-4 mb-10">

          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground"/>
            <input
              type="text"
              placeholder="Search name or keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Any Experience</option>
            <option value="1">1+ Years</option>
            <option value="5">5+ Years</option>
            <option value="10">10+ Years</option>
          </select>

        </div>

        {/* RESULT COUNT */}

        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredExperts.length} experts
        </p>

        {/* EXPERT GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredExperts.map((expert) => (
            <motion.div
              key={expert.id}
              whileHover={{ y: -6 }}
              className="bg-card border rounded-xl overflow-hidden shadow-sm"
            >

              {/* Image */}

              <div className="relative">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-56 object-cover"
                />

                {expert.verified && (
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full">
                    Verified
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">

                <h3 className="text-xl font-semibold">
                  {expert.name}
                </h3>

                <p className="text-primary font-medium">
                  {expert.specialization}
                </p>

                {expert.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                    <span>{expert.rating.toFixed(1)}</span>
                    <span className="text-xs text-muted-foreground">
                      ({expert.reviews})
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-primary"/>
                  {expert.experience} years experience
                </div>

                {expert.languages.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4 text-primary"/>
                    {expert.languages.slice(0,2).join(", ")}
                  </div>
                )}

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {expert.bio}
                </p>

                <div className="flex items-center justify-between pt-4 border-t">

                  <span className="font-semibold text-primary">
                    ${(expert.rate / 100).toFixed(0)} / session
                  </span>

                  <Button
                    size="sm"
                    onClick={() => navigate(`/expert/${expert.id}`)}
                  >
                    View Profile
                  </Button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </main>

      <Footer/>

    </div>
  );
};

export default ExpertsPage;