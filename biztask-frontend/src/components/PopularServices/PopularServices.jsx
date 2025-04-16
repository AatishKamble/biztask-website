import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import eventDecoration from "../../assets/event-decoration.jpg";
import homeCleaning from "../../assets/clean.jpg";
import plumbing from "../../assets/Plumbing.jpg";
import catering from "../../assets/catering.jpg";
import gardening from "../../assets/Gardening.jpg";
import motor from "../../assets/motor.jpeg";
import { HiOutlineSparkles } from "react-icons/hi2";

const PopularServices = () => {
  // Service data remains unchanged
  const services = [
    {
      type: "Event Decoration",
      image: eventDecoration,
      value: "Event Decoration",
      gradient: "from-purple-500 via-purple-400 to-purple-500", 
    },
    {
      type: "Home Cleaning",
      image: homeCleaning,
      value: "Cleaning",
      gradient: "from-green-500 via-green-400 to-green-500",
    },
    {
      type: "Plumbing Services",
      image: plumbing,
      value: "Plumbing",
      gradient: "from-blue-500 via-blue-400 to-blue-500",
    },
    {
      type: "Catering Services",
      image: catering,
      value: "Catering",
      gradient: "from-orange-500 via-orange-400 to-orange-500",
    },
    {
      type: "Gardening Services",
      image: gardening,
      value: "Gardening",
      gradient: "from-teal-500 via-teal-400 to-teal-500",
    },
    {
      type: "Motor Repairing",
      image: motor,
      value: "motor",
      gradient: "from-red-500 via-red-400 to-red-500",
    },
  ];

  // Animation variants for container elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for services cards
  const serviceCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  // Animation variants for the left section
  const leftSectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-b from-white via-blue-50 to-white w-full py-12 pb-8 sm:px-6 lg:px-12 xl:px-24 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mx-auto">
        {/* Left Section: Available Services with animation */}
        <motion.div
          className="bg-gradient-to-r from-[#6E45E2] to-[#88a2d3] text-white w-full lg:w-[400px] xl:w-[500px] h-[320px] lg:h-[500px] flex flex-col justify-center items-center rounded-3xl shadow-xl p-6 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={leftSectionVariants}
        >
          {/* Floating icon animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0], // Small floating animation
            }}
            transition={{
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
              duration: 0.8
            }}
          >
            <HiOutlineSparkles className="text-white w-12 h-12 mb-4" />
          </motion.div>

          <motion.h2 
            className="text-white font-serif font-extrabold text-2xl lg:text-3xl text-center py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Available Services
          </motion.h2>

          <motion.p 
            className="text-white text-[16px] text-center px-4 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Connecting You with Skilled Professionals to Get the Job Done Right.
          </motion.p>

          {/* Background decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white opacity-20 rounded-full blur-xl"></div>

          {/* View All Button with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/services" aria-label="View All Services">
              <div className="bg-white hover:bg-[#6bdfff] text-[#6E45E2] w-[230px] mt-6 cursor-pointer h-12 rounded-full flex justify-center items-center text-lg border-2 border-white transition-all duration-300 shadow-lg hover:shadow-xl group">
                <span className="font-serif font-bold pe-2 text-xl">View All</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Section: Service Cards Grid with scroll animation */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
  <motion.div
    key={index}
    variants={serviceCardVariants}
    whileHover="hover"
  >
    <Link
      to={`/services?serviceName=${service.value}`}
      aria-label={`Explore ${service.type}`}
      className="block group"
    >
      <motion.div
        className={`relative h-[240px] rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 bg-cover bg-center`}
        style={{ backgroundImage: `url(${service.image})` }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-0"></div>

        {/* Service content */}
        <div className="relative z-10 h-full w-full p-5 flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-2">
            {/* Icon with subtle floating animation */}
            <motion.div 
              className={`bg-gradient-to-r ${service.gradient} p-2 rounded-full shadow-lg`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <HiOutlineSparkles className="text-white w-5 h-5" />
            </motion.div>
            <h3 className="text-white font-serif text-lg font-semibold tracking-wide">
              {service.type}
            </h3>
          </div>
         
          <div className="h-1 w-0 group-hover:w-16 bg-white transition-all duration-500 rounded-full"></div>
        </div>
      </motion.div>
    </Link>
  </motion.div>
))}
        </motion.div>
      </div>
    </>
  );
};

export default PopularServices;