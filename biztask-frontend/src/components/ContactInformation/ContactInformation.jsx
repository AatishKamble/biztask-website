import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserSecret, FaPhone, FaLock, FaRupeeSign, FaTimes } from 'react-icons/fa';
import { MdEmail, MdZoomOutMap } from 'react-icons/md';
import uploadPhoto from "../../assets/uploadPhoto.jpg";

const ContactInformation = ({ serviceDetails, userDetails, handlePaymentInitiation, hasPaid ,setShowImageModal}) => {
   
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300 }
        }
    };

 

    // Image to display
    const profileImage = serviceDetails?.user?.profileImage?.ImageUrl || uploadPhoto;

    return (
        <div className="bg-white border border-emerald-100 rounded-xl p-5 w-full h-full shadow-sm flex flex-col gap-5 font-serif">
            <motion.div
                className="flex flex-col sm:flex-row gap-5 items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Service Provider Image */}
                {(userDetails?._id === serviceDetails?.user?._id || hasPaid) && (
                    <div className="relative w-[140px] h-[180px] rounded-lg overflow-hidden border-2 border-emerald-200 flex-shrink-0 group cursor-pointer"
                         onClick={() => setShowImageModal(true)}>
                        <img
                            src={profileImage}
                            alt="Service Provider"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                            <MdZoomOutMap className="text-white opacity-0 group-hover:opacity-100 text-2xl" />
                        </div>
                    </div>
                )}
                
                {/* Contact Information Heading */}
                <motion.div
                    className="w-full flex flex-col"
                    variants={itemVariants}
                >
                    <h3 className="text-xl text-emerald-800 font-semibold border-b border-emerald-200 pb-2 mb-3">
                        Provider Details
                    </h3>
                    
                    {/* Unlock Button (for non-owners who haven't paid) */}
                    {userDetails?._id !== serviceDetails?.user?._id && !hasPaid && (
                        <button
                            className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-base transition-colors duration-200 shadow-sm"
                            onClick={() => handlePaymentInitiation()}
                        >
                            <span className="flex items-center justify-center">
                                Unlock Contact Details <FaRupeeSign className="mx-1" /> 2
                            </span>
                        </button>
                    )}
                </motion.div>
            </motion.div>

            {/* Contact Information Fields */}
            <div className="space-y-3 mt-1">
                {/* Name Field */}
                <motion.div
                    className="relative flex gap-3 items-start bg-gradient-to-r from-emerald-50 to-white border border-emerald-100 p-3 rounded-lg overflow-hidden"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    <FaUserSecret className="text-emerald-600 mt-1 text-lg" />
                    <AnimatePresence>
                        {userDetails?._id === serviceDetails?.user?._id || hasPaid ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 break-words break-all font-medium text-gray-800"
                            >
                                {serviceDetails?.user?.name || "Not Available"}
                            </motion.div>
                        ) : (
                            <motion.div
                                className="flex-1 flex justify-between items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="flex items-center">
                                    <FaLock className="text-amber-500 mr-2" />
                                    <span className="text-gray-500">Provider name is hidden</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Phone Field */}
                <motion.div
                    className="relative flex gap-3 items-start bg-gradient-to-r from-emerald-50 to-white border border-emerald-100 p-3 rounded-lg overflow-hidden"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    <FaPhone className="text-emerald-600 mt-1 text-lg" />
                    <AnimatePresence>
                        {userDetails?._id === serviceDetails?.user?._id || hasPaid ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 break-words break-all font-medium text-gray-800"
                            >
                                {serviceDetails?.user?.mobileNumber || "Not Available"}
                            </motion.div>
                        ) : (
                            <motion.div
                                className="flex-1 flex justify-between items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="flex items-center">
                                    <FaLock className="text-amber-500 mr-2" />
                                    <span className="text-gray-500">Phone number is hidden</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Email Field */}
                <motion.div
                    className="relative flex gap-3 items-start bg-gradient-to-r from-emerald-50 to-white border border-emerald-100 p-3 rounded-lg overflow-hidden"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    <MdEmail className="text-emerald-600 mt-1 text-lg" />
                    <AnimatePresence>
                        {userDetails?._id === serviceDetails?.user?._id || hasPaid ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 break-words break-all font-medium text-gray-800"
                            >
                                {serviceDetails?.user?.email || "Not Available"}
                            </motion.div>
                        ) : (
                            <motion.div
                                className="flex-1 flex justify-between items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="flex items-center">
                                    <FaLock className="text-amber-500 mr-2" />
                                    <span className="text-gray-500">Email address is hidden</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                
                {/* Note for verified providers */}
                {(userDetails?._id === serviceDetails?.user?._id || hasPaid) && (
                    <motion.div
                        variants={itemVariants}
                        className="mt-4 text-sm text-gray-600 bg-amber-50 rounded-lg p-3 flex items-start gap-2"
                    >
                        <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                        </svg>
                        <span>All service providers on our platform are verified for your safety and security.</span>
                    </motion.div>
                )}
            </div>

           
        </div>
    );
};

export default ContactInformation;