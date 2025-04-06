import React, { useEffect } from 'react';
import { MdPhone, MdEmail, MdWork, MdStar, MdPeople, MdLocationOn } from "react-icons/md";
import { ImLinkedin } from "react-icons/im";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import aboutPhoto from "../assets/developer.png";
import handShake from "../assets/handShake.png";
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllServices } from '../Redux/ServiceR/Action.js';

import { getAllJobs } from '../Redux/Job/Action.js';
// ScrollReveal component for animations on scroll
const ScrollReveal = ({ children, threshold = 0.1 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8, 
            ease: "easeOut" 
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

const AboutUs = () => {
const navigate = useNavigate();
  // Animation controls
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  
  // Animation variants
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8
      }
    }
  };

  const statVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: i => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

 

  
    const dispatch = useDispatch();

    useEffect(() => {
      const data = {
        serviceName: null,
        serviceLocation: null,
        minPrice: 0,
        maxPrice: 1000000000000000,
        rating: null,
        page: 1,
        limit: 1000,
      };
    
      dispatch(getAllServices(data));
    }, []);
    
    useEffect(() => {
      const data = {
        jobName: null,
        jobLocation: null,
        minSalary: 0,
        maxSalary: 1000000000000000,
        employmentType: null,
        page: 1,
        limit: 1000, 
      };
    
      dispatch(getAllJobs(data));
    }, []);
    

  const serviceStore = useSelector(store => store.serviceStore);
const jobStore = useSelector(store => store.jobStore);
  
  // Statistic items
  const stats = [
    { icon: <MdWork />, value: `${jobStore.jobs?.totalJobs?.toLocaleString() || "0"}`, label: "Job Listings" },
    { icon: <MdPeople />, value: `${serviceStore.services?.totalServices?.toLocaleString() || "0"}`,
  label: "Service Providers" },
    { icon: <MdLocationOn />, value: "100+", label: "Locations" }
  ];

  return (
    <div className="bg-gray-50 w-full overflow-hidden">
      {/* Hero Section */}
      <motion.div 
        className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden"
        style={{ opacity: parallaxOpacity }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 z-0"
          style={{ y: parallaxY }}
        />
        
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        <motion.div 
          className="z-20 text-center px-4 max-w-4xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Connecting Talent With Opportunity
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-100 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            BizTask bridges the gap between service providers and those in need of skilled professionals.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <button onClick={() => navigate("/services")} className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl mr-4">
              Find Services
            </button>
            <button onClick={() => navigate("/jobs")} className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl">
              Find Jobs Services
            </button>
          </motion.div>
        </motion.div>
        
        {/* Abstract Shapes */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 bg-blue-400 opacity-20 rounded-full blur-3xl z-5"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute bottom-10 right-20 w-40 h-40 bg-teal-500 opacity-20 rounded-full blur-3xl z-5"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>

      {/* Statistics Section */}
      <ScrollReveal>
        <div className="bg-white py-16 shadow-md">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={statVariants}
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full mb-4 text-3xl">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Mission Section */}
      <ScrollReveal>
        <div className="py-16 bg-gradient-to-b from-gray-100 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl p-12 shadow-xl"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white inline-block border-b-2 border-teal-400 pb-2 mb-8">Our Mission</h2>
                  <p className="text-xl text-teal-300 font-medium mb-3">Bridging Gaps in the Service Industry</p>
                  <p className="text-gray-200 text-lg max-w-3xl mx-auto leading-relaxed">
                    BizTask is on a mission to revolutionize how people find and offer services. 
                    We provide a platform that connects skilled professionals with those who need their expertise, 
                    creating economic opportunities and solving everyday problems.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all">
                      <h3 className="text-white text-xl font-semibold mb-2">Connect</h3>
                      <p className="text-gray-200">Bringing together service providers and clients in one seamless platform</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all">
                      <h3 className="text-white text-xl font-semibold mb-2">Empower</h3>
                      <p className="text-gray-200">Providing tools for professionals to showcase their skills and grow their business</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all">
                      <h3 className="text-white text-xl font-semibold mb-2">Simplify</h3>
                      <p className="text-gray-200">Making the process of finding and hiring talent straightforward and efficient</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* About Section */}
      <ScrollReveal>
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <motion.div 
                  className="w-full md:w-1/2"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl font-bold text-blue-800 mb-4 inline-block border-l-4 border-blue-600 pl-4">About BizTask</h2>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    BizTask was founded on the principle that finding reliable services should be simple and secure. Our platform 
                    connects skilled professionals with individuals and businesses who need their expertise.
                  </p>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    Whether you're a tradesperson looking for work, a business seeking talent, or an individual in need of services, 
                    BizTask streamlines the entire process from search to completion.
                  </p>
                  <ul className="text-gray-700 space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="text-teal-500 mr-2">✓</span> Verified service providers
                    </li>
                    
                    <li className="flex items-center">
                      <span className="text-teal-500 mr-2">✓</span> Rating and review system
                    </li>
                    <li className="flex items-center">
                      <span className="text-teal-500 mr-2">✓</span> User-friendly interface
                    </li>
                  </ul>
                </motion.div>
                <motion.div 
                  className="w-full md:w-1/2 flex justify-center"
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div 
                    className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <img
                      src={handShake}
                      alt="About BizTask"
                      className="w-full max-w-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <p className="text-xl font-semibold">Connecting Talent With Opportunity</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Developer Details Section */}
      <ScrollReveal threshold={0.2}>
        <div className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-800 inline-block   pb-2">Meet the Developer</h2>
            </div>
            
            <motion.div 
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2 bg-gradient-to-br from-blue-900 to-slate-800 p-8 flex flex-col items-center justify-center">
                  <motion.div 
                    className="w-64 h-80 rounded-sm overflow-hidden border-4 border-teal-400 shadow-lg relative mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={aboutPhoto}
                      alt="Profile"
                      className="w-full h-full object-fit"
                    />
                    <motion.div 
                      className="absolute inset-0 rounded-sm"
                      animate={{ 
                        boxShadow: [
                          "0 0 10px rgba(45, 212, 191, 0.5)",
                          "0 0 20px rgba(45, 212, 191, 0.8)",
                          "0 0 10px rgba(45, 212, 191, 0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white text-center mb-1">Aatish Kamble</h2>
                  <p className="text-teal-300 text-xl mb-6">Full Stack Developer</p>
                </div>
                
                <div className="md:col-span-3 p-8">
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">About Me</h3>
                    <p className="text-gray-600 font-medium mb-4">
                      I'm a passionate Full Stack Developer specializing in creating intuitive and 
                      efficient web applications. With expertise in modern web technologies, I focus on 
                      building solutions that solve real-world problems.
                    </p>
                    <p className="text-gray-600 font-medium">
                      BizTask is designed to revolutionize how people connect for services and jobs, 
                      making the process seamless and user-friendly.
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-xl  text-gray-800 mb-4 font-medium">Contact Details</h3>
                    <div className="space-y-4">
                      <motion.div 
                        className="flex items-center space-x-4 p-3 rounded-lg group"
                        whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}
                      >
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                          <MdEmail className="text-xl" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="text-gray-700 group-hover:text-blue-600 transition-colors">AtishXXXXX123@gmail.com</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center space-x-4 p-3 rounded-lg group"
                        whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}
                      >
                        <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                          <MdPhone className="text-xl" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Phone</p>
                          <p className="text-gray-700 group-hover:text-teal-600 transition-colors">XXXXXXX454</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center space-x-4 p-3 rounded-lg group"
                        whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}
                      >
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                          <ImLinkedin className="text-xl" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">LinkedIn</p>
                          <p className="text-gray-700 group-hover:text-blue-600 transition-colors">aatish-kamble2003</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollReveal> 

    </div>
  );
};

export default AboutUs;