import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { FaUserSecret, FaPhone, FaRegEdit, FaAddressCard, FaBriefcase, FaHome, FaMapMarkerAlt, FaCity, FaBuilding, FaTools } from 'react-icons/fa';
import { MdEmail, MdZoomOutMap, MdOutlineWorkOutline } from "react-icons/md";
import { IoBusinessOutline, IoPersonCircleOutline } from "react-icons/io5";
import { TbWorldSearch, TbMapPinCode } from "react-icons/tb";
import { toast } from 'react-toastify';
import JobAdvertise from '../components/JobTemplate/JobAdvertise.jsx';
import BusinessCard from '../components/BusinessCard/BusinessCard.jsx';
import PopUp from '../components/PopUp/PopUp.jsx';
import ImageZoom from '../components/ContactInformation/ImageZoom.jsx';
import { removeBusiness } from '../Redux/Business/Action.js';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import { cancelSeekerBooking, getMyBookings } from '../Redux/ServiceBooking/Action.js';
import { MdOutlineSecurity } from "react-icons/md";
import { MdOutlineHistory, MdLocationOn, MdPayments } from "react-icons/md";
import { MdPerson, MdPhone, MdCalendarToday, MdStar } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';
import { BiMapPin } from 'react-icons/bi';
import { FaCircleCheck, FaSackDollar } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { FiXCircle } from "react-icons/fi";
import { CLEAR_SERVICE_ERROR, CLEAR_SERVICE_MESSAGE } from '../Redux/ServiceBooking/ActionType.js';
const ProfilePage = ({ userDetails }) => {
  const dispatch = useDispatch();
  const appliedJobsRef = useRef(null);
  const businessRegistrationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const [showImageModal, setShowImageModal] = useState(false);
  const [popupwarning, setPopupWarning] = useState(false);
  const [currentBusinessId, setCurrentBusinessId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.hash === "#applied-jobs" && appliedJobsRef.current) {
      appliedJobsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (location.hash === "#bussiness-registration" && businessRegistrationRef.current) {
      businessRegistrationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const handlePopupWarningOpen = (businessId) => {
    setCurrentBusinessId(businessId);
    setPopupWarning(true);
  };

  //mybookings
  useEffect(() => {
  dispatch(getMyBookings(jwt));
}, [dispatch, jwt]);


  const bookings = useSelector(store => store.serviceBookingStore.bookings);
  const isLoading1 = useSelector(store => store.serviceBookingStore.isLoading);
  const error = useSelector(store => store.serviceBookingStore.error);
 const message = useSelector(store => store.serviceBookingStore.message);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_SERVICE_ERROR });
    }
  }, [error, dispatch]);
  useEffect(() => {
    if (message) {
      toast.success(message);
     
      dispatch({ type: CLEAR_SERVICE_MESSAGE });
    

    }
  }, [message, dispatch]);

  const getStatusColor = (status, type) => {
    if (type === 'payment') {
      return status === 'PENDING'
        ? { box: 'bg-amber-100 text-amber-700 border-amber-200', icon: 'text-amber-700' }
        : { box: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: 'text-emerald-700' };
    }

    const colors = {
      REQUESTED: { box: 'bg-blue-100 text-blue-700 border-blue-200', icon: 'text-blue-700' },
      CONFIRMED: { box: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: 'text-indigo-700' },
      COMPLETED: { box: 'bg-green-100 text-green-700 border-green-200', icon: 'text-green-700' },
      REJECTED: { box: 'bg-red-100 text-red-700 border-red-200', icon: 'text-red-700' }
    };

    return colors[status] || { box: 'bg-gray-100 text-gray-700 border-gray-200', icon: 'text-gray-700' };
  };


  const getBookingStatusMessage = (bookingStatus, paymentStatus) => {


    if (paymentStatus === "FAILED") {
      return "Payment failed — please retry your payment";
    }

    if (paymentStatus === "PENDING") {
      return "Payment pending — waiting for admin verification";
    }


    if (paymentStatus === "REFUNDED") {
      if (bookingStatus === "CANCELLED") {
        return "You cancelled this booking — Your payment will be refunded";
      }

      if (bookingStatus === "CANCELLED_BY_PROVIDER") {
        return "Provider cancelled this booking — Your payment will be refunded";
      }

      return "Your payment will be refunded";
    }

    if (paymentStatus === "VERIFIED") {

      switch (bookingStatus) {

        case "CONFIRMED":
          return "Booking confirmed — provider will contact you soon";

        case "COMPLETED":
          return "Service completed — thank you for choosing us";



        default:
          return "Booking in progress";
      }
    }

    return "Booking status unavailable";
  };


  const handlePopupWarningClose = () => {
    setPopupWarning(false);
    setCurrentBusinessId(null);
  };

  const handleRemove = async () => {
    try {
      setIsLoading(true);
      const result = await dispatch(removeBusiness(jwt, currentBusinessId));
      if (result?.success) {
        toast.success(result?.message);
        setPopupWarning(false);
        navigate("/profile");
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };




  const visibleFields = ['name', 'email', 'mobileNumber', 'houseNumber', 'area', 'village', 'subDistrict', 'district', 'pinCode'];

  const fieldConfig = {
    name: {
      icon: FaUserSecret,
      label: 'Full Name',
      value: userDetails?.name,
      gradient: 'from-blue-500 to-indigo-600'
    },
    email: {
      icon: MdEmail,
      label: 'Email',
      value: userDetails?.email,
      gradient: 'from-purple-500 to-pink-600'
    },
    mobileNumber: {
      icon: FaPhone,
      label: 'Mobile Number',
      value: userDetails?.mobileNumber,
      gradient: 'from-green-500 to-emerald-600'
    },
    houseNumber: {
      icon: FaBuilding,
      label: 'House Number',
      value: userDetails?.houseNumber,
      gradient: 'from-rose-500 to-pink-600'
    },
    area: {
      icon: FaMapMarkerAlt,
      label: 'Area',
      value: userDetails?.area,
      gradient: 'from-orange-500 to-red-600'
    },
    village: {
      icon: FaHome,
      label: 'Village',
      value: userDetails?.village,
      gradient: 'from-teal-500 to-cyan-600'
    },
    subDistrict: {
      icon: HiOutlineLocationMarker,
      label: 'Sub-District / Tehsil',
      value: userDetails?.subDistrict,
      gradient: 'from-amber-500 to-yellow-600'
    },
    district: {
      icon: FaCity,
      label: 'District',
      value: userDetails?.district,
      gradient: 'from-blue-500 to-blue-600'
    },
    pinCode: {
      icon: TbMapPinCode,
      label: 'PIN Code',
      value: userDetails?.pinCode,
      gradient: 'from-red-500 to-rose-600'
    },
  };

  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem("activeRole") || "Job Seeker";
  });

  const toggleRole = () => {
    setActiveRole(prev => {
      const newRole = prev === "Job Seeker" ? "Service Provider" : "Job Seeker";
      localStorage.setItem("activeRole", newRole); // save selection
      return newRole;
    });
  };


  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  const handleCancelModalClose = () => {
    setIsCancelModalOpen(!isCancelModalOpen);
  }

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;
    await dispatch(cancelSeekerBooking(selectedBooking._id, jwt));
    setIsCancelModalOpen(false);
  };

  return (
    <>
      {userDetails && (
        <div className="min-h-screen bg-white font-serif">
          {/*  Header Banner */}
          <motion.div
            className="relative h-64 bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 overflow-hidden border-b-2 border-gray-300 md:px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >

            <motion.div
              className="container mx-auto px-6 h-full flex flex-col justify-end pb-20 relative z-10"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-blue-800 text-4xl  font-bold mb-2">My Profile</h1>
              <p className="text-gray-600 text-lg font-medium">Manage your information, services and opportunities</p>
            </motion.div>
          </motion.div>

          {/* Main Content  */}
          <div className="container mx-auto px-4 sm:px-6 -mt-12 relative z-10 max-w-7xl pb-12">

            {/* Profile Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg  p-6 sm:p-8 mb-8 border border-gray-200 relative"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >


              {/* Check if user needs to update profile */}
              {(!userDetails?.name || !userDetails?.houseNumber) ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <IoPersonCircleOutline className="text-white text-5xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Complete Your Profile</h3>
                  <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
                    Please update your profile details to access all features and personalized services
                  </p>
                  <Link to="/profile-edit">
                    <button className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg font-semibold shadow-md">
                      Update Profile Now
                    </button>
                  </Link>
                </div>
              ) : (
                <>

                  {/* Edit Button */}
                  <div className="mb-6 flex justify-end">
                    <Link to="/profile-edit">
                      <motion.button
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white rounded-lg transition-all duration-300 shadow-md font-semibold text-sm"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaRegEdit className="text-sm" />
                        <span>Edit Profile</span>
                      </motion.button>
                    </Link>
                  </div>
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Profile Image & Role Badge */}
                    <motion.div
                      className="flex flex-col items-center gap-4 w-full lg:w-auto"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {/* Profile Image */}
                      <div
                        className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-gray-300"
                        onClick={() => setShowImageModal(true)}
                      >
                        {userDetails?.profileImage?.ImageUrl ? (
                          <>
                            <img
                              src={userDetails.profileImage.ImageUrl}
                              alt="Profile"
                              className="w-full h-full object-fill"
                              onError={(e) => (e.target.style.display = 'none')}
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/40 flex items-center justify-center transition-all duration-300 group">
                              <div className="opacity-0 group-hover:opacity-100 flex flex-col items-center gap-2 text-white font-medium transition-opacity duration-300">
                                <MdZoomOutMap className="text-xl" />
                                <span className="text-sm">View</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <IoPersonCircleOutline className="text-gray-400 text-7xl" />
                          </div>
                        )}
                      </div>


                      <div
                        onClick={toggleRole}
                        className={`inline-flex items-center gap-2 px-4 py-2 
    bg-gradient-to-r ${activeRole === "Job Seeker"
                            ? "from-blue-600 to-blue-700"
                            : "from-green-600 to-green-700"
                          }
    rounded-lg shadow-md cursor-pointer transition-all duration-300 
    active:scale-95 select-none`}
                      >
                        {/* Icon */}
                        <span className="text-base text-white">
                          {activeRole === "Job Seeker" ? <HiSearch size={20} /> : <FaTools size={20} />}
                        </span>


                        <span className="text-white font-semibold text-sm uppercase tracking-wide">
                          {activeRole}
                        </span>
                      </div>

                    </motion.div>

                    {/* Profile Information Grid */}
                    <motion.div
                      className="flex-1 w-full space-y-6"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {/* Basic Information Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <h3 className="text-lg font-bold text-gray-700 mb-3 pb-2 border-b-2 border-gray-300">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['name', 'email', 'mobileNumber'].map((fieldKey, index) => {
                            if (!visibleFields.includes(fieldKey)) return null;
                            const field = fieldConfig[fieldKey];
                            if (!field) return null;
                            const Icon = field.icon;

                            return (
                              <motion.div
                                key={fieldKey}
                                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${field.gradient} rounded-lg flex items-center justify-center shadow-sm`}>
                                    <Icon className="text-white text-base" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                      {field.label}
                                    </p>
                                    <p className="text-gray-900 font-semibold capitalize text-base break-words">
                                      {field.value || 'Not provided'}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>

                      {/* Address Information Section */}
                      {visibleFields.some(f => ['houseNumber', 'area', 'village', 'subDistrict', 'district', 'pinCode'].includes(f)) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        >
                          <h3 className="text-lg font-bold text-gray-700 mb-3 pb-2 border-b-2 border-gray-300">Address Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['houseNumber', 'area', 'village', 'subDistrict', 'district', 'pinCode'].map((fieldKey, index) => {
                              if (!visibleFields.includes(fieldKey)) return null;
                              const field = fieldConfig[fieldKey];
                              if (!field) return null;
                              const Icon = field.icon;

                              return (
                                <motion.div
                                  key={fieldKey}
                                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${field.gradient} rounded-lg flex items-center justify-center shadow-sm`}>
                                      <Icon className="text-white text-base" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                        {field.label}
                                      </p>
                                      <p className="text-gray-900 font-semibold capitalize text-base break-words">
                                        {field.value || 'Not provided'}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div></>
              )}
            </motion.div>

            {/* Conditional Sections Based on Role */}

            {/* Business Section - Show for Service Providers */}
            {activeRole === "Service Provider" && (
              <motion.div
                ref={businessRegistrationRef}
                className="bg-white rounded-2xl overflow-hidden mb-8 border-t border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-green-600 to-green-700 border-b border-green-800">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <IoBusinessOutline className="text-white text-xl" />
                      </div>
                      <span>My Businesses</span>
                    </h2>
                    <Link to="/bussiness-registration">
                      <button
                        className="px-5 py-2.5 bg-white text-green-700 hover:bg-green-50 rounded-lg transition-all duration-300 shadow-md font-semibold flex items-center gap-2"
                      >
                        <FaAddressCard className="text-base" />
                        <span>Add Business</span>
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {userDetails?.businesses?.length > 0 ? (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {userDetails?.businesses?.map((business, index) => (
                        <div key={index}>
                          <BusinessCard
                            businessDetails={business}
                            handlePopupWarningOpen={handlePopupWarningOpen}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-green-50 rounded-lg border-2 border-dashed border-green-300">
                      <IoBusinessOutline className="mx-auto text-6xl text-green-400 mb-4" />
                      <p className="text-green-700 text-xl font-bold mb-2">No Business Listed Yet</p>
                      <p className="text-green-600 mb-6">Start offering your services to clients</p>
                      <Link to="/bussiness-registration">
                        <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold shadow-md">
                          Register Your First Business
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Applied Jobs Section - Show for Job Seekers */}
            {activeRole === "Job Seeker" && (
              <motion.div
                ref={appliedJobsRef}
                className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden mb-8 border-t border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="px-6 sm:px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-700">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <MdOutlineWorkOutline className="text-white text-2xl" />
                      </div>
                      <span>My Applications</span>
                    </h2>
                    <Link to="/jobs">
                      <motion.button
                        className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 shadow-lg font-bold flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <TbWorldSearch className="text-lg" />
                        <span>Find Jobs</span>
                      </motion.button>
                    </Link>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {userDetails?.appliedJobs?.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {userDetails?.appliedJobs?.map((job, index) => (
                        <div key={index}>
                          <JobAdvertise
                            typeText="View"
                            job={job}
                            business={job?.business}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-blue-50 rounded-lg border-2 border-dashed border-blue-300">
                      <MdOutlineWorkOutline className="mx-auto text-6xl text-blue-400 mb-4" />
                      <p className="text-blue-700 text-xl font-bold mb-2">No Applications Yet</p>
                      <p className="text-blue-600 mb-6">Find jobs that match your skills</p>
                      <Link to="/jobs">
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-md">
                          Browse Available Jobs
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}




            <motion.div
              className="max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <motion.div
                className="relative bg-white rounded-xl shadow-xl mb-8 overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border-blue-200 border rounded-xl"></div>
                <div className="relative px-6 sm:px-10 py-8">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <MdOutlineHistory className="text-white text-2xl" />
                    </motion.div>
                    <div>
                      <h1 className="text-2xl  font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
                        Service Booking History
                      </h1>
                      <p className="text-gray-600 text-base">Track all your service requests and bookings</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bookings Grid */}
              {bookings?.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {bookings.map((booking, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}

                      className="bg-white rounded-3xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden transition-all group"
                    >
                      {/*  Service Info */}
                      <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 px-6 py-5 overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="relative flex items-start justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <motion.div
                              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              <FaTools className="text-white text-xl" />
                            </motion.div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white leading-tight">
                                {booking?.service?.serviceType}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <MdStar className="text-yellow-400 text-sm" />
                                <span className="text-white/90 text-sm font-medium">
                                  {booking?.service?.rating?.toFixed(1)} Rating
                                </span>
                              </div>
                            </div>


                            <Link to={`/service-detail/${booking?.service?._id}`}>
                              <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-md">
                                View Service
                              </button>
                            </Link>

                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-5">
                        {/* Status Badges */}
                        <div className="flex flex-wrap gap-3">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`px-4 py-2 text-sm font-bold flex gap-2 rounded-xl border-2 ${getStatusColor(booking?.bookingStatus, 'booking')?.box} shadow-sm`}
                          >
                            <MdEventNote size={18} className={getStatusColor(booking?.bookingStatus, 'booking')?.icon} /> Booking : {booking?.bookingStatus}
                          </motion.span>
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`px-4 py-2 text-sm font-bold flex gap-2 rounded-xl border-2 ${getStatusColor(booking?.paymentStatus, 'payment')?.box} shadow-sm`}
                          >
                            <MdOutlinePayment size={18} className={getStatusColor(booking?.paymentStatus, 'payment')?.icon} /> Payment : {booking?.paymentStatus}
                          </motion.span>

                          {booking?.completionOTP && <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`px-4 py-2 text-sm font-bold flex gap-2 rounded-xl border-2 ${getStatusColor(booking?.paymentStatus, 'payment')?.box} shadow-sm`}
                          >
                            <MdOutlineSecurity size={18} className={getStatusColor(booking?.paymentStatus, 'payment')?.icon} /> OTP : {booking?.completionOTP}
                          </motion.span>}
                          
                        </div>

                        {/* Service seeker Info */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border-2 border-blue-100">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                              <FaUserTie className="text-white text-sm" />
                            </div>
                            <h4 className="font-bold text-gray-800">Service Booked for</h4>
                          </div>
                          <div className="space-y-2 ml-11">
                            <div className="flex items-center gap-2 text-base">
                              <MdPerson className="text-indigo-400 " />
                              <span className="text-gray-700 font-medium">{booking?.seekerName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-base">
                              <MdPhone className="text-indigo-400 " />
                              <span className="text-gray-600">{booking?.seekerPhone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-base">
                              <MdEmail className="text-indigo-400 text-base" />
                              <span className="text-gray-600 truncate">{booking?.seekerEmail}</span>
                            </div>
                          </div>
                        </div>

                        {/* Service Location */}
                        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 border-2 border-rose-100">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <MdLocationOn className="text-white text-lg" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-800 mb-1">Location</h4>
                              <p className="text-base text-gray-700 leading-relaxed break-words">
                                {booking?.seekerAddress}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Price Range */}
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 border-2 border-emerald-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FaSackDollar size={18} className='text-yellow-600' />
                              <span className="text-sm font-semibold text-gray-700">Booking Price</span>
                            </div>
                            <span className="text-lg font-bold text-emerald-700">
                              ₹ {Number(booking?.packageSelected) + 10}
                            </span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl p-4 border-2 border-sky-100">
                          <div className="flex items-center gap-3 flex-col sm:flex-row sm:justify-between">

                            <div className="flex items-center gap-2">
                              <FaCircleCheck size={18} className="text-emerald-600" />
                              <span className="text-sm font-semibold text-gray-700">
                                Booking Status
                              </span>
                            </div>

                            <span
                              className={`text-sm font-bold px-4 py-2 break-words rounded-xl border ${getStatusColor(booking?.paymentStatus, 'payment')?.box}`}
                            >
                              {getBookingStatusMessage(
                                booking?.bookingStatus,
                                booking?.paymentStatus
                              )}
                            </span>


                          </div>
                        </div>

                        {booking.bookingStatus === "REQUESTED" && (
                          <button
                            onClick={() => openCancelModal(booking)}
                            className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl font-bold
                 hover:from-red-600 hover:to-rose-700 transition-all duration-300 shadow-xl 
                 hover:shadow-2xl flex items-center justify-center gap-3 text-lg"
                          >
                            <FiXCircle className="text-2xl" />
                            Cancel Booking
                          </button>
                        )}

                        {/* Transaction & Date */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t-2 border-gray-100">
                          <div className="flex items-center gap-2">
                            <MdPayments className="text-blue-500 text-lg" />
                            <span className="text-sm font-mono text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                              TXN: {booking?.transactionId}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MdCalendarToday className="text-gray-400" />
                            <span>{new Date(booking?.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}</span>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-blue-200 shadow-lg"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <MdOutlineHistory className="mx-auto text-8xl text-blue-300 mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">No Service History</h3>
                  <p className="text-gray-600 text-base mb-8">You haven't booked any services yet</p>
                  <Link to="/services">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      Browse Services
                    </motion.button></Link>
                </motion.div>
              )}
            </motion.div>


          </div>

          {isCancelModalOpen && <PopUp
            message="Cancel Service Request?"
            submessage="Are you sure you want to cancel this booking? "
            button1=" No, Keep Booking"
            button2=" Yes, Cancel"
            submessage2={`Service Name: ${selectedBooking?.service?.serviceType}`}
            closeButton={handleCancelModalClose}
            handleRemove={handleConfirmCancel}
            isLoading={isLoading1}
          />
          }
          {/* Popup Overlay & Modal */}
          <AnimatePresence>
            {popupwarning && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handlePopupWarningClose}
                />
                <motion.div
                  className="fixed inset-0 flex items-center justify-center z-50 p-4"
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
                    isLoading={isLoading}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Image Zoom Modal */}
          <AnimatePresence>
            {showImageModal && (
              <ImageZoom
                setShowImageModal={setShowImageModal}
                profileImage={userDetails?.profileImage?.ImageUrl}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default ProfilePage;