import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { applyForJob, getUserProfile } from "../../Redux/Auth/Action.js";
import { IoArrowBack } from "react-icons/io5";
export default function JobApplicationForm() {

    const navigate = useNavigate();
const dispatch = useDispatch();
const jwt = localStorage.getItem("jwt");
const { id } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profession: '',
    experience: '',
    availability: [],
    address: '',
    zipCode: '',
   
    skills: '',
    hasTools: false,
   
    profileImage: null,
   
   
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const professionOptions = [
    'Plumber', 'Electrician', 'Carpenter', 'Painter', 'Decorator', 
    'Gardener', 'House Cleaner', 'Handyman', 'Roofer', 'Landscaper', 
    'Flooring Installer', 'AC Technician', 'Pest Control Specialist', 
    'Welder', 'Mechanic', 'Appliance Repair Technician', 
    'Water Purifier Technician', 'Security Guard', 'Driver', 
    'Cook / Chef', 'Event Organizer', 'Photographer', 'Makeup Artist', 
    'Hair Stylist', 'Tailor', 'Laundry Service', 'Tutor', 
    'Fitness Trainer', 'Yoga Instructor', 'Pet Groomer', 
    'Babysitter / Nanny', 'Elder Care Assistant', 'Delivery Agent', 
    'Mobile Repair Technician', 'Computer Technician', 
    'CCTV Installer', 'Interior Designer', 'Construction Worker', 
    'Mover / Packer', 'Cleaner (Commercial)', 'Gardening Consultant', 
    'Sound Technician', 'DJ Services', 'Car Wash Service', 
    'Swimming Pool Cleaner', 'Courier Service', 'Other'
];


  const availabilityOptions = [
    'Weekdays', 'Weekends',  'On-Call', 'Full-Time', 'Part-Time'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox' && name === 'availability') {
      // Handle multiple checkbox selections for availability
      const updatedAvailability = checked
        ? [...formData.availability, value]
        : formData.availability.filter(item => item !== value);
     
      setFormData({ ...formData, availability: updatedAvailability });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name should be at least 3 characters";
    }
    else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
        newErrors.fullName ="Full Name must only contain alphabets and spaces";
       
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/[- ]/g, ''))) {
      newErrors.phone = "Please enter a valid phone number (10 digits)";
    }
    
    // Profession validation
    if (!formData.profession) {
      newErrors.profession = "Please select your profession";
    }
    
    // Experience validation
    if (!formData.experience) {
      newErrors.experience = "Experience information is required";
    }
    
    // Availability validation
    if (formData.availability.length === 0) {
      newErrors.availability = "Please select at least one availability option";
    }
    
    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    // Zip Code validation
    const zipRegex = /^\d{5,6}$/;
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!zipRegex.test(formData.zipCode.trim())) {
      newErrors.zipCode = "Please enter a valid zip code";
    }
    
   
    
    // Skills validation
    if (!formData.skills.trim()) {
      newErrors.skills = "Please list your skills";
    }
    
   
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
       
        
        const formD = new FormData();
        formD.append("jobId", id);
        formD.append("fullName", formData.fullName);
    formD.append("email", formData.email);
    formD.append("phone", formData.phone);
    formD.append("profession", formData.profession);
    formD.append("experience", formData.experience);
    formD.append("address", formData.address);
    formD.append("zipCode", formData.zipCode);
    formD.append("skills", formData.skills);
    formD.append("hasTools", formData.hasTools);
    
  
    if (formData.profileImage) {
      formD.append("profileImage", formData.profileImage);
    }

    
      formD.append(`availability`,JSON.stringify(formData.availability));
   

        dispatch(applyForJob(jwt, formD));
     
     
      setSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          profession: '',
          experience: '',
          availability: [],
          address: '',
          zipCode: '',
        
          skills: '',
          hasTools: false,
          licensesOrCertifications: '',
          profileImage: null,
         
         
        });
        setSubmitted(false);
        navigate(`/job-detail/${id}`);
      }, 2000);
    } else {
      toast.error("Please fix the errors in the form");
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
    <div className="min-h-screen bg-white py-8 px-2 sm:px-6 lg:px-12 font-serif">
             <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center text-teal-700 hover:text-teal-900 transition-colors font-serif"
                >
                  <IoArrowBack className="mr-2" />
                  <span>Go Back</span>
                </button>
              </div>
      <motion.div 
        className="bg-white rounded-xl shadow-xl overflow-hidden mb-10 border border-teal-100"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="bg-gradient-to-r from-blue-700 to-indigo-800 px-8 py-8"
          variants={formHeaderVariants}
        >
           
           
           
          <h2 className="text-3xl font-semibold text-white text-center">Local Worker Job Application</h2>
          <p className="text-teal-100 text-center mt-2">Fill out the form below to apply for local service jobs</p>
        </motion.div>

        <div className="sm:p-8 p-4">
          {/* Personal Information Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-xl font-semibold text-blue-700 border-b border-blue-200 pb-2 mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:outline-none ${
                    errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="Enter Name"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:outline-none ${
                    errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="Enter Email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="off"
                    maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:outline-none ${
                    errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="Enter Mobile Number"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:outline-none ${
                    errors.address ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="Enter Address"
                />
                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="zipCode">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:outline-none ${
                    errors.zipCode ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="pin code"
                />
                {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
              </motion.div>
            </div>
          </motion.div>

          {/* Professional Information Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-xl font-semibold text-blue-700 border-b border-blue-200 pb-2 mb-4">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="profession">
                  Profession *
                </label>
                <select
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:outline-none ${
                    errors.profession ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                >
                  <option value="">Select your profession</option>
                  {professionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.profession && <p className="mt-1 text-sm text-red-500">{errors.profession}</p>}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="experience">
                  Years of Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:outline-none ${
                    errors.experience ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                >
                  <option value="">Select experience</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
                {errors.experience && <p className="mt-1 text-sm text-red-500">{errors.experience}</p>}
              </motion.div>
              
           
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do you have your own tools? *
                </label>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="hasTools"
                    name="hasTools"
                    checked={formData.hasTools}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="hasTools" className="ml-2 text-gray-700">
                    Yes, I have my own professional tools
                  </label>
                </div>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="skills">
                Skills & Expertise *
              </label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows="3"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:outline-none ${
                  errors.skills ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="List your key skills and expertise relevant to your profession (comma separated)"
              ></textarea>
              {errors.skills && <p className="mt-1 text-sm text-red-500">{errors.skills}</p>}
            </motion.div>
            
          
          </motion.div>
          
          {/* Availability Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-xl font-semibold text-blue-700 border-b border-blue-200 pb-2 mb-4">Availability</h3>
            
            <label className="block text-sm font-medium text-gray-700 mb-2">
              When are you available to work? *
            </label>
            
            <div className="  grid grid-cols-2 md:grid-cols-4 gap-3">
              {availabilityOptions.map(option => (
                <motion.div 
                  key={option} 
                  className="flex  items-center"
                
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="checkbox"
                    id={`availability-${option}`}
                    name="availability"
                    value={option}
                    checked={formData.availability.includes(option)}
                    onChange={handleChange}
                    className="h-5 w-5 cursor-pointer text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`availability-${option}`} className="ml-2 text-gray-700">
                    {option}
                  </label>
                </motion.div>
              ))}
            </div>
            {errors.availability && <p className="mt-1 text-sm text-red-500">{errors.availability}</p>}
          </motion.div>
          
          {/* Supporting Documents Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-xl font-semibold text-blue-700 border-b border-blue-200 pb-2 mb-4">Supporting Documents</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="profileImage">
                  Profile Photo (optional)
                </label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">Max file size: 2MB. Recommended: square image.</p>
              </motion.div>
              
             
            </div>
          </motion.div>
          
          
          <motion.div variants={itemVariants} className="mt-8">
            
            
            <motion.button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all"
             
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              disabled={submitted}
            >
              {submitted ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Submit Application"
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
     
      </div>
    </div>
  );
}