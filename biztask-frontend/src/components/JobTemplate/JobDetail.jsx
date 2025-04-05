import { IoLocationSharp } from "react-icons/io5";

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
import { MdOutlineDescription, MdTaskAlt } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsPeople } from "react-icons/bs";
import { HiBuildingOffice2 } from "react-icons/hi2";
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
      {/* Modal */}
      {popUp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-40 animate-fadeIn"></div>
      )}

      {/* Modal */}
      {popUp && (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-[1px] border-slate-300 w-[800px] drop-shadow-xl h-auto pb-5 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transform backdrop-blur-lg animate-scaleIn z-50 rounded-xl">
          <div className="w-full p-5 flex justify-center items-center border-b-slate-300 border-[1px] relative bg-white/50 rounded-t-xl">
            <span className="text-3xl text-red-500 mr-3 animate-pulse"><HiBellAlert /></span>
            <div className="absolute top-3 right-3 text-[30px] cursor-pointer hover:text-red-500 hover:scale-110 transition-all duration-300 font-serif" onClick={() => setPopUp(false)}>
              <IoIosCloseCircleOutline />
            </div>
            <h1 className="text-2xl font-bold text-red-500 font-serif">
              Please Review Your Profile!
            </h1>
          </div>

          <div className="flex justify-center flex-col font-serif items-center p-6">
            <p className="text-[19px] text-blue-700 font-medium mb-3">Before proceeding, take a moment to ensure that your profile details are accurate.</p>
            <p className="text-[17px] text-slate-600">If something needs updating, make the necessary changes to avoid any issues while applying.</p>
          </div>

          <div className="flex justify-center p-5 gap-x-6">
            <button
              className='bg-gradient-to-r from-[#2E86C1] to-[#3498DB] rounded-xl p-2 hover:from-[#3b3bc7] hover:to-[#4949e4] w-[120px] h-auto text-white font-serif font-bold text-[18px] shadow-lg hover:shadow-blue-200 '
              onClick={handleApply}
            >
              Apply
            </button>
            <button
              className='rounded-xl p-2 bg-gradient-to-r from-[#0d7634] to-[#10a049] w-[120px] h-auto text-white font-serif font-bold text-[18px] hover:from-[#1a9d4d] hover:to-[#22c363] shadow-lg hover:shadow-green-200 '
              onClick={handleEditProfile}
            >
              Edit
            </button>
          </div>
        </div>
      )}

      <div className="bg-white relative flex flex-col items-center w-full min-h-screen py-10">
        {isLoading && (
          <div className="absolute w-full h-full inset-0 flex items-center justify-center bg-white backdrop-blur-sm z-10">
            <DetailLoader />
          </div>
        )}

        {/* Job Header Card  */}
        <div className="relative w-full max-w-5xl bg-gradient-to-r from-white to-blue-50  shadow-lg  my-6 p-8 rounded-3xl border border-blue-100  ">
          <div className="flex flex-col">
            <h2 className="text-[28px] font-serif font-bold text-[#2E3A46] mb-2 bg-gradient-to-r from-[#1C4E80] to-[#2E86C1] bg-clip-text text-transparent">
              {jobStore?.job?.jobRole}
            </h2>

            {/* Company Name */}
            <div className="flex items-center text-[#1C4E80] px-2 space-x-1 ">
              <HiBuildingOffice2 className="text-xl " />
              <h3 className="text-[18px] font-serif text-[#3D5060]">
                {jobStore?.job?.business?.companyName}
              </h3>
            </div>
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
            <div className="flex items-center text-gray-700 text-[16px] px-2 pt-3">
              <IoMdTime className="text-lg text-[#0F3057]" />
              <span className="ml-2 font-serif ">Posted {timeAgo(jobStore?.job?.postedAt)}</span>
            </div>
          </div>
          {/* Action Buttons  */}
          <div className="absolute right-6 bottom-6 flex items-center space-x-4">
            {userDetails?._id === jobStore?.job?.user?._id ? (
              <>
                <Link to={`/job-detail/people-applied/${jobStore?.job?._id}`}>
                  <button className="px-5 py-2 bg-gradient-to-r from-[#3B7A57] to-[#4CAF50] text-white rounded-full shadow-lg border border-[#2F5D46] hover:from-[#2F5D46] hover:to-[#388E3C] font-serif text-[18px] hover:shadow-green-200 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    View People
                  </button>
                </Link>
                <Link to={`/job-update/${jobStore?.job?._id}`}>
                  <button className="px-5 py-2 bg-gradient-to-r from-[#0F3057] to-[#1C4E80] text-white rounded-full shadow-lg border border-[#082D3C] hover:from-[#082D3C] hover:to-[#164B77] font-serif text-[18px] flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Update
                  </button>
                </Link>
                <button
                  className="px-5 py-2 bg-gradient-to-r from-[#C0392B] to-[#E74C3C] text-white rounded-full shadow-lg border border-[#A52A2A] hover:from-[#A52A2A] hover:to-[#CB4335] font-serif text-[18px] flex items-center justify-center gap-2"
                  onClick={handlePopupWarningOpen}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  Remove
                </button>
              </>
            ) : userDetails?.appliedJobs.some(job => job._id === id) ? (
              <button className="px-5 py-2 border-2 border-[#3B7A57] bg-white/80 text-[#2F5D46] rounded-full shadow-lg font-serif text-[18px] cursor-not-allowed">
                Applied
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-gradient-to-r from-[#2E86C1] to-[#3498DB] text-white rounded-xl shadow-lg border border-[#1C4E80] hover:from-[#1C4E80] hover:to-[#2874A6] font-serif text-[18px] "
                onClick={() => setPopUp(true)}
              >
                Apply Now
              </button>
            )}
          </div>
        </div>

        {/* Job Content  */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-6">
          {/* Left Column - Job Overview */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center text-[22px] text-[#2E3A46] font-serif font-semibold mb-4 pb-2 ">
                <BsPeople className="text-blue-600 w-6 h-6 mr-2 ms-2" />
                <h3 className="border-b-2 border-blue-500">Job Overview</h3>
              </div>

              {/* Responsibilities  */}


              <div className="bg-gradient-to-br from-white to-blue-50 backdrop-blur-md border border-blue-100 rounded-xl p-6 mb-6 shadow-sm">

                <div className="flex items-center text-[20px] text-[#2E3A46] font-serif font-semibold mb-4 pb-2 border-b border-blue-400">
                  <HiOutlineClipboardList className="text-[#1C4E80] text-2xl me-2" />

                  <span >Responsibilities</span>
                </div>

                <ul className="space-y-4 text-gray-800 font-serif text-[17px] leading-relaxed">
                  {jobStore?.job?.responsibility?.map((resp, ind) => (
                    <li key={ind} className="flex items-start gap-3">
                      <MdTaskAlt className="text-blue-500 text-[20px] mt-1.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>


              {/* Skills Required  */}
              <div className="bg-gradient-to-br from-white to-blue-50 backdrop-blur-md border border-blue-100 rounded-xl p-6 shadow-md hover:shadow-blue-100 transition-all duration-300">
                <div className="text-[20px] text-[#2E3A46] font-serif font-semibold mb-4 pb-2 border-b border-blue-400 first-letter:uppercase tracking-wide">
                  Skills Required
                </div>

                <div className="flex flex-wrap gap-2">
                  {jobStore?.job?.skillsRequired?.map((skill, ind) => (
                    <span key={ind} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-serif border border-blue-200 hover:bg-blue-100 hover:text-blue-800  cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Details  */}
            <div className="bg-gradient-to-br from-white to-blue-50 backdrop-blur-md border border-blue-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-blue-400 inline-block font-serif">
                About the Company
              </h3>

              <div className="text-gray-700 mb-6 font-serif  text-[16px] text-justify leading-relaxed">
                <p >{jobStore?.job?.business?.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-[16px] text-slate-800 font-serif">
                  <span className="font-semibold">Service Type:</span>
                  <span className="ml-2 font-normal text-slate-700" style={{ fontWeight: "300", fontFamily: "sans-serif" }}>{jobStore?.job?.service?.serviceType}</span>
                </div>

                <div className="flex items-center text-[16px] text-slate-800 font-serif" >
                  <span className="font-semibold">Email:</span>
                  <p

                    className="ml-2 text-blue-700   font-normal" style={{ fontWeight: "300", fontFamily: "sans-serif" }}
                  >
                    {jobStore?.job?.user?.email}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Job Details  */}
          <div className="lg:col-span-1">
            {/* Job Details Card */}
            <div className="bg-gradient-to-br from-white to-blue-50 backdrop-blur-md border border-blue-100 rounded-xl p-6 mb-6 shadow-md hover:shadow-blue-100 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-blue-500 font-serif">
                Job Details
              </h3>

              <div className="space-y-5">
                <div className="flex items-start group hover:translate-x-1 transition-all duration-300">
                  <div className="bg-blue-100 p-2.5 rounded-lg mr-3 group-hover:bg-blue-200 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-serif">Employment Type</p>
                    <p className="font-medium text-gray-800 font-serif">
                      {jobStore?.job?.employmentType?.charAt(0).toUpperCase() + jobStore?.job?.employmentType?.slice(1)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start group hover:translate-x-1 transition-all duration-300">
                  <div className="bg-blue-100 p-2.5 rounded-lg mr-3 group-hover:bg-blue-200 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-serif">Working Hours</p>
                    <p className="font-medium text-gray-800 font-serif">{jobStore?.job?.workingHours}</p>
                  </div>
                </div>

                <div className="flex items-start group hover:translate-x-1 transition-all duration-300">
                  <div className="bg-blue-100 p-2.5 rounded-lg mr-3 group-hover:bg-blue-200 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-serif">Experience Required</p>
                    <p className="font-medium text-gray-800 font-serif">{jobStore?.job?.experienceYear} years</p>
                  </div>
                </div>

                <div className="flex items-start group hover:translate-x-1 transition-all duration-300">
                  <div className="bg-blue-100 p-2.5 rounded-lg mr-3 group-hover:bg-blue-200 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-serif">Application Deadline</p>
                    <p className="font-medium text-gray-800 font-serif">{formatDate(jobStore?.job?.deadline)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Salary Details Card */}
            <div className="bg-gradient-to-r from-white to-blue-50   backdrop-blur-md border border-blue-100 rounded-2xl p-6 shadow-lg hover:text-blue-400 transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-5  border-b border-blue-400 pb-3  font-serif">
                Salary Details
              </h3>

              <div className="grid gap-6">
                <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4 hover:scale-[1.02] transition-transform duration-300 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="text-blue-400 bg-blue-100 p-2 rounded-full">
                      <MdOutlineCurrencyRupee className="h-4 w-4 text-blue-400" />
                    </div>
                    <p className="text-gray-600 font-medium font-serif">Min Salary</p>
                  </div>
                  <span className="text-gray-800 font-semibold font-serif">₹ {jobStore?.job?.minSalary}</span>
                </div>

                <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4 hover:scale-[1.02] transition-transform duration-300 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="text-blue-400 bg-blue-100 p-2 rounded-full">
                      <MdOutlineCurrencyRupee className="h-4 w-4 text-blue-400" />
                    </div>
                    <p className="text-gray-600 font-medium font-serif">Max Salary</p>
                  </div>
                  <span className="text-gray-800 font-semibold font-serif">₹ {jobStore?.job?.maxSalary}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {popupwarning  && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fadeIn"></div>
        )}

        {popupwarning  && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <PopUp
              message="Remove Job Posting"
              submessage="Are you sure you want to remove this posted Job?"
              button1="Cancel"
              button2="Remove"
              submessage2={`Job Role: ${jobStore?.job?.jobRole}`}
              closeButton={handlePopupWarningClose}
              handleRemove={handleJobRemove}
            />
          </div>
        )}
      </div>

      {/* Animation Styles  */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
  
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9) translate(-50%, -50%); }
            to { opacity: 1; transform: scale(1) translate(-50%, -50%); }
          }
  
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
  
          .animate-scaleIn {
            animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
        `}
      </style>
    </>
  )
}

export default JobDetail