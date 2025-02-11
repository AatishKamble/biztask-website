import React, { useState } from 'react'
import { API_BASE_URL } from '../../configApi/ConfigApi';
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch} from 'react-redux';
// import { removeBusiness } from '../../Redux/Business/Action.js';
// import PopUp from '../PopUp/PopUp.jsx';

const BusinessCard = ({ businessDetails, index,handlePopupWarningOpen }) => {

  // const jwt=localStorage.getItem("jwt");
  // const dispatch=useDispatch();
  // const navigate=useNavigate();



const handleRemoveClick=()=>{
  handlePopupWarningOpen(businessDetails?._id);
}

  return (
    <>
   <div id={index} className="w-full max-w-sm mx-auto transform transition-all hover:scale-[1.02] duration-300">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-sky-100 to-blue-100 p-6">
          <div className="flex items-center gap-6">
            {/* Company Logo */}
            <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md border-4 border-white flex-shrink-0"
              style={{
                backgroundImage: `url(${businessDetails.companyLogo?.imageUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}>
            </div>
            
            {/* Company Name */}
            <div className="flex-grow">
              <h3 className="text-xl md:text-2xl font-serif font-semibold text-slate-800 line-clamp-2">
                {businessDetails?.companyName}
              </h3>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-white space-x-2 flex justify-center">
          <Link to={`/bussiness/details/${businessDetails?._id}`}>
            <button className="px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-lg 
              font-medium shadow-sm hover:shadow-md transition-all duration-200 text-sm">
              View Services
            </button>
          </Link>
          
          <Link to={`/bussiness-update/${businessDetails?._id}`}>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg 
              font-medium shadow-sm hover:shadow-md transition-all duration-200 text-sm">
              Update
            </button>
          </Link>
          
          <button 
            className="px-4 py-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-lg 
              font-medium shadow-sm hover:shadow-md transition-all duration-200 text-sm"
            onClick={handleRemoveClick}>
            Remove
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50 blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-tr from-teal-100 to-transparent rounded-full opacity-50 blur-xl"></div>
      </div>
    </div>
     
    </>
  )
}

export default BusinessCard