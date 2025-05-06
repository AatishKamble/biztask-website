import React, { useEffect, useRef, useState } from 'react'
import { FaSave, FaUser, FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";
import { updateUserProfile } from "../../Redux/Auth/Action.js";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import dummyPhoto from "../../assets/uploadPhoto.jpg";
import { GoUpload } from "react-icons/go";
import { toast } from 'react-toastify';
import { IoArrowBack, IoCamera } from "react-icons/io5";
import { MdEdit, MdCompareArrows } from "react-icons/md";

const ProfileEdit = ({ userDetails }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const profilePic = useRef(null);
    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        mobileNumber: "",
    });

    useEffect(() => {
        if (userDetails) {
            setFormData({
                name: userDetails.name || "",
                mobileNumber: userDetails.mobileNumber || "",
            });
        }
    }, []);

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
            toast.error("Name is required");
            return false;
        }
        if (!/^[A-Za-z ]{3,}$/.test(formData.name)) {
            toast.error("Name should contain only letters and be at least 3 characters long");
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
       
        if (image!==null && image.size > 2 * 1024 * 1024) { 
            toast.error("Image size should not exceed 2 MB");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        const formD = new FormData();
        formD.append("name", formData.name);
        formD.append("mobileNumber", formData.mobileNumber);
        if(image!==null){
            formD.append("profileImage", image);
        }
       
        
        dispatch(updateUserProfile(jwt, formD));
        navigate("/profile");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Back navigation */}
                <div className="mb-8">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-serif"
                    >
                        <IoArrowBack className="mr-2" />
                        <span>Return to Profile</span>
                    </button>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-8 py-6">
                        <h2 className="text-3xl font-semibold text-white text-center font-serif">Edit Profile</h2>
                        <p className="text-blue-100 text-center mt-2 font-serif">Update your personal details</p>
                    </div>

                    <div className="p-8">
                        {/* Photo comparison section */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 bg-gray-50 p-6 rounded-xl">
                            {/* Current photo */}
                            <div className="text-center">
                                <h3 className="font-serif text-gray-600 mb-3 flex items-center justify-center">
                                    <FaUser className="mr-2 text-blue-600" />
                                    Current Photo
                                </h3>
                                <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-gray-200 mx-auto">
                                    <img
                                        src={userDetails?.profileImage?.ImageUrl || dummyPhoto}
                                        alt="Current Profile"
                                        className="w-full h-full object-scale-down"
                                    />
                                </div>
                            </div>
                            
                            {/* Arrow icon */}
                            <div className="flex items-center justify-center text-blue-600">
                                <MdCompareArrows className="w-8 h-8 transform rotate-90 sm:rotate-0" />
                            </div>
                            
                            {/* New photo */}
                            <div className="text-center">
                                <h3 className="font-serif text-gray-600 mb-3 flex items-center justify-center">
                                    <MdEdit className="mr-2 text-blue-600" />
                                    New Photo
                                </h3>
                                <div 
                                    onClick={handlePhotoUpload}
                                    className="relative cursor-pointer group w-32 h-32 mx-auto"
                                >
                                    <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-blue-400 group-hover:ring-blue-600 transition-all duration-300 shadow-md">
                                        <img
                                            src={image ? URL.createObjectURL(image) : dummyPhoto}
                                            alt="New Profile"
                                            className="w-full h-full object-scale-down"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-blue-700/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                                        <IoCamera className="text-white w-8 h-8" />
                                        <span className="text-white text-sm font-serif mt-1">Change Photo</span>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={profilePic}
                                    onChange={handleProfileChange}
                                    accept="image/*"
                                />
                                
                                {image ? <p className="text-green-600 font-serif text-sm mt-2">New photo selected</p>:<p className="text-xs text-gray-500 mt-1 font-serif flex items-center">
                                        <FaTimes className="mr-1 text-gray-400" />
                                       Select image (2 MB)
                                    </p>}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label className=" font-serif text-sm font-medium text-gray-700 mb-2 flex items-center">
                                       
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter Your Name"
                                            className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 border outline-none border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 text-lg font-serif"
                                            autoComplete="off"
                                        />
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className=" text-sm font-serif font-medium text-gray-700 mb-2 flex items-center">
                                     
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={userDetails?.email || ""}
                                            disabled
                                            className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-lg font-serif cursor-not-allowed"
                                            autoComplete="off"
                                        />
                                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 font-serif flex items-center">
                                        <FaTimes className="mr-1 text-gray-400" />
                                        Email cannot be changed
                                    </p>
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className=" font-serif text-sm font-medium text-gray-700 mb-2 flex items-center">
                                      
                                        Mobile Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            placeholder="Enter Your Mobile Number"
                                            className="w-full px-4 py-3 pl-10 rounded-lg outline-none bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 text-lg font-serif"
                                            autoComplete="off"
                                            maxLength={10}
                                        />
                                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 space-y-4">
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg  "
                                >
                                    <FaSave className="w-5 h-5" />
                                    <span className="text-lg font-medium font-serif">Save Profile</span>
                                </button>
                                <button
                                    type='button'
                                    onClick={() => navigate(-1)}
                                    className='bg-red-600 hover:bg-red-500 align-middle h-12 w-full rounded-lg border border-gray-300 text-white  drop-shadow-sm hover:drop-shadow-md flex justify-center items-center transition-all duration-300'
                                >
                                    <span className='text-lg font-serif font-medium'>Cancel</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileEdit;