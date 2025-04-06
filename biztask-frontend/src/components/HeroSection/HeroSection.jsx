import { HiChevronDoubleRight } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react"; 
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import heroSection from "../../assets/hero.jpg";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Function to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 176; 
      if (window.scrollY > navbarHeight) {
        setIsVisible(false); 
      } else {
        setIsVisible(true); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []);

  // Handle image load completion
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="relative w-full h-[540px] flex items-center  xl:h-[100vh] overflow-hidden">
      {/* Background Image with Loading State */}
      <div className="w-full h-full bg-gradient-to-r from-blue-900 to-slate-900 relative">
        
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 transition-opacity duration-1000 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        
        <img
          src={heroSection}
          alt="Hero Section"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-40' : 'opacity-0'}`}
          loading="eager" 
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 opacity-50"></div>
      </div>

      {/* Animation Keyframes  */}
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
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          @keyframes floatButton {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
          }
          
          .animate-float {
            animation: floatButton 3s ease-in-out infinite;
          }
          
          .hover-glow:hover {
            box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.8);
          }
          
          .button-shine {
            position: relative;
            overflow: hidden;
          }
          
          .button-shine::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.3) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            transform: rotate(30deg);
            transition: all 0.5s;
            opacity: 0;
          }
          
          .button-shine:hover::after {
            animation: shine 1.5s ease-in-out;
            opacity: 1;
          }
          
          @keyframes shine {
            0% { transform: rotate(30deg) translateX(-300%); }
            100% { transform: rotate(30deg) translateX(300%); }
          }
        `}
      </style>

  
      <div 
        className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: imageLoaded ? 10 : -1 }}
      >
        <div className="flex flex-col sm:flex-row gap-10 mb-8 justify-center ">
          <Link to="/jobs" aria-label="Search Jobs">
            <div
              className="button-shine relative bg-gradient-to-r from-blue-600 to-blue-800 w-[250px] opacity-95 cursor-pointer h-14 rounded-xl flex justify-center items-center text-lg border-2 border-blue-700 shadow-lg transition-all duration-500 hover:scale-105 hover:bg-blue-700 hover:shadow-[0_0_15px_4px_rgba(0,119,255,0.8)] animate-float"
              style={{animationDelay: "0s"}}
            >
              <span className="font-serif font-bold pe-2 text-xl text-white">
                Search Jobs
              </span>
              <span className="font-serif font-bold text-3xl text-white">
                <HiChevronDoubleRight className="animate-pulse" />
              </span>
            </div>
          </Link>

          <Link to="/services" aria-label="Explore Services">
            <div
              className="button-shine relative bg-gradient-to-r from-teal-600 to-teal-800 w-[250px] opacity-95 cursor-pointer h-14 rounded-xl flex justify-center items-center text-lg border-2 border-teal-700 shadow-lg transition-all duration-500 hover:scale-105 hover:bg-teal-700 hover:shadow-[0_0_15px_4px_rgba(0,128,128,0.8)] animate-float"
              style={{animationDelay: "0.5s"}}
            >
              <span className="font-serif font-bold pe-2 text-xl text-white">
                Explore Services
              </span>
              <span className="font-serif font-bold text-3xl text-white">
                <MdOutlineExplore className="animate-pulse" />
              </span>
            </div>
          </Link>
        </div>

        
        <div className="inset-0 flex flex-col justify-center items-center text-center">
          <h1
            className="font-serif font-bold text-cyan-100 text-[36px] md:text-[40px] lg:text-[42px]  opacity-0 animate-[fadeInZoom_1.2s_ease-in-out_forwards] tracking-wide"
          >
            Find the right<span className="text-cyan-300"> Worker, Job and Service </span>in your Area
          </h1>

          <p
            className="font-serif font-medium text-cyan-100/80 sm:pt-3 text-lg sm:text-xl md:text-[20px] drop-shadow-lg max-w-2xl mx-auto opacity-0 animate-[fadeInUp_1.5s_ease-in-out_0.3s_forwards] "
          >
             Your one-stop platform for local talent and opportunities
          </p>
          
       
          
        </div>
     {/*Scroll Down Arrow */}
     {isVisible && (
          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500"
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            <div className="flex flex-col items-center">
              <p className="text-cyan-200 text-sm mb-2 opacity-70">Scroll Down</p>
              <MdOutlineKeyboardDoubleArrowDown className="text-3xl text-cyan-100 opacity-70 animate-bounce"/>
            </div>
          </div>
        )}
      </div>

      
      {/* Background Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
      </div>
    </div>
  );
};

export default HeroSection;