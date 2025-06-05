import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getJobById,getAppliedPeople } from "../../Redux/Job/Action.js";
import timeAgo from '../timeCalculate.js';

// Icons
import { IoLocationSharp } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FaUserTie, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaTools } from "react-icons/fa";
import { MdEmail, MdClose, MdWork } from "react-icons/md";
import { FaPhone, FaChevronRight } from "react-icons/fa6";
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { IoPersonCircleOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";

const PeopleApplied = () => {
    
    const { id } = useParams();
    const dispatch = useDispatch();
    const jobStore = useSelector(store => store.jobStore);
    const [selectedApplicant, setSelectedApplicant] = useState(null);

  
    
    useEffect(() => {
        if (id) {
            dispatch(getAppliedPeople(id));
        }
    }, [id, dispatch]);

    const applicants = jobStore?.appliedPeople ;
   
    const handleApplicantClick = (applicant) => {
        setSelectedApplicant(applicant);
    };

    const closeModal = () => {
        setSelectedApplicant(null);
    };

    return (
        <div className="bg-white min-h-screen sm:p-6 p-4 md:p-10  font-serif">
            {/* Job Header Card */}
            <div className="w-full max-w-6xl mx-auto">
                <div className="w-full bg-white rounded-2xl shadow-md border border-teal-100 p-8 mb-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50 -z-10"></div>
                    
                    <div className="flex flex-col">
                        <h2 className="text-3xl md:text-4xl text-[34px] font-serif  text-gray-700 font-bold mb-3 ">
                            {applicants[0]?.jobId?.jobRole}
                        </h2>
                       
                        <div className="flex items-center text-gray-700 mb-3">
                            <HiBuildingOffice2 className="text-xl text-blue-600 mr-2" />
                            <h3 className="text-[20px]  text-[#3D5060]">
                                {applicants[0]?.jobId?.business?.companyName}
                            </h3>
                        </div>
                        
                        <div className="flex items-center text-[#1C4E80]  mb-3">
                            <IoLocationSharp className="text-lg text-blue-500 mr-2" />
                            <span>
                                {applicants[0]?.jobId?.jobLocations?.slice(0, 8).map((location, ind) => {
                                    let formattedLocation = location.charAt(0).toUpperCase() + location.slice(1);
                                    if (ind !== applicants[0]?.jobId?.jobLocations?.length - 1) {
                                        formattedLocation += ", ";
                                    }
                                    return formattedLocation;
                                }) || "N/A"}
                            </span>
                        </div>
                        
                        <div className="flex items-center text-[#0F3057]">
                            <IoMdTime className="text-lg text-blue-500 mr-2" />
                            <span>Posted {timeAgo(applicants[0]?.jobId?.postedAt) }</span>
                        </div>
                        
                        <div className="mt-6">
                            <Link to={`/job-detail/${applicants[0]?.jobId?._id}`}>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 font-medium flex items-center">
                                    <span>Back to Job Details</span>
                                    <FaChevronRight className="ml-2" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Applicants Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-700 mb-2 inline-block relative">
                        Applicants 
                        <span className="text-blue-600 font-medium text-lg ml-2">({applicants?.length || 0})</span>
                        <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-blue-500 rounded"></span>
                    </h2>
                    <p className="text-gray-600">Review candidates who have applied for this position</p>
                </div>
                
                {/* Applicants Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {applicants?.map((person, index) => (
                        <div
                            key={index}
                            onClick={() => handleApplicantClick(person)}
                            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
                        >
                            <div className="relative h-24 bg-gradient-to-r from-blue-500 to-purple-600">
                                <div className="absolute -bottom-10 left-6">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                                        <img
                                            src={person.profileImage?.imageUrl || `https://ui-avatars.com/api/?fullName=${encodeURIComponent(person.fullName)}&background=random`}
                                            alt={person?.fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="pt-12 pb-6 px-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">{person?.fullName}</h3>
                                <p className="text-blue-600 font-medium mb-3">{person?.profession}</p>
                                
                                <div className="flex items-center text-gray-600 text-sm mb-2">
                                    <MdEmail className="mr-2 text-gray-500" />
                                    <span className="truncate">{person?.email}</span>
                                </div>
                                
                                <div className="flex items-center text-gray-600 text-sm mb-4">
                                    <FaPhone className="mr-2 text-gray-500" />
                                    <span>{person?.phone
}</span>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-blue-200 flex justify-between items-center">
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <MdWork className="mr-1 text-blue-500" />
                                        <span>{person?.experience} exp</span>
                                    </div>
                                    <button className="text-blue-600 font-medium text-sm flex items-center hover:text-blue-700">
                                        View Profile
                                        <FaChevronRight className="ml-1" size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Detailed Applicant Modal */}
            {selectedApplicant && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
                        <div className="relative">
                            {/* Header  */}
                            <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl relative">
                                <button 
                                    onClick={closeModal}
                                    className="absolute right-4 top-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-all"
                                >
                                    <MdClose size={24} />
                                </button>
                            </div>
                            
                            {/* Profile image overlapping the header */}
                            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
                                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img
                                        src={selectedApplicant.profileImage?.imageUrl || `https://ui-avatars.com/api/?fullName=${encodeURIComponent(selectedApplicant.fullName)}&size=200&background=random`}
                                        alt={selectedApplicant?.fullName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Content */}
                        <div className="pt-24 pb-8 px-8">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-gray-800">{selectedApplicant?.fullName}</h2>
                                <p className="text-xl text-blue-600 font-medium">{selectedApplicant?.profession}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <IoPersonCircleOutline className="mr-2 text-blue-500" size={22} />
                                        Contact Information
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <MdEmail className="text-gray-500 mt-1 mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="text-gray-800">{selectedApplicant?.email}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start">
                                            <FaPhone className="text-gray-500 mt-1 mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">Phone</p>
                                                <p className="text-gray-800">{selectedApplicant?.phone}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start">
                                            <FaMapMarkerAlt className="text-gray-500 mt-1 mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">Address</p>
                                                <p className="text-gray-800">{selectedApplicant?.address}</p>
                                                <p className="text-gray-800">ZIP: {selectedApplicant?.zipCode}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <FaBriefcase className="mr-2 text-blue-500" size={20} />
                                        Professional Details
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <FaUserTie className="text-gray-500 mt-1 mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">Profession</p>
                                                <p className="text-gray-800">{selectedApplicant.profession}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start">
                                            <MdWork className="text-gray-500 mt-1 mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">Experience</p>
                                                <p className="text-gray-800">{selectedApplicant?.experience}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start">
                                            <FaTools className="text-gray-500 mt-1 mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-500">Has Required Tools</p>
                                                <p className="text-gray-800">{selectedApplicant.hasTools ? "Yes" : "No"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <BsStars className="mr-2 text-blue-500" size={20} />
                                    Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedApplicant?.skills?.split(',')?.map((skill, index) => (
                                        <span 
                                            key={index}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <FaCalendarAlt className="mr-2 text-blue-500" size={20} />
                                    Availability
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedApplicant?.availability?.map((day, index) => (
                                        <span 
                                            key={index}
                                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            {day}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="mt-8 flex justify-center">
                                <button 
                                    onClick={closeModal}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-200 font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PeopleApplied;