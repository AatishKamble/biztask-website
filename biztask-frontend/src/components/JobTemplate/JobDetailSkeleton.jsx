import React from "react";

const JobDetailSkeleton = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Job Header Card Skeleton */}
      <div className="w-full bg-white shadow-lg my-2 p-8 rounded-3xl border border-blue-100 animate-pulse">
        <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-2"></div>
        
        {/* Company Name */}
        <div className="flex items-center px-2 space-x-2 mb-2 mt-3">
          <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
          <div className="h-5 bg-gray-200 rounded-md w-1/3"></div>
          <div className="h-5 bg-gray-200 rounded-full w-24"></div>
        </div>
        
        {/* Job Location */}
        <div className="flex items-start px-1 space-x-1 mt-4">
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
        </div>
        
        {/* Time Ago */}
        <div className="flex items-center px-2 pt-3">
          <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
          <div className="h-5 bg-gray-200 rounded-md w-32 ml-2"></div>
        </div>
        
        {/* Quick highlights */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="h-8 bg-gray-200 rounded-full w-28"></div>
          <div className="h-8 bg-gray-200 rounded-full w-24"></div>
          <div className="h-8 bg-gray-200 rounded-full w-32"></div>
          <div className="h-8 bg-gray-200 rounded-full w-36"></div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-4 justify-end">
          <div className="h-10 bg-gray-200 rounded-xl w-32"></div>
          <div className="h-10 bg-gray-200 rounded-xl w-32"></div>
        </div>
      </div>
      
      {/* Job Content */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-6">
        {/* Left Column - Job Overview */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
              <div className="h-6 bg-gray-200 rounded-md w-48"></div>
            </div>
            
            {/* Responsibilities */}
            <div className="bg-white border border-blue-100 rounded-xl p-6 mb-6 shadow-md">
              <div className="flex items-center mb-4 pb-2 border-b border-blue-200">
                <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                <div className="h-6 bg-gray-200 rounded-md w-36"></div>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <div className="h-5 w-5 bg-gray-200 rounded-full mt-1"></div>
                    <div className="h-6 bg-gray-200 rounded-md w-full"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Skills Required */}
            <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4 pb-2 border-b border-blue-200">
                <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                <div className="h-6 bg-gray-200 rounded-md w-36"></div>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="h-8 bg-gray-200 rounded-full w-24"></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Community Impact Section */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 rounded-xl p-6 mb-6 shadow-md">
            <div className="h-6 bg-gray-200 rounded-md w-48 mb-4"></div>
            <div className="h-16 bg-gray-200 rounded-md w-full mb-4"></div>
            
            <div className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="h-5 w-5 bg-gray-200 rounded-full mr-2"></div>
                <div className="h-5 bg-gray-200 rounded-md w-36"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded-md w-full pl-7"></div>
            </div>
          </div>
          
          {/* Company Details */}
          <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4 pb-2 border-b border-blue-200">
              <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
              <div className="h-6 bg-gray-200 rounded-md w-48"></div>
            </div>
            
            <div className="h-20 bg-gray-200 rounded-md w-full mb-6"></div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex items-center">
                <div className="h-5 bg-gray-200 rounded-md w-24 mr-2"></div>
                <div className="h-6 bg-gray-200 rounded-full w-28"></div>
              </div>
              
              <div className="flex items-center">
                <div className="h-5 bg-gray-200 rounded-md w-20 mr-2"></div>
                <div className="h-5 bg-gray-200 rounded-md w-36"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Job Details */}
        <div className="lg:col-span-1">
          {/* Job Details Card */}
          <div className="bg-white border border-blue-100 rounded-xl p-6 mb-6 shadow-md">
            <div className="flex items-center mb-4 pb-2 border-b border-blue-200">
              <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
              <div className="h-6 bg-gray-200 rounded-md w-32"></div>
            </div>
            
            <div className="space-y-5">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start">
                  <div className="h-10 w-10 bg-gray-200 rounded-lg mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded-md w-28 mb-2"></div>
                    <div className="h-5 bg-gray-200 rounded-md w-36"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Salary Details Card */}
          <div className="bg-white border border-blue-100 rounded-xl p-6 mb-6 shadow-md">
            <div className="flex items-center mb-4 pb-2 border-b border-blue-200">
              <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
              <div className="h-6 bg-gray-200 rounded-md w-36"></div>
            </div>
            
            <div className="grid gap-6">
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-5 bg-gray-200 rounded-md w-20"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded-md w-16"></div>
              </div>
              
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-5 bg-gray-200 rounded-md w-20"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded-md w-16"></div>
              </div>
            </div>
          </div>
          
          {/* Location Service Area Card */}
          <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4 pb-2 border-b border-blue-200">
              <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
              <div className="h-6 bg-gray-200 rounded-md w-28"></div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
              <div className="h-5 bg-gray-200 rounded-md w-64 mb-2"></div>
              <div className="flex flex-wrap gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="h-6 bg-gray-200 rounded-full w-20"></div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 mt-6">
              <div className="h-5 bg-gray-200 rounded-md w-48 mx-auto mb-3"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailSkeleton;