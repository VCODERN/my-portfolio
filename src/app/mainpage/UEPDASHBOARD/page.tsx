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

    const newsData = [
  {
    title: "UEP Agri Park Expansion",
    description: "The university is expanding its agricultural research park with modern farming technologies.",
    images: ["/news1.gif", "/news2.gif", "/news3.gif"],
  },
  {
    title: "New Research on Hydroponics",
    description: "Researchers at UEP have developed an advanced hydroponic system for efficient urban farming.",
    images: ["/news4.gif", "/news5.jpg", "/news6.jpg"],
  },
  {
    title: "Smart Farming Innovations",
    description: "Automated irrigation and AI-powered plant monitoring are now being implemented in UEP.",
    images: ["/news7.jpg", "/news8.jpg", "/news9.jpg"],
  },
  {
    title: "Student Achievements in Agriculture",
    description: "Students showcase their innovative farming solutions in a national competition.",
    images: ["/news10.jpg", "/news11.jpg", "/news12.jpg"],
  },
  {
    title: "Upcoming Agriculture Symposium",
    description: "Experts from various fields will discuss the future of vertical farming at UEP.",
    images: ["/news13.jpg", "/news14.jpg", "/news15.jpg"],
  },
];
    
   const [indices, setIndices] = useState(new Array(newsData.length).fill(0));

  useEffect(() => {
    const intervals = newsData.map((_, i) =>
      setInterval(() => {
        setIndices((prev) => {
          const newIndices = [...prev];
          newIndices[i] = (newIndices[i] + 1) % newsData[i].images.length;
          return newIndices;
        });
      }, Math.random() * 3000 + 2000) 
    );

    return () => intervals.forEach(clearInterval);
  }, []);

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
      setShowSecondImage(true); 
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
    className={`fixed top-0 left-0 w-full bg-[#013366] shadow-lg flex items-center justify-between px-4 py-4 z-50 text-white border-b-10 border-yellow-500 lg:flex hidden transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
>
    {/* Logo Section */}
    <div className="flex items-center space-x-4" data-aos="fade-right" data-aos-duration="1000">
        <div
            className="w-24 h-24 bg-transparent rounded-full flex items-center justify-center shadow-md bg-cover bg-center"
            style={{ backgroundImage: "url('/UEPLOGO.png')" }}
        >
            <span className="sr-only">UEP Logo</span>
        </div>
        <span className="text-lg font-semibold whitespace-nowrap">University of Eastern Philippines</span>
    </div>

    {/* Navigation */}
    <nav className="flex space-x-8 font-medium text-sm" data-aos="fade-right">
        {/* Home (Non-Dropdown) */}
        <a href="#" className="hover:text-yellow-400 transition">Home</a>

        {/* Other Dropdown Menus */}
        {["About", "Academics", "Admissions", "Research", "Extension", "Products"].map((menu, index) => (
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
        className="fixed top-0 left-0 w-full bg-[#013366] shadow-lg flex items-center justify-between px-5 py-5 z-50 text-white border-b-5 border-yellow-400 lg:hidden"
        data-aos="fade-right"
        data-aos-duration="800"
        >
        {/* Logo Section */}
        <div className="flex items-center space-x-4" data-aos="fade-right" data-aos-duration="1000">
            <div
            className="w-20 h-20 bg-transparent rounded-full flex items-center justify-center shadow-md bg-cover bg-center"
            style={{ backgroundImage: "url('/UEPLOGO.png')" }}
            >
            <span className="sr-only">UEP Logo</span>
            </div>
            <span className="text-lg font-semibold whitespace-nowrap">University of Eastern Philippines</span>
        </div>
        </header>

    {/* SIDEBAR BUTTON - Visible on Small Screens */}
        <button 
            className="fixed top-20 right-1 z-50 w-10 p-2 bg-[#013366] text-white rounded-md lg:hidden"
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



      <main className="mt-32 p-6 md:p-12 space-y-8 flex flex-col items-center relative bg-[url('/UEPBG.jpg')] bg-cover bg-center bg-fixed">
            {/* White Transparent Layer */}
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 backdrop-blur-md"></div>

            {/* Main Image Section */}
            <div className="w-full max-w-screen-2xl relative" data-aos="fade-right">
              <img
                src="/final.gif"
                alt="Background Image"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />

              {/* Overlay Image Appears After 5 Seconds */}
              {showSecondImage && (
                <motion.img
                  src="/newww2bg.gif"
                  alt="Overlay Image"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
                />
              )}
            </div>

            {/* Latest News & Updates Section */}
            <div className="relative z-10 w-full flex justify-center" data-aos="fade-up">
              <div className="bg-gray-200 rounded-lg p-6 w-full max-w-screen-2xl shadow-lg mt-8 flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center" data-aos="fade-down">
                  Latest News & Updates
                </h2>

                {/* News Sliders - Mobile: Scrollable, Desktop: Grid */}
                <div className="w-full">
                  {/* Mobile Scrollable Slider */}
                  <div className="flex gap-4 overflow-x-auto md:hidden px-4 py-2 scrollbar-hide">
                    {newsData.map((news, i) => (
                      <div
                        key={i}
                        className="relative flex-shrink-0 w-[80%] max-w-[320px] h-[420px] overflow-hidden rounded-lg shadow-md bg-white p-4"
                        data-aos="zoom-in"
                        data-aos-delay={i * 200}
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{news.title}</h3>
                        <p className="text-sm text-gray-700 mb-4">{news.description}</p>

                        {/* Image Slider */}
                        <div className="relative w-full h-[220px] overflow-hidden rounded-lg">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={indices[i]}
                              src={news.images[indices[i]]}
                              alt="News"
                              className="absolute w-full h-full object-cover rounded-lg shadow-md"
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -50 }}
                              transition={{ duration: 0.8 }}
                            />
                          </AnimatePresence>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Grid View */}
                  <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {newsData.map((news, i) => (
                      <div
                        key={i}
                        className="relative w-full max-w-[280px] sm:max-w-[300px] h-[420px] overflow-hidden rounded-lg shadow-md bg-white p-4 mx-auto"
                        data-aos="zoom-in"
                        data-aos-delay={i * 200}
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{news.title}</h3>
                        <p className="text-sm text-gray-700 mb-4">{news.description}</p>

                        {/* Image Slider */}
                        <div className="relative w-full h-[220px] overflow-hidden rounded-lg">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={indices[i]}
                              src={news.images[indices[i]]}
                              alt="News"
                              className="absolute w-full h-full object-cover rounded-lg shadow-md"
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -50 }}
                              transition={{ duration: 0.8 }}
                            />
                          </AnimatePresence>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
    </div>
  );
}
