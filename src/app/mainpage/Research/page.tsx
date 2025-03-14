"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LandingPage() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    // Dynamic Island Navigation Data
    const slides = [
        { title: "Welcome to UEP Research and Instructional Materials Index" },
        { title: "Access Research Papers and Materials" },
        { title: "Join the Academic Community" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for right, -1 for left

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <header className="w-full bg-[#013366] text-white px-6 py-2 flex items-center justify-between shadow-md">
                {/* Logo & Title */}
                <motion.div
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <img src="/UEPLOGO.png" alt="UEP Logo" className="w-20 h-20" />
                    <motion.h1
                        key={slides[currentIndex].title} // Dynamic title update
                        className="text-lg md:text-xl font-bold"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {slides[currentIndex].title}
                    </motion.h1>
                </motion.div>
                {/* Navigation Buttons */}
                <motion.div
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <button className="bg-transparent border border-white px-3 py-2 text-sm rounded-lg hover:bg-white hover:text-[#013366] transition">
                        Login
                    </button>
                    <button className="bg-white text-[#013366] px-3 py-2 text-sm rounded-lg hover:bg-gray-200 transition">
                        Register
                    </button>
                </motion.div>
            </header>

            {/* Dynamic Island Section */}
            <section className="w-full flex flex-col items-center justify-center py-16 px-6">
                <motion.div
                    className="relative bg-black/80 text-white p-6 md:p-8 rounded-3xl shadow-lg flex flex-col items-center w-[90%] max-w-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Arrows for Navigation */}
                    <button
                        className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/40 transition"
                        onClick={prevSlide}
                    >
                        <ChevronLeft className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    {/* Sliding Title */}
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            className="text-center"
                            initial={{ x: direction * 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -direction * 100, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.h2 className="text-lg md:text-2xl font-bold max-w-3xl">
                                {slides[currentIndex].title}
                            </motion.h2>
                        </motion.div>
                    </AnimatePresence>

                    {/* Right Arrow */}
                    <button
                        className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/40 transition"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </motion.div>
            </section>

            {/* Page Body (Curved Gray Background) */}
            <motion.section
                className="w-full px-6 md:px-10 py-6 bg-gray-300 rounded-tl-[50px] rounded-tr-[50px]"
                key={currentIndex}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 50 }}
                transition={{ duration: 0.5 }}
                style={{ minHeight: "100vh" }}
            />
        </div>
    );
}
