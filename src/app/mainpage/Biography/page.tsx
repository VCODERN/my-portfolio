"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin, FaArrowLeft } from "react-icons/fa";

const timelineData = [
  { year: "2025", title: "Built a Custom Cybersecurity Toolkit", description: "Designed tools to enhance personal and business security.", side: "left" },
  { year: "2024", title: "Created Automated Vertical Farm", description: "Developed an automated farming system for urban environments.", side: "right" },
  { year: "2023", title: "Started Learning Cybersecurity", description: "Began studying online security and ethical hacking.", side: "left" },
];

const AnimatedCircle = () => (
  <motion.circle
    cx="100"
    cy="100"
    r="50"
    fill="rgba(0, 191, 255, 0.3)"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />
);

const AnimatedRectangle = () => (
  <motion.rect
    x="200" y="300" width="150" height="100"
    fill="rgba(255, 99, 71, 0.3)"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  />
);

const AnimatedPolygon = () => (
  <motion.polygon
    points="500,50 550,100 500,150 450,100"
    fill="rgba(144, 238, 144, 0.3)"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
  />
);

const SocialLinks = () => (
  <div className="mt-4 flex space-x-4">
    {[FaGithub, FaTwitter, FaLinkedin].map((Icon, index) => (
      <motion.a
        key={index}
        href="#"
        className="text-gray-300 text-2xl"
        whileHover={{ scale: 1.2, color: "#00bcd4" }}
      >
        <Icon />
      </motion.a>
    ))}
  </div>
);

const TimelineItem = ({ year, title, description, side }: any) => (
  <motion.div
    className={`relative w-full flex ${side === "left" ? "justify-start" : "justify-end"} mb-10`}
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0, 191, 255, 0.6)" }}
    transition={{ duration: 0.3 }}
    data-aos="fade-up"
  >
    <div className={`w-1/2 p-4 ${side === "left" ? "text-right pr-8" : "text-left pl-8"}`}>
      <h3 className="text-lg font-semibold text-gray-200">{year} - {title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
    <motion.div
      className="absolute w-5 h-5 bg-blue-400 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-gray-900"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.3, backgroundColor: "#00bcd4" }}
      transition={{ duration: 0.3 }}
    ></motion.div>
  </motion.div>
);

const Biography: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center p-6 overflow-hidden bg-gradient-to-b from-[#0a0f1a] to-[#000000]"
      initial="hidden"
      animate="visible"
    >
      {/* Animated Background with Shapes */}
      <motion.svg
        className="absolute inset-0 z-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <AnimatedCircle />
        <AnimatedRectangle />
        <AnimatedPolygon />
      </motion.svg>

      {/* Go Back Button (Top Left) */}
      <motion.div
        className="absolute top-4 left-4 p-3 bg-gray-600 hover:bg-gray-500 rounded-full text-white"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        style={{
          transition: "background 0.6s ease-in-out, transform 0.3s ease-in-out",
        }}
        onClick={() => window.location.href = "http://localhost:3000/mainpage"} // Go back to the main page
      >
        <FaArrowLeft size={24} /> {/* Back arrow icon */}
      </motion.div>

      {/* Profile Section */}
      <motion.div
        className="relative z-10 w-full max-w-3xl bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-gray-700"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src="/me.jpg"
          alt="Profile Photo"
          className="w-50 h-50 rounded-full shadow-lg object-cover"
          data-aos="fade-up"
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.5)" }}
        />
        <h1 className="mt-4 text-3xl font-bold text-gray-100">V1NC3</h1>
        <p className="mt-2 text-gray-400">Cybersecurity Enthusiast | Developer | Creator</p>

        {/* Social Links */}
        <SocialLinks />
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        className="relative z-10 w-full max-w-3xl bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 mt-8 border border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold text-blue-400 text-center">Timeline</h2>
        <div className="relative mt-8 flex flex-col items-center">
          <div className="absolute w-1 bg-blue-500 h-full top-0 left-1/2 transform -translate-x-1/2"></div>
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              year={item.year}
              title={item.title}
              description={item.description}
              side={item.side}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Biography;
