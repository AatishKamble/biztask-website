import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserSecret } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import React, { useEffect, useRef, useState } from 'react';
import Review from "../Reviews/Review";
import { API_BASE_URL } from "../../configApi/ConfigApi";
import { removeService, uploadImage } from "../../Redux/ServiceR/Action.js";
import { Link, useNavigate } from 'react-router-dom';
import { FaAddressCard } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import JobAdvertise from "../JobTemplate/JobAdvertise.jsx";
import { removeReview } from "../../Redux/Review/Action.js";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { addReview, getAllReviews } from "../../Redux/Review/Action.js";
import Star from "../Reviews/Star.jsx";
import PopUp from "../PopUp/PopUp.jsx";
import DetailLoader from "../Loader/DetailLoader.jsx";
import { toast } from "react-toastify";
import { GrCaretPrevious } from "react-icons/gr"; import { GrCaretNext } from "react-icons/gr";
import ContactInformation from "../ContactInformation/ContactInformation.jsx";
import { motion } from "framer-motion";


const ServiceDetail = ({ serviceDetails, userDetails }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const jwt = localStorage.getItem("jwt");

    const handleModalOpen = (index) => {

        setIsModalOpen(index);
    }
    const handleModalClose = () => {

        setIsModalOpen(null);

    }
    const fileInputRef = useRef(null);


    //upload image submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        // new Chnage
        if (files.length === 0) {
            toast.error('Please upload at least one image.');
            return;
        }
        for (let file of files) {
            formData.append("previousImages", file);
        }

        formData.append("serviceId", serviceDetails._id);
        dispatch(uploadImage(formData, jwt));
        setFiles([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }
        navigate(`/service-detail/${serviceDetails?._id}`)
    }

    //upload image filed change
    const handleWorkPicChange = (e) => {
        setFiles(Array.from(e.target.files));
    }

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleServiceRemove = () => {
        dispatch(removeService(jwt, serviceDetails._id, serviceDetails?.bussiness?._id));
        setFiles([]);
        navigate(`/bussiness/details/${serviceDetails?.bussiness?._id}`);
    }



    //view jobs reference

    const postedJobs = useRef(null);

    const scrollToSection = (sectionRef) => {
        const offset = -40; // Adjust this value for the desired space above the section
        const elementPosition = sectionRef.current.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition + offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    };


    const [AllPhotos, setAllPhotos] = useState([]);

    useEffect(() => {
        if (serviceDetails?.WorkImage) {
            const photos = serviceDetails.WorkImage.flatMap(workImage => workImage.photos);
            setAllPhotos(photos);
            setIsModalOpen(null);
        }
    }, [serviceDetails?.WorkImage]);


    //ratings
    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [input, setInput] = useState("");

    const handleClick = (value) => {
        setCurrentValue(value);
    }
    const handleMouseHover = (value) => {
        setHoverValue(value);
    }
    //word count for review
    const [wordCount, setWordCount] = useState(0);

    const handleInputChange = (e) => {
        const text = e.target.value;
        const words = text.trim().split(/\s+/);  // Split by spaces, tabs, and newlines
        const wordCount = words.filter(word => word).length;

        if (wordCount <= 20) {
            setInput(text);
            setWordCount(wordCount);
        }
        else {
            toast.error('Maximum word has reached');
            return;
        }
    }

    const handleMouseLeave = (value) => {
        setHoverValue(undefined);
    }


    const handleSubmitReview = () => {
        const formData = new FormData();

        if (input.trim() === "") {
            toast.error('Please enter at least one character.');
            return;
        }
        if (currentValue === 0) {
            toast.error('Rating should be between 1 to 5');
            return;
        }
        formData.append("rating", currentValue);
        formData.append("review", input);
        formData.append("serviceId", serviceDetails?._id);


        dispatch(addReview(formData, jwt));
        setCurrentValue(0);
        setHoverValue(undefined);
        setInput("");
    }






    const reviewStore = useSelector(store => store.reviewStore);

    //handling review visible

    const [visibleReviews, setVisibleReviews] = useState(10);

    const handleViewMore = () => {
        setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 10);
    };

    const handleReviewDelete = (id) => {
        dispatch(removeReview(id, jwt));
    }

    //remove popUp
    const [popupwarning, setPopupWarning] = useState(false);

    const handlePopupWarningOpen = () => {

        setPopupWarning(true);
    };

    const handlePopupWarningClose = () => {
        setPopupWarning(false);

    };

    const handleRemoveFile = (indexToRemove) => {
        const updatedFiles = files.filter((_, i) => i !== indexToRemove);
        setFiles(updatedFiles);
      
       
        if (fileInputRef.current) {
          const dataTransfer = new DataTransfer();
          updatedFiles.forEach((file) => dataTransfer.items.add(file));
          fileInputRef.current.files = dataTransfer.files;
        }
      };

    const [uploadButtonHover, setUploadButtonHover] = useState(false);

    const isLoading = useSelector(store => store.serviceStore.isLoading);


    // Animation Variant
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <>


            <div className='bg-[#ffffff] flex flex-col  items-center w-full h-auto xl:px-20  sm:px-10 relative'>



                {isLoading == true && (
                    <div className="absolute w-full h-[100%] inset-0 flex items-center justify-center bg-[#ffffff]  opacity-100 z-40">

                        <DetailLoader />
                    </div>
                )}
                <div className="2xl:w-[90%] sm:w-full h-auto py-10 bg-white/30 backdrop-blur-lg shadow-lg my-10 flex flex-col lg:flex-row items-center px-10 rounded-2xl border border-gray-300">

                    <div className='w-full h-[180px] relative flex items-start flex-col justify-center px-10'>



                        <div className='w-full text-[28px] text-slate-800 font-serif py-2'>
                            <span className=' font-semibold px-2'>{serviceDetails?.serviceType}</span>

                        </div>

                        <div className='w-full text-[20px] text-slate-600 font-serif pb-2'>
                            <span className=' font-medium px-2'>{serviceDetails?.bussiness?.companyName}
                            </span>

                        </div>
                        <div className='w-full px-2 pb-5 flex justify-start items-center  text-[16px] text-blue-950 font-serif font-medium'>
                            <span>Ratings : </span>
                            <span className="text-[26px] font-serif font-normal px-2  text-yellow-400"><Star star={serviceDetails?.rating} /> </span>

                        </div>
                        <div className='w-[400px]  h-auto text-[16px] flex justify-start items-center text-blue-950 font-serif px-2 '>
                            <span className="text-[24px]"><IoLocationSharp /></span>
                            <span className=' font-normal px text-slate-900'>
                                {
                                    serviceDetails?.locations?.map((location, ind) => {

                                        let locationFirstLetterCapital = location.charAt(0).toUpperCase() + location.slice(1);
                                        if (ind != (serviceDetails?.locations?.length - 1)) {
                                            locationFirstLetterCapital += ", ";

                                        }
                                        return locationFirstLetterCapital
                                    }


                                    )

                                }
                            </span>
                        </div>


                    </div>

                    <div className="flex flex-col w-[600px] items-center justify-center">
                        <div className='w-[190px] h-[180px] shadow-lg shadow-white border-cyan-600 border-4   rounded-full m-5'>

                            <img src={`${serviceDetails?.bussiness?.companyLogo?.imageUrl}`} alt="profile picture" className='bg-cover w-full h-full rounded-full' />
                        </div>

                        {
                            userDetails?._id == serviceDetails?.user?._id &&

                            <div>

                                <button className='bg-[#94b6b5]  rounded-md p-2 me-2   hover:bg-[#79bdba] w-auto h-auto text-slate-600 font-serif font-semibold text-[16px]' onClick={() => scrollToSection(postedJobs)}> View posted Job</button>

                                <Link to={`/service-update/${serviceDetails?._id}`}>
                                    <button className='bg-[#69a5b6]  rounded-md p-[7px]  hover:bg-[#4492a7] w-auto h-auto text-slate-600  font-serif font-semibold text-[16px]' >Update</button>
                                </Link>

                                <button className='bg-[#d28d8d]  rounded-md p-2 ms-2  hover:bg-[#996767]   w-auto h-auto text-slate-600  font-serif font-semibold text-[16px]' onClick={handlePopupWarningOpen}>Remove</button>
                            </div>

                        }
                    </div>

                </div>

                <div className="2xl:w-[90%] sm:w-full h-auto drop-shadow-lg my-10 mt-5 flex flex-col xl:flex-row gap-10 px-6 sm:px-2">

                    {/* Left Section */}

                    <div className="flex flex-col xl:w-2/3 gap-6">

                        {/* Description Section */}
                        <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl p-6 transition-all font-serif ">
                            <div className="w-full flex items-center text-[20px] text-blue-900 font-semibold pb-3 border-b border-blue-300">
                                <MdOutlineDescription className="mr-2 text-blue-700 text-[20px]" />
                                Description
                            </div>
                            <p className="text-justify p-4 text-slate-900 text-[16px] font-medium leading-relaxed">
                                {serviceDetails?.Description || "No description provided."}
                            </p>
                        </div>

                        {/* Features Section */}
                        <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl p-6 transition-all font-serif">
                            <div className="w-full flex items-center  text-[20px] text-blue-900 font-semibold pb-3 border-b border-blue-300">
                                <BsStars className="mr-2 text-blue-700 " />
                                Features
                            </div>
                            <ul className="flex flex-col gap-3 p-4 text-slate-900 text-[16px] font-medium">
                                {serviceDetails?.features?.length > 0 ? (
                                    serviceDetails.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-2 "
                                        >
                                            <FaCheckCircle className="text-sky-600 mt-1" />
                                            <span className=" break-words">{feature}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500 italic">No features listed.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="w-full flex  min-w-[30%] max-w-[40%] sm:w-full flex-col gap-6">

                        {/* Contact Details */}
                        <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl p-6 w-full flex flex-col sm:flex-row gap-6 items-center ">

                            {/* Profile Image */}
                            <div className="w-[140px] h-[160px] sm:w-[160px] sm:h-[200px] rounded-xl overflow-hidden border-2 border-blue-300 flex-shrink-0">
                                <img
                                    src={serviceDetails?.user?.profileImage?.ImageUrl || "/default-user.png"}
                                    alt="Owner"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Contact Info */}
                           < ContactInformation serviceDetails={serviceDetails} userDetails={userDetails}/>
                        </div>
                        {/* Pricing Details */}
                        <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl  p-6 w-full font-serif">

                            {/* Heading */}
                            <div className="text-[20px]  text-blue-900 font-semibold pb-3 border-b border-blue-300">
                                Pricing Details
                            </div>

                            {/* Pricing Rows */}
                            <div className="mt-6 space-y-4 text-[16px]">

                                {/* Min Price */}
                                <div className="flex items-center  justify-between bg-sky-50 border border-blue-200 p-3 rounded-xl text-slate-800 text-[17px] transition-all duration-200  hover:scale-[1.015] cursor-default">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-blue-200 rounded-full p-2"><FaArrowDown className="text-sky-600" /></span>
                                        <span className="font-semibold text-blue-800">Min Price:</span>
                                    </div>
                                    <span className="flex items-center gap-1 font-medium text-sky-700">
                                        <MdOutlineCurrencyRupee className="text-sky-600" />
                                        {serviceDetails?.minPrice || "N/A"}
                                    </span>
                                </div>

                                {/* Max Price */}
                                <div className="flex items-center  justify-between bg-sky-50 border border-blue-200 p-3 rounded-xl text-slate-800 text-[17px] transition-all duration-200  hover:scale-[1.015] cursor-default">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-blue-200 rounded-full p-2"><FaArrowUp className="text-sky-600 " /></span>
                                        <span className="font-semibold text-blue-800">Max Price:</span>
                                    </div>
                                    <span className="flex items-center gap-1 font-medium text-sky-700">
                                        <MdOutlineCurrencyRupee className="text-sky-600 " />
                                        {serviceDetails?.maxPrice || "N/A"}
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>



                {/* job */}
                {
                    userDetails?._id === serviceDetails?.user?._id &&
                    <div ref={postedJobs} className=' w-full h-auto  mb-10 mx-200'>


                        <div className='w-full  font-semibold p-2 h-auto text-[26px] flex text-slate-800 font-serif'>
                            <div className='w-full text-[26px] text-slate-600  font-serif pb-2'>
                                <span className='border-b-[2px]'>Posted Jobs</span>
                            </div>
                            <Link to={`/job-post`}>
                                <button className=' flex rounded-md hover:text-[#3543be] border-[1px] hover:bg-slate-100 w-[180px] p-2  items-center justify-center h-auto text-slate-600 font-serif font-semibold text-[24px]'><FaAddressCard /><span className='text-[16px] px-4'> Post Job</span></button>
                            </Link>

                        </div>

                        <div className=' w-full grid xl:grid-cols-2 sm:grid-cols-1 md:px-16 lg:px-20 xl:p-2   p-2 gap-5 my-10'>

                            {
                                serviceDetails?.jobs?.map((job, index) => (
                                    <JobAdvertise key={index} typeText="View" job={job} business={serviceDetails?.bussiness} />

                                ))
                            }

                        </div>
                    </div>

                }





                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full flex flex-col items-center py-10 px-4 md:px-10  rounded-2xl "
                >

                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl font-serif font-bold text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 bg-clip-text mb-2"
                    >
                        Previous Work
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="h-[4px] w-28 origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0 rounded-full "
                    />


                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-600 text-center  mt-4 mb-6 font-serif text-base max-w-xl"
                    >
                        Upload your previous projects or designs to showcase your creativity and build trust with clients.
                    </motion.p>

                    {/* Upload Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="w-full  mt-6  max-w-xl "
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="flex flex-col  sm:flex-row items-center justify-center gap-4">
                            {/* File Input */}
                            <motion.input
                              ref={fileInputRef}
                                whileFocus={{ scale: 1.03 }}
                                type="file"
                                multiple
                                onChange={handleWorkPicChange}
                                className="w-full sm:w-[65%] p-3 bg-slate-100 border border-gray-300 rounded-md text-gray-800 font-serif shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                            />

                            {/* Upload Button */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-serif font-semibold rounded-xl shadow-md transition-all duration-300"
                            >
                                <IoCloudUploadSharp size={24} />
                                <span>Upload</span>
                            </motion.button>
                        </div>
                    </motion.form>
                </motion.div>

                <div className=' w-full h-auto relative    my-10  mt-4 flex flex-col px-5'>


                    {files.length > 0 && (
                        <div className="w-full bg-gradient-to-br from-white to-blue-50 z-10 mb-5 h-auto relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6 transition-all duration-300 rounded-xl border border-slate-300 shadow-md">
                            {files.map((element, idx) => (
                                <div
                                    key={idx}
                                    className="relative group rounded-lg overflow-hidden border border-slate-300 bg-gradient-to-br from-white to-blue-50 shadow-sm"
                                >
                                    {/* Image Preview */}
                                    <img
                                        src={URL.createObjectURL(element)}
                                        alt={`preview-${idx}`}
                                        className="w-full h-[180px] object-fit"
                                    />

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => handleRemoveFile(idx)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {AllPhotos.length === 0 ? (
                        <div className="w-full flex items-center justify-center">
                            <span className="text-[35px] text-[#b0d0d2] font-bold">
                                No Images Available
                            </span>
                        </div>
                    ) : (
                        <div className="w-full bg-white border-y border-slate-300 rounded-xl relative p-6">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                {AllPhotos.slice(0, 15).map((element, index) => (
                                    <div
                                        key={index}
                                        className="relative group cursor-pointer overflow-hidden rounded-lg border-2 border-blue-900  shadow-sm hover:shadow-md transition-all"
                                        onClick={() => handleModalOpen(index)}
                                    >
                                        <img
                                            src={element.imageUrl}
                                            alt={`img-${index}`}
                                            className="w-full h-[200px] object-cover transition-transform  duration-300 group-hover:scale-105"
                                        />

                                    </div>
                                ))}
                            </div>

                            {/* Modal */}
                            {isModalOpen !== null && (
                                <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center  justify-center">
                                    <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-xl border-2  shadow-xl">

                                        <button
                                            onClick={handleModalClose}
                                            className="absolute top-3 right-3 text-purple-600 bg-blue-50 hover:bg-blue-300 rounded-full p-2 z-50"
                                        >
                                            <IoClose size={30} />
                                        </button>

                                        <img
                                            src={AllPhotos[isModalOpen].imageUrl}
                                            alt="Full view"
                                            className="w-full h-full object-cover rounded-xl "
                                        />


                                        <button
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-xl w-10 text-grey-600 bg-blue-300 hover:bg-blue-200  p-2 rounded-2xl"
                                            onClick={() =>
                                                setIsModalOpen((prev) => (prev > 0 ? prev - 1 : AllPhotos.length - 1))
                                            }
                                        >
                                            <GrCaretPrevious />
                                        </button>

                                        <button
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl w-10 text-grey-600 bg-blue-300 hover:bg-blue-200 p-2 rounded-2xl"
                                            onClick={() =>
                                                setIsModalOpen((prev) => (prev < AllPhotos.length - 1 ? prev + 1 : 0))
                                            }
                                        >
                                            <GrCaretNext />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}




                </div>


                {popupwarning && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 animate-fadeIn"></div>
                )}

                {popupwarning && (
                    <div className='fixed inset-0 flex items-center justify-center z-50'>
                        <div className='bg-white shadow-xl rounded-lg p-6 w-[400px] flex flex-col items-center'>
                            <h2 className='text-2xl font-bold text-slate-800 mb-2'>Remove Service</h2>
                            <p className='text-slate-600 text-center mb-4'>Are you sure you want to remove this service?</p>
                            <p className='text-slate-500 text-sm italic mb-6'>Service Name: {serviceDetails?.serviceType}</p>
                            <div className='flex gap-4'>
                                <button className='px-4 py-2 rounded-md bg-gray-300 text-slate-700 hover:bg-gray-400 transition' onClick={handlePopupWarningClose}>Cancel</button>
                                <button className='px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition' onClick={handleServiceRemove}>Remove</button>
                            </div>
                        </div>
                    </div>
                )}


            </div>


            {isLoading == false &&
                <div className='w-full h-auto relative my-10 mt-0 flex flex-col px-5 bg-white rounded-xl py-8 pt-0'>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="w-full flex flex-col items-center gap-8 py-10  px-4 md:px-10"
                    >
                        {/* Heading */}
                        <div className="text-center mb-2">
                            <h2 className="text-blue-950 font-serif font-bold text-4xl inline-block  border-b-4 border-transparent bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                                Add a Review
                            </h2>
                            <div className="h-[3px] w-24 mx-auto  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                            <p className="text-gray-600 text-base font-serif mt-2">
                                Share your experience and help others make informed choices.
                            </p>
                        </div>


                        {/* Star Rating */}
                        <div className="flex flex-col items-center gap-2">
                            <label htmlFor="star-rating" className="text-lg font-serif font-medium text-gray-700">
                                Rate the Service
                            </label>
                            <div id="star-rating" className="flex gap-1">
                                {stars.map((_, index) => (
                                    <FaStar
                                        key={index}
                                        size={24}
                                        className={`transition-all duration-200 cursor-pointer ${(hoverValue || currentValue) > index
                                            ? "text-yellow-500 drop-shadow-md"
                                            : "text-gray-300"
                                            }`}
                                        onClick={() => handleClick(index + 1)}
                                        onMouseOver={() => handleMouseHover(index + 1)}
                                        onMouseLeave={() => handleMouseLeave(index + 1)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Review Textarea */}
                        <div className="w-full flex justify-center flex-col items-center gap-2">
                            <label htmlFor="review" className="text-lg font-serif font-medium text-gray-700">
                                Your Feedback
                            </label>
                            <textarea
                                name="review"
                                id="review"
                                placeholder="Share your experience with the service provider..."
                                className="text-[16px] h-[180px] text-gray-700 font-serif outline-none p-4 w-[90%] md:w-[700px] border border-gray-300 bg-white rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                                style={{ resize: "none" }}
                                rows={5}
                                value={input}
                                onChange={handleInputChange}
                            ></textarea>
                            <p className="font-serif text-gray-500 text-sm">{wordCount} / 20 words</p>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSubmitReview}
                            className="flex items-center justify-center gap-2 h-11 w-36 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-serif font-semibold rounded-xl shadow-lg transition-all duration-300"
                        >
                            <IoIosAddCircle size={22} />
                            <span>Submit</span>
                        </motion.button>
                    </motion.div>

                    <div className="w-full grid md:grid-cols-3 gap-4 py-10 px-1">
                        {reviewStore?.reviews.slice(0, visibleReviews).map((review, index) => (
                            <div key={index} className="p-5 rounded-lg  mx-auto">
                                <Review review={review} userDetails={userDetails} handleReviewDelete={handleReviewDelete} />
                            </div>
                        ))}
                    </div>


                    {visibleReviews < reviewStore?.reviews.length && (
                        <div className='w-full flex justify-center'>
                            <button

                                className='bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-lg text-lg font-serif font-medium shadow-md transition-all duration-300'>
                                View All
                            </button>
                        </div>
                    )}

                </div >


            }
        </>
    )
}

export default ServiceDetail