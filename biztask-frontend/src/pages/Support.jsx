import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaQuestionCircle, 
  FaChevronDown, 
  FaChevronUp, 
  FaEnvelope, 
  FaPhone, 
  FaComments,
  FaSearch,
  FaUserTie,
  FaBriefcase,
  FaWallet,
  FaShieldAlt,
  FaTools
} from 'react-icons/fa';

import {
  
   
    
    FaSignInAlt,
  } from "react-icons/fa";
const SupportPage = () => {
  // State to track which FAQ is open
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle FAQ accordion
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // FAQ categories with their respective questions and answers

  
  const faqCategories = [
    {
      title: "Account Management",
      icon: <FaUserTie className="text-blue-600" />,
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "Click on the 'Sign Up' button, fill in your name, email or username, and password. Or continue with google account to activate your account.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "Click 'Login', then select 'Forgot Password'. Enter your email and we’ll send a reset link to your inbox.",
        },
        {
          question: "Can I update my personal information?",
          answer:
            "Yes, go to your profile and click on 'Edit Profile' to update your name, phone number, or profile photo.",
        },
      ],
    },
    {
      title: "Job Postings",
      icon: <FaBriefcase className="text-blue-600" />,
      questions: [
        {
          question: "How do I post a job on the platform?",
          answer:
            "Log in to your account, go to your dashboard, then navigate to 'Business' and select the service for which you want to post a job. Fill in the job details and submit your posting.",
        },
        {
          question: "How long will my job posting be visible?",
          answer:
            "Your job posting will remain visible until you choose to delete it.",
        },
        {
          question: "Can I edit my job posting after publishing?",
          answer:
            "Yes, go to your dashboard, find the job under your listings, and click on 'Edit' to update any details.",
        },
      ]
      
    },
    {
      title: "Service Listings",
      icon: <FaTools className="text-blue-600" />,
      questions: [
        {
          question: "How do I list my services?",
          answer:
            "Navigate to your dashboard, go to the business in which you want to add a service, click on 'Add New Service', and complete the details like pricing, description, and images.",
        },
        {
          question: "How are service providers verified?",
          answer:
            "We verify service providers through document checks, user reviews, and platform activity. Verified users display a badge.",
        },
       
        {
          question: "Can I delete my service listing?",
          answer:
            "Yes, go to your dashboard, open the 'My Services' section, find the service you want to remove, and click on the 'Delete' option.",
        },
        {
          question: "Can I upload images of my previous work?",
          answer:
            "Absolutely! While adding or editing a service, you can upload multiple images to showcase your previous work. High-quality images help attract more clients.",
        },
      ]
    },
    {
      title: "Safety & Security",
      icon: <FaShieldAlt className="text-blue-600" />,
      questions: [
        {
          question: "How does your platform ensure user safety?",
          answer:
            "We prioritize safety by using secure login systems (via email or username), encrypted data transmission, verified profiles, and a monitored environment to reduce risks.",
        },
        {
          question: "What should I do if I suspect fraudulent activity?",
          answer:
            "Immediately report suspicious behavior by contacting us at AtishXXXXXXX12@gmail.com. Include any relevant screenshots or details for faster resolution.",
        },
        {
          question: "How are disputes handled?",
          answer:
            "Start by resolving the issue directly using the platform's chat feature. If that doesn’t help, contact our support team at +91 XXXXXXX454 or via email for assistance in mediating the situation.",
        },
      ]
      
    },
    {
      title: "Login & Access",
      icon: <FaSignInAlt className="text-blue-600" />,
      questions: [
        {
          question: "Can I log in using either email or username?",
          answer:
            "Yes, you can log in using your registered email or username, along with your password.",
        },
        {
          question: "I forgot my username. What should I do?",
          answer:
            "Try logging in using your registered email instead. If you're still facing issues, reach out to our support team with your registered mobile number.",
        },
        {
          question: "Why am I not receiving the 'Forgot Password' email?",
          answer:
            "Make sure to check your spam, junk, or promotions folder. If it's not there, click 'Resend Verification Email' or contact our support team.",
        },
        {
          question: "Can I use the platform on mobile devices?",
          answer:
            "Absolutely! Our platform is fully responsive and works smoothly on smartphones and tablets via any modern browser.",
        },
      ]
      
    },
  ];
  

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery.trim() === '' 
    ? faqCategories 
    : faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 font-serif">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-blue-800 mb-4">How Can We Help You?</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our platform, or reach out to our support team for personalized assistance.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-md"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* FAQ Sections */}
        <div className="space-y-8 mb-16">
          {filteredFAQs.map((category, categoryIndex) => (
            category.questions.length > 0 && (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="px-6 py-4 bg-blue-50 border-b border-gray-100 flex items-center">
                  <div className="text-2xl mr-3">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-blue-900">{category.title}</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {category.questions.map((faq, faqIndex) => {
                    const index = `${categoryIndex}-${faqIndex}`;
                    return (
                      <div key={faqIndex}>
                        <button
                          className="w-full px-6 py-4 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => toggleFAQ(index)}
                        >
                          <div className="flex items-center text-left">
                            <FaQuestionCircle className="text-blue-600 mr-3 flex-shrink-0" />
                            <span className="font-medium text-gray-800">{faq.question}</span>
                          </div>
                          {activeIndex === index ? (
                            <FaChevronUp className="text-blue-600 ml-4 flex-shrink-0" />
                          ) : (
                            <FaChevronDown className="text-gray-400 ml-4 flex-shrink-0" />
                          )}
                        </button>
                        <AnimatePresence>
                          {activeIndex === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden bg-gray-50"
                            >
                              <div className="px-6 py-4 pl-12 text-gray-600">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )
          ))}

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No results found. Please try another search term.</p>
            </motion.div>
          )}
        </div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-8">
              Our support team is here to assist you with any questions or concerns you may have.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-blue-50 p-6 rounded-lg shadow-sm"
              >
                <div className="text-3xl text-blue-600 mb-4 flex justify-center">
                  <FaEnvelope />
                </div>
                <h3 className="text-lg font-medium text-blue-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Get a response within 24 hours</p>
                <span 
                 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  AtishXXXXX12@gmail.com
                </span>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-blue-50 p-6 rounded-lg shadow-sm"
              >
                <div className="text-3xl text-blue-600 mb-4 flex justify-center">
                  <FaPhone />
                </div>
                <h3 className="text-lg font-medium text-blue-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-4">Available Mon-Fri, 9am-5pm</p>
                <span 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                 +91 XXXXXXX454
                </span>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-blue-50 p-6 rounded-lg shadow-sm"
              >
                <div className="text-3xl text-blue-600 mb-4 flex justify-center">
                  <FaComments />
                </div>
                <h3 className="text-lg font-medium text-blue-900 mb-2">Live Chat Whats App</h3>
                <p className="text-gray-600 mb-4">Get instant help from our team</p>
                <span 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                +91 XXXXXXX454
                </span>
              </motion.div>
             
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default SupportPage;