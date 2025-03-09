"use client";
import { motion } from "framer-motion";
import React from "react";

// Base animation
const glitchVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Subtle glitch effect
const slowGlitch = {
  x: [-1, 1, -1.5, 1.5, 0], // Smaller movements
  skewX: [0, 2, -2, 1, -1, 0], // Less distortion
  clipPath: [
    "inset(0 0 0 0)",
    "inset(15% 0 85% 0)",
    "inset(40% 0 60% 0)",
    "inset(70% 0 30% 0)",
    "inset(90% 0 10% 0)",
    "inset(0 0 0 0)",
  ],
  transition: { duration: 0.5, repeat: 3, repeatType: "mirror" as "mirror" }, // Slower & limited repeat
};

const GlitchText = () => {
  return (
    <div className="relative text-white text-6xl font-extrabold tracking-wide z-30">
      {/* Red Shadow */}
      <motion.div
        className="absolute text-red-500"
        variants={glitchVariants}
        initial="hidden"
        animate="visible"
        whileHover={slowGlitch} // Only glitches on hover
      >
        V1NC3
      </motion.div>

      {/* Blue Shadow */}
      <motion.div
        className="absolute text-blue-500"
        variants={glitchVariants}
        initial="hidden"
        animate="visible"
        whileHover={slowGlitch}
        style={{ left: "1px", top: "1px" }} // Subtle offset
      >
        V1NC3
      </motion.div>

      {/* Green Shadow */}
      <motion.div
        className="absolute text-green-500"
        variants={glitchVariants}
        initial="hidden"
        animate="visible"
        whileHover={slowGlitch}
        style={{ left: "-1px", top: "-1px" }} // Subtle offset
      >
        V1NC3
      </motion.div>

      {/* Main White Text */}
      <motion.div
        className="relative text-white"
        variants={glitchVariants}
        initial="hidden"
        animate="visible"
        whileHover={slowGlitch}
      >
        V1NC3
      </motion.div>
    </div>
  );
};

export default GlitchText;
