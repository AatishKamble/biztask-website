import { MdOutlineAccessTime } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { API_BASE_URL } from "../../configApi/ConfigApi";
import timeAgo from "../timeCalculate.js";
import Star from "./Star.jsx";

const Review = ({ review, userDetails, handleReviewDelete }) => {
    return (
        <div className="relative w-[450px] min-h-[380px] bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-white rounded-3xl border-[3px] border-blue-800 shadow-2xl p-6 mt-6 transition-all duration-500 hover:scale-105 hover:shadow-blue-600/40 group">

            {/* Floating Profile Image */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full border-4 border-blue-500 overflow-hidden shadow-lg rotate-[6deg] group-hover:rotate-0 transition-all duration-300">
                <img
                    src={review?.user?.profileImage?.ImageUrl}
                    alt="User"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Review Content */}
            <div className="mt-16 px-4 text-center font-serif">
                {/* Message */}
                <p className="text-[17px] italic font-medium leading-relaxed bg-white/10 p-4 rounded-xl border border-white/20 shadow-inner">
                    "{review?.ReviewMessage}"
                </p>

                {/* Star */}
                <div className="flex justify-center items-center mt-4">
                    <Star star={review?.rating} />
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-6 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                        <MdOutlineAccessTime className="text-blue-200" />
                        {timeAgo(review?.postedAt)}
                    </span>
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold text-gray-100">{review?.user?.name}</p>
                        {review?.user?._id === userDetails?._id  && (
                            <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wide">
                               User
                            </span>
                        )}
                    </div>

                </div>
            </div>

            {/* Delete Button */}
            {review?.user?._id === userDetails?._id && (
                <button
                    onClick={() => handleReviewDelete(review?._id)}
                    className="absolute bottom-4 right-4 text-red-400 hover:text-red-600 transition duration-300"
                    title="Delete Review"
                >
                    <RiDeleteBin2Fill size={28} />
                </button>
            )}
        </div>
    );
};

export default Review;
