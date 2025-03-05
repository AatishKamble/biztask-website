import React, { useState } from 'react'
import { API_BASE_URL } from '../../configApi/ConfigApi';
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch} from 'react-redux';
// import { removeBusiness } from '../../Redux/Business/Action.js';
// import PopUp from '../PopUp/PopUp.jsx';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const BusinessCard = ({ businessDetails, index,handlePopupWarningOpen }) => {

  // const jwt=localStorage.getItem("jwt");
  // const dispatch=useDispatch();
  // const navigate=useNavigate();



const handleRemoveClick=()=>{
  handlePopupWarningOpen(businessDetails?._id);
}

  return (
    <>
   <div id={index} className="relative w-full max-w-sm mx-auto group transition-all duration-300">
  {/* Outer Glow Effect */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-teal-400 rounded-3xl opacity-20 blur-xl transition-all duration-300 group-hover:opacity-40"></div>
  
  <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg border border-slate-200 
    hover:shadow-2xl hover:-translate-y transition-all duration-300">
    
    {/* Header  */}
    <div className="bg-gradient-to-r from-sky-200 to-blue-300 p-6 rounded-t-3xl relative">
      <div className="flex items-center gap-6">
        
        {/* Company Logo  */}
        <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md border-4 border-white flex-shrink-0 transform group-hover:scale-105 transition-all duration-300"
          style={{
            backgroundImage: `url(${businessDetails.companyLogo?.imageUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}>
        </div>
        
        {/* Company Name */}
        <div className="flex-grow">
          <h3 className="text-xl md:text-2xl font-serif font-semibold text-slate-900 line-clamp-2">
            {businessDetails?.companyName}
          </h3>
        </div>
      </div>
    </div>

    {/* Floating Decorative Circles */}
    <div className="absolute top-[-20px] right-[-20px] w-16 h-16 bg-white/50 rounded-full blur-2xl"></div>

    {/* Action Buttons  */}
    <div className="p-4 bg-white flex justify-around">
      <Link to={`/bussiness/details/${businessDetails?._id}`}>
        <button className="p-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-md 
          hover:shadow-lg hover:scale-110 transition-all duration-200">
          <FaEye className="text-lg" />
        </button>
      </Link>
      
      <Link to={`/bussiness-update/${businessDetails?._id}`}>
      <button className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md 
  hover:shadow-lg hover:scale-110 transition-all duration-200">
  <FaEdit className="text-lg" />
</button>

      </Link>
      
      <button 
        className="p-3 rounded-full bg-gradient-to-r from-rose-400 to-rose-600 text-white shadow-md 
          hover:shadow-lg hover:scale-110 transition-all duration-200"
        onClick={handleRemoveClick}>
        <FaTrash className="text-lg" />
      </button>
    </div>

    {/* Additional Floating Elements */}
    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50 blur-2xl"></div>
    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-gradient-to-tr from-teal-100 to-transparent rounded-full opacity-50 blur-2xl"></div>
  </div>
</div>

     
    </>
  )
}

export default BusinessCard