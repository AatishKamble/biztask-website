import React from 'react';
import { Link } from "react-router-dom";
import Star from "../Reviews/Star";
import { GrFormNextLink } from "react-icons/gr";

const ServiceCard = ({ business, service, provider }) => {
  return (
    <div className="w-full h-full sm:max-h-[450px] rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col border border-green-200 bg-white">
      {/* Image Section */}
      <div className="h-[280px] w-full p-4 overflow-hidden relative group rounded-t-lg">
        <img 
          src={business?.companyLogo?.imageUrl} 
          alt={service?.serviceType} 
          className="w-full h-full object-fill rounded-lg shadow-sm transform transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
      
      <div className=" absolute right-2 top-2 bg-green-100 flex items-center py-1 px-3 rounded-md">
          <span className=" font-serif text-amber-500">
            <Star star={service?.rating} />
          </span>
        </div>
      </div>
       
    
     <div className="relative z-10 flex-1 p-5 flex flex-col">
          
          {/* Service Title */}
          <div className="mb-4 text-center">
            <h2 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-emerald-700 line-clamp-2 leading-tight mb-2">
              {service?.serviceType}
            </h2>
            
            {/* Provider Info */}
           
          
              <p className="text-[18px] font-serif font-medium  text-blue-700">
                {provider}
              </p>
           
          </div>

          {/* Decorative Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent mb-4 opacity-50"></div>

          {/* Action Section */}
          <div className="mt-auto">
            <Link to={`/service-detail/${service?._id}`}>
              <div className="relative overflow-hidden group/button w-full">
               
                {/* Main Button */}
                <div className="relative bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl px-6 py-3 font-serif font-bold text-lg 
                 text-center">
                  
                  <div className="flex items-center justify-center gap-3">
                    <span>Book Now</span>
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/button:translate-x-1">
                      <span className="text-sm"><GrFormNextLink /></span>
                    </div>
                  </div>
                  
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/button:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover/button:animate-pulse"></div>
                </div>
              </div>
            </Link>

            {/* Trust Indicators */}
            <div className="mt-3 flex justify-center gap-4 text-xs font-serif text-blue-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Verified</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Local</span>
              </div>
            </div>
          </div>
        </div>

       
    </div>
  );
};

export default ServiceCard;