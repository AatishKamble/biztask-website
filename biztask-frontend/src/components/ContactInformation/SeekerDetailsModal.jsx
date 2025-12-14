import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FaForwardStep, FaUser } from "react-icons/fa6";
import { MdMail, MdPhone } from "react-icons/md";
import { IoMdMap } from "react-icons/io";


const SeekerDetailsModal = ({
    userDetails,
  showSeekerModal,
  setShowSeekerModal,
  openPaymentModal,
  setSeekerData,
}) => {
  const [form, setForm] = useState({
    fullName:userDetails?.name|| "",
    phone:userDetails?.mobileNumber|| "",
    email: userDetails?.email|| "",
    address: userDetails?.houseNumber+","+userDetails?.area+","+userDetails?.village+","+userDetails?.subDistrict+","+userDetails?.district+"-"+userDetails?.pinCode,
  });

  const handleSubmit = () => {
    if (!form.fullName || !form.phone || !form.email || !form.address) {
      alert("All fields are required");
      return;
    }

    setSeekerData(form);        // store seeker data
    setShowSeekerModal(false); // close this modal
    openPaymentModal(true);    // open payment modal
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-emerald-900/40 via-black/60 to-teal-900/40 backdrop-blur-sm flex items-center justify-center p-4 font-serif"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      
    >
      <motion.div
        className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 relative overflow-hidden">
         
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative z-10 flex gap-x-3"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30">
              <FaUser size={32} className="text-white" />
            </div>
            <div> <h3 className="text-2xl font-bold text-white">
              Your Information
            </h3>
            <p className="text-emerald-50 text-sm">
              Please verify and complete your details
            </p></div>
           
          </motion.div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          {/* Full Name Input */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative group">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:text-emerald-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border-2 border-gray-200 pl-11 pr-4 py-3.5 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-white"
                value={form.fullName}
                onChange={e => setForm({ ...form, fullName: e.target.value })}
              />
            </div>
          </motion.div>

          {/* Phone Input */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="relative group">
              <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:text-emerald-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Enter your mobile number"
                className="w-full border-2 border-gray-200 pl-11 pr-4 py-3.5 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-white"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </motion.div>

          {/* Email Input */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative group">
              <MdMail className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:text-emerald-600 transition-colors" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-2 border-gray-200 pl-11 pr-4 py-3.5 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-white"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </motion.div>

          {/* Address Input */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Address
            </label>
            <div className="relative group">
              <IoMdMap className="absolute left-3 top-4 text-emerald-500 group-focus-within:text-emerald-600 transition-colors" size={20} />
              <textarea
                placeholder="Enter your complete address"
                className="w-full border-2 border-gray-200 pl-11 pr-4 py-3.5 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none bg-white min-h-[100px] resize-none"
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-3 pt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <button
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 active:scale-95"
              onClick={() => setShowSeekerModal(false)}
            >
              Cancel
            </button>

            <button
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 active:scale-95"
              onClick={handleSubmit}
            >
              <span className="flex items-center justify-center gap-x-2">Continue <FaForwardStep size={20} /></span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SeekerDetailsModal;