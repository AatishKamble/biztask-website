

const ServiceDetailSkeleton = () => {
    return (
        <div className='bg-[#ffffff] flex flex-col items-center w-full h-auto xl:px-20 sm:px-10 relative animate-pulse'>
            {/* Header Section */}
            <div className=" w-[96%] sm:w-full h-auto py-10 bg-gray-100 my-10 flex flex-col lg:flex-row items-center md:px-10 rounded-2xl border border-gray-200">
                <div className='w-full md:h-[180px] relative flex xl:items-start items-center flex-col justify-center md:px-10 px-4'>
                    {/* Service Title */}
                    <div className='w-full px-2 py-2'>
                        <div className='h-8 bg-gray-300 rounded-lg w-3/4 mb-2'></div>
                    </div>
                    
                    {/* Company Name */}
                    <div className='w-full px-2 pb-2'>
                        <div className='h-6 bg-gray-300 rounded-lg w-1/2 mb-2'></div>
                    </div>
                    
                    {/* Ratings */}
                    
                        
                        <div className='flex gap-1 w-full px-2 pb-3 '>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className='w-5 h-5 bg-gray-300 rounded'></div>
                            ))}
                        </div>
                    
                    
                    {/* Location */}
                    <div className='xl:w-[400px] w-full h-auto px-2'>
                     
                        <div className='h-5 bg-gray-300 rounded w-2/3'></div>
                    </div>
                </div>

                <div className="flex flex-col md:w-[600px] w-full items-center justify-center">
                    {/* Profile Image */}
                    <div className='w-[190px] h-[190px] bg-gray-300 rounded-full m-5'></div>
                    
                  
                   
                </div>
            </div>

            {/* Main Content Section */}
            <div className="2xl:w-[90%] font-serif w-full h-auto my-10 mt-5 px-2 sm:px-2 animate-pulse">
            {/* Tab Navigation Skeleton */}
            <div className="relative mb-6 sm:mb-12">
                {/* Connection Line */}
                <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 hidden sm:block"></div>

                <div className="flex justify-between items-start relative z-10 gap-2 sm:gap-4">
                    {/* Tab Skeleton Items */}
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex-1 flex flex-col items-center">
                            {/* Circle Skeleton */}
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 mb-3"></div>
                            
                            {/* Text Skeleton */}
                            <div className="text-center w-full">
                                <div className="h-4 bg-gray-200 rounded w-20 mx-auto mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-24 mx-auto hidden sm:block"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tab Content Skeleton */}
            <div className="relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl blur-3xl"></div>
                
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Top border skeleton */}
                    <div className="h-1.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                    
                    {/* Header Section Skeleton */}
                    <div className="py-6 px-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Icon skeleton */}
                                <div className="w-14 h-14 rounded-xl bg-gray-200"></div>
                                
                                <div>
                                    {/* Title skeleton */}
                                    <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                                    {/* Subtitle skeleton */}
                                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                                </div>
                            </div>
                            
                            {/* Badge skeleton */}
                            <div className="hidden sm:block h-8 w-24 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>

                    {/* Content Area Skeleton */}
                    <div className="p-6 sm:p-8">
                        {/* Content blocks */}
                        <div className="space-y-4">
                            {/* Large content block */}
                            <div className="bg-gray-100 rounded-2xl p-6 sm:p-8">
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                             </div>
                            </div>

                            {/* Additional content items */}
                            {[1, 2].map((item) => (
                                <div key={item} className="flex gap-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    {/* Icon skeleton */}
                                    <div className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0"></div>
                                    
                                    {/* Text skeleton */}
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom info box skeleton */}
                        <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shimmer effect overlay */}
            <style>{`
                @keyframes shimmer {
                    0% {
                        background-position: -1000px 0;
                    }
                    100% {
                        background-position: 1000px 0;
                    }
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
            `}</style>
        </div>

            {/* Previous Work Section */}
            <div className="w-full flex flex-col items-center py-10 px-4 md:px-10 rounded-2xl">
                {/* Section Header */}
                <div className="h-10 bg-gray-300 rounded w-64 mb-2"></div>
                <div className="h-1 bg-gray-300 rounded w-28 mb-6"></div>
                <div className="h-4 bg-gray-300 rounded  w-80 mb-6"></div>
                
                {/* Upload Form */}
                <div className="w-full max-w-xl mt-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="w-full sm:w-[65%] h-12 bg-gray-300 rounded-md"></div>
                        <div className="h-12 bg-gray-300 rounded-xl w-32"></div>
                    </div>
                </div>
            </div>

            {/* Images Grid */}
            <div className="w-full h-auto my-10 mt-4 flex flex-col md:px-5 px-2">
                <div className="w-full bg-gray-100 rounded-xl border border-gray-200 relative md:p-6 p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 md:gap-6 gap-4">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="w-full md:h-[220px] h-[140px] bg-gray-300 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className='w-full h-auto my-10 mt-0 flex flex-col bg-gray-50 rounded-xl py-4'>
                <div className="w-full md:px-6 px-4 md:py-6 py-2 mb-6">
                    <div className="xl:max-w-6xl max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
                        {/* Reviews Header */}
                        <div className="mb-6 md:mb-0 text-center md:text-left">
                            <div className="h-10 bg-gray-300 rounded w-48 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-64 mb-4"></div>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="h-8 bg-gray-300 rounded w-12"></div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Add Review Button */}
                        <div className="bg-gray-300 p-4 rounded-lg max-w-md">
                            <div className="h-6 bg-gray-400 rounded w-48 mb-2"></div>
                            <div className="h-4 bg-gray-400 rounded w-40 mb-2"></div>
                            <div className="h-10 bg-gray-400 rounded w-32 mx-auto"></div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="w-full md:px-6 px-4 mb-8">
                    <div className="xl:max-w-6xl max-w-4xl mx-auto">
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                            <div className="h-8 bg-gray-300 rounded-full w-24"></div>
                            <div className="h-8 bg-gray-300 rounded-full w-20"></div>
                        </div>

                        {/* Reviews Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="bg-gray-200 rounded-lg p-4">
                                    <div className="flex items-center mb-3">
                                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
                                        <div>
                                            <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className="w-3 h-3 bg-gray-300 rounded"></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-3 bg-gray-300 rounded w-full"></div>
                                        <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                                        <div className="h-3 bg-gray-300 rounded w-3/5"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Review Form */}
                <div className="w-full px-6 pt-4 border-t border-gray-200">
                    <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 py-8">
                        <div className="text-center mb-2">
                            <div className="h-8 bg-gray-300 rounded w-64 mb-2"></div>
                            <div className="h-1 bg-gray-300 rounded w-20 mx-auto"></div>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex flex-col items-center gap-2 w-full">
                            <div className="h-5 bg-gray-300 rounded w-48 mb-2"></div>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-7 h-7 bg-gray-300 rounded"></div>
                                ))}
                            </div>
                        </div>

                        {/* Review Textarea */}
                        <div className="w-full flex flex-col items-center gap-2">
                            <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                            <div className="w-full h-[150px] bg-gray-300 rounded-lg"></div>
                            <div className="w-full flex justify-between items-center px-2">
                                <div className="h-4 bg-gray-300 rounded w-16"></div>
                                <div className="h-10 bg-gray-300 rounded-xl w-32"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailSkeleton;