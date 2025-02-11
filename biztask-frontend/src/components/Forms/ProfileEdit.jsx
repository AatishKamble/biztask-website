import React, { useEffect, useRef, useState } from 'react'
import { FaSave } from "react-icons/fa";
import { updateUserProfile } from "../../Redux/Auth/Action.js";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import dummyPhoto from "../../assets/uploadPhoto.jpg";
import { GoUpload } from "react-icons/go";
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const formD = new FormData();
        formD.append("name", formData.name);
        formD.append("mobileNumber", formData.mobileNumber);
        formD.append("profileImage", image);

        dispatch(updateUserProfile(jwt, formD));
        navigate("/profile");
    }



    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto bg-[#f4faff] rounded-2xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#3d7c9c] to-blue-300 px-8 py-6">
                        <h2 className="text-2xl font-serif text-white font-semibold text-center">
                            Edit Profile
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                           {/* Profile Image */}
                           <div className="flex flex-col items-center space-y-4">
                            <div
                                onClick={handlePhotoUpload}
                                className="relative group cursor-pointer"
                            >
                                <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-100 shadow-lg">
                                    <img
                                        src={image ? URL.createObjectURL(image) : dummyPhoto}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                    <GoUpload className="text-white w-8 h-8" />
                                </div>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                ref={profilePic}
                                onChange={handleProfileChange}
                            />
                        </div>
                        {/* Name Field */}
                        <div>
                            <label className="block font-serif text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border outline-none border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 text-lg font-serif"
                                autoComplete="off"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-serif font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={userDetails?.email || ""}
                                disabled
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-lg font-serif cursor-not-allowed"
                                autoComplete="off"
                            />
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label className="block font-serif text-sm font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                placeholder="Enter Your Mobile Number"
                                className="w-full px-4 py-3 rounded-lg outline-none bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 text-lg font-serif"
                                autoComplete="off"
                                maxLength={10}
                            />
                        </div>

                     

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <FaSave className="w-5 h-5" />
                                <span className="text-lg font-medium font-serif">Save Changes</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>



        </>
    )
}

export default ProfileEdit