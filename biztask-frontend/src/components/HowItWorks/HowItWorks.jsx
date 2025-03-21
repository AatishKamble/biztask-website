import { TiBusinessCard } from "react-icons/ti";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdMiscellaneousServices } from "react-icons/md";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
const HowItWorks = ({ HowItWorks }) => {


  return (
    <>
     <div
  ref={HowItWorks}
  className="w-full xl:h-[600px] sm:h-[530px] px-6 lg:px-20 lg:h-[560px] my-20 flex justify-center"
>
  <div className="bg-gradient-to-r from-gray-800 via-blue-900 to-gray-800 relative h-full xl:w-[90%] rounded-3xl flex flex-col sm:w-full shadow-xl border border-gray-700">

    {/* Section Title */}
    <div className="w-full flex justify-center items-center h-24 py-10 mt-8">
      <span className="font-serif font-bold text-white text-[42px] tracking-wide drop-shadow-lg">
        How It Works
      </span>
    </div>

    {/* Steps Section */}
    <div className="w-full flex justify-between px-16 items-center h-[400px] sm:h-auto sm:grid sm:grid-cols-3 sm:px-6 gap-10 py-6">

      {/* Business Section */}
      <div className="relative flex flex-col justify-center items-center bg-blue-700 bg-opacity-30 p-6 rounded-[20px] hover:scale-105 transition-all duration-300 shadow-lg border border-blue-500 hover:shadow-blue-500/50">
        <div className="text-[50px] w-[90px] h-[90px] rounded-full bg-yellow-500 flex justify-center items-center font-serif font-bold text-white shadow-lg">
          <TiBusinessCard />
        </div>
        <span className="text-white font-serif font-bold text-[22px] pt-4">
          For Businesses
        </span>
        <ol className="text-gray-300 font-serif font-normal list-disc text-[17px] pt-2 w-[200px]">
          <li>Register Your Business.</li>
          <li>Add Your Services.</li>
          <li>Post Job Openings.</li>
        </ol>
      </div>

      {/* Workers Section */}
      <div className="relative flex flex-col justify-center items-center bg-blue-700 bg-opacity-30 p-6 rounded-[20px] hover:scale-105 transition-all duration-300 shadow-lg border border-blue-500 hover:shadow-blue-500/50">
        <div className="text-[50px] w-[90px] h-[90px] rounded-full bg-yellow-500 flex justify-center items-center font-serif font-bold text-white shadow-lg">
          <FaPeopleGroup />
        </div>
        <span className="text-white font-serif font-bold text-[22px] pt-4">
          For Workers
        </span>
        <ol className="text-gray-300 font-serif font-normal list-disc text-[17px] pt-2 w-[200px]">
          <li>Find Job Opportunities.</li>
          <li>Start Providing Services.</li>
        </ol>
      </div>

      {/* Service Seekers Section */}
      <div className="relative flex flex-col justify-center items-center bg-blue-700 bg-opacity-30 p-8 rounded-[20px] hover:scale-105 transition-all duration-300 shadow-lg border border-blue-500 hover:shadow-blue-500/50">
        <div className="text-[50px] w-[90px] h-[90px] rounded-full bg-yellow-500 flex justify-center items-center font-serif font-bold text-white shadow-lg">
          <MdMiscellaneousServices />
        </div>
        <span className="text-white font-serif font-bold text-[22px] pt-4">
          For Service Seekers
        </span>
        <ol className="text-gray-300  font-serif font-normal list-disc text-[17px] pt-2  mx-auto">
          <li>Search Services Easily.</li>
          <li>Flexible for Your Location.</li>
          <li>Apply filters.</li>
        </ol>
      </div>

    </div>
  </div>
</div>

    </>
  )
}

export default HowItWorks