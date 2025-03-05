import { MdOutlineAccessTime } from "react-icons/md";
import { API_BASE_URL } from "../../configApi/ConfigApi";
import timeAgo from "../timeCalculate.js";
import Star from "./Star.jsx";
import { MdOutlineUpdate } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";


const Review = ({ review,userDetails,handleReviewDelete}) => {

    
  
    return (
        <>

<div className="relative bg-[#0f172a] text-[#e2e8f0] mt-5 w-[450px] min-h-[360px] p-6 rounded-[30px] border-[3px] border-[#1e3a8a] shadow-2xl transform transition-all duration-500 hover:scale-105 hover:border-[#2563eb] hover:shadow-[#7333ea]/50">

{/* Floating Hexagonal Profile Image */}
<div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] bg-[#1e3a8a] rounded-md overflow-hidden border-[4px] border-[#2563eb] shadow-md rotate-[6deg]">
    <img src={`${review?.user?.profileImage?.ImageUrl}`} alt="User" className="w-full h-full object-cover" />
</div>

{/* Review Content */}
<div className="mt-16 px-4 font-serif text-center">

    {/* Review Message */}
    <p className="text-lg font-medium leading-relaxed italic bg-white bg-opacity-10 p-4 rounded-lg border border-white/20 shadow-md">
        "{review?.ReviewMessage}"
    </p>

    {/* Star Rating */}
    <div className="flex justify-center items-center gap-2 mt-4">
        <Star star={review?.rating} />
    </div>

    {/* Footer (Time & User Name) */}
    <div className="flex justify-between items-center text-sm text-gray-300 mt-6">
        <span className="flex items-center gap-1">
            <MdOutlineAccessTime className="text-[#2563eb]" />
            {timeAgo(review?.postedAt)}
        </span>
        <p className="text-lg font-semibold text-[#2563eb]">{review?.user?.name}</p>
    </div>
</div>

{/* Delete Icon (only for the user) */}
{review?.user?._id === userDetails?._id && (
    <div className="absolute bottom-3 right-4">
        <span className="p-2 rounded-full  text-white hover:text-red-700 cursor-pointer transition duration-300"
              onClick={() => handleReviewDelete(review?._id)}>
            <RiDeleteBin2Fill size={30} />
        </span>
    </div>
)}
</div>

        </>
    )
}

export default Review