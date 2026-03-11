import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, Award, Globe, ArrowLeft } from "lucide-react";
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
          name: data.profile?.full_name || "Expert",
          image:
            data.profile?.avatar_url ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              data.profile?.full_name || "Expert"
            )}`,
          bio: data.bio || "",
          languages: data.languages_spoken || [],
          experience: data.years_of_experience || 0,
          rating: data.avg_rating || 0,
          reviews: data.total_reviews || 0,
          rate: data.session_rate_cents || 0,
          specialization: data.specialization || data.clinician_type,
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

          {/* Image */}

          <img
            src={expert.image}
            alt={expert.name}
            className="rounded-xl w-full h-80 object-cover"
          />

          {/* Details */}

          <div className="md:col-span-2 space-y-4">

            <h1 className="text-3xl font-bold">
              {expert.name}
            </h1>

            <p className="text-primary font-medium">
              {expert.specialization}
            </p>

            {expert.rating > 0 && (
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400 fill-yellow-400"/>
                {expert.rating.toFixed(1)}
                <span className="text-muted-foreground">
                  ({expert.reviews} reviews)
                </span>
              </div>
            )}

            {/* Info Grid */}

            <div className="grid grid-cols-2 gap-4 mt-4">

              <div>
                <p className="text-sm text-muted-foreground">Experience</p>
                <p className="font-semibold">{expert.experience} years</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Languages</p>
                <p className="font-semibold">
                  {expert.languages.join(", ")}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Session Rate</p>
                <p className="font-semibold">
                  ${(expert.rate / 100).toFixed(0)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Session Duration</p>
                <p className="font-semibold">
                  {expert.session_duration_mins || 50} minutes
                </p>
              </div>

            </div>

            <p className="text-muted-foreground leading-relaxed mt-4">
              {expert.bio}
            </p>

            <Button size="lg">
              Book Appointment
            </Button>

          </div>

        </div>

      </main>

      <Footer/>

    </div>
  );
};

export default ExpertDetail;