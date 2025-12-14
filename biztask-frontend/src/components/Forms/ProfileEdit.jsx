import React, { useEffect, useRef, useState } from 'react'
import { FaSave, FaUser, FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";
import { FaCity, FaMapMarkerAlt, FaBriefcase, FaHome,FaBuilding } from "react-icons/fa";
import { updateUserProfile } from "../../Redux/Auth/Action.js";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import dummyPhoto from "../../assets/uploadPhoto.jpg";
import { GoUpload } from "react-icons/go";
import { toast } from 'react-toastify';
import { IoArrowBack, IoCamera } from "react-icons/io5";
import { MdEdit, MdCompareArrows } from "react-icons/md";
import { motion } from 'framer-motion';
import { TbMapPinCode } from "react-icons/tb";
import { ImCancelCircle } from "react-icons/im";
import { HiOutlineLocationMarker } from "react-icons/hi";


const ProfileEdit = ({ userDetails }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const profilePic = useRef(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        mobileNumber: "",
        houseNumber: "",
        area: "",
        village: "",
        subDistrict: "",
        district: "",
        pinCode: "",
       
    });

    useEffect(() => {
        if (userDetails) {
            setFormData({
                name: userDetails.name || "",
                mobileNumber: userDetails.mobileNumber || "",
                houseNumber: userDetails.houseNumber || "",
                area: userDetails.area || "",
                village: userDetails.village || "",
                subDistrict: userDetails.subDistrict || "",
                district: userDetails.district  || "",
                pinCode: userDetails.pinCode || "",
               
            });
        }
    }, [userDetails]);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleProfileChange = (event) => {
        setImage(event.target.files[0]);
    }

    const handlePhotoUpload = () => {
        profilePic.current.click();
    }

   const validateInputs = () => {

    
    if (!formData.name.trim()) {
        toast.error("Full Name is required");
        return false;
    }
    if (!/^[A-Za-z ]{3,}$/.test(formData.name.trim())) {
        toast.error("Name must contain only letters and be at least 3 characters long");
        return false;
    }

   
    if (!formData.mobileNumber.trim()) {
        toast.error("Mobile number is required");
        return false;
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
        toast.error("Mobile number must be exactly 10 digits");
        return false;
    }

   
    if (!formData.district.trim()) {
        toast.error("District is required");
        return false;
    }
    if (!/^[A-Za-z ]{2,}$/.test(formData.district.trim())) {
        toast.error("District must contain only letters and be at least 2 characters");
        return false;
    }

    
    if (!formData.subDistrict.trim()) {
        toast.error("Sub-District is required");
        return false;
    }
    if (!/^[A-Za-z ]{2,}$/.test(formData.subDistrict.trim())) {
        toast.error("Sub-District must contain only letters and be at least 2 characters");
        return false;
    }

  
    if (!formData.houseNumber.trim()) {
        toast.error("House/Building Number is required");
        return false;
    }
    
    if (!/^[A-Za-z0-9\-\/ ]{1,10}$/.test(formData.houseNumber.trim())) {
        toast.error("House/Building Number must be valid (letters, numbers, - , / allowed)");
        return false;
    }

  
    if (!formData.village.trim()) {
        toast.error("Village is required");
        return false;
    }
    if (!/^[A-Za-z ]{2,}$/.test(formData.village.trim())) {
        toast.error("Village must contain only letters and be at least 2 characters");
        return false;
    }

    
    if (!formData.area.trim()) {
        toast.error("Area / Locality is required");
        return false;
    }
    if (!/^[A-Za-z0-9 ,.-]{3,}$/.test(formData.area.trim())) {
        toast.error("Area must be at least 3 characters and contain valid characters");
        return false;
    }

   
    if (!formData.pinCode.trim()) {
        toast.error("Pin Code is required");
        return false;
    }
    if (!/^\d{6}$/.test(formData.pinCode)) {
        toast.error("Pin Code must be exactly 6 digits");
        return false;
    }
  
    if (image !== null && image.size > 2 * 1024 * 1024) {
        toast.error("Image size should not exceed 2 MB");
        return false;
    }

    return true;
};


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        const formD = new FormData();
       formD.append("name", formData.name);
        formD.append("mobileNumber", formData.mobileNumber);
        formD.append("houseNumber", formData.houseNumber);
        formD.append("area", formData.area);
        formD.append("village", formData.village);
        formD.append("subDistrict", formData.subDistrict);
        formD.append("district", formData.district);
        formD.append("pinCode", formData.pinCode);
       
        if (image !== null) {
            formD.append("profileImage", image);
        }


        setIsLoading(true);

        const result = await dispatch(updateUserProfile(jwt, formD));

        setIsLoading(false);

        if (result?.success) {


            navigate("/profile");

        }
    };


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

    const formHeaderVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };


    return (
        <div className="min-h-screen  sm:py-12 sm:pb-2 py-6 sm:px-4 px-2 lg:px-8 font-serif">
            <div className="max-w-3xl mx-auto">
               

                <motion.div
                    className="bg-white rounded-xl shadow-xl overflow-hidden mb-10 border border-teal-100"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Header */}

                   <motion.div
                        className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 sm:px-8 py-8 sm:py-10 overflow-hidden"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10 text-center">
                           
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Edit Profile</h2>
                            <p className="text-blue-100 text-sm sm:text-base">Update your personal information</p>
                        </div>
                    </motion.div>


                    <div className="sm:p-8 p-4">
                        <motion.div 
                            className="mb-8 sm:mb-10"
                            variants={itemVariants}
                        >
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 border border-blue-100">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Profile Photo</h3>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                                    {/* Current Photo */}
                                    <div className="text-center">
                                        <div className="relative inline-block">
                                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-blue-200 shadow-lg">
                                                <img
                                                    src={userDetails?.profileImage?.ImageUrl || dummyPhoto}
                                                    alt="Current Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full whitespace-nowrap">
                                                Current
                                            </div>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="text-blue-400">
                                        <MdCompareArrows className="w-8 h-8 sm:w-10 sm:h-10 rotate-90 sm:rotate-0" />
                                    </div>

                                    {/* New Photo */}
                                    <div className="text-center">
                                        <div className="relative inline-block">
                                            <div
                                                onClick={handlePhotoUpload}
                                                className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-indigo-300 shadow-lg cursor-pointer group hover:ring-indigo-500 transition-all duration-300 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                            >
                                                <img
                                                    src={image ? URL.createObjectURL(image) : dummyPhoto}
                                                    alt="New Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-indigo-600/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                                    <IoCamera className="text-white w-8 h-8 mb-1" />
                                                    <span className="text-white text-xs font-semibold">Upload</span>
                                                </div>
                                            </div>
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full whitespace-nowrap">
                                                {image ? "Selected" : "New"}
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            disabled={isLoading}
                                            className="hidden"
                                            ref={profilePic}
                                            onChange={handleProfileChange}
                                            accept="image/*"
                                        />
                                        <p className="text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                                            <span>Max 2 MB</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-6">


                            {/* Personal Information Section */}
                            <motion.div 
                                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 sm:p-6 border border-gray-200"
                                variants={itemVariants}
                            >
                                <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 border-b border-gray-300">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <FaUser className="text-white text-lg" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">Personal Information</h3>
                                </div>

                                <div className="space-y-4 sm:space-y-5">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="name"
                                                disabled={isLoading}
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                className={`w-full px-4 py-3 pl-11 rounded-xl bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                autoComplete="off"
                                            />
                                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={userDetails?.email || ""}
                                                disabled
                                                className="w-full px-4 py-3 pl-11 rounded-xl bg-gray-100 border-2 border-gray-200 text-gray-500 cursor-not-allowed"
                                                autoComplete="off"
                                            />
                                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                                            <FaTimes className="text-gray-400" />
                                            Email cannot be changed
                                        </p>
                                    </div>

                                    {/* Mobile  */}
                                   
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="mobileNumber"
                                                    disabled={isLoading}
                                                    value={formData.mobileNumber}
                                                    onChange={handleChange}
                                                    placeholder="10-digit mobile"
                                                    className={`w-full px-4 py-3 pl-11 rounded-xl bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                    autoComplete="off"
                                                    maxLength={10}
                                                />
                                                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>

                                       
                                    
                                </div>
                            </motion.div>

                            <motion.div 
                                className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-4 sm:p-6 border border-gray-200"
                                variants={itemVariants}
                            >
                                <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 border-b border-gray-300">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                        <HiOutlineLocationMarker className="text-white text-lg" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">Address Information</h3>
                                </div>

                                <div className="space-y-4 sm:space-y-5">
                                    {/* House Number & Area */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">House/Building No. *</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="houseNumber"
                                                    disabled={isLoading}
                                                    value={formData.houseNumber}
                                                    onChange={handleChange}
                                                    placeholder="House/Building number"
                                                    className={`w-full px-4 py-3 pl-11 rounded-xl bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                    autoComplete="off"
                                                />
                                                <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Area / Locality *</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="area"
                                                    disabled={isLoading}
                                                    value={formData.area}
                                                    onChange={handleChange}
                                                    placeholder="Your area or locality"
                                                    className={`w-full px-4 py-3 pl-11 rounded-xl bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                    autoComplete="off"
                                                />
                                                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Village & Sub-District */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Village / Town *</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="village"
                                                    disabled={isLoading}
                                                    value={formData.village}
                                                    onChange={handleChange}
                                                    placeholder="Your village or town"
                                                    className={`w-full px-4 py-3 pl-11 rounded-xl bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                    autoComplete="off"
                                                />
                                                <FaHome className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Sub-District / Tehsil *</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="subDistrict"
                                                    disabled={isLoading}
                                                    value={formData.subDistrict}
                                                    onChange={handleChange}
                                                    placeholder="Sub-district or tehsil"
                                                    className={`w-full px-4 py-3 pl-11 rounded-xl bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                    autoComplete="off"
                                                />
                                                <HiOutlineLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* District & PIN Code */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">District *</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="district"
                                                    disabled={isLoading}
                                                    value={formData.district}
                                                    onChange={handleChange}
                                                    placeholder="Your district"
                                                    className={`w-full px-4 py-3 pl-11 rounded-xl bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                    autoComplete="off"
                                                />
                                                <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">PIN Code *</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="pinCode"
                                                    disabled={isLoading}
                                                    value={formData.pinCode}
                                                    onChange={handleChange}
                                                    maxLength={6}
                                                    placeholder="6-digit PIN code"
                                                    className={`w-full px-4 py-3 pl-11 rounded-xl bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                    autoComplete="off"
                                                />
                                                <TbMapPinCode className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                            </div>
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

                        
                    </div>

                </motion.div>
            </div>

        </div>
    );
}

export default ProfileEdit;