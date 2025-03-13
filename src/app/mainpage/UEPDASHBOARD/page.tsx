'use client';
import { useState, useEffect } from 'react';
import { FaBars, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Dashboard() {
  const [rotate, setRotate] = useState(0);
  const [time, setTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Live Clock Update
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
    
    // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Continuous Rotation Effect
  useEffect(() => {
    const handleScroll = () => {
      const logo = document.getElementById('rotating-logo');
      if (logo && logo.getBoundingClientRect().top < window.innerHeight) {
        let angle = 0;
        const interval = setInterval(() => {
          angle += 10; // Rotate in 10-degree steps
          setRotate(angle);
          if (angle >= 360) clearInterval(interval); // Stop at 360 degrees
        }, 30); // Adjust speed of rotation here
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    
    
  return (
    <div className="h-screen bg-gray-100">
      {/* HEADER - Hidden on Small Screens */}
      <header className="fixed top-0 left-0 w-full bg-[#013366] shadow-lg flex items-center justify-between px-5 py-5 z-50 text-white border-b-5 border-yellow-400 lg:flex hidden">
        {/* Logo Section */}
       <div className="flex items-center space-x-6" data-aos="fade-right">
      {/* Rotating Logo - Stops at 360 Degrees */}
      <div
        id="rotating-logo"
        className="w-20 h-20 bg-transparent rounded-full flex items-center justify-center shadow-md bg-cover bg-center"
        style={{
          backgroundImage: "url('/UEPLOGO.png')",
          transform: `rotate(${rotate}deg)`,
          transition: "transform 0.1s linear",
        }}
      >
        <span className="sr-only">UEP Logo</span>
      </div>

      {/* Static Text */}
      <span className="text-xl font-semibold whitespace-nowrap">University of Eastern Philippines</span>
    </div>

        {/* Navigation */}
        <nav className="flex space-x-12 font-medium" data-aos="fade-down">
          {['Home', 'About', 'Academics', 'Admissions', 'Research'].map((menu, index) => (
            <div key={index} className="relative group">
              <button className="hover:text-yellow-400 transition text-lg">{menu}</button>
              <div className="absolute left-0 mt-2 w-56 bg-white text-gray-800 shadow-md rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <a href="#" className="block px-4 py-3 hover:bg-gray-100">Overview</a>
                <a href="#" className="block px-4 py-3 hover:bg-gray-100">Programs</a>
                <a href="#" className="block px-4 py-3 hover:bg-gray-100">Contact</a>
              </div>
            </div>
          ))}
        </nav>

        {/* Contact & Clock */}
        <div className="flex items-center space-x-16" data-aos="fade-left">
          <span className="text-yellow-400 font-bold text-xl ml-10">{time.toLocaleTimeString()}</span>
          <div className="flex flex-col space-y-2 text-sm">
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

          {/* Social Media Icons */}
          <div className="grid grid-cols-2 gap-4">
            <a href="#" className="hover:text-yellow-400 transition"><FaFacebook size={24} /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaTwitter size={24} /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaInstagram size={24} /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaLinkedin size={24} /></a>
          </div>
        </div>
      </header>

      {/* SIDEBAR BUTTON - Visible on Small Screens */}
      <button 
        className="fixed top-5 left-5 z-50 p-3 bg-[#013366] text-white rounded-md lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars size={24} />
      </button>

      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 h-full bg-[#013366] text-white w-64 p-5 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:hidden`}>
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white" onClick={() => setSidebarOpen(false)}>
          <FaTimes size={24} />
        </button>

        {/* Logo Section */}
        <div className="flex items-center space-x-4 mb-6">
          <div 
            className="w-16 h-16 bg-transparent rounded-full shadow-md bg-cover bg-center"
            style={{ backgroundImage: "url('/UEPLOGO.png')" }}
          ></div>
          <span className="text-lg font-semibold">UEP</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          {['Home', 'About', 'Academics', 'Admissions', 'Research'].map((menu, index) => (
            <a key={index} href="#" className="block text-lg hover:text-yellow-400">{menu}</a>
          ))}
        </nav>

        {/* Contact & Clock */}
        <div className="mt-6 space-y-4 text-sm">
          <span className="text-yellow-400 font-bold text-lg">{time.toLocaleTimeString()}</span>
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

        {/* Social Media Icons */}
        <div className="mt-6 flex space-x-4">
          <a href="#" className="hover:text-yellow-400 transition"><FaFacebook size={24} /></a>
          <a href="#" className="hover:text-yellow-400 transition"><FaTwitter size={24} /></a>
          <a href="#" className="hover:text-yellow-400 transition"><FaInstagram size={24} /></a>
          <a href="#" className="hover:text-yellow-400 transition"><FaLinkedin size={24} /></a>
        </div>
      </aside>

      {/* Placeholder Content */}
      <main className="mt-32 p-12 space-y-8">
        <p className="text-gray-700 text-lg">Scroll down to see the effect.</p>
        <div className="h-[2000px] bg-gray-200 rounded-lg p-6">
          <p>More content here...</p>
        </div>
      </main>
    </div>
  );
}
