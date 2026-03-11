import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { getExpertById } from "@/lib/expertsApi";

const ExpertDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchExpert = async () => {

      try {

        const data = await getExpertById(id);

        const transformed = {
          ...data,
          name: data.profile?.full_name || "Unknown",
          image:
  data.profile?.avatar_url ||
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    data.profile?.full_name || "Expert"
  )}`,
          bio: data.bio || data.profile?.bio || "",
          rating: data.avg_rating || 0,
          experience: data.years_of_experience || 0,
          languages: data.languages_spoken || [],
        };

        setExpert(transformed);

      } catch (error) {

        console.error("Failed loading expert", error);

      } finally {

        setLoading(false);

      }

    };

    fetchExpert();

  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading expert...
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Expert not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-6xl mx-auto px-6 py-12">

        <Button
          variant="ghost"
          onClick={() => navigate("/experts")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4"/>
          Back
        </Button>

        <div className="grid md:grid-cols-3 gap-10">

          <img
            src={expert.image}
            alt={expert.name}
            className="rounded-xl w-full h-80 object-cover"
          />

          <div className="md:col-span-2 space-y-4">

            <h1 className="text-3xl font-bold">
              {expert.name}
            </h1>

            <p className="text-muted-foreground">
              {expert.bio}
            </p>

            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400"/>
              {expert.rating}
            </div>

            <p>
              Experience: {expert.experience} years
            </p>

            <p>
              Languages: {expert.languages.join(", ")}
            </p>

            <Button size="lg">
              Book Appointment
            </Button>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default ExpertDetail;