"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";

const Gestures = () => {
  const constraintsRef = useRef(null); // UseRef for drag constraints

  return (
    <div className="fixed inset-0 flex justify-center items-center" ref={constraintsRef}>
      {/* Draggable Modal Box */}
      <motion.div
        className="w-[500px] h-[500] bg-black/80 rounded-lg p-1 left-150 shadow-2xl border border-gray-600 flex flex-col items-center justify-center relative cursor-move"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        drag
        dragConstraints={constraintsRef} // Makes the modal draggable
      >
        <h2 className="text-white text-lg mb-4">Draggable Icons</h2>

        {/* Constraint Box for Icons */}
        <motion.div className="w-full h-[200px] relative overflow-hidden border border-gray-500">
          {/* Draggable Social Icons with Gravity */}
          {[FaFacebookF, FaInstagram, FaGithub, FaYoutube].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute w-12 h-12 flex items-center justify-center rounded-full text-white shadow-lg cursor-pointer"
              style={{
                top: 10,
                left: index * 60 + 30, // Spread them out horizontally
                backgroundColor: ["#1877F2", "#E1306C", "#333", "#FF0000"][index],
              }}
              drag
              dragConstraints={{ top: -50, bottom: 150, left: -100, right: 100 }} // Icons draggable but limited
              animate={{ y: [0, 100, 50, 120, 80] }} // Simulated gravity effect
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Icon className="text-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gestures;
