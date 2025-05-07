import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserSecret } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineImageNotSupported } from "react-icons/md";
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
import { FaArrowDown, FaArrowUp, FaStarHalfStroke } from "react-icons/fa6";
import { addReview, getAllReviews } from "../../Redux/Review/Action.js";
import Star from "../Reviews/Star.jsx";
import PopUp from "../PopUp/PopUp.jsx";
import DetailLoader from "../Loader/DetailLoader.jsx";
import { toast } from "react-toastify";
import { GrCaretPrevious } from "react-icons/gr"; import { GrCaretNext } from "react-icons/gr";
import ContactInformation from "../ContactInformation/ContactInformation.jsx";
import { motion, AnimatePresence } from "framer-motion";
import ServiceDetailSkeleton from "./ServiceDetailSkeleton.jsx"
import PaymentModal from "../ContactInformation/PaymentModal.jsx";
import ImageZoom from "../ContactInformation/ImageZoom.jsx";


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
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    //profile image state
     const [showImageModal, setShowImageModal] = useState(false);
        

    // States for payment flow
    const [activeTab, setActiveTab] = useState('description');

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [hasPaid, setHasPaid] = useState(false);


    const handlePaymentInitiation = () => {
        setShowPaymentModal(true);
    };


    // Function to verify payment
    const verifyPayment = () => {
        if (!transactionId.trim()) {
            alert("Please enter transaction ID");
            return;
        }

        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setShowPaymentModal(false);
            setTransactionId('');
            setHasPaid(true);
            alert("Payment verified successfully! All contact details unlocked.");
        }, 2000);
    };
    const upiID = "XXXX123@oksbi";
    const upiName = "XXXXXXXX XXXXX";

    return (
        <>


            <div className='bg-[#ffffff] flex flex-col  items-center w-full h-auto xl:px-20  sm:px-10 relative'>



                {isLoading ? (

                    <ServiceDetailSkeleton />

                ) : (<>
                    <div className="md:w-[90%] w-[96%] sm:w-full h-auto py-10 bg-white/30 backdrop-blur-lg shadow-lg my-10 flex flex-col lg:flex-row items-center md:px-10 rounded-2xl border border-gray-300">

                        <div className='w-full md:h-[180px] relative flex xl:items-start items-center flex-col  justify-center md:px-10 px-4'>



                            <div className='w-full xl:text-[32px] px-2 text-3xl font-bold text-[#2E3A46] font-serif py-2'>
                                <span className=''>{serviceDetails?.serviceType}</span>

                            </div>

                            <div className='w-full xl:text-[20px] text-2xl px-2 text-slate-600 font-serif pb-2'>
                                <span className=' font-semibold '>{serviceDetails?.bussiness?.companyName}
                                </span>

                            </div>
                            <div className='w-full  px-2 pb-3 flex justify-start items-center  text-lg font-serif font-medium  text-gray-700'>
                                <span>Ratings : </span>
                                <span className="text-[26px] font-serif font-normal px-2  text-yellow-400"><Star star={serviceDetails?.rating} /> </span>

                            </div>
                            <div className='xl:w-[400px] w-full  h-auto xl:text-[16px] text-lg flex justify-start items-center text-blue-950 font-serif '>
                                <span className="text-[24px] text-blue-600"><IoLocationSharp /></span>
                                <span className=' font-medium px text-gray-700'>
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

                        <div className="flex flex-col md:w-[600px] w-full items-center justify-center">
                            <div className='w-[190px] h-[190px] shadow-lg shadow-white border-cyan-600 border-4   rounded-full m-5'>

                                <img src={`${serviceDetails?.bussiness?.companyLogo?.imageUrl}`} alt="profile picture" className='  w-full h-full rounded-full object-contain' />
                            </div>

                            {
                                userDetails?._id == serviceDetails?.user?._id  &&

                                <div className="mt-6 grid grid-cols-2  items-center font-serif gap-2 justify-end">

                                    <button className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl shadow-lg font-serif text-[18px] hover:shadow-green-200 flex items-center justify-center gap-2 w-full"
                                        onClick={() => scrollToSection(postedJobs)}> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>Posted Job</button>

                                    <Link to={`/service-update/${serviceDetails?._id}`}>
                                        <button className="px-5 py-2 bg-gradient-to-r w-full from-blue-700 to-blue-500 text-white rounded-xl shadow-lg font-serif text-[18px] flex items-center font-semibold justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>Update</button>
                                    </Link>
                                    <Link to={`/job-post`}>
                                          
                                    <button
                                       
                                        className="px-5 py-2 bg-gradient-to-r w-full from-blue-700 to-blue-500 text-white rounded-xl shadow-lg font-serif text-[18px] flex items-center font-semibold justify-center gap-2"
                                          >
                                        <FaAddressCard size={24} />
                                        <span className=" text-base">Post Job</span>
                                    </button>
                                </Link>

                                    <button
                                        className="px-5 py-2 font-semibold w-full bg-gradient-to-r from-red-700 to-red-500 text-white rounded-xl shadow-lg font-serif text-[18px] flex items-center justify-center gap-2"

                                        onClick={handlePopupWarningOpen}>  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>Remove</button>
                                </div>

                            }
                        </div>

                    </div>

                   


                  

        <div className="2xl:w-[90%]  font-serif sm:w-full h-auto drop-shadow-lg my-10 mt-5 flex flex-col xl:flex-row gap-10 px-2 sm:px-2">
        {/* Left Section */}
            <div className="flex flex-col xl:w-2/3 gap-5">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-300 overflow-x-auto no-scrollbar">
                    <button
                        className={`flex items-center text-lg py-3 px-5 transition-all duration-300 border-b-2 ${
                            activeTab === 'description'
                                ? 'border-emerald-600 text-emerald-800 font-semibold'
                                : 'border-transparent text-gray-600 hover:text-emerald-700'
                        }`}
                        onClick={() => setActiveTab('description')}
                    >
                        About
                    </button>
                    <button
                        className={`flex items-center text-lg py-3 px-5 transition-all duration-300 border-b-2 ${
                            activeTab === 'features'
                                ? 'border-emerald-600 text-emerald-800 font-semibold'
                                : 'border-transparent text-gray-600 hover:text-emerald-700'
                        }`}
                        onClick={() => setActiveTab('features')}
                    >
                        Features
                    </button>
                    <button
                        className={`flex items-center text-lg py-3 px-5 transition-all duration-300 border-b-2 ${
                            activeTab === 'pricing'
                                ? 'border-emerald-600 text-emerald-800 font-semibold'
                                : 'border-transparent text-gray-600 hover:text-emerald-700'
                        }`}
                        onClick={() => setActiveTab('pricing')}
                    >
                        Pricing
                    </button>
                </div>

                {/* Tab Content */}
                <div className={`${activeTab === 'pricing' ? 'p-0' : 'p-5 bg-white border border-emerald-100 rounded-xl shadow-sm'}`}>
                    {/* Description Tab */}
                    <div 
                        className={`${activeTab === 'description' ? 'block' : 'hidden'}`}
                    >
                        <div className="w-full flex items-center text-xl text-emerald-800 font-semibold pb-3 border-b border-emerald-200">
                            <MdOutlineDescription className="mr-2 text-emerald-600 text-xl" />
                            Service Description
                        </div>
                        <p className="text-justify p-4 text-slate-700 text-lg xl:text-base leading-relaxed bg-gradient-to-r from-emerald-50 to-emerald-50 rounded-lg mt-3">
                            {serviceDetails?.Description || "No description provided for this service."}
                        </p>
                    </div>

                    {/* Features Tab */}
                    <div
                        className={`${activeTab === 'features' ? 'block' : 'hidden'}`}
                    >
                        <div className="w-full flex items-center text-xl text-emerald-800 font-semibold pb-3 border-b border-emerald-200">
                            <BsStars className="mr-2 text-emerald-600" />
                            Service Features
                        </div>
                        <ul className="flex flex-col gap-3 p-4 text-slate-700 text-lg xl:text-base">
                            {serviceDetails?.features?.length > 0 ? (
                                serviceDetails.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 bg-gradient-to-r from-emerald-50 to-white p-3 rounded-lg">
                                        <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                                        <span className="break-words">{feature}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 italic p-3">No features listed for this service.</li>
                            )}
                        </ul>
                    </div>

                    {/* Pricing Tab */}
                    <div
                        className={`${activeTab === 'pricing' ? 'block' : 'hidden'}`}
                    >
                        <div
                            className="bg-white font-serif rounded-xl shadow-md overflow-hidden border border-emerald-100"
                        >
                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 text-white">
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                                            clipRule="evenodd"></path> 
                                    </svg>
                                    Service Pricing
                                </h3>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-center">
                                        <span className="block text-sm text-gray-500 mb-1">Starting From</span>
                                        <div className="text-2xl font-bold text-emerald-700 flex items-center justify-center">
                                            <MdOutlineCurrencyRupee />
                                            <span>{serviceDetails?.minPrice || "N/A"}</span>
                                        </div>
                                    </div>

                                    <div className="h-12 border-r-2 border-gray-300"></div>

                                    <div className="text-center">
                                        <span className="block text-sm text-gray-500 mb-1">Up To</span>
                                        <div className="text-2xl font-bold text-emerald-700 flex items-center justify-center">
                                            <MdOutlineCurrencyRupee />
                                            <span>{serviceDetails?.maxPrice || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 text-base text-gray-600 bg-emerald-50 rounded-lg p-4 flex items-start gap-2">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Final prices may vary based on service complexity and your specific requirements.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section  */}
            <div className="flex xl:w-1/3">
            < ContactInformation serviceDetails={serviceDetails} userDetails={userDetails} handlePaymentInitiation={handlePaymentInitiation} hasPaid={hasPaid} setShowImageModal={setShowImageModal} />
            
            </div>
        </div>

                    {/* job */}
                    {
                        userDetails?._id === serviceDetails?.user?._id  &&
                        <div ref={postedJobs} className=' w-[95%] h-auto  mb-10 mx-200'>


                            <div className='w-full  font-semibold p-2 h-auto text-[26px] flex text-slate-800 font-serif'>

                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="w-full flex flex-col items-center py-10 pb-2 px-4 md:px-10  rounded-2xl "
                                >

                                    <motion.h2
                                        initial={{ opacity: 0, y: -20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                        className="text-4xl font-serif font-bold text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 bg-clip-text mb-2"
                                    >
                                        Posted Jobs
                                    </motion.h2>
                                  

                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                        className="h-[4px] w-28 origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0 rounded-full "
                                    />
                                      <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="text-gray-600 text-center font-normal mt-4  font-serif text-base max-w-xl"
                        >
                           Jobs listing under this Service.
                        </motion.p>
                                </motion.div>

                                
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

                    <div className=' w-full h-auto relative    my-10  mt-4 flex flex-col md:px-5 px-2'>


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
                                            className="w-full md:h-[220px] h-[140px] object-cover"
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
                            <div className="w-full flex font-serif items-center justify-center text-[#adafaf] font-bold">
                                <MdOutlineImageNotSupported className="text-5xl me-4" />
                                <span className="md:text-[35px] text-xl ">
                                 No Images Available
                                </span>
                            </div>
                        ) : (
                            <div className="w-full bg-white  rounded-xl border border-slate-300 shadow-md  relative md:p-6 p-4">
                                <div className="grid grid-cols-2  md:grid-cols-4 md:gap-6 gap-4">
                                    {AllPhotos.slice(0, 11).map((element, index) => (
                                        <div
                                            key={index}
                                            className="relative group cursor-pointer overflow-hidden rounded-lg   shadow-sm hover:shadow-md transition-all"
                                            onClick={() => handleModalOpen(index)}
                                        >
                                            <img
                                                src={element.imageUrl}
                                                alt={`img-${index}`}
                                                className="w-full md:h-[220px] h-[140px] object-cover transition-transform  duration-300 group-hover:scale-105"
                                            />

                                        </div>
                                    ))}
                                </div>

                                {/* Modal */}
                                {isModalOpen !== null && (
                                    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center  justify-center">
                                        <button
                                                onClick={handleModalClose}
                                                className="absolute top-5 right-6 text-red-600 bg-white/50 hover:scale-95  rounded-full p-2 z-50"
                                            >
                                                <IoClose size={30} />
                                            </button>
                                        <div className="relative w-[80%]  xl:h-[90vh] h-[50vh] bg-white rounded-xl   shadow-xl">

                                            

                                            <img
                                                src={AllPhotos[isModalOpen].imageUrl}
                                                alt="Full view"
                                                className="w-full h-full object-fit rounded-xl "
                                            />


                                           
                                        </div>
                                        <button
                                                className="absolute xl:left-20 left-5 top-1/2 -translate-y-1/2 text-xl w-12 h-12 text-grey-600 bg-white/50 hover:bg-blue-200  p-2 pe-3 rounded-full flex items-center justify-center"
                                                onClick={() =>
                                                    setIsModalOpen((prev) => (prev > 0 ? prev - 1 : AllPhotos.length - 1))
                                                }
                                            >
                                                <GrCaretPrevious />
                                            </button>

                                            <button
                                                className="absolute xl:right-20 right-5 top-1/2 -translate-y-1/2 text-xl w-12 h-12 text-grey-600 bg-white/50 hover:bg-blue-200 p-2 ps-3  rounded-full flex items-center justify-center"
                                                onClick={() =>
                                                    setIsModalOpen((prev) => (prev < AllPhotos.length - 1 ? prev + 1 : 0))
                                                }
                                            >
                                                <GrCaretNext />
                                            </button>
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

                            <PopUp
                                message="Remove Service"
                                submessage="Are you sure you want to remove this service?"
                                button1="Cancel"
                                button2="Remove"
                                submessage2={`Job Role: ${serviceDetails?.serviceType}`}
                                closeButton={handlePopupWarningClose}
                                handleRemove={handleServiceRemove}
                            />
                        </div>
                    )}

                </>)}
            </div>


            {isLoading == false &&
                <div className='w-full h-auto relative my-10 mt-0 flex flex-col bg-white rounded-xl py-4'>





                    <div className="w-full md:px-6 px-4 md:py-6 py-2 mb-6">
                        <div className="xl:max-w-6xl max-w-4xl   mx-auto flex flex-col md:flex-row justify-between items-center ">
                            <div className="text-blue-800 mb-6 md:mb-0 text-center md:text-left">
                                <h2 className="font-serif font-bold text-4xl mb-2">
                                    Client Reviews
                                </h2>

                                <p className="text-gray-600 text-base font-serif mb-4">
                                    Trusted by customers across the country
                                </p>
                                {/* Rating stats */}
                                {reviewStore?.reviews.length > 0 ? (
                                    <div className="flex items-center font-serif justify-center md:justify-start gap-4">
                                        <div className="flex items-center  gap-2">
                                            <span className="font-serif font-bold md:text-3xl text-xl">
                                                {(reviewStore.reviews.reduce((acc, review) => acc + review.rating, 0) / reviewStore.reviews.length).toFixed(1)}
                                            </span>
                                            <div className="flex flex-col items-start">
                                                <div className="flex">

                                                    <Star star={(reviewStore.reviews.reduce((acc, review) => acc + review.rating, 0) / reviewStore.reviews.length).toFixed(1)} />
                                                </div>
                                                <span className="text-gray-600 text-sm">
                                                    ({reviewStore.reviews.length} {reviewStore.reviews.length === 1 ? "review" : "reviews"})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center md:justify-start">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar key={star} size={18} className="text-blue-200" />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-blue-400 text-sm">No reviews yet</span>
                                    </div>
                                )}
                            </div>


                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 border border-slate-400 p-4 rounded-lg shadow-lg max-w-md text-center"
                            >
                                <h3 className="text-white font-serif font-semibold text-lg mb-1">
                                    Had an experience with this service?
                                </h3>
                                <p className="text-blue-100 text-sm mb-2">
                                    Your feedback helps others make better choices
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center justify-center gap-2 mx-auto h-11 w-36 bg-white   font-serif font-semibold rounded-lg shadow-md transition-all duration-300"
                                    onClick={() => document.getElementById('review-form').scrollIntoView({ behavior: 'smooth' })}
                                >
                                    <IoIosAddCircle size={20} />
                                    <span>Add Review</span>
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>


                    <div className="w-full md:px-6 px-4 mb-8">
                        <div className="xl:max-w-6xl max-w-4xl mx-auto">
                            {/* Filter tabs would go here - example UI */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-serif">
                                    All Reviews ({reviewStore?.reviews.length})
                                </button>

                                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-serif">
                                    Most Recent
                                </button>
                            </div>

                            {/* Reviews grid */}
                            {reviewStore?.reviews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                                    {reviewStore?.reviews.slice(0, visibleReviews).map((review, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="bg-gray-50 rounded-lg "
                                        >
                                            <Review review={review} userDetails={userDetails} handleReviewDelete={handleReviewDelete} />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="text-center p-10 bg-gray-50 rounded-lg shadow-sm"
                                >
                                    <div className="text-gray-400 mb-4">
                                        <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-serif font-medium text-gray-700 mb-2">No reviews yet</h3>
                                    <p className="text-gray-500 font-serif mb-4">Be the first to share your experience with this service provider!</p>
                                    <button
                                        onClick={() => document.getElementById('review-form').scrollIntoView({ behavior: 'smooth' })}
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-base font-serif transition-colors duration-300"
                                    >
                                        <IoIosAddCircle size={20} />
                                        <span>Write a Review</span>
                                    </button>
                                </motion.div>
                            )}

                            {/* Load more button */}
                            {visibleReviews < reviewStore?.reviews.length  && (
                                <div className='w-full flex justify-center mt-8'>
                                    <button className='bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg text-lg font-serif font-medium shadow-sm transition-all duration-300'>
                                        View All Reviews
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Review form  */}
                    <div id="review-form" className="w-full px-6 pt-4 border-t border-gray-100">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="max-w-2xl mx-auto flex flex-col items-center gap-6 py-8"
                        >
                            <div className="text-center mb-2">
                                <h2 className="text-blue-950 font-serif font-bold text-3xl inline-block border-b-4 border-transparent bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                                    Share Your Experience
                                </h2>
                                <div className="h-[3px] w-20 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                            </div>

                            {/* Rating input with half-star capability */}
                            <div className="flex flex-col items-center gap-2 w-full">
                                <label htmlFor="star-rating" className="text-lg  font-serif font-medium text-gray-700">
                                    How would you rate this service?
                                </label>
                                <div className="flex items-center gap-4">
                                    <div id="star-rating" className="flex gap-1 relative">
                                        {[...Array(5)].map((_, index) => (
                                            <div key={index} className="relative">
                                                {/* Full star base (gray background) */}
                                                <FaStar
                                                   
                                                    className="text-gray-300 w-7 h-7 "
                                                />

                                                {/* Left half clickable area */}
                                                <div
                                                    className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
                                                    onClick={() => handleClick(index + 0.5)}
                                                    onMouseOver={() => handleMouseHover(index + 0.5)}
                                                    onMouseLeave={handleMouseLeave}
                                                />

                                                {/* Right half clickable area */}
                                                <div
                                                    className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
                                                    onClick={() => handleClick(index + 1)}
                                                    onMouseOver={() => handleMouseHover(index + 1)}
                                                    onMouseLeave={handleMouseLeave}
                                                />

                                                {/* Colored overlay for half star */}
                                                {(hoverValue || currentValue) >= index + 0.5 && (hoverValue || currentValue) < index + 1 && (
                                                    <FaStarHalfStroke
                                                        size={28}
                                                        className="absolute top-0 left-0 text-yellow-500 drop-shadow-md w-7 h-7"
                                                    />
                                                )}

                                                {/* Colored overlay for full star */}
                                                {(hoverValue || currentValue) >= index + 1 && (
                                                    <FaStar
                                                       
                                                        className="absolute top-0 left-0 text-yellow-500 drop-shadow-md w-7 h-7"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="ml-2 flex items-center justify-center min-w-12 h-8 px-2 bg-blue-100 rounded-full">
                                        <span className="font-serif font-bold text-blue-700">
                                            {currentValue ? currentValue.toFixed(1) : "-"}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-orange-500 text-sm font-serif mt-1">
                                    {currentValue === 0 ? "Please select a rating" : `Thank you for rating ${currentValue.toFixed(1)}`}
                                </p>
                            </div>

                            {/* Review input */}
                            <div className="w-full flex flex-col items-center gap-2">
                                <label htmlFor="review" className="xl:text-lg text-xl font-serif font-medium text-gray-700">
                                    Your Review
                                </label>
                                <textarea
                                    name="review"
                                    id="review"
                                    placeholder="What did you like or dislike? What was your experience with this service provider?"
                                    className=" text-base h-[150px] text-gray-700 font-serif outline-none p-4 w-full border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                                    style={{ resize: "none" }}
                                    rows={5}
                                    value={input}
                                    onChange={handleInputChange}
                                ></textarea>
                                <div className="w-full flex justify-between items-center px-2">
                                    <p className="font-serif text-gray-500 text-sm">{wordCount} / 20 words</p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSubmitReview}
                                        className="flex items-center justify-center gap-2 h-11 px-5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-serif font-semibold rounded-xl shadow-md transition-all duration-300"
                                    >
                                        <IoIosAddCircle size={22} />
                                        <span>Submit Review</span>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            }

 {/* Image Modal/Lightbox */}
 <AnimatePresence>
                {showImageModal && (
                   <ImageZoom 
                   setShowImageModal={setShowImageModal} 
                   profileImage={serviceDetails?.user?.profileImage?.ImageUrl} 
               />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showPaymentModal && (
                    <PaymentModal
                        showPaymentModal={showPaymentModal}
                        setShowPaymentModal={setShowPaymentModal}
                        transactionId={transactionId}
                        setTransactionId={setTransactionId}
                        isVerifying={isVerifying}
                        verifyPayment={verifyPayment}
                        upiID={upiID}
                        upiName={upiName}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default ServiceDetail