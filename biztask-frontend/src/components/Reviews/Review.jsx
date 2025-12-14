import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineAccessTime } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import timeAgo from "../timeCalculate.js";
import Star from "./Star.jsx";
import { BsTools } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
const ServiceReview = ({ review, userDetails, handleReviewDelete, handleEditReview,deleteLoading=false }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 10px -5px rgba(59, 130, 246, 0.4)",
      transition: { duration: 0.3 }
    }
  };

  const isOwnReview = review?.user?._id === userDetails?._id;

  return (
    <motion.div
      className="font-serif w-full h-full bg-white rounded-xl shadow-md overflow-hidden border border-blue-100 mb-6"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Review header  */}

      <div className=' h-2 '></div>
      <div className="md:p-6 p-3">
        <div className="flex items-start">
          {/* User Profile Section */}
        <div className="mr-5 flex flex-col items-center relative">
              <motion.div
                className="relative w-14 h-14"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Profile image */}
                <div className={`w-14 h-14 rounded-full overflow-hidden border-2 ${
                  isOwnReview ? 'border-emerald-400' : 'border-blue-400'
                } shadow-lg bg-white p-0.5`}>
                  <img
                    src={review?.user?.profileImage?.ImageUrl || 'https://via.placeholder.com/100'}
                    alt={review?.user?.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Verified checkmark overlay */}
                <motion.div 
                  className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-1 shadow-md border-2 border-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <FaCheckCircle className="text-white" size={10} />
                </motion.div>
              </motion.div>

              {isOwnReview && (
                <motion.span
                  className="mt-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  You
                </motion.span>
              )}
            </div>
          {/* Review Content */}
          <div className="flex-1">

            <div className="flex justify-between items-start">
              <div>
               
                  <h4 className="font-semibold text-gray-800 text-lg">{review?.user?.name || 'Anonymous User'}</h4>
                 
                

                <div className="flex items-center text-gray-500 text-xs mt-1">
                  <MdOutlineAccessTime className="mr-1" />
                  <span>{timeAgo(review?.postedAt) || 'Recently'}</span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <Star star={review?.rating} />

                 {isOwnReview && (
                  <div className="flex gap-2 mt-3">
                    <motion.button
                     disabled={deleteLoading}
                      onClick={() => handleEditReview(review)}
                      className={`text-gray-400 hover:text-blue-500 transition duration-200 bg-gray-100 hover:bg-blue-50 p-2 rounded-full ${deleteLoading ? "opacity-80 cursor-not-allowed" : ""
                      }`}
                      title="Edit Review"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MdEdit size={18} />
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleReviewDelete(review?._id)}
                      className={`text-gray-400 hover:text-red-500 transition duration-200 bg-gray-100 hover:bg-red-50 p-2 rounded-full ${deleteLoading ? "opacity-80 cursor-not-allowed" : ""
                      }`}
                      title="Delete Review"
                      disabled={deleteLoading}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RiDeleteBin2Fill size={18} />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            {/* Review Message */}
            <motion.div
              className="mt-4 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute -left-1 top-0 text-blue-300">
                <BiMessageDetail size={20} />
              </div>
              <p className="text-gray-700 pl-6 text-base leading-relaxed italic">
                "{review?.ReviewMessage || 'No review message provided.'}"
              </p>
            </motion.div>


            <div className="mt-5 flex flex-wrap gap-2">
              <motion.span
                className="bg-blue-500 text-white flex items-center text-xs px-4 py-1.5 rounded-full font-medium border border-blue-100 shadow-md shadow-emerald-500"
                
              >
                <BsTools className="mr-1.5" />
                Service Used
              </motion.span>

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceReview;