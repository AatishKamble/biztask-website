const JobDetailSkeleton = () => {
    return (
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Header Skeleton */}
        <div className="relative w-full max-w-5xl bg-white shadow-lg my-6 p-8 rounded-3xl border border-gray-200 animate-pulse">
          <div className="flex flex-col">
            {/* Job Title Skeleton */}
            <div className="h-9 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
            
            {/* Company Name Skeleton */}
            <div className="flex items-center px-2 space-x-1 mb-2">
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-1/3"></div>
            </div>
            
            {/* Location Skeleton */}
            <div className="flex items-center px-1 space-x-1 mt-2">
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
            </div>
            
            {/* Time Ago Skeleton */}
            <div className="flex items-center px-2 pt-3">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
              <div className="h-5 bg-gray-200 rounded-lg w-32 ml-2"></div>
            </div>
          </div>
          
          {/* Action Buttons Skeleton */}
          <div className="absolute right-6 bottom-6 flex items-center space-x-4">
            <div className="h-10 bg-gray-200 rounded-full w-32"></div>
          </div>
        </div>
  
        {/* Job Content Skeleton */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-6">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {/* Job Overview Skeleton */}
              <div className="flex items-center mb-4 pb-2">
                <div className="h-6 w-6 bg-gray-200 rounded-full mr-2"></div>
                <div className="h-6 bg-gray-200 rounded-lg w-40"></div>
              </div>
  
              {/* Responsibilities Skeleton */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
                  <div className="h-6 w-6 bg-gray-200 rounded-full mr-2"></div>
                  <div className="h-6 bg-gray-200 rounded-lg w-40"></div>
                </div>
  
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-5 w-5 bg-gray-200 rounded-full mt-1"></div>
                      <div className="h-5 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Skills Skeleton */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                <div className="h-6 bg-gray-200 rounded-lg w-40 mb-4 pb-2"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Company Details Skeleton */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="h-6 bg-gray-200 rounded-lg w-48 mb-4 pb-2"></div>
              <div className="h-20 bg-gray-200 rounded-lg w-full mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
                <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
  
          {/* Right Column Skeleton */}
          <div className="lg:col-span-1">
            {/* Job Details Skeleton */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-md">
              <div className="h-6 bg-gray-200 rounded-lg w-32 mb-4 pb-2"></div>
              <div className="space-y-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg mr-3"></div>
                    <div className="w-full">
                      <div className="h-4 bg-gray-200 rounded-lg w-24 mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded-lg w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Salary Details Skeleton */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
              <div className="h-6 bg-gray-200 rounded-lg w-32 mb-5 pb-3"></div>
              <div className="grid gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                      <div className="h-5 bg-gray-200 rounded-lg w-24"></div>
                    </div>
                    <div className="h-5 bg-gray-200 rounded-lg w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  export default JobDetailSkeleton;