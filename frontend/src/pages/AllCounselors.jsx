import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CounselorCard from "@/components/CounselorCard";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";

const AllCounselorsPage = () => {
  const [counselors, setCounselors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    specialty: "",
    minExperience: "",
    search: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clinicians
        const { data: clinicianData, error: clinicianError } =
          await supabase
            .from("clinician_directory")
            .select("*")
            .order("avg_rating", { ascending: false });

        if (clinicianError) throw clinicianError;

        setCounselors(clinicianData || []);

        // Fetch specialties
        const { data: specialtyData, error: specialtyError } =
          await supabase
            .from("specializations")
            .select("name")
            .order("name");

        if (specialtyError) throw specialtyError;

        setSpecialties(specialtyData.map((s) => s.name));
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to load counselors.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      specialty: "",
      minExperience: "",
      search: "",
    });
  };

  // 🔥 Real Filtering Logic
  const filteredCounselors = useMemo(() => {
    return counselors.filter((c) => {
      const matchesSpecialty =
        !filters.specialty ||
        c.specializations?.includes(filters.specialty);

      const matchesExperience =
        !filters.minExperience ||
        c.years_of_experience >= parseInt(filters.minExperience);

      const matchesSearch =
        !filters.search ||
        c.full_name
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        c.headline
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        c.specializations?.some((spec) =>
          spec.toLowerCase().includes(filters.search.toLowerCase())
        );

      return matchesSpecialty && matchesExperience && matchesSearch;
    });
  }, [counselors, filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Loading our experts...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="pb-16">
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-semibold mb-4">
              Meet Our Licensed Experts
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Verified professionals ready to support your journey.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 mb-12">
            <div className="grid md:grid-cols-4 gap-4">

              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Search
                </label>
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by name, specialization..."
                  className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Specialty
                </label>
                <select
                  name="specialty"
                  value={filters.specialty}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Min. Experience
                </label>
                <select
                  name="minExperience"
                  value={filters.minExperience}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Any Experience</option>
                  <option value="1">1+ Years</option>
                  <option value="5">5+ Years</option>
                  <option value="10">10+ Years</option>
                  <option value="15">15+ Years</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>

            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8 text-center text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredCounselors.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {counselors.length}
            </span>{" "}
            experts
          </div>

          {/* Grid */}
          {filteredCounselors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCounselors.map((counselor, index) => (
                <motion.div
                  key={counselor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CounselorCard {...counselor} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">
                No experts found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters.
              </p>
              <Button onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllCounselorsPage;