import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { json, Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobById, removeJob } from "../../Redux/Job/Action.js";
import { getBusinessById } from "../../Redux/Business/Action.js";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { applyForJob, getUserProfile } from "../../Redux/Auth/Action.js";
import timeAgo from "../timeCalculate.js";
const JobDetail = ({ userDetails,handleLogInButtonClick}) => {


    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //get job by id
    const jobStore = useSelector(store => store.jobStore);
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (id) {
            // dispatch(getUserProfile(jwt))
            dispatch(getJobById(id));
            
        }

    }, [id, dispatch])

   
    //date format
    const formatDate = (dateString) => {
        if (!dateString || isNaN(new Date(dateString).getTime())) {
            return 'Invalid date';
        }

        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };


    //time showing





    //job remove

    const handleJobRemove = () => {
        dispatch(removeJob(jwt, jobStore?.job?._id, jobStore?.job?.service?._id));
        navigate(`/service-detail/${jobStore?.job?.service?._id}`);
    }

    const [popUp, setPopUp] = useState(false);
    const handleEditProfile = () => {
       if(userDetails){
navigate('/profile-edit');
       }else{
        handleLogInButtonClick();
    }
    setPopUp(false);
    }

    const handleApply = () => {
if(userDetails){


        const formData = new FormData();
        formData.append("jobId", id);
        dispatch(applyForJob(jwt, formData));
       
        navigate(`/job-detail/${id}`);}
        else{
            handleLogInButtonClick();
        }
        setPopUp(false);
    }


    return (
        <>
            {
                popUp && <div className="bg-[#ced8d8] border-[1px] border-slate-400 w-[400px] drop-shadow-lg h-auto pb-5  fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 ">

                    <div className="w-full p-4 flex justify-center border-b-slate-400 border-[1px]">
                        <div className="absolute top-2 right-2 text-[30px] cursor-pointer hover:text-slate-600" onClick={()=>setPopUp(false)}> <span><IoIosCloseCircleOutline /></span></div>
                        <h1 className="text-[24px] font-bold text-[#df9a87]">Please Confirm !</h1>
                    </div>
                    <div className="flex justify-center flex-col items-center p-5">
                        <p className="text-[20px] text-blue-600 font-semibold">Is your Profile Details are correct ?</p>
                        <p className="text-[20px] text-blue-600 font-semibold">if not,then edit it and then apply</p>

                    </div>
                    <div className="flex justify-center p-5 gap-x-5">
                        <button className='bg-[#6163d7]  rounded-md p-2 ms-2  hover:bg-[#495fad]   w-[100px] h-auto text-white  font-sans font-bold text-[18px]' onClick={handleApply}>Apply</button>
                     
                            <button className='bg-[#51b57b]  rounded-md p-2 ms-2  hover:bg-[#0d7634]   w-[100px] h-auto text-white  font-sans font-bold text-[18px]' onClick={handleEditProfile}>Edit</button>
                      
                    </div>
                </div>
            }
            <div className={`bg-[#ffffff] relative flex flex-col  items-center w-full h-auto px-20 ${popUp ? 'blur-sm pointer-events-none' : ""}`} >




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


                    </div>
                    <div className="absolute right-10 bottom-5  border-1   rounded-md flex justify-center items-center  w-[300px] h-10">

                        {
                            userDetails?._id == jobStore?.job?.user?._id ?
                                (<div>

                                        <Link to={`/job-detail/people-applied/${jobStore?.job?._id}`}>
                                    <button className='bg-[#94b6b5]   rounded-md p-[7px]   hover:bg-[#79bdba] w-auto h-auto text-slate-600  font-sans font-bold text-[18px] me-2' >View People</button>
                                    </Link>
                                    <Link to={`/job-update/${jobStore?.job?._id}`}>
                                        <button className='bg-[#69a5b6]  rounded-md p-[7px]  hover:bg-[#4492a7] w-auto h-auto text-slate-600  font-sans font-bold text-[18px]' >Update</button>
                                    </Link>

                                    <button className='bg-[#d28d8d]  rounded-md p-2 ms-2  hover:bg-[#996767]   w-auto h-auto text-slate-600  font-sans font-bold text-[18px]' onClick={handleJobRemove} >Remove</button>
                                </div>)

                                : (
                                    userDetails?.appliedJobs.some(job => job._id == id) ? (
                                        <button className=' border-2  rounded-md p-2 ms-2  w-[100px] h-auto text-[#5c8e5e] font-sans font-semibold text-[18px]' disabled>
                                            Applied
                                        </button>
                                    ) : (
                                        <button className='bg-[#6163d7] rounded-md p-2 ms-2 hover:bg-[#495fad] w-[100px] h-auto text-white font-sans font-bold text-[18px]' onClick={()=>setPopUp(true)}>
                                            Apply
                                        </button>
                                    )
                                )
                        }
                    </div>

                </div>



                <div className=' w-[90%] h-auto  drop-shadow-lg my-10 flex px-10 gap-10'>

                    <div>
                        <div className="w-full h-12 flex items-center px-4 text-[22px] text-slate-800 font-serif   ">
                            <span className="px-2  font-semibold"> Job Overview</span>
                        </div>
                        <div className='bg-slate-100 w-[600px] h-auto p-5'>
                            <div className="w-full h-12 flex items-center px-4 text-[22px] text-slate-800 font-serif   ">
                                <span><MdOutlineDescription /></span> <span className="px-2  font-medium"> Responsibilities</span>
                            </div>
                            <div className='flex flex-col h-auto  p-4 px-10 justify-between  py-2 text-slate-900 font-serif font-medium text-[18px]'>
                                <ul className=" list-disc">
                                    {jobStore?.job?.responsibility?.map((resp, ind) => (<li className='leading-8 my-1'> {resp}</li>))
                                    }
                                </ul>


                            </div>


                        </div>


                        <div className='bg-slate-100 w-[600px] h-auto p-5 mt-8'>
                            <div className="w-full h-12 flex items-center px-4 text-[22px] text-slate-800 font-serif   ">
                                <span className="px-2  font-medium"> Skill Required </span>
                            </div>
                            <div className='flex flex-col h-auto  p-4 px-10 justify-between  py-2 text-slate-900 font-serif font-medium text-[18px]'>
                                <ul className=" list-disc">
                                    {jobStore?.job?.skillsRequired?.map((skill, ind) => (<li className='leading-8 my-1 '> {skill}</li>))
                                    }

                                </ul>

                            </div>


                        </div>







                    </div>
                    <div className=' w-[600px] h-auto p-4'>
                        <div className="bg-slate-100 py-3   w-full h-auto">
                            <div className="w-full h-12 flex items-center px-4 text-[24px] text-slate-800 font-serif   ">
                                <span className="px-2 font-semibold"> Other Details</span>
                            </div>

                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif   ">
                                <span className="px-2 font-medium"> Employment Type :</span>
                                <span className=" font-extralight">

                                    {jobStore?.job?.employmentType
                                    }

                                </span>
                            </div>

                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif   ">
                                <span className="px-2 font-medium">Experience :</span>
                                <span className=" font-extralight">


                                    {jobStore?.job?.experienceYear
                                    }
                                </span>
                            </div>



                            <div className="w-full h-auto flex py-5 flex-col items-start justify-start px-4 text-[20px] text-slate-800 font-serif   ">

                                <div>
                                    <span className="px-2 font-medium inline-block"> Working Hours:</span>
                                    <span className=" font-extralight px-2 inline-block">
                                        {jobStore?.job?.workingHours
                                        }
                                    </span></div>
                            </div>




                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif   ">
                                <span className="px-2 font-medium"> Application Deadline:</span>
                                <span className=" font-extralight">
                                    {formatDate(jobStore?.job?.deadline)
                                    }
                                </span>
                            </div>

                        </div>

                        <div className='  my-5w-full h-auto py-10'>
                            <div className=" w-full h-auto flex flex-col items-start px-4 py-10 text-[22px] text-slate-800 font-serif bg-slate-100  ">
                                <span className="px-2 text-[24px] pb-5 font-semibold"> Salary Details </span>
                                <div className="text-[20px] text-black font-serif ">
                                    <span className="px-2 font-medium"> Min Price :</span> <span className="px-2 font-extralight"> ${jobStore?.job?.minSalary}</span></div>

                                <div className="text-[20px] text-black font-serif ">
                                    <span className="px-2 font-medium"> Max Price :</span> <span className="px-2 font-extralight"> ${jobStore?.job?.maxSalary}</span></div>

                            </div>

                        </div>
                    </div>

                </div>


                <div className=' w-[90%] h-auto  drop-shadow-lg my-10 flex px-10 gap-10 '>
                    <div className='bg-slate-100 w-[900px] h-auto pb-10'>
                        <div className="w-full h-12 flex items-center px-4 text-[22px] text-slate-800 font-serif   ">
                            <span className="px-2  font-semibold"> About the Company</span>
                        </div>
                        <div className='flex flex-col h-auto  p-4 justify-between  py-2 text-slate-900 font-serif font-medium text-[18px]'>
                            <span className="">
                                {
                                    jobStore?.job?.business?.description
                                }
                            </span>



                        </div>

                        <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif   ">
                            <span className="px-2 font-medium">Service type  :</span>
                            <span className=" font-extralight">
                                {jobStore?.job?.service?.serviceType}
                            </span>
                        </div>

                        <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif   ">
                            <span className="px-2 font-medium">Email :</span>
                            <span className=" border-b-[1px] border-slate-800 font-extralight">
                                {jobStore?.job?.user?.email}
                            </span>
                        </div>

                    </div>
                </div>

            </div>




        </>
    )
}

export default JobDetail