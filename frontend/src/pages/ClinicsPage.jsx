import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  Video, 
  Building, 
  Users,
  Star,
  Heart,
  Brain,
  Shield,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const ClinicsPage = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(true);

        // Fetch clinicians who offer in-person sessions (these represent clinic locations)
        const { data: clinicianData, error: clinicianError } = await supabase
          .from("clinicians")
          .select(`
            *,
            profiles (
              full_name,
              avatar_url
            )
          `)
          .contains("session_types", ["in-person"])
          .order("city", { ascending: true });

        if (clinicianError) throw clinicianError;

        // Group clinicians by city to create clinic locations
        const clinicsByCity = clinicianData?.reduce((acc, clinician) => {
          const city = clinician.city || "Unknown City";
          if (!acc[city]) {
            acc[city] = {
              id: city,
              city: city,
              country: clinician.country || "India",
              clinicians: [],
              totalClinicians: 0,
              services: new Set(),
            };
          }
          
          acc[city].clinicians.push(clinician);
          acc[city].totalClinicians += 1;
          
          if (clinician.specialization) {
            acc[city].services.add(clinician.specialization);
          }
          
          return acc;
        }, {}) || {};

        // Convert to array format
        const clinicsArray = Object.values(clinicsByCity).map(clinic => ({
          ...clinic,
          services: Array.from(clinic.services),
        }));

        console.log("Fetched clinics:", clinicsArray);
        setClinics(clinicsArray);

      } catch (error) {
        console.error("Error fetching clinics:", error);
        toast({
          title: "Failed to load clinics",
          description: error.message || "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  const handleBookClinic = (clinic) => {
    navigate("/services", { state: { selectedClinic: clinic } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Loading our clinics...
          </h1>
          <p className="text-muted-foreground">
            Please wait while we fetch our care centers
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 rounded-full">
              <Building className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                In-Person Care Centers
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-foreground">
              Our <span className="text-primary">Clinics</span> & Care Centers
            </h1>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Visit our professional care centers for face-to-face counseling sessions 
              with licensed mental health experts.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard
              icon={<MapPin className="w-6 h-6 text-primary" />}
              label="Clinic Locations"
              value={clinics.length}
            />
            <StatCard
              icon={<Users className="w-6 h-6 text-secondary" />}
              label="Expert Clinicians"
              value={clinics.reduce((sum, c) => sum + c.totalClinicians, 0)}
            />
            <StatCard
              icon={<Star className="w-6 h-6 text-accent" />}
              label="Average Rating"
              value="4.8/5"
            />
          </div>

          {/* Clinics Grid */}
          {clinics.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clinics.map((clinic, index) => (
                <ClinicCard key={clinic.id} clinic={clinic} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-2xl">
              <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No clinics available yet
              </h3>
              <p className="text-muted-foreground mb-4">
                We're expanding! Check back soon for in-person care centers in your area.
              </p>
              <Button onClick={() => navigate("/counselors")}>
                Browse Online Counselors
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-border rounded-2xl p-10 text-center"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Prefer Online Sessions?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Access the same quality care from the comfort of your home with our 
              secure video counseling platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/counselors")}>
                Find Online Counselor
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/services")}>
                Explore All Services
              </Button>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value }) => (
  <div className="bg-card border border-border rounded-xl p-6 text-center">
    <div className="flex justify-center mb-3">{icon}</div>
    <div className="text-3xl font-bold text-primary mb-1">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

// Clinic Card Component
const ClinicCard = ({ clinic, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden group hover:shadow-lg transition-all"
    >
      {/* Header Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Building className="w-20 h-20 text-primary/40" />
        </div>
        
        {/* Location Badge */}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {clinic.city}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">
            Peacix Clinic - {clinic.city}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {clinic.country}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-secondary" />
            <span>{clinic.totalClinicians} clinicians</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="w-4 h-4 text-accent" />
            <span>{clinic.services.length} specialties</span>
          </div>
        </div>

        {/* Services Offered */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Specialties Available:</p>
          <div className="flex flex-wrap gap-2">
            {clinic.services.slice(0, 4).map((service, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
              >
                {service}
              </span>
            ))}
            {clinic.services.length > 4 && (
              <span className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full">
                +{clinic.services.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Video className="w-4 h-4 text-primary" />
            <span>Video sessions available</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4 text-secondary" />
            <span>Phone consultations</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-accent" />
            <span>Flexible scheduling</span>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={() => navigate(`/counselors?city=${clinic.city}`)}
          className="w-full"
          size="lg"
        >
          View Clinicians in {clinic.city}
        </Button>
      </div>
    </motion.div>
  );
};

export default ClinicsPage;
