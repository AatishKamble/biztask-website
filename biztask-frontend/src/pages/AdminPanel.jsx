import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookingsAdmin,
  verifyBookingAdmin,
  rejectBookingAdmin
} from "../Redux/Adminbookings/Action.js";
import { toast } from "react-toastify";
import {
  FaCheck,
  FaCheckCircle,
  FaTimes,
  FaUser,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaEye,
  FaEnvelope,
  FaCalendarAlt,
  FaPhone,
  FaBuilding,
  FaClipboardList,
  FaStar,
  FaFilter,
  FaSearch,
  FaChevronDown,
  FaTachometerAlt
} from "react-icons/fa";
import { CLEAR_ADMIN_BOOKING_ERROR, CLEAR_ADMIN_BOOKING_MESSAGE } from "../Redux/Adminbookings/ActionType.js";

const statusColors = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  VERIFIED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  REQUESTED: "bg-blue-50 text-blue-700 border-blue-200",
  CONFIRMED: "bg-indigo-50 text-indigo-700 border-indigo-200",
  COMPLETED: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
  CANCELLED:"bg-rose-50 text-rose-700 border-rose-200",
  CANCELLED_BY_PROVIDER:"bg-rose-50 text-rose-700 border-rose-200",
};

const AdminPanel = () => {
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    dispatch(getAllBookingsAdmin(jwt));
  }, [dispatch, jwt]);

  const { bookings, isLoading, error, message } = useSelector(
    state => state.adminServiceBooking
  );

  const handleVerify = async id => {
    await dispatch(verifyBookingAdmin(id, jwt));
  };

  const handleReject = async id => {
    await dispatch(rejectBookingAdmin(id, jwt));

  };

  const filteredBookings = bookings?.filter(b => {
    const matchesSearch =
      b.seekerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service?.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b._id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === "ALL" || b.paymentStatus === filterStatus || b.bookingStatus === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: bookings?.length || 0,
    pending: bookings?.filter(b => b.paymentStatus === "PENDING").length || 0,
    verified: bookings?.filter(b => b.paymentStatus === "VERIFIED").length || 0,
    rejected: bookings?.filter(b => b.paymentStatus === "REJECTED").length || 0,
    completed: bookings?.filter(b => b.bookingStatus === "COMPLETED").length || 0,
    cancelledBySeeker: bookings?.filter(b =>  b.bookingStatus === "CANCELLED").length || 0,
        cancelledByProvider: bookings?.filter(b => b.bookingStatus === "CANCELLED_BY_PROVIDER").length || 0,
 
  };


  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: CLEAR_ADMIN_BOOKING_MESSAGE });

    }
  }, [message, dispatch]);


  useEffect(() => {
    if (!error) return;

    toast.error(error);


    dispatch({ type: CLEAR_ADMIN_BOOKING_ERROR });

  }, [error, dispatch]);


  return (
    <div className="min-h-screen  p-4 md:p-8 font-serif">
      {/* HEADER  */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
            <FaTachometerAlt className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              Booking Management
            </h1>
            <p className="text-slate-600 mt-1">Monitor and manage all service bookings</p>
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

          <div className="bg-white rounded-xl shadow-md border border-emerald-200 p-5 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 font-medium">Verified</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">{stats.verified}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <FaCheck className="text-2xl text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-rose-200 p-5 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-rose-700 font-medium">Rejected</p>
                <p className="text-3xl font-bold text-rose-600 mt-1">{stats.rejected}</p>
              </div>
              <div className="p-3 bg-rose-100 rounded-lg">
                <FaTimes className="text-2xl text-rose-600" />
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
                <p className="text-sm text-rose-700 font-medium">Cancelled By Customer</p>
                <p className="text-3xl font-bold text-rose-600 mt-1">{stats.cancelledBySeeker}</p>
              </div>
              <div className="p-3 bg-rose-100 rounded-lg">
                <FaTimes className="text-2xl text-rose-600" />
              </div>
            </div>
          </div>
 <div className="bg-white rounded-xl shadow-md border border-rose-200 p-5 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-rose-700 font-medium">Cancelled By Provider</p>
                <p className="text-3xl font-bold text-rose-600 mt-1">{stats.cancelledByProvider}</p>
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
              placeholder="Search by seeker name, service type,booking ID or transaction ID..."
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
              <option value="PENDING">Pending</option>
              <option value="VERIFIED">Verified</option>
              <option value="COMPLETED">Completed</option>
              <option value="REJECTED">Rejected</option>
              <option value="CANCELLED">Cancelled by Seeker</option>
              <option value="CANCELLED_BY_PROVIDER">Cancelled by Provider</option>
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>



      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
        </div>
      ) :

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBookings?.map(b => (
            <div
              key={b._id}
              className="bg-white rounded-2xl shadow-lg  transition-all duration-300 border border-slate-200 overflow-hidden group"
            >
              {/* HEADER  */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-xs opacity-90 mb-1 font-medium tracking-wide">BOOKING ID</div>
                    <div className="font-mono text-xs bg-white/20 backdrop-blur-sm rounded px-2 py-1 inline-block">
                      {b._id?.substring(0, 12)}...
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[b.bookingStatus]} bg-white`}>
                    {b.bookingStatus}
                  </div>
                </div>

                <h3 className="font-bold text-xl mt-3 leading-tight">
                  {b.service?.serviceType}
                </h3>

                {b.service?.rating && (
                  <div className="flex items-center gap-1 mt-2">
                    <FaStar className="text-yellow-300" />
                    <span className="font-semibold"> {Number(b.service.rating).toFixed(1)}</span>
                    <span className="text-xs opacity-75">/5</span>
                  </div>
                )}
              </div>


              <div className="p-6 space-y-4">
                {/* SEEKER INFO */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg flex-shrink-0">
                    <FaUser className="text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-500 font-medium mb-1">Seeker</p>
                    <p className="font-semibold text-slate-800 truncate">{b.seekerName}</p>
                    <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                      <FaPhone className="text-sm" />
                      <span>: {b.seekerPhone}</span>
                    </p>
                  </div>
                </div>

                {/* PROVIDER INFO */}
                {b.provider && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                      <FaBuilding className="text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-500 font-medium mb-1">Provider</p>
                      <p className="font-semibold text-slate-800 truncate">{b.provider.name}</p>
                      <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                        <FaPhone className="text-sm" />
                        <span>: {b.provider.mobileNumber}</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* TRANSACTION */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                    <FaMoneyBillWave className="text-green-600" />
                  </div>
                  <div className="flex-1  min-w-0">
                    <p className="text-sm text-slate-500 font-medium ">Transaction</p>
                    <p className="font-mono text-sm font-semibold text-slate-800 mb-1">Id:<span> {b.transactionId}</span></p>
                    <p className="text-sm text-slate-500 font-medium">Paid Amount</p>
                    <p className="font-mono text-sm font-semibold text-slate-800"><span> ₹ {Number(b?.packageSelected) + 10}</span></p>

                    <span className={`inline-block mt-2 px-2 py-1 rounded-xl text-xs font-bold border ${statusColors[b.paymentStatus]}`}>
                      {b.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="p-2 bg-rose-100 rounded-lg flex-shrink-0">
                    <FaMapMarkedAlt className="text-rose-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-500 font-medium mb-1">Address</p>
                    <p className="text-sm text-slate-600 font-semibold line-clamp-2">{b.seekerAddress}</p>
                  </div>
                </div>
              </div>

              {/* ACTIONS FOOTER */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors font-medium shadow-md"
                  >
                    <FaEye /> Details
                  </button>


                </div>

                {b.paymentStatus === "PENDING" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVerify(b._id)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all font-medium shadow-md"
                    >
                      <FaCheck /> Verify Payment
                    </button>

                    <button
                      onClick={() => handleReject(b._id)}
                      className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all font-medium shadow-md"
                    >
                      <FaTimes /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      }
      {filteredBookings?.length === 0 && !isLoading && (
        <div className="text-center py-20">
          <div className="inline-block p-6 bg-slate-100 rounded-full mb-4">
            <FaClipboardList className="text-6xl text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-700 mb-2">No Bookings Found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* FULL DETAILS MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0  bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white max-h-[95%] rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl">

            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6">
              <h3 className="text-3xl font-bold">Booking Details</h3>
              <p className="text-base opacity-90 mt-1">Complete information about this booking</p>
            </div>


            <div className="p-6 overflow-y-auto  max-h-[60vh] space-y-6">
              {/* SERVICE SECTION */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-600 rounded-lg">
                    <FaClipboardList className="text-xl text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800">Service Information</h4>
                </div>
                <h5 className="text-2xl font-bold text-indigo-900 mb-2">
                  {selectedBooking.service?.serviceType}
                </h5>
                <p className="text-slate-700 leading-relaxed">
                  {selectedBooking.service?.Description}
                </p>
                {selectedBooking.service?.features && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedBooking.service.features.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white text-indigo-700 rounded-full text-sm font-medium border border-indigo-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>


              <div className="grid md:grid-cols-2 gap-6">
                {/* SEEKER */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <FaUser className="text-xl text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800">Seeker Details</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Name</p>
                      <p className="font-semibold text-slate-800 text-lg">{selectedBooking.seekerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Phone</p>
                      <p className="font-semibold text-slate-800">{selectedBooking.seekerPhone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Email</p>
                      <p className="font-semibold text-slate-800 break-all">{selectedBooking.seekerEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Address</p>
                      <p className="font-semibold  text-slate-800 break-all ">{selectedBooking.seekerAddress}</p>
                    </div>
                  </div>
                </div>

                {/* PROVIDER */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <FaBuilding className="text-xl text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800">Provider Details</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Name</p>
                      <p className="font-semibold text-slate-800 text-lg">{selectedBooking.provider?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Phone</p>
                      <p className="font-semibold text-slate-800">{selectedBooking.provider?.mobileNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Email</p>
                      <p className="font-semibold text-slate-800 break-all">{selectedBooking.provider?.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Location</p>
                      <p className="font-semibold text-slate-800  break-all">
                        {selectedBooking.provider?.area}, {selectedBooking.provider?.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAYMENT & STATUS */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-600 rounded-lg">
                    <FaMoneyBillWave className="text-xl text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800">Payment & Status</h4>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Transaction ID</p>
                    <p className="font-mono font-bold text-slate-800 text-lg">{selectedBooking.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Paid Amount</p>
                    <p className="font-mono font-bold text-slate-800 text-lg"> ₹ {Number(selectedBooking?.packageSelected) + 10}</p>
                  </div>

                  <div>

                    <p className="text-sm text-slate-600 mb-2">Payment Status</p>
                    <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold border ${statusColors[selectedBooking.paymentStatus]}`}>
                      {selectedBooking.paymentStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Booking Status</p>
                    <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold border ${statusColors[selectedBooking.bookingStatus]}`}>
                      {selectedBooking.bookingStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="bg-slate-50 border-t border-slate-200 p-6 flex justify-end gap-3">
              {selectedBooking.paymentStatus === "PENDING" && (
                <>
                  <button
                    onClick={() => {
                      handleVerify(selectedBooking._id);
                      setSelectedBooking(null);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium flex items-center gap-2 shadow-md transition-all"
                  >
                    <FaCheck /> Verify Payment
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedBooking._id);
                      setSelectedBooking(null);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg font-medium flex items-center gap-2 shadow-md transition-all"
                  >
                    <FaTimes /> Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium shadow-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;