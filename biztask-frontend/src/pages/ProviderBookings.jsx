import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelProviderBooking, getProviderBookings, sendCompletionOTP, verifyCompletionOTP } from "../Redux/ServiceBooking/Action";
import { toast } from "react-toastify";
import { FiUser, FiPhone, FiMapPin, FiCreditCard, FiCheckCircle, FiClock, FiCalendar, FiMail, FiX, FiSend } from "react-icons/fi";
import { MdOutlinePayment, MdEventNote } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { BiTargetLock } from "react-icons/bi";
import { CLEAR_SERVICE_ERROR, CLEAR_SERVICE_MESSAGE } from "../Redux/ServiceBooking/ActionType.js";
import { FaTachometerAlt } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import {
  FaCheck,
  FaCheckCircle,
  FaTimes,

  FaCalendarAlt,

  FaClipboardList,
  FaStar,
  FaFilter,
  FaSearch,
  FaChevronDown,

} from "react-icons/fa";
import PopUp from "../components/PopUp/PopUp.jsx";
const ProviderBookings = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [otp, setOtp] = useState("");


  useEffect(() => {
    dispatch(getProviderBookings(jwt));
  }, [dispatch, jwt]);

  const {
    bookings,
    isLoading,
    otpSent,
    otpVerified,
    message,
    error
  } = useSelector(store => store.serviceBookingStore);



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };



  const getStatusBadge = (status) => {
    const styles = {
      VERIFIED: "bg-green-100 text-green-800 border-green-300",
      COMPLETED: "bg-green-100 text-green-800 border-green-300",
      CONFIRMED: "bg-blue-100 text-blue-800 border-blue-300",
      FAILED: "bg-red-100 text-red-800 border-red-300",
      PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
      REJECTED: "bg-rose-50 text-rose-700 border-rose-200"
    };
    return styles[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };


  const openOtpModal = (booking) => {
    setSelectedBooking(booking);
    setIsOtpModalOpen(true);
    setOtp("");

  };

  const closeOtpModal = () => {
    setIsOtpModalOpen(false);
    setSelectedBooking(null);
    setOtp("");

  };
  const handleSendOtp = async () => {
    await dispatch(sendCompletionOTP(selectedBooking._id, jwt));
  };
  const handleVerifyOtpAndComplete = async () => {
    if (!otp.trim()) {
      toast.error("Please enter OTP");
      return;
    }

    await dispatch(verifyCompletionOTP(selectedBooking._id, otp, jwt));

  };


  useEffect(() => {
    if (message) {
      toast.success(message);
      if (otpVerified) {
        closeOtpModal();
      }
      dispatch({ type: CLEAR_SERVICE_MESSAGE });

    }
  }, [message, otpVerified, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_SERVICE_ERROR });
    }
  }, [error, dispatch]);





  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");


  const filteredBookings = bookings?.filter(b => {
    const matchesSearch =
      b.seekerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service?.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b._id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === "ALL" || b.paymentStatus === filterStatus || b.bookingStatus === filterStatus;

    return matchesSearch && matchesFilter;
  });
  const stats = {
    total: bookings?.length || 0,
    pending: bookings?.filter(b => b.bookingStatus === "CONFIRMED").length || 0,
    cancelled: bookings?.filter(b => b.bookingStatus === "CANCELLED_BY_PROVIDER").length || 0,
    completed: bookings?.filter(b => b.bookingStatus === "COMPLETED").length || 0,
  };


  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };
const handleCancelModalClose = () => {
    setIsCancelModalOpen(!isCancelModalOpen);
  }
  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;

    await dispatch(cancelProviderBooking(selectedBooking._id, jwt));

    setIsCancelModalOpen(false);
  };


  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 font-serif">
      <div className="max-w-8xl mx-auto">
        {/* Header */}



        <div className="mb-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
              <FaTachometerAlt className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                Customer Booking Requests
              </h1>
              <p className="text-slate-600 mt-1"> See who needs your service today</p>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Total Bookings</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{stats.total}</p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FaClipboardList className="text-2xl text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-amber-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-700 font-medium">Pending</p>
                  <p className="text-3xl font-bold text-amber-600 mt-1">{stats.pending}</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-lg">
                  <FaCalendarAlt className="text-2xl text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-teal-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-teal-700 font-medium">Completed</p>
                  <p className="text-3xl font-bold text-teal-600 mt-1">{stats.completed}</p>
                </div>
                <div className="p-3 bg-teal-100 rounded-lg">
                  <FaCheckCircle className="text-2xl text-teal-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-rose-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-rose-700 font-medium">Cancelled</p>
                  <p className="text-3xl font-bold text-rose-600 mt-1">{stats.cancelled}</p>
                </div>
                <div className="p-3 bg-rose-100 rounded-lg">
                  <FaTimes className="text-2xl text-rose-600" />
                </div>
              </div>
            </div>



          </div>

          {/* SEARCH AND FILTER */}
          <div className="flex flex-col md:flex-row gap-4 bg-white rounded-xl shadow-md p-4 border border-slate-200">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by seeker name, service type,booking ID ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="relative min-w-[200px]">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-12 pr-10 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="ALL">All Status</option>
                <option value="CONFIRMED">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED_BY_PROVIDER">Cancelled by provider</option>
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )
          : <>
            {/* Bookings List */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {filteredBookings?.map((booking) => (
                <div
                  key={booking._id}
                  className="group bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl  border-2 border-gray-200"
                >



                  <div className="p-6">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 pb-4 gap-4 border-b">
                      <div >
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {booking.service?.serviceType}
                          </span>
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiCalendar className="text-purple-500" />
                          <span className="font-light">{formatDate(booking.createdAt)}</span>
                        </div>
                      </div>


                      <div className="flex flex-wrap gap-3">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`px-4 py-2 text-sm font-bold flex gap-2 rounded-xl border-2 ${getStatusBadge(booking?.bookingStatus, 'booking')} shadow-sm`}
                        >
                          <MdEventNote size={18} className="text-slate-600" /> Booking : {booking?.bookingStatus}
                        </motion.span>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`px-4 py-2 text-sm font-bold flex gap-2 rounded-xl border-2 ${getStatusBadge(booking?.paymentStatus, 'payment')} shadow-sm`}
                        >
                          <MdOutlinePayment size={18} className='text-green-700' /> Payment : {booking?.paymentStatus}
                        </motion.span>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Customer Details */}
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                        <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                            <FiUser className="text-white" />
                          </div>
                          Customer Details
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-gray-700">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                              <FiUser className="text-indigo-500" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 font-light">Name</div>
                              <div className="font-semibold">{booking.seekerName}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-gray-700">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                              <FiPhone className="text-indigo-500" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 font-light">Phone</div>
                              <div className="font-semibold">{booking.seekerPhone}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 text-gray-700">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                              <FiMapPin className="text-indigo-500" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 font-light">Address</div>
                              <div className="font-medium leading-relaxed">{booking.seekerAddress}</div>
                            </div>
                          </div>
                        </div>
                      </div>


                      {/* Transaction Details */}
                      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
                        <h4 className="text-sm font-bold text-pink-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                            <FiCreditCard className="text-white" />
                          </div>
                          Transaction Info
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-white rounded-xl p-4 shadow-md border border-pink-100">
                            <div className="text-sm text-gray-500 font-light mb-1">Booking ID</div>
                            <div className="font-medium text-gray-800 break-all">
                              {booking._id}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-4 shadow-md border border-pink-100">
                            <div className="text-sm text-gray-500 font-light mb-1">Customer Email</div>
                            <div className="font-medium text-gray-800 break-all">
                              {booking.seekerEmail}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-4 shadow-md border border-pink-100">
                            <div className="text-sm text-gray-500 font-light mb-1"> Expected Earnings on Completion</div>
                            <div className="font-medium text-gray-800 break-all">
                              ₹ {booking.packageSelected}
                            </div>
                          </div>



                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 pt-6 border-t-2 border-gray-100">

                      <span
                        className="p-2 bg-blue-50 text-blue-700 rounded-md border border-blue-200 text-base text-center block"
                      >
                        Please share the worker’s details with the customer in advance via mobile or email for a smooth service experience.
                      </span>

                      {booking.bookingStatus === "CONFIRMED" && (
                        <button
                          onClick={() => openOtpModal(booking)}

                          className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl  flex items-center justify-center gap-3 text-lg"
                        >
                          <FiCheckCircle className="text-2xl" />
                          Complete with OTP
                        </button>
                      )}
                      {booking.bookingStatus === "CONFIRMED" && (
                        <button
                          onClick={() => openCancelModal(booking)}
                          className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl font-bold
                 hover:from-red-600 hover:to-rose-700 transition-all duration-300 shadow-xl 
                 hover:shadow-2xl flex items-center justify-center gap-3 text-lg"
                        >
                          <FiXCircle className="text-2xl" />
                          Reject Booking
                        </button>
                      )}

                      {booking.bookingStatus === "COMPLETED" && (
                        <div className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 text-lg shadow-xl">
                          <FiCheckCircle className="text-2xl animate-pulse" />
                          Service Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>

        }


        {isCancelModalOpen && (

          <PopUp
            message="Reject Service Request?"
            submessage="Are you sure you want to reject this booking?.This action cannot be undone and the customer will be notified."
            button1=" No, Keep Booking"
            button2=" Yes, Reject"
            submessage2={`Service Name: ${selectedBooking?.service?.serviceType}`}
            closeButton={handleCancelModalClose}
            handleRemove={handleConfirmCancel}
            isLoading={isLoading}
          />
        
        )}


        {/* Empty State */}
        {filteredBookings?.length === 0 && !isLoading && (

          <div className="text-center py-20">
            <div className="inline-block p-6 bg-slate-100 rounded-full mb-4">
              <BiTargetLock className="text-6xl text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2"> No bookings yet</h3>
            <p className="text-slate-500"> Try adjusting your search or filter criteria</p>
          </div>
        )}

        {isOtpModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 font-serif">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">

              {/* HEADER */}
              <div className="bg-green-600 p-5 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiMail className="text-white text-2xl" />
                  <div>
                    <h3 className="text-xl font-bold text-white">OTP Verification</h3>
                    <p className="text-green-100 text-sm">
                      for {selectedBooking?.seekerName}
                    </p>
                  </div>
                </div>
                <button onClick={closeOtpModal} className="text-white hover:bg-green-700 rounded-full p-2">
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* BODY */}
              <div className="p-6">

                {/* CUSTOMER INFO */}
                <div className="bg-gray-50 rounded-lg p-4 mb-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser className="text-green-600" />
                    <span className="font-semibold text-gray-800">{selectedBooking?.seekerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-base">
                    <FiMail className="text-green-600" />
                    <span>{selectedBooking?.seekerEmail}</span>
                  </div>
                </div>

                {/* OTP INPUT */}
                {otpSent && (
                  <label className="block mb-4">
                    <span className="text-gray-700 font-semibold mb-2 block">Enter OTP</span>
                    <input
                      type="number"
                      disabled={isLoading}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6 digit OTP"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </label>
                )}

                {/*  ACTION BUTTONS */}
                <div className="flex gap-3">
                  <button
                    onClick={closeOtpModal}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>

                  {!otpSent ? (
                    <button
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg"
                    >
                      {isLoading ? "Sending..." : "Send OTP"}
                    </button>

                  ) : (
                    <button
                      onClick={handleVerifyOtpAndComplete}
                      disabled={isLoading}
                      className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg"
                    >
                      {isLoading ? "Verifying..." : "Verify & Complete"}
                    </button>

                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>


    </div>
  );
};

export default ProviderBookings;