import { MdLocationOn } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../configApi/ConfigApi";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';

const JobAdvertise = ({typeText,job,business}) => {
//time showing


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

  // dispatch(getBusinessById(job?.service?.bussiness));
  // const businessStore=useSelector(store=>store.businessStore);
  
  // const dispatch=useDispatch();


  // useEffect(()=>{
 
  //     dispatch(getBusinessById(job?.service?.bussiness));
  //   
    
  //   },[dispatch]);
  //   const businessStore=useSelector(store=>store.businessStore);

  return (
    <>
      <div className="relative w-full max-w-2xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-blue-200">
       {/* Left Section - Company Logo with Modern Layout */}
<div className="relative w-full sm:w-[30%] flex flex-col items-center">
  {/* Logo Container with Unique Border */}
  <div className="w-[140px] h-[140px] rounded-full shadow-lg overflow-hidden p-2 bg-gradient-to-r from-blue-200 to-blue-400">
    {/* Logo Image with Circular Mask */}
    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
      <img
        src={`${business?.companyLogo?.imageUrl}`}
        className="w-full h-full object-contain"
        alt="Company Logo"
      />
    </div>
  </div>

  {/* Company Name Below Logo */}
  <p className="text-blue-900 font-serif font-bold text-lg mt-3 text-center ">
    {business?.companyName}
  </p>
</div>
        {/* Right Section - Job Details */}
        <div className="w-full sm:w-[70%] px-6 py-4">
          {/* Job Role & Company Name */}
          <div className="mb-4">
            <p className="text-blue-900 font-serif font-semibold text-2xl leading-tight break-words">
              {job?.jobRole}
            </p>
         
          </div>
  
          {/* Job Details - Time, Location, Salary */}
          <div className="flex flex-wrap justify-between items-center mt-3 text-gray-700 font-serif text-base">
            {/* Posted Time */}
            <span className="flex items-center">
              <MdOutlineAccessTime className="text-blue-700 mr-2 text-xl" />
              {timeAgo(job?.postedAt)}
            </span>
  
            {/* Job Location */}
            <span className="flex items-center w-full sm:w-auto truncate">
              <MdLocationOn className="text-blue-700 mr-2 text-xl" />
              {job?.jobLocations[0]}
            </span>
  
            {/* Salary */}
            <span className="flex items-center">
              <FaRegMoneyBillAlt className="text-green-700 mr-2 text-xl" />
              <span className="text-green-600 font-semibold">{job?.maxSalary}</span>
            </span>
          </div>
  
          {/* Apply Button */}
          <Link to={`/job-detail/${job?._id}`}>
            <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg px-5 py-2 font-serif font-medium text-lg shadow-md transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center">
              {typeText}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default JobAdvertise