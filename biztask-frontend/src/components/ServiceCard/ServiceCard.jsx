import React from 'react';
import { Link } from "react-router-dom";
import Star from "../Reviews/Star";

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
      </div>
    
      {/* Content Section */}
      <div className="flex flex-col justify-center items-center p-3">
        <h3 className=" text-xl  font-serif font-semibold text-gray-800 line-clamp-2 w-full text-center">
          {service?.serviceType}
         
        </h3>
        <p className=" text-base  font-serif font-medium text-gray-600">
          {provider} 
        </p>
      </div>
    
      {/* Footer Section */}
      <div className="flex justify-between items-center px-4 pb-4 mt-auto">
        {/* View Button */}
        <Link to={`/service-detail/${service?._id}`}>
          <div className="  w-[80px] h-[40px] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-md transition duration-300 flex justify-center items-center shadow-md hover:shadow-lg">
            <span className="text-lg  font-serif font-semibold text-white">
              Book
            </span>
          </div>
        </Link>
    
        {/* Rating Badge */}
        <div className="flex items-center py-1 px-3 rounded-md">
          <span className=" font-serif text-amber-500">
            <Star star={service?.rating} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;