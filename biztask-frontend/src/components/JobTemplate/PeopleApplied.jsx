import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getJobById, getAppliedPeople, updateApplicationStatus } from "../../Redux/Job/Action.js";
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
import { motion } from 'framer-motion'
import { FaInbox } from "react-icons/fa6";

import { FaCheckCircle, FaClock, FaStar, FaBan, FaCalendarCheck, FaTrophy } from 'react-icons/fa';

import { toast } from 'react-toastify';
import PeopleAppliedSkeleton from '../Loader/PeopleAppliedSkeleton .jsx';

const PeopleApplied = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);

    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (id) {
            dispatch(getAppliedPeople(id));
            dispatch(getJobById(id));
        }
    }, [id, dispatch]);



    const jobStore = useSelector(store => store.jobStore);

    const applicants = jobStore?.appliedPeople;

    const [status, setStatus] = useState(applicants?.status);

    const statusOptions = [
        { value: "Pending", color: "bg-amber-100 text-amber-800 border-amber-300", icon: FaClock, bgGradient: "from-amber-500 to-orange-500", borderColor: "ring-amber-300" },
        { value: "Shortlisted", color: "bg-blue-100 text-blue-800 border-blue-300", icon: FaStar, bgGradient: "from-blue-500 to-cyan-500", borderColor: "ring-blue-300" },
        { value: "Rejected", color: "bg-red-100 text-red-800 border-red-300", icon: FaBan, bgGradient: "from-red-500 to-pink-500", borderColor: "ring-red-300" },
        { value: "Interview Scheduled", color: "bg-purple-100 text-purple-800 border-purple-300", icon: FaCalendarCheck, bgGradient: "from-purple-500 to-indigo-500", borderColor: "ring-purple-300" },
        { value: "Hired", color: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: FaTrophy, bgGradient: "from-emerald-500 to-green-500", borderColor: "ring-emerald-300" }
    ];

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const handleApplicantClick = (person) => {
        setSelectedApplicant(person);
        setStatus(person.status);
    };

    const closeModal = () => {
        setSelectedApplicant(null);
    };


    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;


        const requiresMessage = [
            "Rejected",
            "Shortlisted",
            "Interview Scheduled",
            "Hired",
        ].includes(newStatus);

        const isConfirmed = window.confirm(
            `Are you sure you want to change status to "${newStatus}"?`
        );

        if (!isConfirmed) {
            e.target.value = status;
            return;
        }

        let messageToUser = "";

        if (requiresMessage) {
            messageToUser = window.prompt(
                `Enter message for the user regarding "${newStatus}":`
            );

            if (!messageToUser?.trim()) {
                toast.error("Message is required for this status");
                e.target.value = status;
                return;
            }
        }

        const result = await dispatch(
            updateApplicationStatus(jwt, selectedApplicant?._id, newStatus, messageToUser)
        );



        if (result?.success) {
            toast.success(result.message);
            setStatus(newStatus);
        } else {

            toast.error(result.message);

            setStatus(status);
        }
    };


    const getStatusConfig = (statusValue) => {
        return statusOptions.find(opt => opt.value === statusValue) || statusOptions[0];
    };

    const getStatusColor = (statusValue) => {
        return getStatusConfig(statusValue).color;
    };

    const handleStatusFilterClick = (statusValue) => {
        if (selectedStatusFilter === statusValue) {
            setSelectedStatusFilter(null);
        } else {
            setSelectedStatusFilter(statusValue);
        }
        closeModal();
    };

    const filteredApplicants = selectedStatusFilter
        ? applicants?.filter(a => a.status.toUpperCase() === selectedStatusFilter.toUpperCase())
        : applicants;

    return (
        <>

        {
            jobStore?.isLoading ? <PeopleAppliedSkeleton />:
       
            <div className="bg-white min-h-screen sm:p-6 p-4 md:p-10  font-serif">


                {/* Job Header Card */}
                <div className="w-full max-w-7xl mx-auto">
                    <div className="w-full bg-white rounded-2xl shadow-md border border-teal-100 p-8 mb-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50 -z-10"></div>

                        <div className="flex flex-col">
                            <h2 className="text-3xl md:text-4xl text-[34px] font-serif  text-gray-700 font-bold mb-3 ">
                                {jobStore?.job?.jobRole}
                            </h2>

        

                             <div className="flex items-start gap-2 mb-4">
                                    <div className="flex items-center justify-center w-9 h-9 bg-blue-100 rounded-lg mt-0.5">
                                        <HiBuildingOffice2 className="text-2xl  text-teal-600" />
                                    </div>
                                    <div className="flex-1 text-base">
                                        <span className="text-slate-800 font-semibold block mb-0.5">Company Name</span>
                                        <span className="text-gray-700 "> {jobStore?.job?.business?.companyName}</span>
                                    </div>
                                </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-base">
                                {/* Location */}
                                <div className="flex items-start gap-2.5">
                                    <div className="flex items-center justify-center w-9 h-9 bg-blue-100 rounded-lg mt-0.5">
                                        <IoLocationSharp className="text-2xl text-blue-500" />
                                    </div>
                                    <div className="flex-1 ">
                                        <span className="text-slate-800 font-semibold block mb-0.5">Location</span>
                                        <span className="text-gray-700">
                                            {jobStore?.job?.jobLocations?.slice(0, 8).map((location, ind) => {
                                                let formattedLocation = location.charAt(0).toUpperCase() + location.slice(1);
                                                if (ind !== jobStore?.job?.jobLocations?.length - 1 && ind < 7) {
                                                    formattedLocation += ", ";
                                                }
                                                return formattedLocation;
                                            }) || "N/A"}
                                        </span>
                                    </div>
                                </div>

                                {/* Posted Time */}
                                <div className="flex items-start gap-2.5">
                                    <div className="flex items-center justify-center w-9 h-9 bg-blue-100 rounded-lg mt-0.5">
                                        <IoMdTime className="text-2xl  text-teal-600" />
                                    </div>
                                    <div className="flex-1 ext-base">
                                        <span className="text-slate-800 font-semibold block mb-0.5">Posted</span>
                                        <span className="text-gray-700">{timeAgo(jobStore?.job?.postedAt)}</span>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>


                </div>



                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-800 mb-3 flex items-center">
                            <div className="w-2 h-12 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full mr-4"></div>
                            Job Applications Dashboard
                            <span className="ml-4 text-3xl text-blue-600 font-bold bg-blue-100 px-4 py-1 rounded-full">
                                {filteredApplicants?.length || 0}
                            </span>
                        </h2>
                        <p className="text-gray-600 text-lg pl-6">Review and manage candidate applications efficiently</p>
                    </div>

                    {/* Status Filter Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        {statusOptions.map((statusOpt, idx) => {
                            const count = applicants?.filter(a => a.status.toUpperCase() === statusOpt.value.toUpperCase()).length || 0;
                            const Icon = statusOpt.icon;
                            const isActive = selectedStatusFilter === statusOpt.value;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleStatusFilterClick(statusOpt.value)}
                                    className={`${statusOpt.color} border-2 rounded-2xl p-4 text-center transition-all hover:shadow-lg cursor-pointer ${isActive ? `ring-2 ${statusOpt.borderColor} shadow-2xl scale-105` : ''
                                        }`}
                                >
                                    <Icon className="mx-auto mb-2" size={24} />
                                    <div className="text-2xl font-bold">{count}</div>
                                    <div className="text-xs font-semibold uppercase tracking-wide mt-1">{statusOpt.value}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Applicants Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

                        {filteredApplicants?.length === 0 ? (
                            <div className="col-span-full  flex flex-col items-center justify-center py-16 text-center bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200">

                                <FaInbox className="text-5xl text-blue-500 mb-4" />

                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    No Applications Found
                                </h3>

                                <p className="text-gray-600 text-sm max-w-sm">
                                    There are no applications available for the selected status . Try
                                    switching to another category.
                                </p>

                            </div>
                        ) : (
                            filteredApplicants?.map((person, index) => {
                                const statusConfig = getStatusConfig(person.status);
                                const StatusIcon = statusConfig.icon;

                                return (
                                    <div
                                        key={index}

                                        className="bg-white rounded-2xl shadow-lg overflow-hidden  transform transition-all duration-300 hover:shadow-2xl  border-2 border-gray-100 hover:border-gray-300"
                                    >
                                        {/* Header with Status Badge */}
                                        <div className={`relative h-28 bg-gradient-to-r ${statusConfig.bgGradient}`}>
                                            <div className="absolute top-3 right-3">
                                                <div className={`${statusConfig.color} px-3 py-1.5 rounded-full text-xs font-bold border-2 shadow-lg flex items-center gap-1.5 backdrop-blur-sm bg-opacity-95`}>
                                                    <StatusIcon size={12} />
                                                    {person.status}
                                                </div>
                                            </div>

                                            {/* Tools Badge */}
                                            {person.hasTools && (
                                                <div className="absolute top-3 left-3">
                                                    <div className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold border-2 border-white border-opacity-40 flex items-center gap-1.5">
                                                        <FaTools size={12} />
                                                        Tools Available
                                                    </div>
                                                </div>
                                            )}

                                            <div className="absolute -bottom-12 left-6">
                                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-blue-100">
                                                    <img
                                                        src={person.profileImage?.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(person?.fullName)}&size=200&background=6366f1&color=fff&bold=true`}
                                                        alt={person?.fullName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-14 pb-6 px-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{person?.fullName}</h3>
                                            <p className="text-indigo-600 font-semibold mb-4 text-base">{person?.profession}</p>

                                            <div className="space-y-2.5 mb-4">
                                                <div className="flex items-center text-slate-800 text-base bg-gray-50 rounded-lg p-2">
                                                    <MdEmail className="mr-2 text-indigo-500 flex-shrink-0" size={16} />
                                                    <span className="truncate">{person?.email}</span>
                                                </div>

                                                <div className="flex items-center text-slate-800 text-base bg-gray-50 rounded-lg p-2">
                                                    <FaPhone className="mr-2 text-indigo-500 flex-shrink-0" size={14} />
                                                    <span>{person?.phone}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t-2 border-blue-100 flex justify-between items-center">
                                                <div className="flex items-center text-gray-700 text-base font-semibold bg-blue-50 px-3 py-2 rounded-lg">
                                                    <MdWork className="mr-1.5 text-blue-600" size={16} />
                                                    <span>{person?.experience}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleApplicantClick(person)}
                                                    className="text-blue-600 font-bold text-base flex items-center hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all">
                                                    View Details
                                                    <FaChevronRight className="ml-1.5" size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })

                        )}
                    </div>

                    {/* Detailed Applicant Modal */}
                    {selectedApplicant && (
                        <div className='w-full flex items-center justify-center '>
                            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden my-8">
                                <div className="relative">
                                    {/*  Header */}
                                    <div className={`relative h-48 bg-gradient-to-br ${getStatusConfig(status).bgGradient} overflow-hidden`}>

                                        {/* Top Overlay Bar */}
                                        <div className="absolute top-0 left-0 w-full z-30 p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between">

                                            {/* Application ID Badge */}
                                            <div className="max-w-full sm:max-w-[400px] bg-white/20 backdrop-blur-md text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold border-2 border-white/40 break-all">
                                                Application #{selectedApplicant?._id}
                                            </div>

                                            {/* Status Dropdown */}
                                            <select
                                                value={status}
                                                disabled={jobStore?.isLoading}
                                                onChange={handleStatusChange}
                                                className={`${getStatusColor(status)} px-4 py-2.5 ${jobStore?.isLoading ? "bg-slate-400" : ""} rounded-xl text-sm sm:text-base font-bold border-2 cursor-pointer 
        focus:outline-none focus:ring-4 focus:ring-white/40 transition-all shadow-lg w-full sm:w-auto`}
                                            >
                                                {statusOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.value}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                    </div>


                                    {/* Profile Image with Enhanced Styling */}
                                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                                        <div className="relative">
                                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-indigo-100">
                                                <img
                                                    src={selectedApplicant.profileImage?.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedApplicant.fullName)}&size=200&background=6366f1&color=fff&bold=true`}
                                                    alt={selectedApplicant?.fullName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {selectedApplicant.hasTools && (
                                                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-2 rounded-full shadow-lg ring-4 ring-white">
                                                    <FaCheckCircle size={16} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="pt-20 pb-8 px-8">
                                    <div className="text-center mb-8">
                                        <h2 className="text-4xl font-bold text-gray-900 mb-2">{selectedApplicant?.fullName}</h2>
                                        <p className="text-xl text-indigo-600 font-semibold mb-3">{selectedApplicant?.profession}</p>
                                        <div className="flex justify-center gap-3">
                                            <span className="bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full text-sm font-bold">
                                                {selectedApplicant?.experience} Experience
                                            </span>
                                            {selectedApplicant.hasTools && (
                                                <span className="bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
                                                    <FaTools size={12} className=' shrink-0' />
                                                    Tools Ready
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                        {/* Contact Information Card */}
                                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border-2 border-slate-200 hover:shadow-xl transition-all duration-300 hover:border-indigo-300">
                                            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
                                                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-2.5 rounded-xl mr-3 shadow-lg">
                                                    <IoPersonCircleOutline className="text-white" size={22} />
                                                </div>
                                                Contact Information
                                            </h3>

                                            <div className="space-y-4">
                                                <div className="flex items-start group">
                                                    <div className="bg-white p-2.5 rounded-xl mr-3 group-hover:bg-indigo-50 transition-colors shadow-sm border border-gray-200">
                                                        <MdEmail className="text-indigo-500" size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email</p>
                                                        <p className="text-gray-900 font-semibold break-words">{selectedApplicant?.email}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start group">
                                                    <div className="bg-white p-2.5 rounded-xl mr-3 group-hover:bg-indigo-50 transition-colors shadow-sm border border-gray-200">
                                                        <FaPhone className="text-indigo-500" size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                                                        <p className="text-gray-900 font-semibold">{selectedApplicant?.phone}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start group">
                                                    <div className="bg-white p-2.5 rounded-xl mr-3 group-hover:bg-indigo-50 transition-colors shadow-sm border border-gray-200">
                                                        <FaMapMarkerAlt className="text-indigo-500" size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Address</p>
                                                        <p className="text-gray-900 font-semibold break-words">{selectedApplicant?.address}</p>
                                                        <p className="text-gray-600 text-sm mt-1 font-medium">ZIP: {selectedApplicant?.zipCode}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Professional Details Card */}
                                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-xl transition-all duration-300 hover:border-purple-300">
                                            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
                                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2.5 rounded-xl mr-3 shadow-lg">
                                                    <FaBriefcase className="text-white" size={20} />
                                                </div>
                                                Professional Details
                                            </h3>

                                            <div className="space-y-4">
                                                <div className="flex items-start group">
                                                    <div className="bg-white p-2.5 rounded-xl mr-3 group-hover:bg-purple-50 transition-colors shadow-sm border border-purple-200">
                                                        <FaUserTie className="text-purple-500" size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Profession</p>
                                                        <p className="text-gray-900 font-semibold">{selectedApplicant.profession}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start group">
                                                    <div className="bg-white p-2.5 rounded-xl mr-3 group-hover:bg-purple-50 transition-colors shadow-sm border border-purple-200">
                                                        <MdWork className="text-purple-500" size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Experience</p>
                                                        <p className="text-gray-900 font-semibold">{selectedApplicant?.experience}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start group">
                                                    <div className="bg-white p-2.5 rounded-xl mr-3 group-hover:bg-purple-50 transition-colors shadow-sm border border-purple-200">
                                                        <FaTools className="text-purple-500" size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Required Tools</p>
                                                        <p className="text-gray-900 font-semibold flex items-center">
                                                            {selectedApplicant.hasTools ? (
                                                                <>
                                                                    <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                                                    Available
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-full mr-2"></span>
                                                                    Not Available
                                                                </>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills Section */}
                                    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-blue-200 hover:shadow-md transition-all duration-300 hover:border-indigo-300">
                                        <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
                                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl mr-3 shadow-lg">
                                                <BsStars className="text-white" size={20} />
                                            </div>
                                            Skills & Expertise
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {selectedApplicant?.skills?.split(',')?.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-white border-2 border-blue-300 text-blue-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:border-blue-500 transition-all duration-300 cursor-default shadow-md hover:shadow-lg "
                                                >
                                                    {skill.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Availability Weekly Grid */}
                                    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200 hover:shadow-md transition-all duration-300 hover:border-emerald-300">
                                        <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
                                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl mr-3 shadow-lg">
                                                <FaCalendarAlt className="text-white" size={20} />
                                            </div>
                                            Weekly Availability Schedule
                                        </h3>


                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:p-10">
                                            {weekDays.map((day, index) => (
                                                <motion.div
                                                    key={day}

                                                    whileHover={{ scale: 1.08, y: -5 }}
                                                    transition={{ type: "spring", stiffness: 400 }}
                                                    className={`p-5 rounded-2xl text-center font-bold transition-all duration-300 shadow-lg ${selectedApplicant?.availability?.includes(day)
                                                        ? 'bg-gradient-to-br from-emerald-500 to-green-500 text-white border-2 border-emerald-300'
                                                        : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                                                        }`}
                                                >
                                                    <div className="text-sm mb-2 uppercase tracking-wide">{day.slice(0, 3)}</div>
                                                    <div className="text-2xl font-bold">{day.slice(0, 1)}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-8 flex justify-center gap-4">
                                        <button
                                            onClick={closeModal}
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-4 rounded-xl transition-all duration-300 font-bold shadow-xl hover:shadow-2xl hover:scale-105 border-2 border-indigo-700"
                                        >
                                            Close Profile
                                        </button>
                                    </div>
                                </div>
                            </div></div>

                    )}
                </div>
            </div>

 }

        </>


    );
};

export default PeopleApplied;