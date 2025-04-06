import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const BusinessCard = ({ businessDetails, index, handlePopupWarningOpen }) => {

  const handleRemoveClick = () => {
    handlePopupWarningOpen(businessDetails?._id);
  };

  return (
    <>
      <div id={index} className="relative w-full max-w-sm mx-auto group transition-all duration-300">
        {/* Outer Glow Effect  */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl opacity-20 blur-sm transition-all duration-300 group-hover:opacity-40"></div>
        
        <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg border border-blue-100 
          hover:shadow-xl hover:-translate-y transition-all duration-300">
          
          {/* Header  */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-t-3xl relative">
            <div className="flex items-center gap-6">
              
              {/* Company Logo */}
              <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md border-4 border-white flex-shrink-0 "
                style={{
                  backgroundImage: `url(${businessDetails.companyLogo?.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}>
              </div>
              
              {/* Company Name */}
              <div className="flex-grow">
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-white line-clamp-2 break-words">
                  {businessDetails?.companyName}
                </h3>
                <div className="flex items-center font-medium mt-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                  <span className="text-blue-100 text-xs">Verified Business</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
            <div className="flex justify-between">
              <span className='font-serif font-medium'>ID: {businessDetails?._id}</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          {/* Floating Decorative Circles */}
          <div className="absolute top-[-20px] right-[-20px] w-16 h-16 bg-blue-100/50 rounded-full blur-2xl"></div>

        
          <div className="p-4 bg-white flex justify-around">
            <Link to={`/bussiness/details/${businessDetails?._id}`}>
              <button className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md 
                hover:shadow-lg hover:scale-110 transition-all duration-200">
                <FaEye className="text-lg" />
              </button>
            </Link>
            
            <Link to={`/bussiness-update/${businessDetails?._id}`}>
              <button className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md 
                hover:shadow-lg hover:scale-110 transition-all duration-200">
                <FaEdit className="text-lg" />
              </button>
            </Link>
            
            <button 
              className="p-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 text-white shadow-md 
                hover:shadow-lg hover:scale-110 transition-all duration-200"
              onClick={handleRemoveClick}>
              <FaTrash className="text-lg" />
            </button>
          </div>

          {/* Additional Floating Elements */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-gradient-to-tr from-blue-200 to-transparent rounded-full opacity-50 blur-2xl"></div>
        </div>
      </div>
    </>
  );
};

export default BusinessCard;