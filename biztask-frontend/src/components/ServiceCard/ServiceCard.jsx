import React from 'react';
import { Link } from "react-router-dom";
import Star from "../Reviews/Star";

const ServiceCard = ({ business, service, provider }) => {
  return (
    <div className="w-[300px] h-[420px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-2xl transition duration-300 flex flex-col border border-blue-200">
    {/* Image Section */}
    <div className="h-[280px] p-4 overflow-hidden relative group rounded-t-lg">
      <img 
        src={business?.companyLogo?.imageUrl} 
        alt={service?.serviceType} 
        className="w-full h-full object-cover rounded-lg shadow-sm transform transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
    </div>
  
    {/* Content Section */}
    <div className="flex flex-col justify-center items-center p-3">
      <h3 className="text-xl font-serif font-semibold text-blue-700 line-clamp-2 w-full text-center">
        {service?.serviceType}
      </h3>
      <p className="text-md font-serif font-medium text-gray-600">
        {provider}
      </p>
    </div>
  
    {/* Footer Section */}
    <div className="flex justify-between items-center px-4 pb-4 mt-auto">
      {/* View Button */}
      <Link to={`/service-detail/${service?._id}`}>
          <div className="w-[80px] h-[40px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-md transition duration-300 flex justify-center items-center shadow-md hover:shadow-lg">
            <span className="text-md font-serif font-semibold text-white">
              View
            </span>
          </div>
        </Link>
  
      {/* Rating Badge */}
      <div className="flex items-center py-1 px-3 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 backdrop-blur-sm rounded-md shadow-sm">
          <span className="text-2xl font-serif text-yellow-500">
            <Star star={service?.rating} />
          </span>
         
        </div>
    </div>
  </div>
  
  );
};

export default ServiceCard;