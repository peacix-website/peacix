import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <motion.h1
      className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug w-full text-foreground"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      Let’s turn your{" "}
      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        ideas
      </span>{" "}
      into reality 🌸
    </motion.h1>
  );
};

export default CallToAction;
