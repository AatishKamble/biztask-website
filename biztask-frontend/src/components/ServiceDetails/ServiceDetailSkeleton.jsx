

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
            <div className="2xl:w-[90%] sm:w-full h-auto my-10 mt-5 flex flex-col xl:flex-row gap-10 px-2 sm:px-2">
                {/* Left Section */}
                <div className="flex flex-col xl:w-2/3 gap-5">
                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-300">
                        <div className="h-12 bg-gray-300 rounded-t-lg w-24 mr-4"></div>
                        <div className="h-12 bg-gray-300 rounded-t-lg w-24 mr-4"></div>
                        <div className="h-12 bg-gray-300 rounded-t-lg w-24"></div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-5 bg-gray-100 border border-gray-200 rounded-xl">
                        <div className="w-full flex items-center pb-3 border-b border-gray-300">
                            <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
                            <div className="h-6 bg-gray-300 rounded w-48"></div>
                        </div>
                        
                        {/* Content Lines */}
                        <div className="mt-4 space-y-3">
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Contact Info */}
                <div className="flex xl:w-1/3">
                    <div className="w-full bg-gray-100 rounded-xl p-6 border border-gray-200">
                        {/* Contact Header */}
                        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                        
                        {/* Contact Items */}
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-gray-300 rounded mr-3"></div>
                                <div className="h-5 bg-gray-300 rounded w-32"></div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-gray-300 rounded mr-3"></div>
                                <div className="h-5 bg-gray-300 rounded w-40"></div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-gray-300 rounded mr-3"></div>
                                <div className="h-5 bg-gray-300 rounded w-36"></div>
                            </div>
                        </div>
                        
                        {/* Contact Button */}
                        <div className="mt-6 h-12 bg-gray-300 rounded-xl w-full"></div>
                    </div>
                </div>
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