'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
import { FaBars, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Dashboard() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [time, setTime] = useState(new Date());
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showSecondImage, setShowSecondImage] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
    const [activeIndex, setActiveIndex] = useState(null);

const toggleAccordion = (index) => {
  setActiveIndex(activeIndex === index ? null : index);
    };
const FlipClock = ({ value }: { value: string }) => {
    return (
        <div className="relative w-12 h-10 bg-gray-900 text-yellow-400 font-bold text-lg flex items-center justify-center rounded-md overflow-hidden shadow-md">
            <AnimatePresence>
                <motion.span
                    key={value}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute w-full h-full flex items-center justify-center"
                >
                    {value}
                </motion.span>
            </AnimatePresence>
        </div>
    );
    };
    
    useEffect(() => {
        
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down, hide header
        setIsVisible(false);
      } else {
        // Scrolling up, show header
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

    useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondImage(true); // Show the second image after 5 seconds
    }, 5000);

    // Initialize AOS
    AOS.init({ duration: 1000 });

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  // Live Clock Update
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
    
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    // Toggle dropdown only for the clicked menu
    const toggleDropdown = (menu: string) => {
        setDropdownOpen((prev) => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };
    
  
  return (
    <div className="h-screen bg-gray-100">
  <header
    className={`fixed top-0 left-0 w-full bg-[#013366] shadow-lg flex items-center justify-between px-4 py-4 z-50 text-white border-b-4 border-yellow-400 lg:flex hidden transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
>
    {/* Logo Section */}
    <div className="flex items-center space-x-4" data-aos="fade-right" data-aos-duration="1000">
        <div
            className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center shadow-md bg-cover bg-center"
            style={{ backgroundImage: "url('/UEPLOGO.png')" }}
        >
            <span className="sr-only">UEP Logo</span>
        </div>
        <span className="text-lg font-semibold whitespace-nowrap">UEP</span>
    </div>

    {/* Navigation */}
    <nav className="flex space-x-8 font-medium text-sm" data-aos="fade-right">
        {["Home", "About", "Academics", "Admissions", "Research", "Extension", "Products"].map((menu, index) => (
            <div key={index} className="relative group">
                <button
                    className="hover:text-yellow-400 transition flex items-center space-x-1"
                    onClick={() => toggleDropdown(menu)}
                >
                    <span>{menu}</span>
                    <motion.span
                        animate={{ rotate: dropdownOpen[menu] ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs"
                    >
                        &#9660;
                    </motion.span>
                </button>
                <motion.div
                    className="absolute left-0 mt-2 w-44 bg-white text-gray-800 shadow-md rounded-md opacity-0 transition-opacity duration-200"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: dropdownOpen[menu] ? 1 : 0, y: dropdownOpen[menu] ? 0 : -10 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: dropdownOpen[menu] ? "block" : "none" }}
                >
                    <a href="#" className="block px-3 py-2 hover:bg-gray-100 text-sm">Overview</a>
                    <a href="#" className="block px-3 py-2 hover:bg-gray-100 text-sm">Programs</a>
                    <a href="#" className="block px-3 py-2 hover:bg-gray-100 text-sm">Contact</a>
                </motion.div>
            </div>
        ))}
    </nav>

    {/* Contact & Clock */}
    <div className="flex items-center space-x-8 text-xs" data-aos="fade-left">
        <span className="text-yellow-400 font-bold">{time.toLocaleTimeString()}</span>
        <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-1">
                <FaEnvelope className="text-yellow-400 text-sm" />
                <a href="mailto:uepnsofficial@uep.edu.ph" className="hover:text-yellow-400 transition">uepnsofficial@uep.edu.ph</a>
            </div>
            <div className="flex items-center space-x-1">
                <FaPhone className="text-yellow-400 text-sm" />
                <a href="tel:+09851668851" className="hover:text-yellow-400 transition">09851668851</a>
            </div>
            <div className="flex items-center space-x-1">
                <FaMapMarkerAlt className="text-yellow-400 text-sm" />
                <span>Catarman, N. Samar</span>
            </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-2">
            <a href="#" className="hover:text-yellow-400 transition"><FaFacebook size={18} /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaTwitter size={18} /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaInstagram size={18} /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaLinkedin size={18} /></a>
        </div>
    </div>
</header>



        {/* MOBILE HEADER - Visible Only on Small Screens */}
        <header
        className="fixed top-0 left-0 w-full bg-[#013366] shadow-lg flex items-center justify-between px-5 py-3 z-50 text-white border-b-5 border-yellow-400 lg:hidden"
        data-aos="fade-right"
        data-aos-duration="800"
        >
        {/* Logo Section */}
        <div className="flex items-center space-x-4" data-aos="fade-right" data-aos-duration="1000">
            <div
            className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center shadow-md bg-cover bg-center"
            style={{ backgroundImage: "url('/UEPLOGO.png')" }}
            >
            <span className="sr-only">UEP Logo</span>
            </div>
            <span className="text-lg font-semibold whitespace-nowrap">University of Eastern Philippines</span>
        </div>
        </header>

    {/* SIDEBAR BUTTON - Visible on Small Screens */}
        <button 
            className="fixed top-4 right-1 z-50 p-2 bg-[#013366] text-white rounded-md lg:hidden"
            onClick={() => setSidebarOpen(true)}
            data-aos="fade-left" data-aos-duration="1000"
        >
            <FaBars size={24} />
        </button>

        {/* SIDEBAR (No AOS Here) */}
        <aside className={`fixed top-0 left-0 h-full bg-[#013366] text-white w-64 p-5 z-50 transform 
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:hidden`}
        >
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
                {[
                    { name: "Home", links: [] },
                    { name: "About", links: ["History", "Mission & Vision", "Administration"] },
                    { name: "Academics", links: ["Programs", "Departments", "Faculty"] },
                    { name: "Admissions", links: ["Undergraduate", "Graduate", "Scholarships"] },
                    { name: "Research", links: ["Publications", "Projects", "Funding"] }
                ].map((menu, index) => (
                    <div key={index} className="border-b border-gray-700">
                    {/* MAIN MENU BUTTON */}
                    <button
                        className="w-full flex justify-between items-center text-lg py-3 px-4 hover:text-yellow-400 transition"
                        onClick={() => toggleAccordion(index)}
                    >
                        {menu.name}
                        <span className="transition-transform duration-200" style={{ transform: activeIndex === index ? "rotate(180deg)" : "rotate(0)" }}>
                        ▼
                        </span>
                    </button>

                    {/* DROPDOWN LIST */}
                    <motion.div
                        className={`overflow-hidden bg-[#012A4A] ${activeIndex === index ? "max-h-40" : "max-h-0"}`}
                        initial={{ height: 0 }}
                        animate={{ height: activeIndex === index ? "auto" : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {menu.links.length > 0 && (
                        <ul className="px-6 py-2 space-y-2">
                            {menu.links.map((subItem, subIndex) => (
                            <li key={subIndex} className="text-sm hover:text-yellow-400">
                                <a href="#">{subItem}</a>
                            </li>
                            ))}
                        </ul>
                        )}
                    </motion.div>
                    </div>
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
       <main className="mt-32 p-12 space-y-8 flex flex-col items-center">
        <div className="w-full max-w-screen-lg relative">
            <img
                src="/final.gif"
                alt="Background Image"
                data-aos="fade-right" 
                className="w-full h-auto object-cover rounded-lg shadow-lg"
            />

            {/* Overlay GIF (Shows After 5 Seconds) */}
            {showSecondImage && (
            <img
                src="/newww2bg.gif"
                alt="Overlay Image"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-1000 opacity-100"
            />
            )}
        </div>

      <p className="text-gray-700 text-lg text-center">Scroll down to see the effect.</p>
      <div className="h-[2000px] bg-gray-200 rounded-lg p-6 w-full max-w-screen-lg">
        <p>More content here...</p>
      </div>
    </main>
    </div>
  );
}
