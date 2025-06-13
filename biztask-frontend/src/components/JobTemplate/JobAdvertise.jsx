import { MdLocationOn } from "react-icons/md";
import { FaRegMoneyBillAlt, FaTools, FaUserTie } from "react-icons/fa";
import { MdOutlineAccessTime, MdHandyman } from "react-icons/md";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../configApi/ConfigApi";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-cyan-100 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl overflow-hidden">

        {/* Header Strip */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 p-1">
          <div className="bg-white rounded-lg mx-1 my-1 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center">
                 <FaUserTie className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-blue-800 leading-tight">
                    {job?.jobRole}
                  </h2>
                    </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-cyan-600">
                  <MdOutlineAccessTime className="text-sm" />
                  <span className="text-sm font-serif font-medium">
                    {timeAgo(job?.postedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Business Info Section */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100">
            <div className="w-16 h-16 relative flex-shrink-0">
              <div className="w-full h-full bg-white rounded-xl shadow-md border-2 border-cyan-200 flex items-center justify-center overflow-hidden">
                <img
                  src={`${business?.companyLogo?.imageUrl}`}
                  className="w-full h-full object-contain p-1"
                  alt="Business Logo"
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-serif font-bold text-blue-700 mb-1">
                {business?.companyName}
              </h3>
              
            </div>
          </div>

          {/* Key Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

            {/* Location Card */}
            <div className="bg-white border-2 border-blue-100 rounded-xl p-4 hover:border-blue-300 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                  <MdLocationOn className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs font-serif text-blue-500 uppercase tracking-wide font-medium">Service Area</p>
                  <p className="text-lg font-serif font-bold text-blue-800">
                    {job?.jobLocations?.slice(0, 2).map(location =>
                      location.charAt(0).toUpperCase() + location.slice(1)
                    ).join(", ")}
                  </p>

                </div>
              </div>
            </div>

            {/* Pay Rate Card */}
            <div className="bg-white border-2 border-green-100 rounded-xl p-4 hover:border-green-300 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-cyan-100 rounded-xl flex items-center justify-center">
                  <FaRegMoneyBillAlt className="text-green-600 text-xl" />
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
            <div className="relative group">
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

          {/* Trust Indicators */}
          <div className="mt-4 flex justify-center gap-6 text-xs font-serif text-blue-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Local Business</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Quick Response</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span>Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobAdvertise;