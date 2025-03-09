"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";
import "animate.css";
import GlitchText from "./component/GlitchText";
import Gestures from "./Gestures/page";
import Sidebar from "./Sidebar/page";
import YTMiniPlayer from "./Sidebar/ytminiplayer";

import NotifsDrawer from "./notifs/page";
import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePlayer, setActivePlayer] = useState<"mp3" | "youtube" | null>(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="w-screen min-h-screen flex justify-center items-center relative transition-all duration-500">
      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: isDarkMode ? "url('/darkbg.jpg')" : "url('/lightbg.jpg')",
          filter: "blur(2px)",
        }}
      ></div>

      {/* Sidebar (Pass Dark Mode & Active Player State) */}
      <Sidebar 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        activePlayer={activePlayer} 
        setActivePlayer={setActivePlayer} 
      />

      {/* Notifications Drawer */}
      <NotifsDrawer />

      {/* Players (Only One Can Be Open) */}
      {activePlayer === "youtube" && <YTMiniPlayer onClose={() => setActivePlayer(null)} />}
    
      {/* GlitchText */}
      <div className="absolute top-[75%]" data-aos="fade-up" data-aos-delay="500">
        <GlitchText />
      </div>

      {/* Profile Box */}
      <div
        className="w-90 h-90 bg-black/40 backdrop-blur-md rounded-full border border-white/50 shadow-xl flex justify-center items-center p-5 group z-40"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="w-full h-full bg-gray-300 rounded-full border-1 border-white shadow-lg overflow-hidden flex justify-center items-center relative group-hover:w-110 group-hover:h-110 transition-all duration-500 ease-in-out">
          <img
            src="/hodie.jpg"
            alt="Vince Noora"
            className="w-full h-full object-cover rounded-full transition-all duration-500 ease-in-out"
            loading="lazy"
          />
        </div>

        {/* Social Icons */}
        <div className="absolute flex justify-center items-center w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <a
            href="https://www.facebook.com/vince.noora.50/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full flex justify-center items-center transition-all duration-300 transform scale-0 group-hover:scale-100 group-hover:translate-x-48 group-hover:translate-y-28 absolute hover:bg-gradient-to-r from-blue-600 to-blue-400"
          >
            <FaFacebookF className="text-white text-3xl" />
          </a>
          <a
            href="https://www.instagram.com/yourzacky/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full flex justify-center items-center transition-all duration-300 transform scale-0 group-hover:scale-100 group-hover:translate-x-32 group-hover:translate-y-48 absolute hover:bg-gradient-to-r from-pink-500 to-yellow-500"
          >
            <FaInstagram className="text-white text-3xl" />
          </a>
          <a
            href="https://github.com/VCODERN"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full flex justify-center items-center transition-all duration-300 transform scale-0 group-hover:scale-100 group-hover:translate-x-32 group-hover:-translate-y-48 absolute hover:bg-gradient-to-r from-gray-800 to-gray-600"
          >
            <FaGithub className="text-white text-3xl" />
          </a>
          <a
            href="https://www.youtube.com/@smuffy_v9819"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full flex justify-center items-center transition-all duration-300 transform scale-0 group-hover:scale-100 group-hover:translate-x-48 group-hover:-translate-y-28 absolute hover:bg-gradient-to-r from-red-600 to-red-400"
          >
            <FaYoutube className="text-white text-3xl" />
          </a>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-5 rounded-lg w-1/2 max-w-lg"
            initial={{ y: '-100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-bold">Development Modal</h2>
            <p className="mt-2">This is a modal for development purposes.</p>

            <button 
              onClick={toggleModal}
              className="mt-4 p-2 bg-red-500 text-white rounded-md"
            >
              Close Modal
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Page;
