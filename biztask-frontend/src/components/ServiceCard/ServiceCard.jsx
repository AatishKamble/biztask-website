import React from 'react';
import { Link } from "react-router-dom";
import Star from "../Reviews/Star";

const ServiceCard = ({ business, service, provider }) => {
  return (
    <div className="w-[300px] h-[420px] bg-slate-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col">
      <div className="h-[280px] p-5 overflow-hidden">
        <img 
          src={business?.companyLogo?.imageUrl} 
          alt={service?.serviceType} 
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex flex-col justify-center items-center p-4">
        <h3 className="text-xl font-serif font-semibold text-[#323d80]">
          {service?.serviceType}
        </h3>
        <p className="text-md font-serif font-normal text-[#3b3f55]">
          {provider}
        </p>
      </div>

      <div className="flex justify-between items-center px-4 pb-4 mt-auto">
        <Link to={`/service-detail/${service?._id}`}>
          <div className="w-[80px] h-[40px] bg-slate-200 hover:border border-blue-400 rounded-md transition duration-300 flex justify-center items-center">
            <span className="text-md font-serif font-semibold text-slate-700 hover:text-blue-900">
              View
            </span>
          </div>
        </Link>
        
        <div className="flex items-center">
          <span className="text-2xl font-serif text-yellow-400">
            <Star star={service?.rating} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;