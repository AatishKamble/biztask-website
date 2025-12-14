import { FaSave, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AddedBox from "./AddedBox";
import { businessRegister, getBusinessById, updateBusiness } from "../../Redux/Business/Action.js";
import { useEffect } from "react";
import { toast } from "react-toastify";
import dummyPhoto from "../../assets/uploadPhoto.jpg";
import { IoArrowBack } from "react-icons/io5";
import { FaBuilding, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaSun, FaMoon, FaCalendarAlt, FaHome, FaCity, FaRoad, FaMapSigns, FaMailBulk, FaLayerGroup, FaRegCalendarAlt, FaChevronDown, FaAlignLeft } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { MdEdit, MdBusiness, MdCompareArrows } from "react-icons/md";
import { IoCamera } from "react-icons/io5";
import { motion } from 'framer-motion';
import { ImCancelCircle } from "react-icons/im";

const BusinessRegistration = ({ userDetails, registration }) => {
  const profilePic = useRef(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  // Extended form data with new fields
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    businessName: "",
    businessCategory: "",
    yearsOfExperience: "",
    houseNumber: "",
    village: "",
    area: "",
    subDistrict: "",
    district: "",
    pinCode: "",
    openingTime: "",
    closingTime: "",
    workingDays: []
  });

  const { id } = useParams();
  const businessStore = useSelector(store => store.businessStore);
  const [isLoading, setIsLoading] = useState(false);

  // Business categories
  const businessCategories = [
    "Restaurant & Food Services",
    "Retail & Shopping",
    "Healthcare & Medical",
    "Education & Training",
    "Technology & IT Services",
    "Construction & Real Estate",
    "Beauty & Wellness",
    "Automotive Services",
    "Professional Services",
    "Entertainment & Events",
    "Manufacturing",
    "Agriculture & Farming",
    "Hospitality & Tourism",
    "Financial Services",
   " Electrical Services",

"Plumbing Services",

"Home Maintenance",
    "Other"
  ];

  // Days of the week
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    if (id) {
      dispatch(getBusinessById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (registration==false && businessStore?.business && businessStore?.business?._id === id  ) {
      setFormData({
        companyName: businessStore.business?.companyName || "",
        description: businessStore.business?.description || "",
        businessName: businessStore.business?.businessName || "",
        businessCategory: businessStore.business?.businessCategory || "",
        yearsOfExperience: businessStore.business?.yearsOfExperience || "",
        houseNumber: businessStore.business?.houseNumber || "",
        village: businessStore.business?.village || "",
        area: businessStore.business?.area || "",
        subDistrict: businessStore.business?.subDistrict || "",
        district: businessStore.business?.district || "",
        pinCode: businessStore.business?.pinCode || "",
        openingTime: businessStore.business?.openingTime || "",
        closingTime: businessStore.business?.closingTime || "",
        workingDays: businessStore?.business?.workingDays  || []
      });
    }
  }, [businessStore.business, id]);



  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }


  // Handle working days checkbox
  const handleWorkingDaysChange = (day) => {
    setFormData(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const handleProfileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(file.type)) {
        toast.error("Only JPEG, PNG, and WebP files are allowed!");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size must be under 2MB!");
        return;
      }

      setImage(file);
    }
  };

  const handlePhotoUpload = () => {
    profilePic.current.click();
  };

 const validateForm = () => {
  // Company Name
  if (formData.companyName.trim() === "") {
    toast.error("Company name is required");
    return false;
  }
  if (!/^[A-Za-z\s]+$/.test(formData.companyName)) {
    toast.error("Company Name must only contain alphabets and spaces");
    return false;
  }

  // Company Description
  if (formData.description.trim() === "") {
    toast.error("Company Description is required");
    return false;
  }
  const words = formData.description.trim().split(/\s+/);
  const wordCount = words.filter((word) => word).length;
  if (wordCount < 100) {
    toast.error("Description must be at least 100 words");
    return false;
  }
  if (wordCount > 500) {
    toast.error("Description cannot exceed 500 words");
    return false;
  }

  // Business Info
  if (formData.businessName.trim() === "") {
    toast.error("Business name is required");
    return false;
  }

  if (formData.businessCategory === "") {
    toast.error("Business category is required");
    return false;
  }

  if (formData.yearsOfExperience === "") {
    toast.error("Years of experience is required");
    return false;
  }
  const experience = parseInt(formData.yearsOfExperience);
  if (isNaN(experience) || experience < 0 || experience > 100) {
    toast.error("Years of experience must be between 0 and 100");
    return false;
  }

  // Address
  if (formData.houseNumber.trim() === "") {
    toast.error("House/Building number is required");
    return false;
  }

  if (formData.area.trim() === "") {
    toast.error("Area/Locality is required");
    return false;
  }

  if (formData.subDistrict.trim() === "") {
    toast.error("Sub-district/Tehsil is required");
    return false;
  }

  if (formData.district.trim() === "") {
    toast.error("District is required");
    return false;
  }

  if (formData.pinCode.trim() === "") {
    toast.error("Pin code is required");
    return false;
  }
  if (!/^\d{6}$/.test(formData.pinCode)) {
    toast.error("Pin code must be exactly 6 digits");
    return false;
  }

  // Operating Hours
  if (formData.openingTime === "") {
    toast.error("Opening time is required");
    return false;
  }
  if (formData.closingTime === "") {
    toast.error("Closing time is required");
    return false;
  }
  if (formData.openingTime >= formData.closingTime) {
    toast.error("Closing time must be after opening time");
    return false;
  }

  // Working Days
  if (formData.workingDays.length === 0) {
    toast.error("Please select at least one working day");
    return false;
  }

  
  if (formData.village && !/^[A-Za-z\s]+$/.test(formData.village)) {
    toast.error("Village name must only contain letters");
    return false;
  }


  return true;
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formD = new FormData();

    // Append all form data
    formD.append("companyName", formData.companyName);
    formD.append("description", formData.description);
    formD.append("businessName", formData.businessName);
    formD.append("businessCategory", formData.businessCategory);
    formD.append("yearsOfExperience", formData.yearsOfExperience);
    formD.append("houseNumber", formData.houseNumber);
    if(formData.village){
 formD.append("village", formData.village);
    }
   
    formD.append("area", formData.area);
    formD.append("subDistrict", formData.subDistrict);
    formD.append("district", formData.district);
    formD.append("pinCode", formData.pinCode);
    formD.append("openingTime", formData.openingTime);
    formD.append("closingTime", formData.closingTime);
    formD.append("workingDays", JSON.stringify(formData.workingDays));

    if (image) {
      formD.append("companyLogo", image);
    }


    try {
      setIsLoading(true);

      let result;
      if (registration) {
        result = await dispatch(businessRegister(formD, jwt));
      } else {
        result = await dispatch(updateBusiness(jwt, formD, id));
      }

      if (result?.success) {
        toast.success(result.message || "Company details saved successfully");
        navigate("/profile");
      } else {
        toast.error(result?.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  return (
    <div className="min-h-screen bg-white py-8 px-2 sm:px-6 lg:px-12 font-serif">
      <div className="max-w-5xl mx-auto">

        <motion.div
          className="bg-white rounded-xl shadow-xl overflow-hidden mb-10 border border-teal-100"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >    {/* Header */}


          <motion.div
            className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 sm:px-8 py-8 sm:py-10 overflow-hidden"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center">

              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2"> {registration ? "Register Your Business" : "Update Business"}</h2>
              <p className="text-blue-100 text-sm sm:text-base">Elevate your presence and reach more customers in your community</p>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="sm:p-6 p-4 lg:p-8">
            {/* Business Name Section */}
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                  <FaBuilding className="text-white text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Company Name
                </h2>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Enter Your Company Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="companyName"
                    disabled={isLoading}
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter Your Company Name"
                    className={`w-full px-4 py-3 pl-12 rounded-xl bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder-gray-400 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                  />
                  <MdBusiness className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-xl" />
                </div>
              </div>
            </motion.div>

            {/* Section: Contact Details */}
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm mb-8"
              variants={itemVariants}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-300">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <FaUser className="text-white text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 font-serif">
                  Contact Details
                </h2>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={userDetails?.name || ""}
                      disabled
                      autoComplete="off"
                      className="w-full px-4 py-3 pl-11 rounded-xl bg-gray-100 border-2 border-gray-200 text-gray-600 cursor-not-allowed"
                    />
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Phone</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="mono"
                      value={userDetails?.mobileNumber || ""}
                      disabled
                      autoComplete="off"
                      className="w-full px-4 py-3 pl-11 rounded-xl bg-gray-100 border-2 border-gray-200 text-gray-600 cursor-not-allowed"
                    />
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={userDetails?.email || ""}
                      disabled
                      autoComplete="off"
                      className="w-full px-4 py-3 pl-11 rounded-xl bg-gray-100 border-2 border-gray-200 text-gray-600 cursor-not-allowed"
                    />
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

              </div>
            </motion.div>


            {/* Section: Business Details */}
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm mb-8"
              variants={itemVariants}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-300">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <FaBuilding className="text-white text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 font-serif">
                  Business Information
                </h2>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Business Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Business Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="businessName"
                      disabled={isLoading}
                      value={formData.businessName || ""}
                      onChange={handleChange}
                      placeholder="Enter Business Name"
                      className={`w-full px-4 py-3 pl-11 rounded-xl bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder-gray-400 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                  </div>
                </div>

                {/* Business Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Business Category</label>
                  <div className="relative">
                    <select
                      name="businessCategory"
                      disabled={isLoading}
                      value={formData.businessCategory || ""}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 pl-11 rounded-xl bg-white border-2 border-gray-200 
        focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all 
        text-gray-900 appearance-none ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      <option className="text-gray-900" value="">Select Category</option>
                      {businessCategories.map((category) => (
                        <option
                          key={category}
                          value={category}
                          className="text-gray-900"
                        >
                          {category}
                        </option>
                      ))}
                    </select>

                    {/* Dropdown icon */}
                    <FaLayerGroup className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" />
                    <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />


                  </div>
                </div>


                {/* Years of Experience */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Years of Experience</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="yearsOfExperience"
                      disabled={isLoading}
                      value={formData.yearsOfExperience || ""}
                      onChange={handleChange}
                      placeholder="Enter Years of Experience"
                      min="0"
                      max="100"
                      className={`w-full px-4 py-3 pl-11 rounded-xl bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder-gray-400 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    <FaRegCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                  </div>
                </div>

              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm mb-8"
              variants={itemVariants}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-300">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                  <FaMapMarkerAlt className="text-white text-lg" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 font-serif">
                  Business Address
                </h2>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* House Number */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
                    House/Building Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="houseNumber"
                      disabled={isLoading}
                      value={formData.houseNumber || ""}
                      onChange={handleChange}
                      placeholder="Enter House/Building Number"
                      className={`w-full px-4 py-3 pl-10 rounded-xl bg-white border-2 border-gray-200 
          focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none 
          transition-all text-gray-900 placeholder-gray-400 
          ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                  </div>
                </div>

                {/* Village */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
                    Village (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="village"
                      disabled={isLoading}
                      value={formData.village || ""}
                      onChange={handleChange}
                      placeholder="Enter Village Name"
                      className={`w-full px-4 py-3 pl-10 rounded-xl bg-white border-2 border-gray-200 
          focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none 
          transition-all text-gray-900 placeholder-gray-400 
          ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                  </div>
                </div>

                {/* Area/Locality */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
                    Area/Locality
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="area"
                      disabled={isLoading}
                      value={formData.area || ""}
                      onChange={handleChange}
                      placeholder="Enter Area/Locality"
                      className={`w-full px-4 py-3 pl-10 rounded-xl bg-white border-2 border-gray-200 
          focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none 
          transition-all text-gray-900 placeholder-gray-400 
          ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    <FaRoad className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                  </div>
                </div>

                {/* Sub-District/Tehsil */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
                    Sub-District/Tehsil
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subDistrict"
                      disabled={isLoading}
                      value={formData.subDistrict || ""}
                      onChange={handleChange}
                      placeholder="Enter Sub-District"
                      className={`w-full px-4 py-3 pl-10 rounded-xl bg-white border-2 border-gray-200 
          focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none 
          transition-all text-gray-900 placeholder-gray-400 
          ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    <FaMapSigns className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                  </div>
                </div>

                {/* District */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
                    District
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="district"
                      disabled={isLoading}
                      value={formData.district || ""}
                      onChange={handleChange}
                      placeholder="Enter District"
                      className={`w-full px-4 py-3 pl-10 rounded-xl bg-white border-2 border-gray-200 
          focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none 
          transition-all text-gray-900 placeholder-gray-400 
          ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                  </div>
                </div>

                {/* Pin Code */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
                    Pin Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="pinCode"
                      disabled={isLoading}
                      value={formData.pinCode || ""}
                      onChange={handleChange}
                      placeholder="Enter 6-digit Pin Code"
                      maxLength="6"
                      className={`w-full px-4 py-3 pl-10 rounded-xl bg-white border-2 border-gray-200 
          focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none 
          transition-all text-gray-900 placeholder-gray-400 
          ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    <FaMailBulk className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                  </div>
                </div>

              </div>
            </motion.div>


            <motion.div
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 sm:p-6 border border-gray-200 mb-8 shadow-md"
              variants={itemVariants}
            >

              <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 border-b border-gray-300">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <FaClock className="text-white text-lg" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Operating Hours</h3>
              </div>

              {/* Time Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Opening Time */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaSun className="text-yellow-500" />
                    Opening Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      name="openingTime"
                      disabled={isLoading}
                      value={formData.openingTime || ""}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200
          focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200
          text-gray-900 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>

                {/* Closing Time */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaMoon className="text-purple-500" />
                    Closing Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      name="closingTime"
                      disabled={isLoading}
                      value={formData.closingTime || ""}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200
          focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200
          text-gray-900 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {/* Working Days */}
              <div className="space-y-3">
                <label className=" text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  Working Days
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {daysOfWeek.map((day) => (
                    <label
                      key={day}
                      className={`flex items-center space-x-2 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer
          ${formData.workingDays.includes(day)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'}
          ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.workingDays.includes(day)}
                        onChange={() => handleWorkingDaysChange(day)}
                        disabled={isLoading}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>


            {/* Section: Company Description */}
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 sm:p-6 border border-gray-200 mb-8"
              variants={itemVariants}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 border-b border-gray-300">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <FaBuilding className="text-white text-lg" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Company Description</h3>
              </div>

              {/* Description */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <div className="relative">
                  <textarea
                    name="description"
                    disabled={isLoading}
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Description about your business"
                    className={`w-full h-60 px-4 py-3 pl-11 rounded-xl bg-white border-2 border-gray-200
        focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200
        text-gray-900 placeholder:text-gray-400 shadow-inner
        ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    style={{ resize: "none" }}
                  ></textarea>

                  {/* Left icon */}
                  <FaAlignLeft className="absolute left-3 top-5 text-gray-400 pointer-events-none" />
                </div>

              </div>
            </motion.div>



            <motion.div
              className="mb-8 sm:mb-10"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-md">

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center font-serif flex items-center justify-center gap-2">

                  Company Logo
                </h2>

                <div
                  className={`flex flex-col sm:flex-row items-center justify-center gap-8 p-6  rounded-2xl shadow-sm ${isLoading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                >

                  {/* Current Logo */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-blue-200 shadow-lg">
                        <img
                          src={registration ? dummyPhoto : businessStore?.business?.companyLogo?.imageUrl}
                          alt="Current Logo"
                          className="w-full h-full object-scale-down"
                        />
                      </div>

                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        Current
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="text-blue-400">
                    <MdCompareArrows className="w-8 h-8 sm:w-10 sm:h-10 rotate-90 sm:rotate-0" />
                  </div>

                  {/* New Logo */}
                  <div className="text-center">
                    <div className="relative inline-block">

                      <div
                        onClick={handlePhotoUpload}
                        className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-indigo-300 shadow-lg cursor-pointer group hover:ring-indigo-500 transition-all duration-300 ${isLoading ? "opacity-60 cursor-not-allowed" : ""
                          }`}
                      >
                        <img
                          src={image ? URL.createObjectURL(image) : dummyPhoto}
                          alt="New Logo"
                          className="w-full h-full object-scale-down"
                        />

                        <div className="absolute inset-0 bg-indigo-600/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                          <IoCamera className="text-white w-8 h-8 mb-1" />
                          <span className="text-white text-xs font-semibold">Upload</span>
                        </div>
                      </div>

                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                        {image ? "Selected" : "New"}
                      </div>
                    </div>

                    <input
                      type="file"
                      className="hidden"
                      disabled={isLoading}
                      ref={profilePic}
                      onChange={handleProfileChange}
                      accept="image/*"
                    />

                    {image ? (
                      <p className="text-green-600 text-sm font-serif mt-3">New Logo selected</p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-3 flex items-center justify-center gap-1 font-serif">
                        <FaTimes className="text-gray-400" /> Max 2 MB
                      </p>
                    )}
                  </div>
                </div>


              </div>
            </motion.div>


            {/* Action Buttons */}
           
            <motion.div
              variants={itemVariants}
              className="pt-6 flex flex-col sm:flex-row justify-center  gap-4 sm:gap-6 w-full">


              <button
                type="button"
                disabled={isLoading}
                onClick={() => navigate(-1)}
                className={`flex-1 px-6 py-3.5 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 border-2 border-red-300 hover:border-red-400 rounded-xl font-bold text-base transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <ImCancelCircle className="text-lg" />
                <span>Cancel</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin border-3 border-white border-t-transparent rounded-full w-5 h-5"></span>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <FaSave className="text-lg" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>

      </div>
    </div>
  );
}

export default BusinessRegistration;