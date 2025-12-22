import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import eventDecoration from "../../assets/event-decoration.jpg";
import homeCleaning from "../../assets/clean.jpg";
import plumbing from "../../assets/Plumbing.jpg";
import catering from "../../assets/catering.jpg";
import gardening from "../../assets/Gardening.jpg";
import electrical from "../../assets/electrical.jpg";
import { HiOutlineSparkles } from "react-icons/hi2";
import { IoIosArrowRoundForward } from "react-icons/io";

const PopularServices = () => {
  // Service data remains unchanged
  const services = [
    {
      type: "Decoration Services",
      image: eventDecoration,
      value: "Decoration",
      gradient: "from-purple-500 via-purple-400 to-purple-500",
    },
    {
      type: "Cleaning Services",
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
      type: "Electrical Services",
      image: electrical,
      value: "Electrical",
      gradient: "from-red-500 via-red-400 to-red-500",
    },
  ];

 

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };


  const rightSectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  return (
    <>

     <motion.div 
          className="text-center mt-12 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full mb-4 shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <HiOutlineSparkles className="w-5 h-5" />
            <span className="font-serif font-semibold text-sm tracking-wide">MOST POPULAR</span>
          </motion.div>
          <h2 className="text-4xl  font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 mb-3">
            Explore Our Services
          </h2>
          <p className="text-gray-600 font-serif text-base max-w-2xl mx-auto">
            Professional services at your fingertips, trusted by thousands
          </p>
        </motion.div>
      <div className="bg-gradient-to-b from-white via-blue-50 to-white w-full py-12 pb-8 sm:px-10 lg:px-12 xl:px-24 px-2 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mx-auto">
       
       
       
       
        {/* Left Section: Available Services */}
        <motion.div
          className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white w-full lg:w-[400px] xl:w-[480px] h-[420px] lg:h-[520px]  flex flex-col justify-center items-center rounded-3xl shadow-xl p-8 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "-100px" }}
          variants={leftSectionVariants}
        >

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
              duration: 0.8
            }}
            className="mb-6"
          >
            <HiOutlineSparkles className="text-white w-14 h-14" />
          </motion.div>

          <motion.h2
            className="text-white font-bold font-serif text-3xl lg:text-4xl text-center py-2 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Available Services
          </motion.h2>

          <motion.p
            className="text-white text-lg font-serif text-center px-6 opacity-90 mt-2 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Connecting You with Skilled Professionals to Get the Job Done Right.
          </motion.p>


          

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/services" aria-label="View All Services">
              <div className="bg-white hover:bg-[#6bdfff] text-[#6E45E2] w-[240px] mt-6 cursor-pointer h-14 rounded-full flex justify-center items-center text-lg border-2 border-white transition-all duration-300 shadow-lg hover:shadow-xl group ">
                <span className="font-serif font-bold pe-2 text-lg lg:text-xl">View All Services</span>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Section: Service Cards Grid with scroll animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl mx-auto"
          variants={rightSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={serviceCardVariants}
              whileHover="hover"
              className="transform-gpu"
            >
              <Link
                to={`/services?serviceName=${service.value}`}
                aria-label={`Explore ${service.type}`}
                className="block group"
              >
                <motion.div
                  className="relative h-[260px] rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 bg-cover bg-center border-4 border-white"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-0 group-hover:from-black/95 transition-all duration-300"></div>

                 
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 z-10"></div>


                  <div className="relative z-10 h-full w-full p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-3">

                      <motion.div
                        className={`bg-gradient-to-r ${service.gradient} p-2.5 rounded-full shadow-lg`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <HiOutlineSparkles className="text-white w-5 h-5" />
                      </motion.div>
                      <h3 className="text-white font-serif text-xl font-semibold tracking-wide">
                        {service.type}
                      </h3>
                    </div>


                    <div className="flex items-center gap-2">
                      <div className="h-1 w-0 group-hover:w-20 bg-gradient-to-r from-white to-transparent transition-all duration-500 rounded-full"></div>
                      <motion.span
                        className="text-white/80 text-sm font-serif opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <span className="flex items-center justify-center"> Explore <IoIosArrowRoundForward size={18} /></span>
                      </motion.span>
                    </div>
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