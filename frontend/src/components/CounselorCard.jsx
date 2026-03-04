import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CounselorCard = ({
  _id,
  id,
  image,
  name,
  specialization,
  experience,
  bio,
}) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    const counselorId = _id || id;
    navigate(`/expert/${counselorId}`);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden group h-full flex flex-col transition-all hover:shadow-md"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden h-64 flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Experience Badge */}
        <div className="absolute top-4 right-4 bg-[hsl(var(--primary)/0.15)] backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 border border-border">
          <Award className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {experience} Years
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {name}
        </h3>

        <p className="text-primary font-medium mb-3">
          {specialization}
        </p>

        <p className="text-muted-foreground text-sm mb-5 line-clamp-3 flex-grow leading-relaxed">
          {bio}
        </p>

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
