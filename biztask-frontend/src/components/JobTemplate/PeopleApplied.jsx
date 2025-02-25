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


            <div className=' w-[90%] h-[200px] bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 shadow-xl rounded-2xl dark:border-gray-700 transition-all hover:shadow-purple-400/50 my-10 flex items-center px-10'>


                <div className='w-full h-[200px] relative flex items-start flex-col justify-center px-10'>



                    <div className='w-full text-[30px] text-white font-serif font-bold py-2'>
                        <span className=' font-semibold px-2'>
                            {jobStore?.job?.jobRole
                            }
                        </span>

                    </div>

                    <div className='w-full text-[22px] text-slate-600 font-serif pb-2'>
                        <span className='text-gray-600 dark:text-gray-300 font-serif pb-2 p font-normal px-2'>
                            {
                                jobStore?.job?.business?.companyName
                            }
                        </span>

                    </div>

                    <div className="w-[400px] h-auto text-[20px] flex items-center text-blue-700 dark:text-teal-300 font-serif">
                        <IoLocationSharp className="text-blue-500 dark:text-teal-400" />
                        {jobStore?.job?.jobLocations?.map((location, ind) => (<span className=' font-normal ps-1 text-white'> {location}{ind!=jobStore?.job?.jobLocations?.length-1?',':"" }</span>))
                        }


                    </div>

                    <div className="w-full px-2 pt-5 flex items-center text-[18px] text-gray-600 dark:text-gray-400 font-serif">
                        <IoMdTime className="text-gray-500 dark:text-gray-300" />
                        <span className="text-[16px] font-serif font-normal px-2 "> {timeAgo(jobStore?.job?.postedAt)}</span>

                    </div>

                    <div className="absolute right-10 bottom-5">
                        <Link to={`/job-detail/${jobStore?.job?._id}`}>
                            <button className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-5 py-2 rounded-lg shadow-md transition hover:scale-105 hover:from-green-500 hover:to-teal-600 font-semibold" > Go Back</button>
                        </Link>
                    </div>
                </div>

            </div>


            <div className='w-[90%] text-[26px] font-semibold text-slate-600  font-serif pb-2'>
                <span className="relative  pb-1 px-2">
    Peoples Applied
    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400"></span>
  </span>
            </div>


            <div className=' w-[90%] h-auto bg-slate-100  my-10 flex  '>

                {jobStore?.job?.peopleApplied.map((people, index) => {

                    return (
                        <div key={index} className=' w-full h-[240px] bg-inherit border-[1px] drop-shadow-lg
                          bg-white dark:bg-[#282A36]  border-gray-200 dark:border-gray-700 shadow-lg rounded-xl flex items-center p-5 transition-all ' >

                            <div className="w-[180px] h-[180px] rounded-xl overflow-hidden shadow-md border border-gray-300 dark:border-gray-600">

                                <img src={`${people?.profileImage?.ImageUrl}`} alt="profile picture" className='bg-cover w-full h-full rounded-lg' />
                            </div>
                            <div className='w-full h-[180px] relative flex items-center flex-col justify-center px-10'>



                                <div className='w-full text-[22px]  text-slate-800 font-serif py-2'>
                                    <span className=' font-semibold px-2 text-purple-600 dark:text-purple-400 inline-block'><IoPersonCircleOutline /></span>
                                    <span className='inline-block text-purple-600 dark:text-purple-400'>{people?.name}</span>
                                </div>

                                <div className='w-full text-[18px] text-slate-800 font-serif flex pb-2'>
                                    <span className="px-2 font-medium text-blue-500 dark:text-blue-400 flex items-center"> <MdEmail /></span>

                                    <span className='text-blue-500 dark:text-blue-400'>{people?.email}</span>
                                </div>
                                <div className='w-full text-[20px] text-green-600 dark:text-green-400 font-serif flex items-center'>
                                    <span className="px-2 font-medium  flex items-center"> <FaPhone /> </span>
                                    <span  >{people?.mobileNumber}</span>
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