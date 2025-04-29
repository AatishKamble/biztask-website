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
import { motion } from 'framer-motion'; 

const ProfilePage = ({ userDetails }) => {
  const dispatch = useDispatch();
  const appliedJobsRef = useRef(null);
  const businessRegistrationRef = useRef(null);
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

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
        <div className="min-h-screen mt-10">
          {/* Header Banner  */}
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-blue-800 h-64 relative px-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <motion.div 
              className="container mx-auto px-6 h-full flex flex-col justify-end pb-20"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h1 className="text-white text-4xl font-bold font-serif">My Profile</h1>
              <p className="text-blue-100 font-normal mt-2 text-xl">Manage your information, businesses and job applications</p>
            </motion.div>
          </motion.div>

          {/* Profile Card  */}
          <div className="container px-6 -mt-16 relative z-10 w-[90%] mx-auto">
            <motion.div 
              className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-blue-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div 
                  className="w-40 h-40 rounded-full border-4 border-blue-100 shadow-lg overflow-hidden flex-shrink-0 bg-gradient-to-r from-blue-50 to-blue-100"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <img
                    src={`${userDetails?.profileImage?.ImageUrl}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                   
                  />
                </motion.div>

                <motion.div 
                  className="flex-1 text-center md:text-left"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-blue-800 flex items-center gap-3 font-serif">
                      <IoPersonCircleOutline className="text-blue-600 text-3xl" />
                      {userDetails ? userDetails?.name:"N/A"}
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
                      <span>{userDetails?.email}</span>
                    </div>

                    <div className="flex items-center font-normal gap-3 text-gray-700 text-xl">
                      <FaPhone className="text-blue-600 text-2xl" />
                      <span>{userDetails?.mobileNumber}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Navigation Tabs  */}
            <motion.div 
              className="flex overflow-x-auto mb-8 bg-white rounded-lg shadow-md p-2 border border-blue-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <motion.a
                href="#bussiness-registration"
                className="flex-1 py-4 px-6 text-center font-semibold text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all duration-200 flex items-center justify-center gap-3 text-lg"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <IoBusinessOutline className="text-2xl" />
                <span>My Businesses</span>
              </motion.a>
              <motion.a
                href="#applied-jobs"
                className="flex-1 py-4 px-6 text-center font-semibold text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all duration-200 flex items-center justify-center gap-3 text-lg"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdOutlineWorkOutline className="text-2xl" />
                <span>Applied Jobs</span>
              </motion.a>
            </motion.div>

            {/* Business Section */}
            <motion.div 
              ref={businessRegistrationRef} 
              className="bg-white rounded-xl mb-8 overflow-hidden border border-blue-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-blue-800 flex items-center gap-3 font-serif">
                    <IoBusinessOutline className="text-blue-600 text-3xl" />
                    <span>My Businesses</span>
                  </h2>

                  <Link to="/bussiness-registration">
                    <motion.button 
                      className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-md font-semibold flex items-center gap-3 text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaAddressCard />
                      <span>Register New</span>
                    </motion.button>
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {userDetails?.businesses?.length > 0 ? (
                  <motion.div 
                    className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-9 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {userDetails?.businesses?.map((business, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <BusinessCard
                          businessDetails={business}
                          handlePopupWarningOpen={handlePopupWarningOpen}
                        />
                      </motion.div>
                    ))}
                   
                  </motion.div>
                ) : (
                  <motion.div 
                    className="text-center py-12 bg-blue-50 rounded-lg border border-blue-100"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <IoBusinessOutline className="mx-auto text-6xl text-blue-300 mb-4" />
                    <p className="text-blue-600 text-xl mb-2">You haven't registered any businesses yet</p>
                    <p className="text-blue-400 text-lg mb-4">Register your business to offer services</p>
                    <Link to="/bussiness-registration">
                      <motion.button 
                        className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-md font-medium text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Register Your First Business
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Applied Jobs Section  */}
            <motion.div 
              ref={appliedJobsRef} 
              className="bg-white rounded-xl mb-8 overflow-hidden border border-blue-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-blue-800 flex items-center gap-3 font-serif">
                    <MdOutlineWorkOutline className="text-blue-600 text-3xl" />
                    <span>Applied Jobs</span>
                  </h2>

                  <Link to="/jobs">
                    <motion.button 
                      className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-md font-semibold flex items-center gap-3 text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt />
                      <span>Browse Jobs</span>
                    </motion.button>
                  </Link>
                </div>
              </div>

              <div className="p-6 pb-10">
                {userDetails?.appliedJobs?.length > 0 ? (
                  <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {userDetails?.appliedJobs?.map((job, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <JobAdvertise
                          typeText="View"
                          job={job}
                          business={job?.business}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    className="text-center py-12 bg-blue-50 rounded-lg border border-blue-100"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <MdOutlineWorkOutline className="mx-auto text-6xl text-blue-300 mb-4" />
                    <p className="text-blue-600 text-xl mb-2">You haven't applied to any jobs yet</p>
                    <p className="text-blue-400 text-lg mb-4">Find and apply to jobs that match your skills</p>
                    <Link to="/jobs">
                      <motion.button 
                        className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-md font-semibold text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Browse Available Jobs
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Popup for removing business */}
          {popupwarning && (
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>
          )}

          {popupwarning && (
            <motion.div 
              className='fixed inset-0 flex items-center justify-center z-50'
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <PopUp
                message="Remove Business"
                submessage="Are you sure you want to remove this business?"
                button1="Cancel"
                button2="Remove"
                submessage2={`Business Name: ${userDetails?.businesses.find(b => b._id === currentBusinessId)?.companyName}`}
                closeButton={handlePopupWarningClose}
                handleRemove={handleRemove}
              />
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfilePage;