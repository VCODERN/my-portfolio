'use client';
import { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Dashboard() {
  const [time, setTime] = useState(new Date());

  // Live Clock Update
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      {/* Sticky Smoother Header */}
      <header className="fixed top-0 left-0 w-full bg-[#013366] shadow-lg flex items-center justify-between px-8 py-4 z-50 text-white border-b-2 border-yellow-400">
        
        {/* Logo Section */}
            <div className="flex items-center space-x-4" data-aos="fade-right">
            {/* Logo Image */}
            <div 
                className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center shadow-md bg-cover bg-center"
                style={{ backgroundImage: "url('/UEPLOGO.png')" }}
            >
                {/* Hidden Text (For Accessibility) */}
                <span className="sr-only">UEP Logo</span>
            </div>

            {/* University Name */}
            <span className="text-lg font-semibold">University of Eastern Philippines</span>
            </div>

        {/* Navigation Bar */}
        <nav className="flex space-x-8 font-medium" data-aos="fade-down">
          {['Home', 'About', 'Academics', 'Admissions', 'Research'].map((menu, index) => (
            <div key={index} className="relative group">
              <button className="hover:text-yellow-400 transition">{menu}</button>
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-md rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Overview</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Programs</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Contact</a>
              </div>
            </div>
          ))}
        </nav>

        {/* Contact & Clock Section */}
        <div className="flex items-center space-x-6" data-aos="fade-left">
          {/* Live Clock */}
          <span className="text-yellow-400 font-bold text-lg">{time.toLocaleTimeString()}</span>

          {/* Contact Details */}
          <div className="flex space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-yellow-400" />
              <a href="mailto:uepnsofficial@uep.edu.ph" className="hover:text-yellow-400 transition">uepnsofficial@uep.edu.ph</a>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-yellow-400" />
              <a href="tel:+09851668851" className="hover:text-yellow-400 transition">09851668851</a>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-yellow-400" />
              <span>University Town, Catarman N. Samar</span>
            </div>
          </div>

          {/* Social Media Icons in a 2x2 Grid (No Background) */}
          <div className="grid grid-cols-2 gap-3">
            <a href="#" className="flex items-center justify-center hover:text-yellow-400 transition"><FaFacebook size={22} /></a>
            <a href="#" className="flex items-center justify-center hover:text-yellow-400 transition"><FaTwitter size={22} /></a>
            <a href="#" className="flex items-center justify-center hover:text-yellow-400 transition"><FaInstagram size={22} /></a>
            <a href="#" className="flex items-center justify-center hover:text-yellow-400 transition"><FaLinkedin size={22} /></a>
          </div>
        </div>
      </header>

      {/* Placeholder Content for Scrolling */}
      <main className="mt-24 p-8 space-y-6">
        <p className="text-gray-700 text-lg">Scroll down to see the header stay in place.</p>
        <div className="h-[2000px] bg-gray-200 rounded-lg p-4">
          <p>More content here...</p>
        </div>
      </main>
    </div>
  );
}
