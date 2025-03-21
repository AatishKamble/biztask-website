import { HiChevronDoubleRight } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { Link } from "react-router-dom";
import heroSection from "../../assets/hero.jpg";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useEffect, useState } from "react"; 

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(true); // State to control arrow visibility

  // Function to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 176; // Adjust this value to match your navbar's height
      if (window.scrollY > navbarHeight) {
        setIsVisible(false); // Hide arrow when user scrolls past the navbar
      } else {
        setIsVisible(true); // Show arrow when at the top
      }
    };

    window.addEventListener("scroll", handleScroll); // Add scroll listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  return (
    <div className="relative w-full h-[540px] flex items-center mt-1 xl:h-[100vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="w-full h-full bg-blue-900 relative">
        <img
          src={heroSection}
          alt="Hero Section"
          className="w-full h-full object-cover opacity-40"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 opacity-50"></div>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeInZoom {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}
      </style>

      {/* Centered Content */}
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full px-4 text-center">
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-10 mb-8 justify-center">
          <Link to="/jobs" aria-label="Search Jobs">
            <div
              className="relative bg-gradient-to-r from-blue-600 to-blue-800 w-[250px] opacity-95 cursor-pointer h-14 rounded-xl flex justify-center items-center text-lg border-2 border-blue-700 shadow-lg transition-all duration-500 hover:scale-105 hover:bg-blue-700 hover:shadow-[0_0_15px_4px_rgba(0,119,255,0.8)]"
            >
              <span className="font-serif font-bold pe-2 text-xl text-white">
                Search Jobs
              </span>
              <span className="font-serif font-bold text-3xl text-white">
                <HiChevronDoubleRight />
              </span>
            </div>
          </Link>

          <Link to="/services" aria-label="Explore Services">
            <div
              className="relative bg-gradient-to-r from-teal-600 to-teal-800 w-[250px] opacity-95 cursor-pointer h-14 rounded-xl flex justify-center items-center text-lg border-2 border-teal-700 shadow-lg transition-all duration-500 hover:scale-105 hover:bg-teal-700 hover:shadow-[0_0_15px_4px_rgba(0,128,128,0.8)]"
            >
              <span className="font-serif font-bold pe-2 text-xl text-white">
                Explore Services
              </span>
              <span className="font-serif font-bold text-3xl text-white">
                <MdOutlineExplore />
              </span>
            </div>
          </Link>
        </div>

        {/* Text Content */}
        <div className="inset-0 flex flex-col justify-center items-center text-center animate-fadeIn">
          <h1
            className="font-serif font-extrabold text-cyan-100 text-[36px] drop-shadow-md opacity-0 animate-[fadeInZoom_1.2s_ease-in-out_forwards]"
          >
            Find the right worker, job and service in your area !
          </h1>

          <p
            className="font-serif text-cyan-300 sm:pt-3 text-lg sm:text-xl md:text-2xl drop-shadow-md opacity-0 animate-[fadeInUp_1.5s_ease-in-out_0.3s_forwards]"
          >
            Connecting businesses, workers and service seekers with ease
          </p>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      {isVisible && (
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-500"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
         
          <MdOutlineKeyboardDoubleArrowDown className="text-3xl text-cyan-100 opacity-70"/>

        </div>
      )}
    </div>
  );
};

export default HeroSection;