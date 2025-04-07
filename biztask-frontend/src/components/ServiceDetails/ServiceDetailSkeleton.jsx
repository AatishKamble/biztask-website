import React from 'react';
import { motion } from "framer-motion";

const ServiceDetailSkeleton = () => {
  return (
    <div className='bg-[#ffffff] flex flex-col items-center w-full h-auto xl:px-20 sm:px-10 relative'>
      {/* Main Info Card Skeleton */}
      <div className="2xl:w-[90%] sm:w-full h-auto py-10 bg-white/30 backdrop-blur-lg shadow-lg my-10 flex flex-col lg:flex-row items-center px-10 rounded-2xl border border-gray-300">
        <div className='w-full h-[180px] relative flex items-start flex-col justify-center px-10'>
          {/* Service Type Skeleton */}
          <div className='w-full py-2'>
            <div className='h-8 w-48 bg-gray-200 animate-pulse rounded-md'></div>
          </div>

          {/* Company Name Skeleton */}
          <div className='w-full pb-2'>
            <div className='h-6 w-64 bg-gray-200 animate-pulse rounded-md'></div>
          </div>

          {/* Ratings Skeleton */}
          <div className='w-full px-2 pb-5 flex justify-start items-center'>
            <span className='h-6 w-20 bg-gray-200 animate-pulse rounded-md mr-2'></span>
            <span className='h-6 w-28 bg-gray-200 animate-pulse rounded-md'></span>
          </div>

          {/* Location Skeleton */}
          <div className='w-[400px] h-auto flex justify-start items-center px-2'>
            <span className='h-6 w-6 bg-gray-200 animate-pulse rounded-full mr-2'></span>
            <span className='h-6 w-64 bg-gray-200 animate-pulse rounded-md'></span>
          </div>
        </div>

        <div className="flex flex-col w-[600px] items-center justify-center">
          {/* Profile Image Skeleton */}
          <div className='w-[190px] h-[180px] shadow-lg shadow-white border-cyan-600 border-4 rounded-full m-5 bg-gray-200 animate-pulse'></div>

          {/* Button Skeletons */}
          <div>
            <div className='inline-block h-10 w-32 bg-gray-200 animate-pulse rounded-md mr-2'></div>
            <div className='inline-block h-10 w-24 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='inline-block h-10 w-24 bg-gray-200 animate-pulse rounded-md ml-2'></div>
          </div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="2xl:w-[90%] sm:w-full h-auto drop-shadow-lg my-10 mt-5 flex flex-col xl:flex-row gap-10 px-6 sm:px-2">
        {/* Left Section */}
        <div className="flex flex-col xl:w-2/3 gap-6">
          {/* Description Section Skeleton */}
          <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl p-6 transition-all">
            <div className="w-full flex items-center pb-3 border-b border-blue-300">
              <div className='h-6 w-6 bg-gray-200 animate-pulse rounded-full mr-2'></div>
              <div className='h-6 w-32 bg-gray-200 animate-pulse rounded-md'></div>
            </div>
            <div className="p-4">
              <div className='h-4 w-full bg-gray-200 animate-pulse rounded-md mb-2'></div>
              <div className='h-4 w-full bg-gray-200 animate-pulse rounded-md mb-2'></div>
              <div className='h-4 w-3/4 bg-gray-200 animate-pulse rounded-md mb-2'></div>
              <div className='h-4 w-full bg-gray-200 animate-pulse rounded-md mb-2'></div>
              <div className='h-4 w-5/6 bg-gray-200 animate-pulse rounded-md'></div>
            </div>
          </div>

          {/* Features Section Skeleton */}
          <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl p-6 transition-all">
            <div className="w-full flex items-center pb-3 border-b border-blue-300">
              <div className='h-6 w-6 bg-gray-200 animate-pulse rounded-full mr-2'></div>
              <div className='h-6 w-24 bg-gray-200 animate-pulse rounded-md'></div>
            </div>
            <ul className="flex flex-col gap-3 p-4">
              {[...Array(5)].map((_, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className='h-5 w-5 bg-gray-200 animate-pulse rounded-full'></div>
                  <div className='h-5 w-5/6 bg-gray-200 animate-pulse rounded-md'></div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex md:flex-col gap-6">
          {/* Contact Details Skeleton */}
          <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl p-6 w-full flex flex-col sm:flex-row gap-6 items-center">
            {/* Profile Image Skeleton */}
            <div className="w-[140px] h-[160px] sm:w-[160px] sm:h-[200px] rounded-xl overflow-hidden border-2 border-blue-300 bg-gray-200 animate-pulse"></div>

            {/* Contact Info Skeleton */}
            <div className="flex flex-col gap-4 w-full">
              <div className='h-6 w-36 bg-gray-200 animate-pulse rounded-md'></div>
              <div className="flex items-center gap-2">
                <div className='h-6 w-6 bg-gray-200 animate-pulse rounded-full'></div>
                <div className='h-6 w-32 bg-gray-200 animate-pulse rounded-md'></div>
              </div>
              <div className="flex items-center gap-2">
                <div className='h-6 w-6 bg-gray-200 animate-pulse rounded-full'></div>
                <div className='h-6 w-48 bg-gray-200 animate-pulse rounded-md'></div>
              </div>
              <div className="flex items-center gap-2">
                <div className='h-6 w-6 bg-gray-200 animate-pulse rounded-full'></div>
                <div className='h-6 w-56 bg-gray-200 animate-pulse rounded-md'></div>
              </div>
              <div className='h-10 w-32 bg-gray-200 animate-pulse rounded-md'></div>
            </div>
          </div>

          {/* Pricing Details Skeleton */}
          <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl p-6 w-full">
            <div className='h-6 w-36 bg-gray-200 animate-pulse rounded-md mb-4'></div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between bg-sky-50 border border-blue-200 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className='h-8 w-8 bg-gray-200 animate-pulse rounded-full'></div>
                  <div className='h-6 w-24 bg-gray-200 animate-pulse rounded-md'></div>
                </div>
                <div className='h-6 w-16 bg-gray-200 animate-pulse rounded-md'></div>
              </div>
              <div className="flex items-center justify-between bg-sky-50 border border-blue-200 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className='h-8 w-8 bg-gray-200 animate-pulse rounded-full'></div>
                  <div className='h-6 w-24 bg-gray-200 animate-pulse rounded-md'></div>
                </div>
                <div className='h-6 w-16 bg-gray-200 animate-pulse rounded-md'></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Work Skeleton */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col items-center py-10 px-4 md:px-10 rounded-2xl"
      >
        <div className='h-8 w-48 bg-gray-200 animate-pulse rounded-md mb-4'></div>
       
        <div className='h-4 w-full max-w-xl bg-gray-200 animate-pulse rounded-md mb-10'></div>

        {/* Image Grid Skeleton */}
        <div className="w-full bg-white border-y border-slate-300 rounded-xl relative p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="h-[200px] bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Reviews Section Skeleton */}
      <div className='w-full h-auto relative my-10 mt-0 flex flex-col px-5 bg-white rounded-xl py-8 pt-0'>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center gap-8 py-10 px-4 md:px-10"
        >
          {/* Heading Skeleton */}
          <div className="text-center mb-2">
            <div className='h-8 w-48 bg-gray-200 animate-pulse rounded-md mx-auto mb-2'></div>
         
            <div className='h-4 w-64 bg-gray-200 animate-pulse rounded-md mx-auto'></div>
          </div>

          {/* Review Cards Skeleton */}
          <div className="w-full grid md:grid-cols-3 gap-4 py-10 px-1">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="p-5 rounded-lg shadow-md border border-gray-200 h-64">
                <div className="flex items-center mb-4">
                  <div className='h-12 w-12 bg-gray-200 animate-pulse rounded-full mr-3'></div>
                  <div className='h-6 w-32 bg-gray-200 animate-pulse rounded-md'></div>
                </div>
                <div className='h-4 w-24 bg-gray-200 animate-pulse rounded-md mb-4'></div>
                <div className='h-4 w-full bg-gray-200 animate-pulse rounded-md mb-2'></div>
                <div className='h-4 w-full bg-gray-200 animate-pulse rounded-md mb-2'></div>
                <div className='h-4 w-3/4 bg-gray-200 animate-pulse rounded-md'></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ServiceDetailSkeleton;