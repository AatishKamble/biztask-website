import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
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
import DetailLoader from "../Loader/DetailLoader.jsx";
import { MdOutlineDescription, MdTaskAlt } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsPeople } from "react-icons/bs";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaMapMarkerAlt, FaBriefcase, FaUserClock, FaCalendarAlt, FaTools } from "react-icons/fa";
import JobDetailSkeleton from "./JobDetailSkeleton.jsx";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { CgDetailsMore } from "react-icons/cg";
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
  }, [id, dispatch]);

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

  const handleApplyPopUpOpen = () => {
    setPopUp(true);
  };

  const handleApplyPopUpClose = () => {
    setPopUp(false);
  };

  const handleApply = () => {
    if (userDetails) {
      navigate(`/apply-job/${id}`);
    }
    else {
      handleLogInButtonClick();
    }
    handleApplyPopUpClose();
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
      {/* Profile Review Modal */}
      {popUp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-40 animate-fadeIn"></div>
      )}

      {popUp && (<>

        <div className="fixed inset-0 flex items-center justify-center z-50">
          <PopUp
            message="Please Review Your Profile!"
            submessage="Before proceeding, please take a moment to ensure that you are ready to apply."
            button1="Cancel"
            button2="Apply"
            submessage2={`Job Role: ${jobStore?.job?.jobRole}`}
            closeButton={handleApplyPopUpClose}
            handleRemove={handleApply}
          />
        </div>
      </>
      )}


      <div className="bg-white relative flex flex-col items-center w-full min-h-screen py-10 md:px-4 px-2 font-serif">
        {isLoading ? (
          <JobDetailSkeleton />
        ) : (
          <>
            {/* Local Service Banner */}
            <div className="w-full max-w-7xl mb-6 font-serif">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 rounded-lg p-3 flex items-center shadow-sm">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <FaMapMarkerAlt className="text-amber-600" />
                </div>
                <p className="text-amber-800 font-medium font-serif">
                  Local Service Opportunity • Available in {jobStore?.job?.jobLocations?.length} location{jobStore?.job?.jobLocations?.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Job Header Card */}
            <div className="relative  xl:max-w-6xl w-full bg-white shadow-lg my-2 p-8 rounded-3xl border border-blue-100">
              <div className="flex flex-col">
                <h2 className="text-[32px] font-serif font-bold text-[#2E3A46] px-2 mb-2">
                  {jobStore?.job?.jobRole}
                </h2>

                {/* Company Name  */}
                <div className="flex items-center text-[#1C4E80] px-2 space-x-2">
                  <HiBuildingOffice2 className="text-xl text-blue-600" />
                  <h3 className="text-[20px] font-serif font-semibold text-[#3D5060]">
                    {jobStore?.job?.business?.companyName}
                  </h3>
                </div>

                {/* Job Location */}
                <div className="flex items-start text-[#1C4E80] px-1 space-x-1 mt-2">
                  <IoLocationSharp className="text-2xl text-blue-600 mt-1" />
                  <div>
                    <span className="font-serif font-medium text-[18px] text-gray-700">
                      {jobStore?.job?.jobLocations?.slice(0, 8).map((location, ind) => {
                        let formattedLocation = location.charAt(0).toUpperCase() + location.slice(1);
                        if (ind !== jobStore?.job?.jobLocations?.slice(0, 8).length - 1) {
                          formattedLocation += ", ";
                        }
                        return formattedLocation;
                      })}
                    </span>
                    {jobStore?.job?.jobLocations?.length > 8 && (
                      <span className="text-blue-600 text-sm ml-1">+{jobStore?.job?.jobLocations?.length - 8} more</span>
                    )}
                  </div>
                </div>

                {/* Time Ago */}
                <div className="flex items-center text-gray-700 text-[16px] px-2 pt-3">
                  <IoMdTime className="text-lg text-blue-600" />
                  <span className="ml-2 font-serif">Posted {timeAgo(jobStore?.job?.postedAt)}</span>
                </div>

                {/* Quick highlights */}
                <div className="mt-4 flex font-serif font-medium flex-wrap gap-3 ">
                  <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-sm flex items-center">
                    <FaBriefcase className="mr-1" />
                    {jobStore?.job?.employmentType?.charAt(0).toUpperCase() + jobStore?.job?.employmentType?.slice(1)}
                  </div>
                  <div className="bg-green-50 px-3 py-1 rounded-full text-green-700 text-sm flex items-center">
                    <FaUserClock className="mr-1" />
                    {jobStore?.job?.workingHours}
                  </div>
                  <div className="bg-purple-50 px-3 py-1 rounded-full text-purple-700 text-sm flex items-center">
                    <FaMoneyBill1Wave className="mr-1" />
                    ₹{jobStore?.job?.minSalary} - ₹{jobStore?.job?.maxSalary}
                  </div>
                  <div className="bg-amber-50 px-3 py-1 rounded-full text-amber-700 text-sm flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    Apply by {formatDate(jobStore?.job?.deadline)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 md:flex md:flex-wrap md:items-center font-serif gap-4 md:justify-end grid grid-cols-1 ">
                {userDetails?._id === jobStore?.job?.user?._id ? (
                  <>
                    <Link to={`/job-detail/people-applied/${jobStore?.job?._id}`}>
                      <button className="px-5 w-full py-2 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl  font-serif text-[18px]  flex items-center justify-center gap-2">
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
                      <button className="px-5 py-2 w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-xl  font-serif text-[18px] flex items-center font-semibold justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Update
                      </button>
                    </Link>
                    <button
                      className="px-5 py-2 font-semibold bg-gradient-to-r from-red-700 to-red-500 text-white rounded-xl  font-serif text-[18px] flex items-center justify-center gap-2"
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
                  <button className="px-5 py-2  bg-white text-emerald-700 rounded-xl  border font-serif text-[18px] cursor-not-allowed flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Applied
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 font-serif text-[18px] flex items-center justify-center"
                    onClick={() => handleApplyPopUpOpen()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Apply Now
                  </button>
                )}
              </div>
            </div>

            {/* Job Content */}
            <div className=" xl:max-w-6xl w-full font-serif grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 mt-6">
              {/* Left Column - Job Overview */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <div className="flex items-center text-[22px] text-[#2E3A46] font-serif font-semibold mb-4">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <BsPeople className="text-blue-600" />
                    </div>
                    <h3 className="border-b-2 border-blue-500">Local Service Opportunity</h3>
                  </div>

                  {/* Responsibilities */}
                  <div className=" bg-white border border-blue-100 rounded-xl p-6 mb-6 shadow-md hover:shadow-blue-100 transition-all duration-300">
                    <div className="flex items-center text-[20px] text-[#2E3A46] font-serif font-semibold mb-4 pb-2 border-b border-blue-200">
                      <div className="bg-blue-50 p-2 rounded-full mr-3">
                        <HiOutlineClipboardList className="text-blue-600" />
                      </div>
                      <span>Responsibilities</span>
                    </div>

                    <ul className="space-y-4 text-gray-800 font-serif text-[17px] font-medium leading-relaxed">
                      {jobStore?.job?.responsibility?.map((resp, ind) => (
                        <li key={ind} className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 hover:border-blue-600 transition-all duration-300">
                          <span> <MdTaskAlt className="text-blue-500 w-5 h-5 mt-1.5" /></span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills Required */}
                  <div className="bg-white border border-blue-100 rounded-xl md:p-6 p-4 shadow-md hover:shadow-blue-100 transition-all duration-300 font-serif">
                    <div className="flex items-center text-[20px] text-[#2E3A46] font-serif font-semibold mb-4 pb-2 border-b border-blue-200">
                      <div className="bg-blue-50 p-2 rounded-full mr-3">
                        <FaTools className="text-blue-600" />
                      </div>
                      <span>Skills Required</span>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
                      {jobStore?.job?.skillsRequired?.map((skill, ind) => (
                        <span key={ind} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl text-sm font-serif border border-blue-200 hover:bg-blue-100 hover:text-blue-800 cursor-default flex items-center">
                          <span> <svg className="w-4 h-4   mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg></span>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Community Impact Section */}
                <div className="bg-[#f0fdf4] border border-green-100 rounded-xl p-6 mb-6 shadow-md">
                  <h3 className="text-xl font-semibold text-green-800 mb-4 pb-2 border-b border-green-200 font-serif flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Community Impact
                  </h3>

                  <div className="text-gray-700 mb-4 font-serif font-medium text-[16px] leading-relaxed">
                    <p>This opportunity with {jobStore?.job?.business?.companyName} contributes to the local economy by providing essential services to the {jobStore?.job?.jobLocations?.[0]?.charAt(0).toUpperCase() + jobStore?.job?.jobLocations?.[0]?.slice(1)} community.</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="font-semibold text-green-800">Local Economic Support</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-7">Jobs in the service sector strengthen local communities by providing essential services and creating economic opportunities.</p>
                  </div>
                </div>

                {/* Company Details */}
                <div className="bg-white border border-blue-100 rounded-xl md:p-6 p-4 shadow-md hover:shadow-blue-100 transition-all duration-300">
                  <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-blue-200 font-serif">
                    <div className="bg-blue-50 p-2 rounded-full mr-3">
                      <HiBuildingOffice2 className="text-blue-600" />
                    </div>
                    About {jobStore?.job?.business?.companyName}
                  </h3>

                  <div className="text-gray-700 mb-6 font-serif font-medium text-[16px] text-justify leading-relaxed">
                    <p>{jobStore?.job?.business?.description}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col sm:flex-row sm:justify-between gap-4">


                    <div className="flex items-center text-[16px] text-slate-800 font-serif">
                      <span className="font-semibold mr-2">Service Type:</span>
                      <span className="text-blue-600 hover:text-blue-800 ">
                        {jobStore?.job?.service?.serviceType}
                      </span>
                    </div>
                    <div className="flex items-center text-[16px] text-slate-800 font-serif">
                      <span className="font-semibold mr-2">Contact:</span>
                      <p className="text-blue-600 hover:text-blue-800 ">
                        {jobStore?.job?.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Job Details */}
              <div className="lg:col-span-1">

                <div className=" grid grid-cols-1 w-full">
                  {/* Job Details Card */}
                  <div className="bg-white border border-blue-100 rounded-xl p-6 mb-6 shadow-md hover:shadow-blue-100 transition-all duration-300">
                    <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-blue-200 font-serif">
                      <div className="bg-blue-50 p-2 rounded-full mr-3">
                        <CgDetailsMore className="text-blue-600" />
                      </div>
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
                          <p className="text-sm text-gray-500 font-semibold font-serif">Employment Type</p>
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
                          <p className="text-sm text-gray-500 font-serif font-semibold">Working Hours</p>
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
                          <p className="text-sm text-gray-500 font-serif font-semibold">Experience Required</p>
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
                          <p className="text-sm text-gray-500 font-serif font-semibold">Application Deadline</p>
                          <p className="font-medium text-gray-800 font-serif">{formatDate(jobStore?.job?.deadline)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Salary Details Card */}
                  <div className="bg-white border border-blue-100 rounded-xl p-6 mb-6 shadow-md hover:shadow-blue-100 transition-all duration-300">
                    <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-blue-200 font-serif">
                      <div className="bg-blue-50 p-2 rounded-full mr-3">
                        <FaMoneyBill1Wave className="text-blue-600" />
                      </div>
                      Salary Details
                    </h3>

                    <div className="grid gap-6">
                      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4 hover:scale-[1.02] transition-transform duration-300 shadow-sm">
                        <div className="flex items-center gap-3 font-semibold">
                          <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
                            <FaMoneyBill1Wave className="h-4 w-4" />
                          </div>
                          <p className="text-gray-600 font-serif">Min Salary</p>
                        </div>
                        <span className="text-gray-800 font-semibold font-serif">₹ {jobStore?.job?.minSalary}</span>
                      </div>

                      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4 hover:scale-[1.02] transition-transform duration-300 shadow-sm">
                        <div className="flex items-center gap-3 font-semibold">
                          <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
                            <FaMoneyBill1Wave className="h-4 w-4" />
                          </div>
                          <p className="text-gray-600 font-serif">Max Salary</p>
                        </div>
                        <span className="text-gray-800 font-semibold font-serif">₹ {jobStore?.job?.maxSalary}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Location Service Area Card - New */}
                <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-md hover:shadow-blue-100 transition-all duration-300">
                  <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-blue-200 font-serif">
                    <div className="bg-blue-50 p-2 rounded-full mr-3">
                      <FaMapMarkerAlt className="text-blue-600" />
                    </div>
                    Service Area
                  </h3>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                    <p className="text-gray-700 text-sm mb-2 font-serif">This position serves the following locations:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {jobStore?.job?.jobLocations?.map((location, ind) => (
                        <span key={ind} className="bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                          {location.charAt(0).toUpperCase() + location.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Application  */}
                  {!userDetails?.appliedJobs.some(job => job._id === id) && userDetails?._id !== jobStore?.job?.user?._id && (
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 mt-6">
                      <p className="text-blue-800 text-center font-medium mb-3 font-serif">Interested in this local opportunity?</p>
                      <button
                        onClick={() => handleApplyPopUpOpen()}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        Quick Apply
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {popupwarning && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fadeIn"></div>
            )}

            {popupwarning && (
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
          </>
        )}
      </div>

      {/* Animation Styles */}
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
  );
};

export default JobDetail;