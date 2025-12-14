import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserSecret, FaPhone, FaLock, FaRupeeSign } from 'react-icons/fa';
import { MdEmail, MdZoomOutMap, MdVerifiedUser } from 'react-icons/md';
import { RiContactsBook3Fill } from "react-icons/ri";
import { HiShieldCheck } from "react-icons/hi";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';


const ContactInformation = ({ serviceHeader,LogedInUser, OwnerDetails=null, handlePaymentInitiation=()=>{},handleBookingInitiation=()=>{}, hasPaid=false, setShowImageModal=()=>{},isBusiness=false}) => {
    
    
           
           
           
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

    // Placeholder image
    const uploadPhoto = "https://placehold.co/150x150";
    const profileImage = OwnerDetails?.profileImage?.ImageUrl || uploadPhoto;
     

    return (
        <div className="relative">
           
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
            
            <div className="relative bg-white/95 backdrop-blur-sm border border-emerald-100 rounded-3xl shadow-lg w-full h-full flex flex-col gap-6 font-serif overflow-hidden transition-shadow duration-300">
                {/* Decorative top border */}
                <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
                
                <motion.div
                    className="flex flex-col gap-6 px-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header Section */}
                    <motion.div
                        className="w-full flex sm:justify-between sm:flex-row flex-col gap-4 pt-4 pb-6 border-b border-emerald-100"
                        variants={itemVariants}
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                                <div className="relative p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg">
                                    <RiContactsBook3Fill className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    {serviceHeader}
                                </h3>
                                <p className="text-sm text-gray-500 mt-0.5">Verified contact information</p>
                            </div>
                        </div>

                        {/* Book sevice Button */}
                        {LogedInUser?._id !== OwnerDetails?._id && !isBusiness && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative group bg-gradient-to-r from-emerald-500 to-emerald-500 hover:from-emerald-600 hover:to-emerald-600 text-white h-12 px-6 py-2 rounded-xl flex items-center justify-center gap-2 text-base transition-all duration-200 shadow-sm hover:shadow-md"
                                onClick={() => handleBookingInitiation(true)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-400 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <span className="relative flex items-center justify-center font-semibold p-2 ">
                                    <FaCalendarAlt className="mr-2" />
                                   <span className='text-base'>Book Service </span> 
                                   
                                </span>
                            </motion.button>
                        )}
                        { isBusiness &&
                        <Link to={"/business/all-services-bookings"}>
                         <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative group bg-gradient-to-r from-emerald-500 to-emerald-500 hover:from-emerald-600 hover:to-emerald-600 text-white h-12 px-6 py-2 rounded-xl flex items-center justify-center gap-2 text-base transition-all duration-200 shadow-sm hover:shadow-md"
                             
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-400 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <span className="relative flex items-center justify-center font-semibold p-2 ">
                                    <FaCalendarAlt className="mr-2" />
                                   <span className='text-base'>Customer Bookings</span> 
                                   
                                </span>
                            </motion.button>
                            </Link>
                            }
                    </motion.div>

                    {/* Profile Image Section */}
                  
                        <motion.div 
                            className="flex justify-center my-2"
                            variants={itemVariants}
                        >
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-30"></div>
                                <div 
                                    className="relative w-48 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-xl cursor-pointer group"
                                    onClick={() => setShowImageModal(true)}
                                >
                                    <img
                                        src={profileImage}
                                        alt="Service Provider"
                                        className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                                        <MdZoomOutMap className="text-white text-3xl" />
                                    </div>
                                </div>
                                {/* Verified badge */}
                                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-2 shadow-lg border-4 border-white">
                                    <MdVerifiedUser className="text-white text-xl" />
                                </div>
                            </div>
                        </motion.div>
                   
                </motion.div>

                {/* Contact Information Fields */}
                <div className="px-6 pb-6 space-y-4">
                    {/* Name Field */}
                    <motion.div
                        className="relative group"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                        <div className="relative flex gap-4 items-start bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-100 group-hover:border-emerald-300 p-4 rounded-xl transition-all duration-300">
                            <div className="flex-shrink-0 mt-0.5">
                                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-md">
                                    <FaUserSecret className="text-white text-lg" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold  text-emerald-600 mb-1 uppercase tracking-wider">Full Name</div>
                                <AnimatePresence>
                                          <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="break-words font-semibold text-gray-800 text-base"
                                        >
                                            {OwnerDetails?.name || "Not Available"}
                                        </motion.div>
                                   
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Phone Field */}

                    {isBusiness && (<>  <motion.div
                        className="relative group"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                        <div className="relative flex gap-4 items-start bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-100 group-hover:border-emerald-300 p-4 rounded-xl transition-all duration-300">
                            <div className="flex-shrink-0 mt-0.5">
                                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-md">
                                    <FaPhone className="text-white text-lg" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-emerald-600 mb-1 uppercase tracking-wider">Phone Number</div>
                                <AnimatePresence>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="break-words font-semibold text-gray-800 text-base"
                                        >
                                            {OwnerDetails?.mobileNumber || "Not Available"}
                                        </motion.div>
                                   
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                        className="relative group"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                        <div className="relative flex gap-4 items-start bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-100 group-hover:border-emerald-300 p-4 rounded-xl transition-all duration-300">
                            <div className="flex-shrink-0 mt-0.5">
                                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-md">
                                    <MdEmail className="text-white text-lg" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-emerald-600 mb-1 uppercase tracking-wider">Email Address</div>
                                <AnimatePresence>
                                   
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="break-words font-semibold text-gray-800 text-base"
                                        >
                                            {OwnerDetails?.email || "Not Available"}
                                        </motion.div>
                                  
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div></>)}
                  

                    {/* Verification Note */}
                 
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-500/5 rounded-xl"></div>
                            <div className="relative bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-xl p-4 border border-amber-200/50 backdrop-blur-sm">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-amber-500 rounded-lg blur-sm opacity-30"></div>
                                            <div className="relative p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg shadow-md">
                                                <HiShieldCheck className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-amber-800 mb-1 flex items-center gap-2">
                                            <span>Verified Provider</span>
                                            <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">Secure</span>
                                        </h4>
                                        <p className="text-sm text-amber-700 leading-relaxed">
                                            All service providers on our platform are verified for your safety and security.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                  
                </div>
            </div>
        </div>
    );
};
export default ContactInformation;