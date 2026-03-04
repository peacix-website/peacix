import React, { useState, useEffect } from "react";
import {
  Users,
  Video,
  CheckCircle,
  ArrowRight,
  Heart,
  Brain,
  FileText,
  Book,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data: clinicians, error } = await supabase
          .from("clinicians")
          .select(
            "clinician_type, specialization, session_types, session_rate_cents, currency"
          )
          .order("session_rate_cents", { ascending: true });

        if (error) throw error;

        const serviceList = [
          {
            title: "Online Video Counseling",
            description:
              "One-on-one professional counseling sessions conducted via secure video calls",
            whoFor:
              "Individuals seeking convenient mental health support from home",
            duration: "45 minutes per session",
            price: calculatePrice(clinicians, "therapist"),
            features: [
              "Secure video platform",
              "Professional counselors",
              "Flexible scheduling",
              "Session recordings available",
              "Progress tracking",
            ],
            icon: Video,
            serviceId: "therapy",
          },
          {
            title: "Career Counseling",
            description:
              "Professional guidance for career development and workplace challenges",
            whoFor:
              "Professionals, students, and job seekers navigating career decisions",
            duration: "60 minutes per session",
            price: calculatePrice(clinicians, "career"),
            features: [
              "Career assessment tools",
              "Resume preparation",
              "Professional development planning",
              "Workplace stress management",
              "Leadership coaching",
            ],
            icon: Users,
            serviceId: "career",
          },
          {
            title: "Relationship & Family Counseling",
            description:
              "Support for couples and families facing relationship challenges",
            whoFor:
              "Couples, families, and individuals dealing with relationship issues",
            duration: "50-90 minutes",
            price: calculatePrice(clinicians, "couples"),
            features: [
              "Couples therapy",
              "Family counseling",
              "Communication enhancement",
              "Conflict resolution",
              "Relationship rebuilding",
            ],
            icon: Heart,
            serviceId: "couples",
          },
          {
            title: "Student Mental Health Support",
            description:
              "Specialized counseling addressing student mental health concerns",
            whoFor:
              "Students dealing with academic stress and personal challenges",
            duration: "45 minutes",
            price: calculatePrice(clinicians, "child"),
            features: [
              "Academic stress management",
              "Exam anxiety support",
              "Peer relationship guidance",
              "Study skills development",
              "Parent coordination",
            ],
            icon: Book,
            serviceId: "student",
          },
          {
            title: "Psychiatric Care",
            description:
              "Medical evaluation and medication management by psychiatrists",
            whoFor:
              "Individuals requiring medication management or assessment",
            duration: "60 min initial, 30 min follow-up",
            price: calculatePrice(clinicians, "psychiatrist"),
            features: [
              "Medication evaluation",
              "Medication management",
              "Medical assessment",
              "Side effect monitoring",
              "Integrated care",
            ],
            icon: Brain,
            serviceId: "psychiatry",
          },
          {
            title: "Psychological Assessments",
            description:
              "Comprehensive evaluations for diagnosis and treatment planning",
            whoFor: "Individuals seeking clarity on mental health conditions",
            duration: "2-3 hours",
            price: "₹2999-₹4999",
            features: [
              "Diagnostic assessments",
              "Personality testing",
              "ADHD evaluations",
              "Career aptitude tests",
              "Detailed reports",
            ],
            icon: FileText,
            serviceId: "assessment",
          },
        ];

        setServices(serviceList);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast({
          title: "Failed to load services",
          description: error.message || "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const calculatePrice = (clinicians, type) => {
    const filtered = clinicians?.filter(
      (c) =>
        c.clinician_type?.toLowerCase().includes(type) ||
        c.specialization?.toLowerCase().includes(type)
    );

    if (!filtered || filtered.length === 0) return "₹999/session";

    const prices = filtered
      .map((c) => c.session_rate_cents || 0)
      .sort((a, b) => a - b);

    const min = (prices[0] / 100).toFixed(0);
    const max = (prices[prices.length - 1] / 100).toFixed(0);

    return `₹${min}-₹${max}/session`;
  };

  const handleBookService = (serviceId) => {
    navigate(`/counselors?service=${serviceId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Loading our services...
          </h1>
          <p className="text-muted-foreground">
            Please wait while we fetch our offerings
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Professional mental health support tailored to your needs
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-muted/40">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="md:flex">
                  {/* Left */}
                  <div className="md:w-1/3 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8">
                    <service.icon className="w-10 h-10 mb-6" />

                    <h3 className="text-2xl font-bold mb-3">
                      {service.title}
                    </h3>

                    <p className="opacity-90 mb-6">{service.description}</p>

                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex justify-between">
                        <span>Duration</span>
                        <span className="font-semibold">
                          {service.duration}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>Price</span>
                        <span className="font-bold">{service.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="md:w-2/3 p-8">
                    <h4 className="font-semibold text-foreground mb-2">
                      Who It's For
                    </h4>

                    <p className="text-muted-foreground mb-6">
                      {service.whoFor}
                    </p>

                    <h4 className="font-semibold text-foreground mb-2">
                      Features
                    </h4>

                    <ul className="space-y-2 mb-8">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleBookService(service.serviceId)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Book Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;