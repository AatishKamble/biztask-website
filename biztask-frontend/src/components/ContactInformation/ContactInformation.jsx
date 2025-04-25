import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserSecret, FaPhone, FaLock, FaCheck, FaRupeeSign } from 'react-icons/fa';
import { MdEmail, MdPayment } from 'react-icons/md';
import QRCode from 'react-qr-code';
import uploadPhoto from "../../assets/uploadPhoto.jpg"

const ContactInformation = ({ serviceDetails, userDetails,handlePaymentInitiation,hasPaid }) => {
   
   
   
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300 }
        }
    };

   
   
   

    return (
        <>
            {(userDetails?._id === serviceDetails?.user?._id || hasPaid) &&
                <div className="w-[140px] h-[160px] sm:w-[160px] sm:h-[200px] rounded-xl overflow-hidden border-2 border-blue-300 flex-shrink-0">
                    <img
                        src={serviceDetails?.user?.profileImage?.ImageUrl || uploadPhoto}
                        alt="Owner"
                        className="w-full h-full object-cover"
                    />
                </div>}
            <motion.div
                className="flex flex-col flex-1 text-blue-900 text-[18px] font-serif space-y-5 w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Heading */}
                <motion.div
                    className="text-[20px] font-semibold border-b border-blue-300 pb-2"
                    variants={itemVariants}
                >
                    Contact Information
                </motion.div>
                {userDetails?._id !== serviceDetails?.user?._id && !hasPaid && (
                    <button
                        className="bg-amber-500 hover:bg-amber-600 text-white h-12 px-3 py-1 rounded-lg flex items-center justify-center gap-1 text-base transition-colors duration-200"
                        onClick={()=> handlePaymentInitiation()}
                    >
                        <span className='flex items-center justify-center '>
                            Unlock All for <FaRupeeSign className='ms-2' /> 2
                        </span>
                    </button>
                )}

                {/* Info Boxes */}
                <div className="space-y-4 text-[16px]">
                    {/* Name */}
                    <motion.div
                        className="relative flex gap-3 items-start bg-blue-50/60 border border-blue-200 p-3 rounded-xl overflow-hidden"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <FaUserSecret className="text-sky-600 mt-[4px]" />
                        <AnimatePresence>
                            {userDetails?._id === serviceDetails?.user?._id || hasPaid ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex-1 break-words break-all font-medium"
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
                                        <FaLock className="text-orange-500 mr-2" />
                                        <span className="text-gray-600">Contact name is hidden</span>
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>


                    {/* Phone */}
                    <motion.div
                        className="relative flex gap-3 items-start bg-blue-50/60 border border-blue-200 p-3 rounded-xl overflow-hidden"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <FaPhone className="text-sky-600 mt-[4px]" />
                        <AnimatePresence>
                            {userDetails?._id === serviceDetails?.user?._id || hasPaid ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex-1 break-words break-all font-medium"
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
                                        <FaLock className="text-orange-500 mr-2" />
                                        <span className="text-gray-600">Phone number is hidden</span>
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>


                    {/* Email */}
                    <motion.div
                        className="relative flex gap-3 items-start bg-blue-50/60 border border-blue-200 p-3 rounded-xl overflow-hidden"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <MdEmail className="text-sky-600 mt-[4px]" />
                        <AnimatePresence>
                            {userDetails?._id === serviceDetails?.user?._id || hasPaid ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex-1 break-words break-all font-medium"
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
                                        <FaLock className="text-orange-500 mr-2" />
                                        <span className="text-gray-600">Email address is hidden</span>
                                    </div>


                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </motion.div>


            
        </>
    );
};

export default ContactInformation;