import { TiBusinessCard } from "react-icons/ti";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdMiscellaneousServices } from "react-icons/md";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const HowItWorks = ({ HowItWorks }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10,
        duration: 0.8 
      }
    }
  };

  const cardVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    },
    hover: { 
      y: -10,
      scale: 1.03,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  // Step counter for horizontal connector line
  const steps = [
    { 
      icon: <TiBusinessCard />, 
      title: "For Businesses",
      steps: [
        "Register your profile & showcase your business",
        "Add your range of professional services",
        "Post jobs and connect with top talent"
      ],
      color: "from-blue-600 to-blue-800"
    },
    { 
      icon: <FaPeopleGroup />, 
      title: "For Workers",
      steps: [
        "Create your professional profile",
        "Find relevant job opportunities",
        "Start providing valuable services"
      ],
      color: "from-purple-600 to-purple-800"
    },
    { 
      icon: <MdMiscellaneousServices />, 
      title: "For Service Seekers",
      steps: [
        "Search services through an intuitive interface",
        "Filter by location, price, and ratings",
        "Connect directly with service providers"
      ],
      color: "from-emerald-600 to-emerald-800"
    }
  ];

  return (
    <motion.div
      ref={HowItWorks}
      className="w-full py-20 px-6 lg:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          variants={titleVariants}
        >
          <motion.span 
            className="text-md font-semibold tracking-wider text-blue-600 uppercase"
          >
            Simple Process
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mt-2 text-gray-700 "
          >
            How It Works
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"
          />
        </motion.div>
        
        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-28 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 z-0" />
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="z-10"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 h-full">
                {/* Card header */}
                <div className={`bg-gradient-to-r ${step.color} px-6 py-6 flex justify-between items-center`}>
                  <h3 className="text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <motion.div 
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
                  >
                    <span className="text-3xl text-blue-600">
                      {step.icon}
                    </span>
                  </motion.div>
                </div>
                
                {/* Card body */}
                <div className="p-6">
                  <ol className="space-y-4">
                    {step.steps.map((item, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        viewport={{ once: true }}
                      >
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm mr-3 mt-0.5">
                          {i+1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ol>
                </div>
                
                {/* Call to action */}
               
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;