import { MdLocationOn } from "react-icons/md";
import { FaRegMoneyBillAlt, FaTools, FaUserTie } from "react-icons/fa";
import { MdOutlineAccessTime, MdHandyman } from "react-icons/md";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../configApi/ConfigApi";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SiTicktick } from "react-icons/si";
import { GrFormNextLink } from "react-icons/gr";
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
    <div className="relative w-full max-w-2xl mx-auto ">
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border-2 shadow-indigo-400  border-cyan-100  border-t-0 transition-all duration-300   overflow-hidden">

        {/* Header  */}
        <div className="relative bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_100%] font-serif animate-gradient p-[2px]">
          <div className="bg-white rounded-t-[12px] px-6 py-4">
           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Job Role Section */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <FaUserTie className="text-white text-lg sm:text-xl" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-blue-800 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                    {job?.jobRole}
                  </h2>
               
                </div>
              </div>
              
              {/* Time Badge */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-blue-50 rounded-full border border-blue-200 self-start sm:self-center flex-shrink-0">
                <MdOutlineAccessTime className="text-blue-600 text-sm sm:text-base flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-blue-700 whitespace-nowrap">
                  {timeAgo(job?.postedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>


        <div className="p-4 space-y-2  font-serif">
          {/* Business Info Section  */}
          <div className="relative  overflow-hidden">
            <div className="relative flex items-center gap-5 p-5 bg-white/60 backdrop-blur-sm rounded-2xl border border-white shadow-sm">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-md border-2 border-cyan-300 flex items-center justify-center overflow-hidden transform transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <img
                    src={business?.companyLogo?.imageUrl}
                    className="w-full h-full object-fill p-2"
                    alt="Business Logo"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
                  <SiTicktick className="text-white" size={15} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent mb-1">
                  {business?.companyName}
                </h3>
                <p className="text-sm text-slate-600 font-medium">Verified Employer</p>
              </div>
            </div>
          </div>

          {/* Key Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

            {/* Location Card */}
            <div className="bg-white border-2 border-blue-100 rounded-xl p-4 hover:border-blue-300 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center">
                  <MdLocationOn className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-xs font-serif text-blue-500 uppercase tracking-wide font-medium">Service Area</p>
                  <p className="text-lg font-serif font-bold text-blue-800">
                    {job?.jobLocations?.slice(0, 2).map(location =>
                      location.charAt(0).toUpperCase() + location.slice(1)
                    ).join(", ")}
                  </p>
                  {job?.jobLocations?.length > 2 && (
                    <p className="text-xs text-slate-500 ">+{job.jobLocations.length - 2} more</p>
                  )}
                </div>
              </div>
            </div>

            {/* Pay Rate Card */}
            <div className="bg-white border-2 border-green-100 rounded-xl p-4 hover:border-green-300 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FaRegMoneyBillAlt className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-xs font-serif text-green-600 uppercase tracking-wide font-medium">Pay Range</p>
                  <p className="text-lg font-serif font-bold text-green-700">
                    ₹{job?.minSalary} - ₹{job?.maxSalary}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <Link to={`/job-detail/${job?._id}`}>
            <div className="relative group mt-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 py-4 font-serif font-bold text-lg shadow-lg transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl text-center border-2 border-blue-600 hover:border-blue-700">
                <div className="flex items-center justify-center gap-3">
                  <span>{typeText}</span>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm"><GrFormNextLink /></span>
                  </div>
                </div>
              </div>
            </div>
          </Link>


        </div>
      </div>
    </div>
  );
}

export default JobAdvertise;