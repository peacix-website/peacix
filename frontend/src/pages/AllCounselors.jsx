import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CounselorCard from "@/components/CounselorCard";
import { toast } from "@/components/ui/use-toast";
import { counselorApi } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AllCounselorsPage = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialties, setSpecialties] = useState([]);
  const [filters, setFilters] = useState({
    specialty: "",
    minExperience: "",
    search: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const counselorsResponse = await counselorApi.getAllCounselors();
        setCounselors(counselorsResponse.data);

        const specialtiesResponse = await counselorApi.getSpecialties();
        setSpecialties(specialtiesResponse.data);
      } catch (error) {
        toast({
          title: "Error",
          description:
            "Failed to load counselors and specialties. Please try again later.",
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

  const filteredCounselors = counselors.filter((counselor) => {
    const matchesSpecialty =
      !filters.specialty ||
      counselor.specialization
        .toLowerCase()
        .includes(filters.specialty.toLowerCase());

    const matchesMinExp =
      !filters.minExperience ||
      counselor.experience >= parseInt(filters.minExperience);

    const matchesSearch =
      !filters.search ||
      counselor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      counselor.specialization
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      counselor.expertise?.some((exp) =>
        exp.toLowerCase().includes(filters.search.toLowerCase())
      );

    return matchesSpecialty && matchesMinExp && matchesSearch;
  });

  const handleClearFilters = () => {
    setFilters({
      specialty: "",
      minExperience: "",
      search: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Our Counselors
            </h1>
            <p className="text-muted-foreground">
              Loading experienced professionals...
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="bg-card rounded-xl shadow-md border p-6 animate-pulse"
              >
                <div className="h-40 bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pb-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">
              Meet Our Licensed Psychologists
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to your mental well-being
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border rounded-xl shadow-sm p-6 mb-12"
          >
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Search
                </label>
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by name, specialty..."
                  className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

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
          </motion.div>

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
            counselors
          </div>

          {/* Counselor Grid */}
          {filteredCounselors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCounselors.map((counselor, index) => (
                <motion.div
                  key={counselor._id || counselor.id}
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
                No counselors found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters.
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

export default AllCounselorsPage;