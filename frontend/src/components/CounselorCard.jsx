import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Award, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CounselorCard = ({
  id,
  full_name,
  avatar_url,
  headline,
  avg_rating,
  total_reviews,
  session_rate_cents,
  currency,
  specializations,
  years_of_experience,
}) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/expert/${id}`);
  };

  const image =
    avatar_url ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      full_name || "Expert"
    )}`;

  const price =
    session_rate_cents != null
      ? `${currency || "USD"} ${(session_rate_cents / 100).toFixed(0)}`
      : "Contact";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden group h-full flex flex-col transition-all hover:shadow-md"
    >

      {/* Image */}
      <div className="relative overflow-hidden h-64 flex-shrink-0">

        <img
          src={image}
          alt={full_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Experience Badge */}
        {years_of_experience && (
          <div className="absolute top-4 right-4 bg-[hsl(var(--primary)/0.15)] backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 border border-border">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {years_of_experience}+ Years
            </span>
          </div>
        )}

      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">

        {/* Name */}
        <h3 className="text-xl font-semibold text-foreground mb-1">
          {full_name}
        </h3>

        {/* Specialization */}
        <p className="text-primary font-medium mb-3">
          {specializations || "Mental Health Professional"}
        </p>

        {/* Rating */}
        {avg_rating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">
              {avg_rating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({total_reviews} reviews)
            </span>
          </div>
        )}

        {/* Bio */}
        <p className="text-muted-foreground text-sm mb-5 line-clamp-3 flex-grow leading-relaxed">
          {headline || "Licensed mental health expert ready to support your journey."}
        </p>

        {/* Price */}
        <div className="mb-4 text-sm font-medium text-foreground">
          Session: {price}
        </div>

        {/* Button */}
        <Button
          onClick={handleViewProfile}
          size="lg"
          className="w-full mt-auto"
        >
          View Profile
        </Button>

      </div>
    </motion.div>
  );
};

export default CounselorCard;