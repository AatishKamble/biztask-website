import { MdLocationOn } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../configApi/ConfigApi";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';

const JobAdvertise = ({typeText,job,business}) => {
//time showing


const timeAgo = (postedAt) => {
    const now = new Date();
    const postedDate = new Date(postedAt);
    const diffInMilliseconds = now - postedDate;

    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
  
    if (diffInMonths > 0) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      return `Today`;
    }
  };

  // dispatch(getBusinessById(job?.service?.bussiness));
  // const businessStore=useSelector(store=>store.businessStore);
  
  // const dispatch=useDispatch();


  // useEffect(()=>{
 
  //     dispatch(getBusinessById(job?.service?.bussiness));
  //   
    
  //   },[dispatch]);
  //   const businessStore=useSelector(store=>store.businessStore);

    return (
        <>
            <div className='bg-[#ffffff] border-[1px] border-[#8895ab]  w-full h-[200px] rounded-2xl border-l-4 border-l-[#27038d] flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center w-[20%]'>
                    <div className=' bg-slate-300 w-[100px] h-[100px] rounded-full '>
<img src={`${business?.companyLogo?.imageUrl}`} className=" bg-cover w-full h-full rounded-full" alt="service logo" />
                    </div>
                   
                </div>




                <div className='w-[80%] relative h-full px-4 bg-[#ffffff] rounded-2xl flex flex-col justify-center '>
                    <Link to={`/job-detail/${job?._id}`}><div className="absolute right-5 top-5  border-1 border-[#143670] hover:bg-[#628edc] rounded-md flex justify-center items-center bg-[#7692c2] w-28 h-10">
                    <p className=' text-[#262837] font-serif font-medium text-[24px] cursor-pointer '>
                      {typeText}
                    </p>
                    </div></Link>
                    <p className=' text-blue-950 font-serif font-medium text-[24px] pt-5'>
                       {job?.jobRole}
                    </p>
                    <div className=' text-blue-950 w-[400px] h-5 pt-3  font-serif font-normal text-[18px]'>
                    <span className=' text-gray-600 font-serif font-normal text-[20px] py-5'>  {business?.companyName }</span>
                 
                      </div>
                    <div className='flex justify-between w-[400px] py-10 text-gray-600 font-serif font-medium text-[20px]'>
                        <span className="flex justify-center items-center">
                            <span className=" text-slate-900 pe-1"><MdOutlineAccessTime /></span>{timeAgo(job?.postedAt)}
                        </span>
                        <span className="flex justify-center items-center">
                            <span className=" text-slate-900 pe-1"><MdLocationOn /></span>{job?.jobLocations[0]}
                        </span>
                        <span className="flex justify-center items-center">
                            <span className=" text-slate-900 pe-1"><FaRegMoneyBillAlt />
                            </span> <span className=" text-red-500">{job?.maxSalary
}</span>
                        </span>

                    </div>

                </div>


            </div>


        </>
    )
}

export default JobAdvertise