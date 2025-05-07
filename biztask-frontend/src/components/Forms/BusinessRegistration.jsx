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
import { FaBuilding, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { MdEdit, MdCompareArrows } from "react-icons/md";
import { IoCamera } from "react-icons/io5";
const BusinessRegistration = ({ userDetails, registration }) => {
  const profilePic = useRef(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
  });

  const { id } = useParams();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const businessStore = useSelector(store => store.businessStore)

  useEffect(() => {
    if (id) {
      dispatch(getBusinessById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (businessStore.business && businessStore.business._id === id) {
      setFormData({
        companyName: businessStore.business.companyName,
        description: businessStore.business.description,
      });
    }
  }, [businessStore.business, id]);

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
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formD = new FormData();

    if (formData.companyName.trim() == "") {
      toast.error('company name is required');
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(formData.companyName)) {
      toast.error('Company Name must only contain alphabets and spaces');
      return;
    }

    if (formData.description.trim() === "") {
      toast.error('company Description is required');
      return;
    }
    
    const words = formData.description.trim().split(/\s+/);
    const wordCount = words.filter(word => word).length;

    if (wordCount < 100) {
      toast.error('Description cannot be smaller than 100 words');
      return;
    }
    if (wordCount > 500) {
      toast.error('Description cannot be longer than 500 words');
      return;
    }


    if (image === null) {
      toast.error("Image Required!. Please Upload Profile image");
      return;
    }


    formD.append("companyName", formData.companyName);
    formD.append("description", formData.description);


    formD.append("companyLogo", image);


    if (registration == true) {
      dispatch(businessRegister(formD, jwt));
    }
    else {
      dispatch(updateBusiness(jwt, formD, id))
    }

    navigate("/profile");
  }


  return (
    <div className="min-h-screen bg-white py-8 px-2 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Back navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-teal-700 hover:text-teal-900 transition-colors font-serif"
          >
            <IoArrowBack className="mr-2" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10 border border-teal-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-8 py-8">
            <h1 className="text-3xl font-semibold text-white text-center font-serif">
              {registration ? "Register Your Business" : "Update Business"}
            </h1>
            <p className="text-teal-100 text-center mt-2 font-serif">Elevate your presence and reach more customers in your community</p>
          </div>

          <form onSubmit={handleSubmit} className="sm:p-6 p-4 lg:p-8">
            {/* Business Name Section */}
            <div className="mb-8">
              <div className="space-y-2">
                <label className="flex items-center text-teal-800 font-medium font-serif">
                  <FaBuilding className="text-teal-600 mr-2 text-xl" />
                  Company Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName || ""}
                    onChange={handleChange}
                    placeholder="Enter Your Company Name"
                    className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Section: Contact Details */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 mb-8 border border-teal-100 shadow-sm">
              <h2 className="text-xl text-teal-800 font-medium font-serif mb-4 flex items-center">
                <FaUser className="mr-2 text-teal-700" />
                Contact Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-teal-700 font-medium font-serif">
                    <FaUser className="text-teal-600 mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    value={userDetails?.name || ""}
                    className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg bg-white/80 cursor-not-allowed shadow-sm"
                    autoComplete="off"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-teal-700 font-medium font-serif">
                    <FaPhone className="text-teal-600 mr-2" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="mono"
                    value={userDetails?.mobileNumber || ""}
                    className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg bg-white/80 cursor-not-allowed shadow-sm"
                    autoComplete="off"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-teal-700 font-medium font-serif">
                    <FaEnvelope className="text-teal-600 mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userDetails?.email || ""}
                    className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg bg-white/80 cursor-not-allowed shadow-sm"
                    autoComplete="off"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Section: Business Details */}
            <div className="bg-white sm:p-6 p-2 mb-8  ">
              <h2 className="text-xl text-teal-800 font-medium font-serif mb-6 border-b border-blue-200 pb-2 flex items-center">
                
                Company Description
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-teal-700 font-medium font-serif mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="DescriptionBox"
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Description about your Business "
                    className="w-full h-60 px-4 py-3 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-inner"
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Company Logo */}
            <div className="bg-white rounded-xl p-6 mb-8 border border-teal-200 ">
              <h2 className="text-xl text-teal-800 font-medium font-serif mb-4 flex items-center">
                <FaBuilding className="mr-2 text-teal-700" />
                Company Logo
              </h2>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 bg-gray-50 p-6 rounded-xl">
                {/* Current photo */}
                <div className="text-center">
                  <h3 className="font-serif text-gray-600 mb-3 flex items-center justify-center">
                    <FaUser className="mr-2 text-blue-600" />
                    Current Logo
                  </h3>
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-gray-200 mx-auto">
                    <img
                      src={registration ? dummyPhoto :businessStore?.business?.companyLogo?.imageUrl }
                      alt="Current Logo"
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
                    New Logo
                  </h3>
                  <div
                    onClick={handlePhotoUpload}
                    className="relative cursor-pointer group w-32 h-32 mx-auto"
                  >
                    <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-blue-400 group-hover:ring-blue-600 transition-all duration-300 shadow-md">
                      <img
                        src={image ? URL.createObjectURL(image) : dummyPhoto}
                        alt="New Logo"
                        className="w-full h-full object-scale-down"
                      />
                    </div>
                    <div className="absolute inset-0 bg-blue-700/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                      <IoCamera className="text-white w-8 h-8" />
                      <span className="text-white text-sm font-serif mt-1">Change Logo</span>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    ref={profilePic}
                    onChange={handleProfileChange}
                    accept="image/*"
                  />

                  {image ? <p className="text-green-600 font-serif text-sm mt-2">New Logo selected</p> : <p className="text-xs text-gray-500 mt-1 font-serif flex items-center">
                    <FaTimes className="mr-1 text-gray-400" />
                    image  is required
                  </p>}
                </div>

              </div>
              <div className="text-teal-700 font-serif text-center">
                <p>Upload your company logo to display to potential customers.</p>
                <p className="text-sm mt-2 text-teal-600">Click on the image to upload. JPEG, PNG, and WebP files under 2MB are accepted.</p>
              </div>
            </div>



            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button
                type='button'
                onClick={() => navigate(-1)}
                className='bg-white border border-teal-300 hover:bg-teal-50 text-teal-700 font-serif font-medium py-3 px-8 rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center'
              >
                Cancel
              </button>

              <button
                type='submit'
                className='bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-serif font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center'
              >
                <FaSave className="mr-2" />
                {registration ? "Register Business" : "Update Business"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BusinessRegistration;