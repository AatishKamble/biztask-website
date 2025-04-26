import { useRef } from "react";
import { motion } from "framer-motion";
import { FaHandshake } from "react-icons/fa";
import { MdWorkspaces } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";

const HowItWorks = ({ HowItWorks }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.4
      }
    }
  };

  const titleVariants = {
    hidden: { y: -60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 12,
        duration: 1 
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 90,
        damping: 12
      }
    },
    hover: { 
      y: -15,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        delay: 0.3 
      }
    },
    hover: { 
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { 
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        repeatDelay: 3
      }
    }
  };

  // Updated steps to better match local services platform
  const steps = [
    { 
      icon: <BsBuilding />, 
      title: "Local Businesses",
      description: "Connect with customers in your area and grow your local business",
      steps: [
        "Create your business profile with service details",
        "Add your range of professional services",
        "Post jobs and connect with top talent"
      ],
      color: "from-blue-600 to-indigo-700",
      bgColor: "bg-blue-50"
    },
    { 
      icon: <FaPeopleGroup />, 
      title: "Job Seekers",
      description: "Find local opportunities and connect with employers in your area",
      steps: [
        "Build your profile highlighting skills and experience",
        "Find relevant job opportunities",
        "Apply with a single click and track applications"
      ],
      color: "from-purple-600 to-fuchsia-700",
      bgColor: "bg-purple-50"
    },
    { 
      icon: <FaHandshake />, 
      title: "Service Customers",
      description: "Discover trusted local service providers for all your needs",
      steps: [
        "Search local services by category and location",
        "Read verified reviews from community members",
        "Book services directly through the platform"
      ],
      color: "from-teal-600 to-emerald-700",
      bgColor: "bg-teal-50"
    }
  ];

  return (
    <motion.div
      ref={HowItWorks}
      className="w-full py-16 pt-12 pb-24 px-6 lg:px-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-20"
          variants={titleVariants}
        >
          <motion.span 
            className="text-md font-semibold font-serif tracking-wider text-indigo-900 uppercase"
          >
            Your Local Marketplace
          </motion.span>
          <motion.h2 
            className="text-4xl font-serif md:text-5xl font-bold mt-2 text-blue-700"
          >
            How Our Platform Works
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-serif"
          >
            Connecting local businesses, service providers, and job seekers in your community
          </motion.p>
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 mx-auto mt-6 rounded-full"
            animate={{ 
              width: ["32px", "96px", "128px"], 
              opacity: [0.7, 1, 0.7],
              transition: { 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }
            }}
          />
        </motion.div>
        
        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
         
        <div className="hidden md:block absolute top-36 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 z-0" />
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="z-10"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-700 h-full transform transition-all duration-200">
                {/* Card header */}
                <div className={`bg-gradient-to-r ${step.color} px-6 py-8 flex justify-between items-center`}>
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-white">
                      {step.title}
                    </h3>
                    <p className="text-white text-opacity-90 mt-1 font-serif text-sm hidden md:block">
                      {step.description}
                    </p>
                  </div>
                  <motion.div 
                    className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center shadow-lg`}
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <span className="text-4xl text-blue-700">
                      {step.icon}
                    </span>
                  </motion.div>
                </div>
                
                {/* Card body */}
                <div className="p-8">
                  <ol className="space-y-6">
                    {step.steps.map((item, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3 }}
                        viewport={{ once: true }}
                      >
                        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-semibold text-sm mr-4 mt-0.5 shadow-md">
                          {i+1}
                        </span>
                        <span className="text-gray-300 font-serif text-lg">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ol>
                </div>
                
             
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;