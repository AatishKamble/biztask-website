import { MdOutlineAccessTime } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import timeAgo from "../timeCalculate.js";
import Star from "./Star.jsx";

const ServiceReview = ({ review, userDetails, handleReviewDelete }) => {
  return (
    <div className=" font-serif  w-full h-full bg-gradient-to-br from-white to-blue-50  rounded-lg shadow-md p-6 mb-4 border border-blue-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start">
        {/* User Profile Section */}
        <div className="mr-4 flex flex-col justify-center items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
            <img
              src={review?.user?.profileImage?.ImageUrl}
              alt={review?.user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {review?.user?._id === userDetails?._id  && (
                  <span className=" bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                    You
                  </span>
                )}
        </div>

        {/* Review Content */}
        <div className="flex-1">
          {/* Header with name and rating */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="flex items-center">
                <h4 className="font-medium text-gray-800">{review?.user?.name}</h4>
               
                <div className="ml-2 flex items-center text-green-600 text-xs">
                  <FaCheckCircle className="mr-1" />
                  <span>Verified User</span>
                </div>
              </div>
              <div className="flex items-center text-gray-500 text-xs mt-1">
                <MdOutlineAccessTime className="mr-1" />
                <span>{timeAgo(review?.postedAt)}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Star star={review?.rating} />
              {review?.user?._id === userDetails?._id  && (
                <button
                  onClick={() => handleReviewDelete(review?._id)}
                  className="mt-2 text-gray-400 hover:text-red-500 transition duration-200"
                  title="Delete Review"
                >
                  <RiDeleteBin2Fill size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Review Message */}
          <div className="mt-2">
            <p className="text-sm  font-normal  leading-relaxed  p-4 rounded-xl font-serif  ">{review?.ReviewMessage}</p>
          </div>

          {/* Service Tags/Context */}
          <div className="mt-4 flex flex-wrap gap-2 font-medium">
            <span className="bg-gray-100 text-gray-600 text-xs px-4 py-1 rounded-full">
              Service Used
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs px-4 py-1 rounded-full">
              Recommended
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceReview;