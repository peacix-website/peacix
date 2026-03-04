import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Star, 
  Award, 
  Video, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ArrowLeft,
  Heart,
  Brain,
  Users,
  Book,
  Shield,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";

const ExpertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        setLoading(true);

        // Fetch clinician with profile data
        const { data, error } = await supabase
          .from("clinicians")
          .select(`
            *,
            profiles!inner (
              id,
              full_name,
              avatar_url,
              gender,
              bio,
              phone
            )
          `)
          .eq("id", id)
          .single();

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        if (!data) {
          toast({
            title: "Not Found",
            description: "Expert not found",
            variant: "destructive",
          });
          navigate("/experts");
          return;
        }

        // Transform data for display
        const transformedData = {
          ...data,
          name: data.profiles?.full_name || "Unknown",
          image: data.profiles?.avatar_url || "/default-avatar.png",
          bio: data.bio || data.profiles?.bio || "",
          phone: data.profiles?.phone,
          specialization: data.specialization || data.clinician_type,
          experience: data.years_of_experience || 0,
          languages: data.languages_spoken || [],
          sessionTypes: data.session_types || ["video"],
          rate: data.session_rate_cents ? (data.session_rate_cents / 100).toFixed(2) : "0",
          currency: data.currency || "USD",
          rating: data.avg_rating || 0,
          reviews: data.total_reviews || 0,
          verified: data.is_verified || false,
          acceptsNewPatients: data.accepts_new_patients || false,
          education: data.education || [],
          certifications: data.certifications || [],
          expertise: data.expertise_tags || [],
          availability: data.availability,
          city: data.city,
          country: data.country,
          headline: data.headline,
        };

        console.log("Fetched expert:", transformedData);
        setExpert(transformedData);

      } catch (error) {
        console.error("Error fetching expert:", error);
        toast({
          title: "Failed to load expert",
          description: error.message || "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [id, navigate]);

  const handleBookAppointment = () => {
    navigate(`/booking/${expert.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="h-96 bg-muted rounded"></div>
              <div className="md:col-span-2 space-y-4">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-24 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Expert Not Found
          </h1>
          <Button onClick={() => navigate("/experts")}>
            Back to Experts
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      
      <main className="pb-20">
        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/experts")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experts
          </Button>

          {/* Top Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            
            {/* Left Column - Image & Quick Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-80 object-cover"
                />
                
                <div className="p-6 space-y-4">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {expert.verified && (
                      <span className="px-3 py-1 bg-primary/15 text-primary text-sm rounded-full flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                    {expert.acceptsNewPatients && (
                      <span className="px-3 py-1 bg-accent/15 text-accent-foreground text-sm rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Available
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {expert.rating > 0 && (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-foreground">
                        {expert.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({expert.reviews} reviews)
                      </span>
                    </div>
                  )}

                  {/* Experience */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="w-4 h-4 text-primary" />
                    <span>{expert.experience} years experience</span>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 text-secondary" />
                    <span>{expert.languages.join(", ")}</span>
                  </div>

                  {/* Session Types */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Video className="w-4 h-4 text-accent" />
                    <span className="capitalize">{expert.sessionTypes.join(", ")}</span>
                  </div>
                </div>
              </motion.div>

              {/* Book Button */}
              <Button
                onClick={handleBookAppointment}
                className="w-full"
                size="lg"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {expert.name}
                </h1>
                {expert.headline && (
                  <p className="text-md text-muted-foreground mb-2">
                    {expert.headline}
                  </p>
                )}
                <p className="text-lg text-primary font-medium mb-4">
                  {expert.specialization}
                </p>
                <p className="text-2xl font-bold text-primary mb-4">
                  ${expert.rate} <span className="text-sm text-muted-foreground font-normal">/session</span>
                </p>
              </motion.div>

              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="border-b border-border"
              >
                <div className="flex gap-6">
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`pb-3 text-sm font-medium transition ${
                      activeTab === 'about'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab('expertise')}
                    className={`pb-3 text-sm font-medium transition ${
                      activeTab === 'expertise'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Expertise
                  </button>
                  <button
                    onClick={() => setActiveTab('education')}
                    className={`pb-3 text-sm font-medium transition ${
                      activeTab === 'education'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Education & Certifications
                  </button>
                </div>
              </motion.div>

              {/* Tab Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="prose max-w-none"
              >
                {activeTab === 'about' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      About Me
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {expert.bio || "No bio available."}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 pt-4">
                      <InfoCard
                        icon={<Shield className="w-5 h-5 text-primary" />}
                        label="Confidentiality"
                        value="100% Secure Sessions"
                      />
                      <InfoCard
                        icon={<Clock className="w-5 h-5 text-secondary" />}
                        label="Session Duration"
                        value={`${expert.session_duration_mins || 50} minutes`}
                      />
                      <InfoCard
                        icon={<Video className="w-5 h-5 text-accent" />}
                        label="Session Format"
                        value={expert.sessionTypes[0]?.toUpperCase() || "VIDEO"}
                      />
                      <InfoCard
                        icon={<MapPin className="w-5 h-5 text-primary" />}
                        label="Location"
                        value={`${expert.city || "Online"}, ${expert.country || "India"}`}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'expertise' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      Areas of Expertise
                    </h3>
                    {expert.expertise && expert.expertise.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-3">
                        {expert.expertise.map((exp, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg"
                          >
                            <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{exp}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No expertise areas listed.</p>
                    )}
                  </div>
                )}

                {activeTab === 'education' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Education
                      </h3>
                      {expert.education && expert.education.length > 0 ? (
                        <div className="space-y-2">
                          {expert.education.map((edu, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg"
                            >
                              <Book className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{edu}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No education details provided.</p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Certifications
                      </h3>
                      {expert.certifications && expert.certifications.length > 0 ? (
                        <div className="space-y-2">
                          {expert.certifications.map((cert, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg"
                            >
                              <Award className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{cert}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No certifications listed.</p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

// Info Card Component
const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  </div>
);

export default ExpertDetail;
