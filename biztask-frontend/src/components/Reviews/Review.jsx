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

            <div className='bg-[#ffffff]  border-[1px] border-[#8895ab]  w-[600px] h-auto h-min-[400px] rounded-2xl border-l-4 border-t-4 border-t-yellow-500 border-l-[#b3a8d3] flex justify-center items-center'>

                    
                <div className='flex flex-col justify-center items-center '>
                    <div className=' bg-slate-300 w-[150px] h-[150px] rounded-full ms-2'>
                        <img src={`${API_BASE_URL}/api/images/${review?.user?.profileImage}`} alt="" className="w-full h-full rounded-full bg-cover" />
                    </div>

                </div>




                <div className='w-[70%] relative h-full px-4 bg-[#ffffff] rounded-2xl flex flex-col justify-center '>


{
    review?.user?._id===userDetails?._id &&<div className="absolute w-auto flex items-center top-2 right-4 ">
    <span className="text-slate-800 p-2  hover:bg-red-200 me-2 cursor-pointer" onClick={()=>handleReviewDelete(review?._id)}>
      <RiDeleteBin2Fill size={24} className="text-red-700"/>
    </span>
   
</div>

}
                

                    <div className='flex justify-between h-auto my-10 text-slate-900 font-serif font-medium text-[16px]'>
                        <span className="flex justify-center items-center">
                            {
                                review?.ReviewMessage
                            }
                        </span>


                    </div>
                    <div className='flex  py-2 text-slate-900 font-serif font-medium text-[16px]'>
                        <span className="flex justify-center items-center">
                            <Star star={review?.rating} />
                        </span>


                    </div>
                    <div className='flex justify-between w-inherit py-2 pe-5 text-gray-600 font-serif font-medium text-[14px]'>
                        <span className="flex justify-center items-center">
                            <span className=" text-slate-900 pe-1"><MdOutlineAccessTime /></span>{timeAgo(review?.postedAt)}
                        </span>
                        <p className=' text-blue-950 font-serif font-medium text-[16px] pt-2'>
                            <span> {review?.user?.name}</span>
                        </p>

                    </div>


                </div>


            </div>

        </>
    )
}

export default Review