import JobAdvertise from '../components/JobTemplate/JobAdvertise.jsx'
import ServiceCard from '../components/ServiceCard/ServiceCard.jsx'
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import BusinessCard from '../components/BusinessCard/BusinessCard.jsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaAddressCard } from "react-icons/fa6";
import { API_BASE_URL } from '../configApi/ConfigApi.js';
import { IoPersonCircleOutline } from "react-icons/io5";
import { getJobById } from "../Redux/Job/Action.js";
import PopUp from '../components/PopUp/PopUp.jsx';
import { removeBusiness } from '../Redux/Business/Action.js';
import { IoBusinessOutline } from "react-icons/io5";
import { MdOutlineWorkOutline } from "react-icons/md";

const ProfilePage = ({ userDetails }) => {
  const dispatch = useDispatch();
  const appliedJobsRef = useRef(null);
  const businessRegistrationRef = useRef(null);
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash === "#applied-jobs" && appliedJobsRef.current) {
      appliedJobsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (location.hash === "#bussiness-registration" && businessRegistrationRef.current) {
      businessRegistrationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location])

  const [popupwarning, setPopupWarning] = useState(false);
  const [currentBusinessId, setCurrentBusinessId] = useState(null);

  const handlePopupWarningOpen = (businessId) => {
    setCurrentBusinessId(businessId);
    setPopupWarning(true);
  };

  const handlePopupWarningClose = () => {
    setPopupWarning(false);
    setCurrentBusinessId(null);
  };

  const handleRemove = () => {
    dispatch(removeBusiness(jwt, currentBusinessId));
    setPopupWarning(false);
    navigate('/profile');
  }

  return (
    <>
      {userDetails && (
        <div className="min-h-screen mt-10
         ">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-64 relative px-20">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-20">
              <h1 className="text-white text-4xl font-bold font-serif">My Profile</h1>
              <p className="text-blue-100 font-normal mt-2 text-xl">Manage your information, businesses and job applications</p>
            </div>
          </div>

          {/* Profile Card */}
          <div className="container  px-6 -mt-16 relative z-10 w-[90%] mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-blue-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 rounded-full border-4 border-blue-100 shadow-lg overflow-hidden flex-shrink-0 bg-gradient-to-r from-blue-50 to-blue-100">
                  <img
                    src={`${userDetails.profileImage?.ImageUrl}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/160?text=Profile' }}
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-blue-800 flex items-center gap-3 font-serif">
                      <IoPersonCircleOutline className="text-blue-600 text-3xl" />
                      {userDetails.name}
                    </h2>

                    <Link to="/profile-edit">
                      <button className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-md font-medium text-lg flex items-center gap-2">
                        <span>Edit Profile</span>
                      </button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 font-normal text-gray-700 text-xl">
                      <MdEmail className="text-blue-600 text-2xl" />
                      <span>{userDetails.email}</span>
                    </div>

                    <div className="flex items-center font-normal gap-3 text-gray-700 text-xl">
                      <FaPhone className="text-blue-600 text-2xl" />
                      <span>{userDetails.mobileNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto mb-8 bg-white rounded-lg shadow-md p-2 border border-blue-100">
              <a
                href="#bussiness-registration"
                className="flex-1 py-4 px-6 text-center font-semibold text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all duration-200 flex items-center justify-center gap-3 text-lg"
              >
                <IoBusinessOutline className="text-2xl" />
                <span>My Businesses</span>
              </a>
              <a
                href="#applied-jobs"
                className="flex-1 py-4 px-6 text-center font-semibold text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all duration-200 flex items-center justify-center gap-3 text-lg"
              >
                <MdOutlineWorkOutline className="text-2xl" />
                <span>Applied Jobs</span>
              </a>
            </div>

            {/* Business Section */}
            <div ref={businessRegistrationRef} className="bg-white rounded-xl  mb-8 overflow-hidden border border-blue-100">
              <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-blue-800 flex items-center gap-3 font-serif">
                    <IoBusinessOutline className="text-blue-600 text-3xl" />
                    <span>My Businesses</span>
                  </h2>

                  <Link to="/bussiness-registration">
                    <button className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-md font-semibold flex items-center gap-3 text-lg">
                      <FaAddressCard />
                      <span>Register New</span>
                    </button>
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {userDetails?.businesses?.length > 0 ? (
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-9  gap-6">
                    {userDetails?.businesses?.map((business, index) => (
                      <BusinessCard
                        businessDetails={business}
                        key={index}
                        handlePopupWarningOpen={handlePopupWarningOpen}
                      />
                    ))}
                    
                  </div>
                ) : (
                  <div className="text-center py-12 bg-blue-50 rounded-lg border border-blue-100">
                    <IoBusinessOutline className="mx-auto text-6xl text-blue-300 mb-4" />
                    <p className="text-blue-600 text-xl mb-2">You haven't registered any businesses yet</p>
                    <p className="text-blue-400 text-lg mb-4">Register your business to offer services</p>
                    <Link to="/bussiness-registration">
                      <button className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-md font-medium text-lg">
                        Register Your First Business
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Applied Jobs Section */}
            <div ref={appliedJobsRef} className="bg-white rounded-xl  mb-8  overflow-hidden border border-blue-100">
              <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-blue-800 flex items-center gap-3 font-serif">
                    <MdOutlineWorkOutline className="text-blue-600 text-3xl" />
                    <span>Applied Jobs</span>
                  </h2>

                  <Link to="/jobs">
                    <button className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-md font-semibold flex items-center gap-3 text-lg">
                      <FaExternalLinkAlt />
                      <span>Browse Jobs</span>
                    </button>
                  </Link>
                </div>
              </div>

              <div className="p-6 pb-10">
                {userDetails?.appliedJobs?.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {userDetails?.appliedJobs?.map((job, index) => (
                      <JobAdvertise
                        key={index}
                        typeText="View"
                        job={job}
                        business={job?.business}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12  bg-blue-50 rounded-lg border border-blue-100">
                    <MdOutlineWorkOutline className="mx-auto text-6xl text-blue-300 mb-4" />
                    <p className="text-blue-600 text-xl mb-2">You haven't applied to any jobs yet</p>
                    <p className="text-blue-400 text-lg mb-4">Find and apply to jobs that match your skills</p>
                    <Link to="/jobs">
                      <button className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-md font-semibold text-lg">
                        Browse Available Jobs
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Popup for removing business */}
          {popupwarning && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 animate-fadeIn"></div>
          )}

          {popupwarning && (
            <div className='fixed inset-0 flex items-center justify-center z-50'>
              <PopUp
                message="Remove Business"
                submessage="Are you sure you want to remove this business?"
                button1="Cancel"
                button2="Remove"
                submessage2={`Business Name: ${userDetails?.businesses.find(b => b._id === currentBusinessId)?.companyName}`}
                closeButton={handlePopupWarningClose}
                handleRemove={handleRemove}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfilePage;