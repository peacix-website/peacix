import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Filter, 
  Search, 
  Star, 
  Video, 
  MapPin, 
  Globe, 
  Award,
  Calendar,
  Heart,
  Brain,
  Users,
  Book
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { expertsApi } from "@/lib/api";
import { CardSkeleton } from "@/components/ui/Skeleton";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const ExpertsPage = () => {
  const [experts, setExperts] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: "",
    specialization: "",
    clinicianType: "",
    minExperience: "",
    sessionType: "",
    language: "",
    acceptsNewPatients: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Strategy 1: Try with JOIN first
        let clinicianData;
        let profilesMap = new Map();

        // Try fetching with JOIN
        const { data: joinedData, error: joinError } = await supabase
          .from("clinicians")
          .select(`
            *,
            profiles!inner (
              id,
              full_name,
              avatar_url,
              gender
            )
          `)
          .order("avg_rating", { ascending: false });

        if (joinError) {
          console.warn("JOIN query failed, trying separate fetch:", joinError);
          
          // Strategy 2: Fetch clinicians and profiles separately
          const { data: cliniciansOnly, error: cliniciansError } = await supabase
            .from("clinicians")
            .select("*")
            .order("avg_rating", { ascending: false });

          if (cliniciansError) throw cliniciansError;

          if (!cliniciansOnly || cliniciansOnly.length === 0) {
            console.warn("No clinicians found");
            setExperts([]);
            setSpecializations([]);
            setLoading(false);
            return;
          }

          // Fetch all profiles for these clinicians
          const profileIds = cliniciansOnly.map(c => c.profile_id);
          const { data: profilesData, error: profilesError } = await supabase
            .from("profiles")
            .select("id, full_name, avatar_url, gender")
            .in("id", profileIds);

          if (profilesError) {
            console.warn("Could not fetch profiles:", profilesError);
          } else if (profilesData) {
            profilesMap = new Map(profilesData.map(p => [p.id, p]));
          }

          clinicianData = cliniciansOnly.map(c => ({
            ...c,
            profiles: profilesMap.get(c.profile_id) || null
          }));

        } else {
          clinicianData = joinedData || [];
        }

        console.log("Fetched clinicians:", clinicianData);

        if (!clinicianData || clinicianData.length === 0) {
          console.warn("No clinicians found in database");
          setExperts([]);
          setSpecializations([]);
          setLoading(false);
          return;
        }

        // Transform data to match UI needs
        const transformedData = clinicianData.map((clinician) => ({
          ...clinician,
          name: clinician.profiles?.full_name || "Unknown Clinician",
          image: clinician.profiles?.avatar_url || "/default-avatar.png",
          specialization: clinician.specialization || clinician.clinician_type,
          experience: clinician.years_of_experience || 0,
          bio: clinician.bio || "",
          languages: clinician.languages_spoken || [],
          sessionTypes: clinician.session_types || ["video"],
          rate: clinician.session_rate_cents ? (clinician.session_rate_cents / 100).toFixed(2) : "0",
          currency: clinician.currency || "USD",
          rating: clinician.avg_rating || 0,
          reviews: clinician.total_reviews || 0,
          verified: clinician.is_verified || false,
          acceptsNewPatients: clinician.accepts_new_patients || false,
        }));

        setExperts(transformedData);

        // Extract unique specializations
        const allSpecs = clinicianData
          .flatMap((c) => c.specialization || [])
          .filter(Boolean);
        
        const uniqueSpecs = [...new Set(allSpecs)];
        console.log("Available specializations:", uniqueSpecs);
        setSpecializations(uniqueSpecs);

      } catch (error) {
        console.error("Error fetching experts:", error);
        toast({
          title: "Failed to load experts",
          description: error.message || "Please check your database connection.",
          variant: "destructive",
        });
        setExperts([]);
        setSpecializations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      specialization: "",
      clinicianType: "",
      minExperience: "",
      sessionType: "",
      language: "",
      acceptsNewPatients: false,
    });
  };

  // Filtering Logic
  const filteredExperts = useMemo(() => {
    return experts.filter((expert) => {
      const matchesSearch =
        !filters.search ||
        expert.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        expert.headline?.toLowerCase().includes(filters.search.toLowerCase()) ||
        expert.bio?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesSpecialization =
        !filters.specialization ||
        expert.specialization?.toLowerCase() === filters.specialization.toLowerCase();

      const matchesClinicianType =
        !filters.clinicianType ||
        expert.clinician_type?.toLowerCase() === filters.clinicianType.toLowerCase();

      const matchesExperience =
        !filters.minExperience ||
        expert.experience >= parseInt(filters.minExperience);

      const matchesSessionType =
        !filters.sessionType ||
        expert.sessionTypes?.includes(filters.sessionType.toLowerCase());

      const matchesLanguage =
        !filters.language ||
        expert.languages?.some((lang) =>
          lang.toLowerCase().includes(filters.language.toLowerCase())
        );

      const matchesNewPatients =
        !filters.acceptsNewPatients || expert.acceptsNewPatients;

      return (
        matchesSearch &&
        matchesSpecialization &&
        matchesClinicianType &&
        matchesExperience &&
        matchesSessionType &&
        matchesLanguage &&
        matchesNewPatients
      );
    });
  }, [experts, filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Loading our licensed experts...
          </h1>
          <p className="text-muted-foreground">
            Please wait while we fetch our directory
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
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Licensed Professionals
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-foreground">
              Find Your Perfect{" "}
              <span className="text-primary">Mental Health Expert</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Browse our verified directory of counselors, therapists, and psychiatrists 
              ready to support your journey.
            </p>
          </motion.div>

          {/* FILTERS */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium mb-1 text-foreground">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Name, specialty, or keywords..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">
                  Specialization
                </label>
                <select
                  name="specialization"
                  value={filters.specialization}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Specializations</option>
                  {specializations.map((spec, index) => (
                    <option key={index} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clinician Type */}
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">
                  Professional Type
                </label>
                <select
                  name="clinicianType"
                  value={filters.clinicianType}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Types</option>
                  <option value="therapist">Therapist</option>
                  <option value="psychiatrist">Psychiatrist</option>
                  <option value="counselor">Counselor</option>
                  <option value="psychologist">Psychologist</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">
                  Min. Experience
                </label>
                <select
                  name="minExperience"
                  value={filters.minExperience}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Any Experience</option>
                  <option value="1">1+ Years</option>
                  <option value="5">5+ Years</option>
                  <option value="10">10+ Years</option>
                  <option value="15">15+ Years</option>
                </select>
              </div>

              {/* Session Type */}
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">
                  Session Type
                </label>
                <select
                  name="sessionType"
                  value={filters.sessionType}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Types</option>
                  <option value="video">Video Call</option>
                  <option value="in-person">In-Person</option>
                  <option value="phone">Phone</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">
                  Language
                </label>
                <input
                  type="text"
                  name="language"
                  value={filters.language}
                  onChange={handleFilterChange}
                  placeholder="e.g., English, Hindi"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* New Patients Checkbox */}
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptsNewPatients"
                    checked={filters.acceptsNewPatients}
                    onChange={handleFilterChange}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-foreground">
                    Accepting New Patients
                  </span>
                </label>
              </div>

              {/* Clear Filters */}
              <div className="lg:col-span-2 flex items-end">
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredExperts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {experts.length}
            </span>{" "}
            licensed professionals
          </div>

          {/* Experts Grid */}
          {filteredExperts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperts.map((expert, index) => (
                <ExpertCard key={expert.id} expert={expert} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-2xl">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No experts found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more results.
              </p>
              <Button onClick={handleClearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

// Expert Card Component
const ExpertCard = ({ expert, index }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/expert/${expert.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden group hover:shadow-lg transition-all"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={expert.image}
          alt={expert.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {expert.verified && (
            <div className="bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
              <Award className="w-3 h-3 text-white" />
              <span className="text-xs font-medium text-white">Verified</span>
            </div>
          )}
          {expert.acceptsNewPatients && (
            <div className="bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-accent-foreground">Available</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">
            {expert.name}
          </h3>
          <p className="text-primary font-medium text-sm">
            {expert.specialization}
          </p>
        </div>

        {/* Rating */}
        {expert.rating > 0 && (
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">
              {expert.rating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({expert.reviews} reviews)
            </span>
          </div>
        )}

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {expert.bio}
        </p>

        {/* Details */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="w-4 h-4 text-primary" />
            <span>{expert.experience} years experience</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Video className="w-4 h-4 text-secondary" />
            <span>
              {expert.sessionTypes?.[0] || "Video"} sessions
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4 text-accent" />
            <span className="truncate">
              {expert.languages?.slice(0, 2).join(", ")}
            </span>
          </div>
        </div>

        {/* Rate */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">
              ${expert.rate}
            </span>
            <span className="text-sm text-muted-foreground">/session</span>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={handleViewProfile}
          className="w-full"
          size="lg"
        >
          View Profile
        </Button>
      </div>
    </motion.div>
  );
};

export default ExpertsPage;
