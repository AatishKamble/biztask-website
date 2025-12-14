import React from 'react';
import { motion } from 'framer-motion';
import { FaStarHalfStroke } from "react-icons/fa6";
import { AiOutlineStar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

const Star = ({ star }) => {
 
 const ratingNumber = Number(star);
const rating = isNaN(ratingNumber) ? 0 : ratingNumber;

  


  const ratingArray = Array.from({ length: 5 }, (_, index) => {
   
    return (
      <motion.span 
        key={index} 
        className='text-yellow-600'
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.3,
          delay: index * 0.1,
          ease: "easeOut"
        }}
        whileHover={{ 
          scale: 1.2,
          transition: { duration: 0.2 } 
        }}
         whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {
          // Full star if rating is at least this position + 1
          rating >= index + 1 ? (
          <FaStar className=" w-5 h-5" />

          ) : 
          // Half star if rating is between this position and the next
          rating > index && rating < index + 1 ? (
            <FaStarHalfStroke className="w-5 h-5" />
          ) : 
          // Empty star otherwise
          (
            <AiOutlineStar className="w-[22px] h-[22px] " />
          )
        }
      </motion.span>
    );
  });

  return (
    <>
      <div className='flex gap-1'>
        {ratingArray}
      </div>
    </>
  );
};

export default Star;