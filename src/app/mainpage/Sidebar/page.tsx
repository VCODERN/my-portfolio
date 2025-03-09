"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Biography from "./page";
import { FaChevronRight, FaChevronLeft, FaMoon, FaSun, FaMusic, FaYoutube, FaUserAlt } from "react-icons/fa";

interface SidebarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  activePlayer: "mp3" | "youtube" | null;
  setActivePlayer: (player: "mp3" | "youtube" | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isDarkMode, setIsDarkMode, activePlayer, setActivePlayer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showBiography, setShowBiography] = useState(false); // State to manage the Biography visibility

  return (
    <>
      {/* Invisible Hover Area */}
      <div
        className="fixed left-0 top-0 h-full w-4"
        onMouseEnter={() => setHovered(true)}
      />
    
      {/* Sidebar */}
      <motion.div
        className="fixed left-0 top-0 h-full w-64 bg-gray-800 backdrop-blur-xl shadow-xl border-r border-gray-700 flex flex-col p-4 transition-all rounded-r-2xl"
        drag="x"
        dragConstraints={{ left: -220, right: 0 }}
        animate={{ x: isOpen ? 0 : hovered ? -220 : -280 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Drag Handle */}
        <motion.div
          className="absolute top-1/2 -right-12 h-16 w-12 rounded-r-xl flex items-center justify-center cursor-pointer bg-gray-700 backdrop-blur-lg shadow-md border border-gray-600"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {isOpen ? (
            <FaChevronLeft className="text-white text-2xl" />
          ) : (
            <FaChevronRight className="text-white text-2xl" />
          )}
        </motion.div>

        {/* Dark Mode Toggle */}
        <div className="mt-5 flex items-center gap-4">
          <span className="text-white text-base font-medium">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 transition-all"
            whileTap={{ scale: 0.85 }}
          >
            {isDarkMode ? <FaMoon className="text-yellow-300 text-xl" /> : <FaSun className="text-white text-xl" />}
          </motion.button>
        </div>

        {/* 🎵 Open MP3 Mini Player */}
        <motion.button
          onClick={() => setActivePlayer(activePlayer === "mp3" ? null : "mp3")}
          className={`mt-6 flex items-center justify-center w-full p-3 rounded-lg transition-all ${
            activePlayer === "mp3" ? "bg-gray-600" : "bg-gray-500"
          } text-white font-medium hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:animate-wave`}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          style={{
            transition: "background 0.6s ease-in-out, transform 0.3s ease-in-out",
          }}
        >
          <FaMusic className="mr-2" /> {activePlayer === "mp3" ? "Close MP3 Player" : "Open MP3 Player"}
        </motion.button>

        {/* 📺 Open YouTube Mini Player */}
        <motion.button
          onClick={() => setActivePlayer(activePlayer === "youtube" ? null : "youtube")}
          className={`mt-4 flex items-center justify-center w-full p-3 rounded-lg transition-all ${
            activePlayer === "youtube" ? "bg-gray-600" : "bg-gray-500"
          } text-white font-medium hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:animate-wave`}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          style={{
            transition: "background 0.6s ease-in-out, transform 0.3s ease-in-out",
          }}
        >
          <FaYoutube className="mr-2" /> {activePlayer === "youtube" ? "Close YouTube Player" : "Open YouTube Player"}
        </motion.button>

        {/* 👤 Biography Button */}
        <motion.button
          onClick={() => {
            setShowBiography(!showBiography); // Toggle the Biography visibility
            window.location.href = "http://localhost:3000/mainpage/Biography"; // Navigate to the Biography page
          }}
          className="mt-4 flex items-center justify-center w-full p-3 rounded-lg bg-gray-600 hover:bg-gray-500 transition-all text-white font-medium hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 hover:animate-wave"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          style={{
            transition: "background 0.6s ease-in-out, transform 0.3s ease-in-out",
          }}
        >
          {/* Button content */}
          Biography
        </motion.button>

      </motion.div>
    </>
  );
};

export default Sidebar;
