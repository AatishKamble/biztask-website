import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { getJobById } from "../../Redux/Job/Action.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import timeAgo from '../timeCalculate.js';
import { API_BASE_URL } from '../../configApi/ConfigApi.js';
const PeopleApplied = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const jobStore = useSelector(store => store.jobStore);

    useEffect(() => {
        if (id) {
            dispatch(getJobById(id));
        }

    }, [id, dispatch])

   

    return (


        <div className={`bg-[#ffffff] relative flex flex-col  items-center w-full h-auto px-20 }`} >


            <div className=' w-[90%] h-[200px] bg-slate-100  drop-shadow-lg  my-10 flex items-center px-10'>


                <div className='w-full h-[180px] relative flex items-start flex-col justify-center px-10'>



                    <div className='w-full text-[30px] text-slate-800 font-serif py-2'>
                        <span className=' font-semibold px-2'>
                            {jobStore?.job?.jobRole
                            }
                        </span>

                    </div>

                    <div className='w-full text-[22px] text-slate-600 font-serif pb-2'>
                        <span className=' font-normal px-2'>
                            {
                                jobStore?.job?.business?.companyName
                            }
                        </span>

                    </div>

                    <div className='w-[400px]  h-auto text-[20px] flex justify-start items-center text-blue-950 font-serif '>
                        <span><IoLocationSharp /></span>
                        {jobStore?.job?.jobLocations?.map((location, ind) => (<span className=' font-normal px-2 text-slate-900'> {location}</span>))
                        }


                    </div>

                    <div className='w-full px-2 pt-5 flex justify-start items-center  text-[18px] text-slate-600 font-serif'>
                        <span><IoMdTime /></span>
                        <span className="text-[16px] font-serif font-normal px-2 "> {timeAgo(jobStore?.job?.postedAt)}</span>

                    </div>

                    <div className="absolute right-10 bottom-5  border-1   rounded-md flex justify-center items-center  w-[100px] h-10">
                        <Link to={`/job-detail/${jobStore?.job?._id}`}>
                            <button className='bg-[#97d2b5]  rounded-md p-[7px]  hover:bg-[#79bdba] w-auto h-auto text-slate-600  font-sans font-bold text-[18px] me-2' > Go Back</button>
                        </Link>
                    </div>
                </div>

            </div>


            <div className='w-[90%] text-[26px] text-slate-600  font-serif pb-2'>
                <span className='border-b-[2px]'>Peoples Applied</span>
            </div>


            <div className=' w-[90%] h-auto bg-slate-100  my-10 flex  '>

                {jobStore?.job?.peopleApplied.map((people, index) => {
                 
                    return (
                        <div key={index} className=' w-full h-[240px] bg-inherit border-[1px] drop-shadow-lg border-slate-400 flex items-center ' >

                            <div className='w-[180px] h-[180px]  bg-black rounded-lg mx-5'>

                                <img src={`${people?.profileImage?.ImageUrl}`} alt="profile picture" className='bg-cover w-full h-full rounded-lg' />
  </div>
                            <div className='w-full h-[180px] relative flex items-center flex-col justify-center px-10'>



                                <div className='w-full text-[22px]  text-slate-800 font-serif py-2'>
                                    <span className=' font-semibold px-2 inline-block'><IoPersonCircleOutline /></span>
                                    <span className='inline-block'>{people?.name }</span>
                                </div>

                                <div className='w-full text-[22px] text-slate-800 font-serif flex pb-2'>
                                    <span className="px-2 font-medium flex items-center"> <MdEmail /></span>

                                    <span >{people?.email }</span>
                                </div>
                                <div className='w-full text-[22px] text-slate-800 font-serif flex items-center'>
                                    <span className="px-2 font-medium flex items-center"> <FaPhone /> </span>
                                    <span >{people?.mobileNumber }</span>
                                </div>

                            </div>

                        </div>



                    )


                })


                }

            </div>



        </div>
    )
}

export default PeopleApplied