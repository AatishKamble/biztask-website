const ApplicantModalSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl mx-auto animate-pulse">

      {/* Top Banner */}
      <div className="h-48 bg-gray-200 rounded-t-3xl relative">
        <div className="absolute top-4 left-4 h-8 w-64 bg-gray-300 rounded"></div>
        <div className="absolute top-4 right-4 h-10 w-36 bg-gray-300 rounded"></div>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center -mt-16">
        <div className="h-32 w-32 bg-gray-300 rounded-full border-4 border-white"></div>
      </div>

      <div className="p-8">
        <div className="h-7 w-1/3 bg-gray-300 rounded mx-auto mb-3"></div>
        <div className="h-5 w-1/4 bg-gray-200 rounded mx-auto mb-6"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="bg-gray-100 p-6 rounded-xl space-y-4">
              <div className="h-5 w-40 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="h-6 w-44 bg-gray-300 rounded mb-4"></div>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-8 w-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="h-12 w-40 bg-gray-300 rounded-xl"></div>
        </div>
      </div>

    </div>
  );
};

export default ApplicantModalSkeleton;