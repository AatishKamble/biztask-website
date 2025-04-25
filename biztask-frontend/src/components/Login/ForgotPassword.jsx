import React, { useState } from 'react';
import Modal from 'react-modal';
import { MdOutlineMail } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { forgotPassword } from "../../Redux/Auth/Action.js";
import { motion } from 'framer-motion';
import { GiSwordman } from "react-icons/gi";

const ForgotPassword = ({ openState, handleButtonClick,handleBackToLogin }) => {
  const [emailInput, setEmailInput] = useState("");
  const dispatch = useDispatch();
  
  const customStyles = {
    overlay: {
      zIndex: 999,
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: "480px",
      maxHeight: "95vh",
      overflow: "hidden",
      padding: 0,
      border: "none",
      borderRadius: "16px",
      backgroundColor: 'transparent',
      zIndex: '1000'
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { email: emailInput };
    dispatch(forgotPassword(formData));
    setEmailInput("");
    handleButtonClick(); 
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
    },
    tap: { scale: 0.97 }
  };

  return (
    <Modal
      isOpen={openState}
      style={customStyles}
      onRequestClose={handleButtonClick}
      contentLabel="Forgot Password Form"
      ariaHideApp={false}
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header with matching style */}
        <motion.div 
          className="bg-gradient-to-br from-indigo-700 to-blue-900 pt-8 pb-10 px-8 text-center relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="absolute -bottom-8 right-0 left-0 h-16 bg-white rounded-t-full opacity-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.div 
            className="flex justify-center mb-4"
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
          >
            <GiSwordman className="text-4xl text-white" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl font-bold text-white font-serif"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Forgot Password
          </motion.h2>
          
          <motion.p 
            className="text-blue-100 mt-2 font-serif"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Enter your email to receive a reset link
          </motion.p>
        </motion.div>

        <motion.div 
          className="p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-500">
                <MdOutlineMail className="text-lg" />
              </div>
              <input 
                type="email" 
                name="email" 
                value={emailInput} 
                onChange={(e) => setEmailInput(e.target.value)} 
                placeholder="Email address" 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-serif"
                required
              />
            </motion.div>

            <motion.button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-200 font-serif"
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Send Reset Link
            </motion.button>
          </form>

          {/* Back to login button */}
          <motion.div 
            className="text-center mt-6"
            variants={itemVariants}
          >
            <motion.button
              className="text-indigo-600 hover:text-indigo-800 font-medium font-serif inline-flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              
              onClick={()=>{
                handleBackToLogin();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to login
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </Modal>
  );
};

export default ForgotPassword;