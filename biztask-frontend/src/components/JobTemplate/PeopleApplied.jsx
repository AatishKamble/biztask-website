import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { getJobById } from "../../Redux/Job/Action.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import timeAgo from '../timeCalculate.js';
import { HiBuildingOffice2 } from 'react-icons/hi2';

import { API_BASE_URL } from '../../configApi/ConfigApi.js';
const PeopleApplied = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const jobStore = useSelector(store => store.jobStore);

    useEffect(() => {
        if (id) {
            dispatch(getJobById(id));
        }

    }, [id, dispatch])



    return (
<div className="bg-white relative flex flex-col items-center w-full h-auto px-6 md:px-10 xl:px-20">
<div className="w-full flex justify-center items-center mt-10">
  <div className="relative w-full max-w-5xl bg-gradient-to-r from-white to-blue-50 shadow-lg my-6 p-8 rounded-3xl border border-blue-100">
    <div className="flex flex-col">
   
      <h2 className="text-[34px] font-serif font-bold text-[#2E3A46] mb-2 bg-gradient-to-r from-[#1C4E80] to-[#2E86C1] bg-clip-text text-transparent">
        {jobStore?.job?.jobRole}
      </h2>

   
      <div className="flex items-center text-[#1C4E80] px-2 space-x-1">
        <HiBuildingOffice2 className="text-xl" />
        <h3 className="text-[20px] font-serif text-[#3D5060]">
          {jobStore?.job?.business?.companyName}
        </h3>
      </div>

      {/* Job Location */}
      <div className="flex items-center text-[#1C4E80] px-1 space-x-1 mt-2">
        <IoLocationSharp className="text-2xl" />
        <span className="font-serif text-[18px]">
          {jobStore?.job?.jobLocations?.slice(0, 8).map((location, ind) => {
            let formattedLocation = location.charAt(0).toUpperCase() + location.slice(1);
            if (ind !== jobStore?.job?.jobLocations?.length - 1) {
              formattedLocation += ", ";
            }
            return formattedLocation;
          })}
        </span>
      </div>

      <div className="flex items-center text-gray-700 text-[16px] px-2 pt-3">
        <IoMdTime className="text-lg text-[#0F3057]" />
        <span className="ml-2 font-serif">Posted {timeAgo(jobStore?.job?.postedAt)}</span>
      </div>

    
      <div className="absolute right-8 bottom-6">
        <Link to={`/job-detail/${jobStore?.job?._id}`}>
          <button className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-5 py-2 rounded-lg shadow-md transition hover:scale-105 hover:from-green-500 hover:to-teal-600 font-semibold">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  </div>
</div>


  {/* Title */}
  <div className="w-full max-w-7xl text-[26px] font-semibold text-slate-700 font-serif pb-4 px-4">
    <span className="relative pb-1 px-2">
      People Applied
      <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500"></span>
    </span>
  </div>

  {/* Cards */}
  <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10 px-4">
    {jobStore?.job?.peopleApplied.map((people, index) => (
      <div
        key={index}
        className="bg-white border border-gray-200 rounded-xl shadow-md flex flex-col items-center p-5 hover:shadow-lg transition"
      >
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-300 shadow-md mb-4">
          <img
            src={`${people?.profileImage?.ImageUrl}`}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center text-xl font-serif text-purple-600 mb-1">
            <IoPersonCircleOutline className="mr-2" />
            <span>{people?.name}</span>
          </div>
          <div className="flex items-center justify-center text-blue-500 text-base mb-1">
            <MdEmail className="mr-2" />
            <span>{people?.email}</span>
          </div>
          <div className="flex items-center justify-center text-green-600 text-base">
            <FaPhone className="mr-2" />
            <span>{people?.mobileNumber}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    )
}

export default PeopleApplied