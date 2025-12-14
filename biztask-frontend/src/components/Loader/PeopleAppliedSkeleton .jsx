const PeopleAppliedSkeleton = () => {
  return (
    <div className="bg-white min-h-screen sm:p-6 p-4 md:p-10 animate-pulse">

      {/* Job Header Skeleton */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="bg-gray-100 rounded-2xl p-8">
          <div className="h-8 w-1/3 bg-gray-300 rounded mb-4"></div>

          <div className="flex gap-6">
            <div className="h-5 w-40 bg-gray-300 rounded"></div>
            <div className="h-5 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Status Filter Skeleton */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
        ))}
      </div>

      {/* Applicants Card Skeleton Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white rounded-2xl shadow-md border p-6">
            <div className="h-24 bg-gray-200 rounded-xl mb-6"></div>

            <div className="h-5 w-2/3 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>

            <div className="flex justify-between mt-5">
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
              <div className="h-6 w-28 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PeopleAppliedSkeleton;