import React from 'react';
import { motion } from 'framer-motion';
import { FaStarHalfStroke } from "react-icons/fa6";
import { AiOutlineStar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

const Star = ({ star }) => {
 
  const rating = Number(star);
  
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
      >
        {
          // Full star if rating is at least this position + 1
          rating >= index + 1 ? (
          <FaStar className="xl:w-5 xl:h-5 w-6 h-6" />

          ) : 
          // Half star if rating is between this position and the next
          rating > index && rating < index + 1 ? (
            <FaStarHalfStroke className="xl:w-5 xl:h-5 w-6 h-6" />
          ) : 
          // Empty star otherwise
          (
            <AiOutlineStar className="xl:w-[22px] xl:h-[22px] w-[26px] h-[26px]" />
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