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
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { applyForJob, getUserProfile } from "../../Redux/Auth/Action.js";
import timeAgo from "../timeCalculate.js";
import { HiBellAlert } from "react-icons/hi2";
import PopUp from "../PopUp/PopUp.jsx";
import Loader from "../Loader/Loader.jsx";
import DetailLoader from "../Loader/DetailLoader.jsx"
const JobDetail = ({ userDetails, handleLogInButtonClick }) => {


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

    return date.toISOString().split("T")[0].split("-").reverse().join("/");
  };






  //job remove

  const handleJobRemove = () => {
    dispatch(removeJob(jwt, jobStore?.job?._id, jobStore?.job?.service?._id));
    navigate(`/service-detail/${jobStore?.job?.service?._id}`);
  }

  const [popUp, setPopUp] = useState(false);
  const handleEditProfile = () => {
    if (userDetails) {
      navigate('/profile-edit');
    } else {
      handleLogInButtonClick();
    }
    setPopUp(false);
  }

  const handleApply = () => {
    if (userDetails) {


      const formData = new FormData();
      formData.append("jobId", id);
      dispatch(applyForJob(jwt, formData));

      navigate(`/job-detail/${id}`);
    }
    else {
      handleLogInButtonClick();
    }
    setPopUp(false);
  }


  //remove popUp
  const [popupwarning, setPopupWarning] = useState(false);

  const handlePopupWarningOpen = () => {

    setPopupWarning(true);
  };

  const handlePopupWarningClose = () => {
    setPopupWarning(false);

  };

  const isLoading = useSelector(store => store.jobStore.isLoading);


  return (
    <>

      {
        popUp &&
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 animate-fadeIn"></div>

      }
      {
        popUp && <div className="bg-slate-100 border-[1px] border-slate-400 w-[800px] drop-shadow-lg h-auto pb-5  fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transform  backdrop-blur-lg animate-scaleIn z-50 ">

          <div className="w-full p-4 flex justify-center items-center border-b-slate-400 border-[1px]">
            <span className="text-3xl text-red-500"><HiBellAlert /></span>
            <div className="absolute top-2 right-2 text-[30px] cursor-pointer hover:text-slate-600 font-serif" onClick={() => setPopUp(false)}> <span><IoIosCloseCircleOutline /></span></div>
            <h1 className="text-xl font-semibold text-red-500">
              Please Review Your Profile!
            </h1>
          </div>
          <div className="flex justify-center flex-col font-serif items-center p-5">
            <p className="text-[18px] text-blue-600 font-medium">Before proceeding, take a moment to ensure that your profile details are accurate.</p>
            <p className="text-[16px] text-slate-600 ">If something needs updating, make the necessary changes to avoid any issues while applying.</p>

          </div>
          <div className="flex justify-center p-5 gap-x-5">
            <button className='bg-[#2E86C1]  rounded-xl p-2 ms-2  hover:bg-[#3b3bc7]   w-[100px] h-auto text-white  font-serif font-bold text-[18px]' onClick={handleApply}>Apply</button>

            <button className='  rounded-md p-2 ms-2  hover:bg-[#88d3a7] bg-[#0d7634]   w-[100px] h-auto text-white  font-serif font-bold text-[18px]' onClick={handleEditProfile}>Edit</button>

          </div>
          <style>
            {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8) translate(-50%, -50%); }
          to { opacity: 1; transform: scale(1) translate(-50%, -50%); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}
          </style>
        </div>
      }



      <div className={`bg-[#ffffff] relative flex flex-col  items-center w-full h-auto px-20 `} >



        {isLoading == true && (
          <div className="absolute w-full h-[100%] inset-0 flex items-center justify-center bg-[#ffffff]  opacity-100 z-10">

            <DetailLoader />
          </div>
        )}


        <div className="relative w-[90%] h-[230px]  bg-white/30 backdrop-blur-lg shadow-lg drop-shadow-xl my-10 flex items-center px-10 rounded-2xl border border-gray-300 ">


          {/* Left Side Content */}
          <div className="w-full h-[180px] flex flex-col justify-center px-8">


            <h2 className="text-[32px] font-serif font-bold text-[#2E3A46] flex items-center">
              <span className="px-3">{jobStore?.job?.jobRole}</span>
            </h2>

            {/* Company Name */}
            <h3 className="text-[20px] font-serif text-[#3D5060] px-3">{jobStore?.job?.business?.companyName}</h3>

            {/* Job Location */}
            <div className="flex items-center text-[#1C4E80] px-1 space-x-1 mt-2">
              <IoLocationSharp className="text-2xl " />
              <span className=" font-serif text-[18px]">
                {jobStore?.job?.jobLocations?.slice(0, 8).map((location, ind) => {
                  let formattedLocation = location.charAt(0).toUpperCase() + location.slice(1);
                  if (ind !== jobStore?.job?.jobLocations?.length - 1) {
                    formattedLocation += ", ";
                  }
                  return formattedLocation;
                })}
              </span>
            </div>

            {/* Time Ago */}
            <div className="flex items-center text-gray-700 text-[16px] px-3 pt-3">
              <IoMdTime className="text-lg text-[#0F3057]" />
              <span className="ml-2 font-serif">{timeAgo(jobStore?.job?.postedAt)}</span>
            </div>
          </div>

          {/* Unique Button Section */}
          <div className="absolute right-5 bottom-6 flex items-center space-x-4">
            {userDetails?._id === jobStore?.job?.user?._id ? (
              <>
                <Link to={`/job-detail/people-applied/${jobStore?.job?._id}`}>
                  <button className="px-5 py-2 bg-[#3B7A57] text-white rounded-full shadow-lg border border-[#2F5D46] hover:bg-[#2F5D46] font-serif text-[18px]">
                    View People
                  </button>
                </Link>
                <Link to={`/job-update/${jobStore?.job?._id}`}>
                  <button className="px-5 py-2 bg-[#0F3057] text-white rounded-full shadow-lg border border-[#082D3C] hover:bg-[#082D3C] font-serif text-[18px]">
                    Update
                  </button>
                </Link>
                <button
                  className="px-5 py-2 bg-[#C0392B] text-white rounded-full shadow-lg border border-[#A52A2A] hover:bg-[#A52A2A] font-serif text-[18px]"
                  onClick={handlePopupWarningOpen}
                >
                  Remove
                </button>
              </>
            ) : userDetails?.appliedJobs.some(job => job._id === id) ? (
              <button className="px-5 py-2 border-2 border-[#3B7A57] text-[#2F5D46] rounded-full shadow-lg font-serif text-[18px] cursor-not-allowed">
                Applied
              </button>
            ) : (
              <button
                className="px-5 py-2 bg-[#2E86C1] text-white rounded-xl shadow-lg border border-[#1C4E80] hover:bg-[#1C4E80] font-serif text-[18px]"
                onClick={() => setPopUp(true)}
              >
                Apply
              </button>
            )}
          </div>
        </div>




        <div className="w-[90%] h-auto drop-shadow-lg my-10 flex justify-between px-10 gap-10">

          {/* Left Section - Job Overview */}
          <div className="w-[650px]">

            {/* Job Overview Heading */}
            <div className="w-full h-12 flex items-center px-2 text-[24px]   text-slate-800 font-serif font-bold">
              <span className="border-b-2 border-blue-500 rounded-b-xl px-6">Job Overview</span>
            </div>

            {/* Responsibilities Section */}
            <div className="bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl w-full h-auto p-6  shadow-md  mt-2">

              {/* Responsibilities Title */}
              <div className="flex items-center text-[22px] text-[#2E3A46] font-serif font-semibold mb-3 pb-3 border-b-2 border-blue-500">
                <MdOutlineDescription className="text-[#1C4E80] text-2xl" />
                <span className="px-2">Responsibilities</span>
              </div>

              {/* Responsibilities List */}
              <div className="flex flex-col text-[#1F3B4D] font-serif text-[18px] px-4">
                <ul className="list-disc pl-5 space-y-2">
                  {jobStore?.job?.responsibility?.map((resp, ind) => (
                    <li key={ind} className="leading-7">{resp}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Skills Required Section */}
            <div className="bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl w-full h-auto p-6  shadow-md mt-6">

              {/* Skills Title */}
              <div className="flex items-center text-[22px] text-[#2E3A46] font-serif font-semibold mb-3 pb-3 border-b-2 border-blue-500">
                <span className="px-2">Skills Required</span>
              </div>

              {/* Skills List */}
              <div className="flex flex-col text-[#1F3B4D] font-serif text-[18px] px-4">
                <ul className="list-disc pl-5 space-y-2">
                  {jobStore?.job?.skillsRequired?.map((skill, ind) => (
                    <li key={ind} className="leading-7">{skill}</li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Right Section - Job Details */}
          <div className="w-[600px] h-auto p-4 flex flex-col gap-6">

            {/* Other Details Section */}
            <div className="bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl p-6 shadow-md ">

              <div className="w-full h-auto flex items-center px-4 text-[24px] font-serif font-bold text-[#2E3A46] mb-3 pb-3 border-b-2 border-blue-500">
                <span>Other Details</span>
              </div>

              {/* Employment Type */}
              <div className="w-full flex items-center px-4 text-[20px] text-[#2E3A46] font-serif mb-2">
                <span className="font-semibold">Employment Type:</span>
                <span className="pl-2 font-medium text-[18px] ">
                  {jobStore?.job?.employmentType?.charAt(0).toUpperCase() + jobStore?.job?.employmentType?.slice(1)}
                </span>
              </div>

              {/* Experience */}
              <div className="w-full flex items-center px-4 text-[20px] text-[#2E3A46] font-serif mb-2">
                <span className="font-semibold">Experience:</span>
                <span className="pl-2 font-medium text-[18px]  ">
                  {jobStore?.job?.experienceYear} years
                </span>
              </div>

              {/* Working Hours */}
              <div className="w-full flex  px-4 text-[20px] text-[#2E3A46] font-serif mb-2">
                <span className="font-semibold">Working Hours:</span>
                <span className="pl-2 font-medium text-[18px] ">{jobStore?.job?.workingHours}</span>
              </div>

              {/* Application Deadline */}
              <div className="w-full flex items-center px-4 text-[20px] text-[#2E3A46] font-serif">
                <span className="font-semibold">Application Deadline:</span>
                <span className="pl-2 font-medium text-[18px] ">{formatDate(jobStore?.job?.deadline)}</span>
              </div>

            </div>

            {/* Salary Details Section */}
            <div className="bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl p-6  shadow-md ">

              <div className="w-full h-auto flex items-center px-4 text-[24px] font-serif font-bold text-[#2E3A46] mb-3 pb-3 border-b-2 border-blue-500">
                <span>Salary Details</span>
              </div>

              {/* Min Salary */}
              <div className="text-[20px] text-[#2E3A46] flex font-serif px-4 mb-2">
                <span className="font-semibold">Min Salary:</span>
                <span className="pl-2 flex font-medium text-[18px]  items-center "><MdOutlineCurrencyRupee className=" text-blue-700  " />{jobStore?.job?.minSalary}</span>
              </div>

              {/* Max Salary */}
              <div className="text-[20px] flex text-[#2E3A46] font-serif px-4">
                <span className="font-semibold">Max Salary:</span>
                <span className="pl-2 font-medium text-[18px]  flex items-center "><MdOutlineCurrencyRupee className=" text-blue-700  " />{jobStore?.job?.maxSalary}</span>
              </div>

            </div>

          </div>

        </div>


        <div className="w-[90%] h-auto drop-shadow-lg my-10 flex justify-center px-10">


          {/* Company Details Section */}
          <div className="bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl max-w-[900px] w-full h-auto p-10 shadow-md">

            {/* About the Company Title */}
            <div className="w-full h-12 flex items-center px-2 text-[24px]   text-slate-800 font-serif font-bold">
              <span className="border-b-2 border-blue-500 rounded-b-xl px-6">About the Company</span>
            </div>

            {/* Company Description */}
            <div className="flex flex-col h-auto p-4 text-slate-900 text-justify font-serif font-medium text-[18px]">
              <span>{jobStore?.job?.business?.description}</span>
            </div>

            {/* Service Type */}
            <div className="w-full flex items-center px-4 py-2 text-[20px] text-slate-800 font-serif">
              <span className="font-medium">Service Type:</span>
              <span className="pl-2 font-extralight">{jobStore?.job?.service?.serviceType}</span>
            </div>

            {/* Company Email */}
            <div className="w-full flex items-center px-4 py-2 text-[20px] text-slate-800 font-serif">
              <span className="font-medium">Email:</span>
              <span className="pl-2 border-b border-slate-800 font-extralight">
                {jobStore?.job?.user?.email}
              </span>
            </div>

          </div>

        </div>


        {popupwarning && (
          <div className='fixed inset-0 bg-black opacity-50 z-40'></div>
        )}

        {popupwarning && (
          <div className='fixed inset-0 flex items-center justify-center z-50'>
            <PopUp message="Remove Job Posting" submessage="Are you sure you want to remove this posted Job  ?" button1="Cancel" button2="Remove" submessage2={`Job Role: ${jobStore?.job?.jobRole}`} closeButton={handlePopupWarningClose} handleRemove={handleJobRemove} />

          </div>
        )}



      </div>



    </>
  )
}

export default JobDetail