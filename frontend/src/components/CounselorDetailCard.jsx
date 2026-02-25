import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const CounselorDetailCard = ({ clientName, rating, text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card p-6 rounded-3xl border border-border shadow-sm relative transition-all hover:shadow-md"
    >
      {/* Quote Icon */}
      <Quote className="absolute top-5 right-5 w-10 h-10 text-[hsl(var(--primary)/0.15)]" />

      {/* Rating */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "text-primary fill-primary"
                : "text-border"
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-muted-foreground mb-5 italic text-sm leading-relaxed">
        “{text}”
      </p>

      {/* Client Info */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[hsl(var(--secondary)/0.25)] flex items-center justify-center text-foreground text-xs font-semibold">
          {clientName.charAt(0)}
        </div>

        <span className="font-semibold text-foreground text-sm">
          {clientName}
        </span>
      </div>
    </motion.div>
  );
};

export default CounselorDetailCard;