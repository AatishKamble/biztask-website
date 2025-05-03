import { MdLocationOn } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../configApi/ConfigApi";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const JobAdvertise = ({ typeText, job, business }) => {
  // Time showing function
  const timeAgo = (postedAt) => {
    const now = new Date();
    const postedDate = new Date(postedAt);
    const diffInMilliseconds = now - postedDate;

    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInMonths > 0) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      return `Today`;
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto  overflow-hidden rounded-3xl shadow-md border border-blue-100 transition-all duration-300 hover:shadow-xl hover:border-blue-300 bg-white">
      {/* Decorative accent bar at top */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500"></div>
      
      <div className="flex flex-col sm:flex-row p-6 gap-6">
        {/* Left Section - Company Logo */}
        <div className="flex flex-col items-center sm:w-[30%]">
          {/* Logo Container */}
          <div className="w-[140px] h-[140px] relative">
            {/* Background design elements */}
            <div className="absolute inset-0 rounded-full shadow-lg bg-gradient-to-br from-blue-200 to-blue-400 p-2">
              {/* Logo Image with Circular Mask */}
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                <img
                  src={`${business?.companyLogo?.imageUrl}`}
                  className="w-full h-full object-contain"
                  alt="Company Logo"
                />
              </div>
            </div>
          </div>

          {/* Company Name */}
          <h3 className="mt-4 text-blue-800 font-serif font-bold text-lg text-center  max-w-full">
            {business?.companyName}
          </h3>
        </div>

        {/* Right Section - Job Details */}
        <div className="flex-1 font-serif">
          {/* Job Role - Bold and prominent */}
          <h2 className="text-2xl font-serif font-bold text-blue-900 leading-tight mb-2">
            {job?.jobRole}
          </h2>

          {/* Divider */}
          <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 to-blue-100 rounded mb-4"></div>

         
          <div className="flex flex-col gap-4 my-4">
            {/*  Time Posted and Location */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Posted Time */}
              <div className="flex items-center gap-2 group">
                <div className="p-2 rounded-full bg-blue-200 group-hover:bg-blue-300 transition-colors">
                  <MdOutlineAccessTime className="text-blue-700 text-xl" />
                </div>
                <span className="text-blue-800 font-medium text-base">
                  {timeAgo(job?.postedAt)}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 group">
                <div className="p-2 rounded-full bg-blue-200 group-hover:bg-blue-300 transition-colors">
                  <MdLocationOn className="text-blue-700 text-xl" />
                </div>
                <span className="text-blue-800 font-medium text-base truncate">
                  {job?.jobLocations?.[0]?.charAt(0).toUpperCase() + job?.jobLocations?.[0]?.slice(1)}
                </span>
              </div>
            </div>
            
            {/*  Salary Range */}
            <div className="flex items-center gap-2 group">
              <div className="p-2 rounded-full bg-green-200 group-hover:bg-green-300 transition-colors">
                <FaRegMoneyBillAlt className="text-green-700 text-xl" />
              </div>
              <span className="text-green-700 font-medium text-base">
                {job?.minSalary} - {job?.maxSalary}
              </span>
            </div>
          </div>

          {/* Apply Button */}
          <Link to={`/job-detail/${job?._id}`}>
            <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg px-5 py-2 font-serif font-medium text-lg shadow-md transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center">
              {typeText}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobAdvertise;