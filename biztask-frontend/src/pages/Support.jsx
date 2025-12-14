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
import { BsStars } from "react-icons/bs";

import { FaLightbulb } from "react-icons/fa6";
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
      gradient: "from-blue-500 to-cyan-500",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "Click on the 'Sign Up' button, fill in your name, email or username, and password. Or continue with google account to activate your account.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "Click 'Login', then select 'Forgot Password'. Enter your email and we'll send a reset link to your inbox.",
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
      icon: <FaBriefcase className="text-purple-600" />,
      gradient: "from-purple-500 to-pink-500",
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
      icon: <FaTools className="text-orange-600" />,
      gradient: "from-orange-500 to-red-500",
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
      icon: <FaShieldAlt className="text-green-600" />,
      gradient: "from-green-500 to-emerald-500",
      questions: [
        {
          question: "How does your platform ensure user safety?",
          answer:
            "We prioritize safety by using secure login systems (via email or username), encrypted data transmission, verified profiles, and a monitored environment to reduce risks.",
        },
        {
          question: "What should I do if I suspect fraudulent activity?",
          answer:
            "Immediately report suspicious behavior by contacting us at Atishk2454@gmail.com. Include any relevant screenshots or details for faster resolution.",
        },
        {
          question: "How are disputes handled?",
          answer:
            "Start by resolving the issue directly using the platform's chat feature. If that doesn't help, contact our support team at +91 XXXXXXX454 or via email for assistance in mediating the situation.",
        },
      ]
    },
    {
      title: "Login & Access",
      icon: <FaSignInAlt className="text-indigo-600" />,
      gradient: "from-indigo-500 to-blue-500",
      questions: [
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
    {
      title: "Service Booking",
      icon: <FaTools className="text-teal-600" />,
      gradient: "from-teal-500 to-cyan-500",
      questions: [
        {
          question: "How do I book a service?",
          answer:
            "Choose a service, select either the Base or Premium package, review the details, and proceed to payment. Once payment is successful, your booking will be created.",
        },
        {
          question: "What is the difference between Base and Premium packages?",
          answer:
            "The Base package includes essential service features, while the Premium package offers additional benefits or extended service coverage. Details vary depending on the service you choose.",
        },
        {
          question: "Can a provider reject my booking?",
          answer:
            "Yes, if the provider is unable to offer the service, they can reject your request. If payment is already verified, your amount will be refunded.",
        },
        {
          question: "Can I cancel a service after booking?",
          answer:
            "Yes, if the service status is still 'REQUESTED', you can cancel it and receive a full refund. Once the provider has confirmed the booking, cancellation is no longer allowed.",
        },
        {
          question: "What happens when the service is completed?",
          answer:
            "The provider will verify a completion OTP with you. Once verified, the booking status changes to COMPLETED.",
        },
      ],
    },
    {
      title: "Payments & Refunds",
      icon: <FaWallet className="text-rose-600" />,
      gradient: "from-rose-500 to-pink-500",
      questions: [
        {
          question: "How does payment work?",
          answer:
            "When booking a service, you must pay the package fee plus a ₹10 platform fee. Your booking is created only after successful payment.",
        },
        {
          question: "Why is there a platform fee?",
          answer:
            "A small fixed fee of ₹10 is added to support platform maintenance, verification services, customer support, and secure transactions.",
        },
        {
          question: "What happens to my payment if I cancel a service?",
          answer:
            "If you cancel while the booking status is still 'REQUESTED', a full refund is initiated back to your original payment method.",
        },
        {
          question: "Will I get a refund if the provider cancels the booking?",
          answer:
            "Yes, if the provider cancels the service, your full payment is refunded automatically.",
        },
        {
          question: "When will my refund be processed?",
          answer:
            "Refunds typically get processed automatically and may take 2–5 business days depending on your bank or payment gateway.",
        },
        {
          question: "What should I do if my payment fails?",
          answer:
            "If your payment fails, the booking will not be created. You can retry the payment or try another payment method.",
        },
        {
          question: "How will I know if my payment is verified?",
          answer:
            "Once the payment is successfully verified by the system, your booking status will show 'Payment Verified'.",
        },
      ],
    }
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
    <div className="min-h-screen  py-12 font-serif">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              <FaLightbulb className='text-yellow-400 mr-1' size={14}/> Support Center
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            How Can We Help You?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our platform, or reach out to our support team for personalized assistance.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <FaSearch className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 bg-white shadow-lg text-lg transition-all duration-300 hover:shadow-xl"
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
                <div className={`px-6 py-4 bg-blue-50 border-b bg-gradient-to-r ${category.gradient} bg-opacity-5 border-gray-100 flex items-center`}>
                  <div className="text-xl mr-4 p-3 bg-white rounded-xl shadow-sm">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{category.title}</h2>
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="p-12 text-center">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold shadow-lg">
                <BsStars  className="text-yellow-500" size={20}/> We're Here to Help
              </span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Still Need Help?
            </h2>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              Our support team is here to assist you with any questions or concerns you may have.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-5 flex justify-center">
                    <div className="p-4 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
                      <FaEnvelope />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Email Support</h3>
                  <p className="mb-6 text-blue-100">Get a response within 24 hours</p>
                  <div className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 break-all">
                    Atishk2454@gmail.com
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-5 flex justify-center">
                    <div className="p-4 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
                      <FaPhone />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Phone Support</h3>
                  <p className="mb-6 text-purple-100">Available Mon-Fri, 9am-5pm</p>
                  <div className="inline-block bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                    +91 XXXXXXX454
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-green-500 to-emerald-500 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-5 flex justify-center">
                    <div className="p-4 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
                      <FaComments />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Live Chat WhatsApp</h3>
                  <p className="mb-6 text-green-100">Get instant help from our team</p>
                  <div className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                    +91 XXXXXXX454
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default SupportPage;