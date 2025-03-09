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
<div className="relative w-full max-w-2xl mx-auto p-6 bg-gradient-to-r from-blue-300 to-blue-400 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center overflow-hidden">

{/* Left Section - Larger Circular Logo */}
<div className="relative w-full sm:w-[35%] flex flex-col items-center">
  <div className="w-[140px] h-[140px] rounded-full shadow-md overflow-hidden border-[5px] border-cyan-700 bg-white">
    <img src={`${business?.companyLogo?.imageUrl}`} className="w-full h-full object-cover" alt="Company Logo" />
  </div>
</div>

{/* Right Section - Job Details with a Wave Shape */}
<div className="w-full sm:w-[65%] bg-white px-6 py-8 rounded-tl-[60px] rounded-br-[60px] shadow-md relative overflow-hidden">

  {/* Wave Shape (For Unique Design) */}
  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4c83ff] rounded-full opacity-25"></div>

  {/* Apply Button - Fixed Position to Avoid Overlap */}
  <Link to={`/job-detail/${job?._id}`}>
    <div className="absolute top-3 right-3 bg-[#4c83ff] hover:bg-[#3968d1] text-white rounded-lg px-5 py-2 font-serif font-medium text-lg shadow-md transition duration-300">
      {typeText}
    </div>
  </Link>

  {/* Job Role & Company Name - Ensuring No Overlap */}
  <div className="mb-4">
    <p className="text-blue-900 font-serif font-bold text-[20px] sm:text-[24px] leading-tight break-words pe-20">{job?.jobRole}</p>
    <p className="text-gray-700 font-serif font-medium text-[18px] mt-1 truncate">{business?.companyName}</p>
  </div>

  {/* Job Details - Time, Location, Salary */}
  <div className="flex flex-wrap justify-between items-center mt-3 text-gray-700 font-serif text-[16px]">

    {/* Posted Time */}
    <span className="flex items-center">
      <MdOutlineAccessTime className="text-blue-700 mr-2 text-[18px]" />
      {timeAgo(job?.postedAt)}
    </span>

    {/* Job Location */}
    <span className="flex items-center w-full sm:w-auto truncate">
      <MdLocationOn className="text-blue-700 mr-2 text-[18px]" />
      {job?.jobLocations[0]}
    </span>

    {/* Salary */}
    <span className="flex items-center">
      <FaRegMoneyBillAlt className="text-green-700 mr-2 text-[18px]" />
      <span className="text-green-600 font-semibold">{job?.maxSalary}</span>
    </span>

  </div>

</div>

</div>


        </>
    )
}

export default JobAdvertise