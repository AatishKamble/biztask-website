import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { IoFlashSharp, IoCheckmarkCircle, IoBriefcase } from 'react-icons/io5';
import { IoIosAddCircle } from "react-icons/io";
import { FaUserSecret } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { FaCheckCircle, FaBriefcase, FaLock } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { BsDownload } from "react-icons/bs";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { RiImage2Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import React, { useEffect, useRef, useState } from 'react';
import { RiContactsBook3Fill } from "react-icons/ri";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Review from "../Reviews/Review";
import { API_BASE_URL } from "../../configApi/ConfigApi";
import { removeService, uploadImage, deleteServiceImage } from "../../Redux/ServiceR/Action.js";
import { Link, useNavigate } from 'react-router-dom';
import { FaAddressCard } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import JobAdvertise from "../JobTemplate/JobAdvertise.jsx";
import { removeReview } from "../../Redux/Review/Action.js";
import { MdOutlineCurrencyRupee, MdLocalOffer, MdVerified, MdInfo, MdAttachMoney, MdTrendingUp } from 'react-icons/md';
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { HiOutlineCloudUpload } from "react-icons/hi";
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
import { SiTicktick } from "react-icons/si";
import { IoMdAddCircle } from "react-icons/io";
import { HiDocumentText, HiInformationCircle } from 'react-icons/hi';
import { BiInfoCircle } from 'react-icons/bi'
import ReviewSection from "../Reviews/ReviewSection.jsx";
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { BsImages } from "react-icons/bs";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import { MdWarningAmber } from "react-icons/md";
import { FaClock, FaMapMarkerAlt, FaCalendarAlt, FaAward, FaInfoCircle, FaBuilding } from 'react-icons/fa';
import BusinessSchedule from "../BusinessSchedule/BusinessSchedule.jsx";
import BusinessDetails from "../BusinessDetails/BusinessDetails.jsx";
import SeekerDetailsModal from "../ContactInformation/SeekerDetailsModal.jsx";
import { createServiceBooking } from "../../Redux/ServiceBooking/Action.js";

import { FiCornerLeftDown } from "react-icons/fi";
import { CLEAR_SERVICE_ERROR, CLEAR_SERVICE_MESSAGE } from "../../Redux/ServiceBooking/ActionType.js";

const ServiceDetail = ({ serviceDetails, userDetails, handleLogInButtonClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const jwt = localStorage.getItem("jwt");
    const [activeTab1, setActiveTab1] = useState('overview');


    const isOwner = userDetails?._id === serviceDetails?.user?._id;

    //for user to give review before uploading work image
    const [hasGivenReview, setHasGivenReview] = useState(false);

    const formatTime = (time) => {
        if (!time) return "N/A";
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };



    const handleModalOpen = (index) => {

        setIsModalOpen(index);
    }
    const handleModalClose = () => {

        setIsModalOpen(null);

    }
    const fileInputRef = useRef(null);


    //upload image submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isOwner && !hasGivenReview) {
            toast.error("Please submit a review before uploading work images.");
            return;
        }

        if (files.length === 0) {
            toast.error("Please select at least one image.");
            return;
        }


        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];


        for (let file of files) {
            // File type check
            if (!allowedTypes.includes(file.type)) {
                toast.error(`Invalid file format: ${file.name}. Allowed: JPG, JPEG, PNG, GIF.`);
                return;
            }

            // Size check (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                toast.error(`File too large: ${file.name}. Max size is 2MB.`);
                return;
            }
        }

        const formData = new FormData();
        for (let file of files) {
            formData.append("previousImages", file);
        }
        formData.append("serviceId", serviceDetails._id);

        try {

            const result = await dispatch(uploadImage(formData, jwt));

            if (result?.success) {
                toast.success(result?.message);

                // clear selected images
                setFiles([]);

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }


            } else {
                toast.error(result?.message || "Upload failed.");
            }
        } catch (error) {
            toast.error("Something went wrong while uploading.");
        }
    };


    //upload image filed change
    const handleWorkPicChange = (e) => {

        if (!isOwner && !hasGivenReview) {
            toast.error("You must give a review before uploading images.");
            e.target.value = "";
            return;
        }
        setFiles(Array.from(e.target.files));
    }
    const [visibleCount, setVisibleCount] = useState(10); // for images
    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 10);
    };

    const handleDeleteImage = async (workPhotoId, photoId, publicId) => {
        if (!window.confirm("Delete this image?")) return;

        try {


            const result = await dispatch(
                deleteServiceImage(serviceDetails._id, workPhotoId, photoId, publicId, jwt)
            );

            if (result?.success) {
                toast.success(result?.message);
            } else {
                toast.error(result?.message || "Deletion failed.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };



    const navigate = useNavigate();

    const dispatch = useDispatch();


    const [isRLoading, setIsRLoading] = useState(false);
    const handleServiceRemove = async () => {

        try {
            setIsRLoading(true);


            const result = await dispatch(removeService(jwt, serviceDetails._id, serviceDetails?.bussiness?._id));
            if (result?.success) {



                toast.success(result?.message);

                setPopupWarning(false);


                setFiles([]);
                navigate(`/bussiness/details/${serviceDetails?.bussiness?._id}`);


            } else {
                toast.error(result?.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setTimeout(() => {
                setIsRLoading(false);
            }, 1500);
        }
    }


    //view jobs reference

    const postedJobs = useRef(null);
    const viewBusinessDetails = useRef(null);
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
            const photos = serviceDetails.WorkImage.flatMap(workImage =>
                workImage.photos.map(photo => ({
                    ...photo,
                    workPhotoId: workImage._id,
                    uploadedBy: workImage.user
                }))
            );

            setAllPhotos(photos);
            setIsModalOpen(null);
        }
    }, [serviceDetails?.WorkImage]);

    useEffect(() => {
        if (!serviceDetails?.reviews || !userDetails?._id) return;

        const review = serviceDetails.reviews.some(
            (r) => String(r.user) === String(userDetails._id)
        );

        setHasGivenReview(review);
    }, [serviceDetails?.reviews, userDetails?._id]);

    //keyboard arrow button for model


    useEffect(() => {

        if (isModalOpen === null) return;

        const handleKeyPress = (event) => {

            switch (event.key) {
                case 'ArrowLeft':

                    setIsModalOpen((prev) => (prev > 0 ? prev - 1 : AllPhotos.length - 1));
                    break;
                case 'ArrowRight':

                    setIsModalOpen((prev) => (prev < AllPhotos.length - 1 ? prev + 1 : 0));
                    break;
                case 'Escape':

                    handleModalClose();
                    break;
                default:
                    break;
            }
        };


        window.addEventListener('keydown', handleKeyPress);


        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isModalOpen, AllPhotos.length]);


    useEffect(() => {
        if (isModalOpen !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isModalOpen]);

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



    const isLoading = useSelector(store => store.serviceStore.isLoading);

    const imageUploading = useSelector(store => store.serviceStore.imageUploading);

    const imageDeleting = useSelector(store => store.serviceStore.imageDeleting);


    const error1 = useSelector(store => store.serviceBookingStore.error);
    const message1 = useSelector(store => store.serviceBookingStore.message);

    useEffect(() => {
        if (error1) {
            toast.error(error1);
            dispatch({ type: CLEAR_SERVICE_ERROR });
        }
    }, [error1, dispatch]);
    useEffect(() => {
        if (message1) {
            toast.success(message1);

            dispatch({ type: CLEAR_SERVICE_MESSAGE });

        }
    }, [message1, dispatch]);
    //profile image state
    const [showImageModal, setShowImageModal] = useState(false);


    // States for payment flow
    const [activeTab, setActiveTab] = useState('description');

    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const [transactionId, setTransactionId] = useState('');
    const [price, setPrice] = useState(null);


    //book service
    const [showSeekerModal, setShowSeekerModal] = useState(false);
    const [seekerData, setSeekerData] = useState(null);



    const handlePaymentInitiation = () => {
        if (userDetails) {
            setShowPaymentModal(true);
        }
        else {
            handleLogInButtonClick();
        }

    };

    const handleBookingInitiation = () => {

        if (userDetails) {
            setShowSeekerModal(true)
        }
        else {
            handleLogInButtonClick();
        }
    }

    const regdate = new Date(serviceDetails?.bussiness?.createdAt);


    const bDetails = [
        { icon: FaBuilding, label: "Business ID", value: serviceDetails?.bussiness?._id, gradient: "from-indigo-500 to-purple-500" },
        { icon: FaCalendarAlt, label: "Registration Date", value: regdate.toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' }), gradient: "from-purple-500 to-pink-500" },
        { icon: FaBuilding, label: "Company Name", value: serviceDetails?.bussiness?.companyName, gradient: "from-pink-500 to-rose-500" },
        { icon: FaBriefcase, label: "Business Type", value: serviceDetails?.bussiness?.businessName, gradient: "from-green-500 to-emerald-500" },
        { icon: FaBriefcase, label: "Business Category", value: serviceDetails?.bussiness?.businessCategory, gradient: "from-blue-500 to-cyan-500" },
        { icon: FaAward, label: "Years of Experience", value: serviceDetails?.bussiness?.yearsOfExperience ? `${serviceDetails?.bussiness?.yearsOfExperience} Years` : "N/A", gradient: "from-orange-500 to-red-500" }
    ];
    // Function to verify payment
    const verifyPaymentAndSubmit = async (e) => {
        e.preventDefault();

        if (!transactionId.trim()) {
            toast.warning("Please enter transaction ID");
            return;
        }
        if (price === null) {
            toast.warning("Please select package");
            return;
        }
        const bookingData = {
            serviceId: serviceDetails?._id,
            providerId: serviceDetails?.user?._id,

            seekerName: seekerData.fullName,
            seekerPhone: seekerData.phone,
            seekerEmail: seekerData.email,
            seekerAddress: seekerData.address,

            transactionId: transactionId,
            price: price
        };

        try {

            await dispatch(createServiceBooking(bookingData, jwt));
            setShowPaymentModal(false);
            setTransactionId('');
            setPrice('');

        } catch (error) {

        }
    };



    const upiID = "atishkamble@xxx";
    const upiName = "aatishKamble"

    return (
        <>


            <div className='bg-[#ffffff] flex flex-col  items-center w-full h-auto xl:px-20  sm:px-10 relative'>



                {isLoading && !isRLoading ? (

                    <ServiceDetailSkeleton />

                ) : (<>
                    <div className=" w-[96%] sm:w-full h-auto py-10 bg-white/30 backdrop-blur-lg shadow-lg my-10 flex flex-col lg:flex-row items-center md:px-10 rounded-2xl border border-gray-300">

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
                                userDetails?._id == serviceDetails?.user?._id &&

                                <div className="mt-6 grid grid-cols-2  items-center font-serif gap-2 justify-end">

                                    <button className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl shadow-lg font-serif text-[18px] hover:shadow-green-200 flex items-center justify-center gap-2 w-full"
                                        onClick={() => scrollToSection(postedJobs)}>
                                        <MdOutlineWork size={20} />My Jobs</button>

                                    <Link to={`/service-update/${serviceDetails?._id}`}>
                                        <button className="px-5 py-2 bg-gradient-to-r w-full from-blue-700 to-blue-500 text-white rounded-xl shadow-lg font-serif text-[18px] flex items-center font-semibold justify-center gap-2">
                                            <FaRegEdit size={20} />Update</button>
                                    </Link>
                                    <Link to={`/job-post/${serviceDetails?._id}`}>

                                        <button

                                            className="px-5 py-2 bg-gradient-to-r w-full from-blue-700 to-blue-500 text-white rounded-xl shadow-lg font-serif text-[18px] flex items-center font-semibold justify-center gap-2"
                                        >
                                            <FaAddressCard size={20} />
                                            <span className=" text-base">Post Job</span>
                                        </button>
                                    </Link>

                                    <button
                                        className="px-5 py-2 font-semibold w-full bg-gradient-to-r from-red-700 to-red-500 text-white rounded-xl shadow-lg font-serif text-[18px] flex items-center justify-center gap-2"

                                        onClick={handlePopupWarningOpen}>
                                        <FaDeleteLeft size={20} />  Remove</button>
                                </div>

                            }

                            <div className="p-4">
                                <button className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl shadow-lg font-serif text-[18px] hover:shadow-green-200 flex items-center justify-center gap-2 w-full"
                                    onClick={() => scrollToSection(viewBusinessDetails)}>
                                    <FiCornerLeftDown size={18} />View Business Details
                                </button>

                            </div>
                        </div>

                    </div>






                    <div className="2xl:w-[90%]  font-serif w-full h-auto  my-10 mt-5  px-2 sm:px-2">


                        {/* Tab Navigation */}

                        <div className="relative mb-6 sm:mb-12">
                            {/* Connection Line */}
                            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 hidden sm:block"></div>
                            <div
                                className="absolute top-8 left-0 h-1 bg-gradient-to-r from-indigo-500 via-emerald-400 to-indigo-500 transition-all duration-700 ease-out hidden sm:block"
                                style={{
                                    width: activeTab === 'description' ? '14%' : activeTab === 'features' ? '50.40%' : '100%'
                                }}
                            ></div>

                            <div className="flex justify-between items-start relative z-10 gap-2 sm:gap-4">
                                {/* About Tab */}
                                <button
                                    className="flex-1 flex flex-col items-center group transition-all duration-300"
                                    onClick={() => setActiveTab('description')}
                                >
                                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg mb-3 ${activeTab === 'description'
                                        ? 'bg-gradient-to-br from-emerald-500 to-teal-500 scale-110 shadow-emerald-300'
                                        : 'bg-white border-2 border-gray-300 group-hover:border-emerald-400 group-hover:scale-105'
                                        }`}>
                                        <MdOutlineDescription className={`text-xl sm:text-2xl transition-colors duration-300 ${activeTab === 'description' ? 'text-white' : 'text-gray-500 group-hover:text-emerald-600'
                                            }`} />
                                    </div>
                                    <div className="text-center">
                                        <div className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${activeTab === 'description' ? 'text-emerald-600' : 'text-gray-500 group-hover:text-emerald-600'
                                            }`}>
                                            About
                                        </div>
                                        <div className={`text-[12px] sm:text-sm text-gray-400 mt-1 transition-opacity duration-300 ${activeTab === 'description' ? 'opacity-100' : 'opacity-0 sm:opacity-60'
                                            }`}>
                                            Service Info
                                        </div>
                                    </div>
                                    {activeTab === 'description' && (
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    )}
                                </button>

                                {/* Features Tab */}
                                <button
                                    className="flex-1 flex flex-col items-center group transition-all duration-300"
                                    onClick={() => setActiveTab('features')}
                                >
                                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg mb-3 ${activeTab === 'features'
                                        ? 'bg-gradient-to-br from-emerald-500 to-teal-500 scale-110 shadow-emerald-300'
                                        : 'bg-white border-2 border-gray-300 group-hover:border-emerald-400 group-hover:scale-105'
                                        }`}>
                                        <BsStars className={`text-xl sm:text-2xl transition-colors duration-300 ${activeTab === 'features' ? 'text-white' : 'text-gray-500 group-hover:text-emerald-600'
                                            }`} />
                                    </div>
                                    <div className="text-center">
                                        <div className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${activeTab === 'features' ? 'text-emerald-600' : 'text-gray-500 group-hover:text-emerald-600'
                                            }`}>
                                            Features
                                        </div>
                                        <div className={`text-[12px] sm:text-sm text-gray-400 mt-1 transition-opacity duration-300 ${activeTab === 'features' ? 'opacity-100' : 'opacity-0 sm:opacity-60'
                                            }`}>
                                            Key Benefits
                                        </div>
                                    </div>
                                    {activeTab === 'features' && (
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    )}
                                </button>

                                {/* Pricing Tab */}
                                <button
                                    className="flex-1 flex flex-col items-center group transition-all duration-300"
                                    onClick={() => setActiveTab('pricing')}
                                >
                                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg mb-3 ${activeTab === 'pricing'
                                        ? 'bg-gradient-to-br from-emerald-500 to-teal-500 scale-110 shadow-emerald-300'
                                        : 'bg-white border-2 border-gray-300 group-hover:border-emerald-400 group-hover:scale-105'
                                        }`}>
                                        <MdOutlineCurrencyRupee className={`text-xl sm:text-2xl transition-colors duration-300 ${activeTab === 'pricing' ? 'text-white' : 'text-gray-500 group-hover:text-emerald-600'
                                            }`} />
                                    </div>
                                    <div className="text-center">
                                        <div className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${activeTab === 'pricing' ? 'text-emerald-600' : 'text-gray-500 group-hover:text-emerald-600'
                                            }`}>
                                            Pricing
                                        </div>
                                        <div className={`text-[12px] sm:text-sm text-gray-400 mt-1 transition-opacity duration-300 ${activeTab === 'pricing' ? 'opacity-100' : 'opacity-0 sm:opacity-60'
                                            }`}>
                                            Cost Details
                                        </div>
                                    </div>
                                    {activeTab === 'pricing' && (
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    )}
                                </button>


                            </div>
                        </div>
                        {/* Tab Content */}

                        <div className=" ">
                            {/* Description Tab */}
                            <div
                                className={`w-full ${activeTab === 'description' ? 'block' : 'hidden'}`}
                                style={{
                                    animation: `fadeInDown 0.5s ease-out 0.1s both`
                                }}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>

                                    <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-indigo-100 overflow-hidden transition-shadow duration-300">
                                        {/*  top border */}
                                        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                                        {/* Header Section */}
                                        <div className="py-6 px-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-b border-indigo-100">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                                                        <div className="relative p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg">
                                                            <MdOutlineDescription className="w-6 h-6" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                            Service Description
                                                        </h3>
                                                        <p className="text-sm text-gray-500 mt-0.5">Detailed overview of our service</p>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                        <div className="p-6 sm:p-8">
                                            {/* Description Card */}
                                            <div className="relative group">

                                                {/* Main content card */}
                                                <div className="relative bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-2xl p-6 sm:p-8 border border-blue-100/50 transition-all duration-300"
                                                    style={{
                                                        animation: `fadeInDown 0.5s ease-out 0.2s both`
                                                    }}
                                                >


                                                    {/* Description text */}
                                                    <p className="relative text-justify text-slate-700 text-lg leading-relaxed">
                                                        {serviceDetails?.Description || "No description provided for this service."}
                                                    </p>

                                                    {/* Bottom  element */}
                                                    {serviceDetails?.Description && (
                                                        <div className="mt-6 pt-4 border-t border-blue-200/50">
                                                            <div className="flex items-center gap-2 text-sm text-blue-600/70">
                                                                <BiInfoCircle className="w-4 h-4" />
                                                                <span className="italic">Detailed information about this service</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Info box for empty state */}
                                            {!serviceDetails?.Description && (
                                                <div className="mt-6 relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-slate-500/5 to-gray-500/5 rounded-2xl"></div>
                                                    <div className="relative bg-gradient-to-r from-gray-50/80 to-slate-50/80 rounded-2xl p-6 border border-gray-200/50 backdrop-blur-sm">
                                                        <div className="flex items-start gap-4">
                                                            <div className="flex-shrink-0">
                                                                <div className="relative">
                                                                    <div className="absolute inset-0 bg-gray-500 rounded-lg blur-sm opacity-30"></div>
                                                                    <div className="relative p-2.5 bg-gradient-to-br from-gray-500 to-slate-500 rounded-lg shadow-lg">
                                                                        <HiInformationCircle className="w-5 h-5 text-white" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-gray-800 mb-1.5">Description Coming Soon</h4>
                                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                                    We're working on adding a detailed description for this service. Please check back later or contact us for more information.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features Tab */}
                            <div
                                className={`w-full ${activeTab === 'features' ? 'block' : 'hidden'}`}
                                style={{
                                    animation: `fadeInDown 0.5s ease-out 0.1s both`
                                }}
                            >
                                <div className="relative">

                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>

                                    <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-emerald-100 overflow-hidden transition-shadow duration-300">
                                        {/*  top border */}
                                        <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

                                        {/* Header Section */}
                                        <div className="py-6 px-6 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border-b border-emerald-100">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                                                        <div className="relative p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg">
                                                            <BsStars className="w-6 h-6" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                                            Service Features
                                                        </h3>
                                                        <p className="text-sm text-gray-500 mt-0.5">Everything you need to know</p>
                                                    </div>
                                                </div>

                                                {/* Badge */}
                                                <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                                    <HiSparkles className="w-4 h-4" />
                                                    Highlights
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 sm:p-8">
                                            <ul className="flex flex-col gap-4">
                                                {serviceDetails?.features?.length > 0 ? (
                                                    serviceDetails.features.map((feature, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="group relative"
                                                            style={{
                                                                animation: `fadeInDown 0.5s ease-out ${idx * 0.1}s both`
                                                            }}
                                                        >

                                                            {/* Feature card */}
                                                            <div className="relative flex items-start gap-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 group-hover:from-emerald-100/80 group-hover:to-teal-100/80 p-5 rounded-xl border border-emerald-100/50 group-hover:border-emerald-300 transition-all duration-300 group-hover:shadow-md">
                                                                {/* Icon container */}
                                                                <div className="flex-shrink-0 mt-0.5">
                                                                    <div className="relative">
                                                                        <div className="absolute inset-0 bg-emerald-500 rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                                                                        <div className="relative p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                                                                            <FaCheckCircle className="text-white text-base" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Feature text */}
                                                                <div className="flex-1 min-w-0">
                                                                    <span className="text-slate-700 text-lg xl:text-base leading-relaxed break-words block">
                                                                        {feature}
                                                                    </span>
                                                                </div>

                                                                {/*  element */}
                                                                <div className="hidden sm:block flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="text-center py-12">
                                                        <div className="inline-flex flex-col items-center gap-3">
                                                            <div className="p-4 bg-gray-100 rounded-full">
                                                                <BsStars className="w-8 h-8 text-gray-400" />
                                                            </div>
                                                            <p className="text-gray-500 italic text-base">
                                                                No features listed for this service.
                                                            </p>
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>

                                            {/* Bottom decorative element - only show if features exist */}
                                            {serviceDetails?.features?.length > 0 && (
                                                <div className="mt-8 pt-6 border-t border-emerald-100">
                                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-300"></div>
                                                        <span className="flex items-center gap-1.5">
                                                            <HiSparkles className="text-emerald-500" />
                                                            {serviceDetails.features.length} Premium Features
                                                        </span>
                                                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-300"></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing Tab */}
                            <div
                                className={`w-full ${activeTab === 'pricing' ? 'block' : 'hidden'}`}
                                style={{
                                    animation: `fadeInDown 0.5s ease-out 0.1s both`
                                }}
                            >
                                <div className="relative">

                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>

                                    <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-indigo-100 overflow-hidden transition-all duration-500">
                                        {/*  top border */}
                                        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                                        {/* Header Section */}
                                        <div className="py-6 px-6 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-indigo-100">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                                                        <div className="relative p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg">
                                                            <MdLocalOffer className="w-6 h-6" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                            Service Pricing
                                                        </h3>
                                                        <p className="text-sm text-gray-500 mt-0.5">Transparent & Competitive Rates</p>
                                                    </div>
                                                </div>

                                                {/* Badge */}
                                                <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                                    <MdVerified className="w-4 h-4" />
                                                    Best Value
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8">
                                            {/* Price Cards */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                                {/* Starting Price */}
                                                <div className="group relative">
                                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                                                    <div className="relative bg-white rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 transform group-hover:-translate-y-1">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                                                Starting From
                                                            </span>
                                                            <MdAttachMoney className="w-4 h-4 text-blue-500" />
                                                        </div>

                                                        <div className="flex items-center justify-center">
                                                            <MdOutlineCurrencyRupee className="text-4xl text-blue-600" />
                                                            <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                                                {serviceDetails?.minPrice || "N/A"}
                                                            </span>
                                                        </div>

                                                        <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-sm">
                                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-200"></div>
                                                            <span>Base Package</span>
                                                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-200"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Maximum Price */}
                                                <div className="group relative">
                                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                                                    <div className="relative bg-white rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 transform group-hover:-translate-y-1">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                                                Up To
                                                            </span>
                                                            <MdTrendingUp className="w-4 h-4 text-purple-500" />
                                                        </div>

                                                        <div className="flex items-center justify-center">
                                                            <MdOutlineCurrencyRupee className="text-4xl text-purple-600" />
                                                            <span className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                                {serviceDetails?.maxPrice || "N/A"}
                                                            </span>
                                                        </div>

                                                        <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-sm">
                                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-200"></div>
                                                            <span>Premium Package</span>
                                                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-200"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Info Box */}
                                            <div className="relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
                                                <div className="relative bg-gradient-to-r from-indigo-50/80 to-purple-50/80 rounded-2xl p-6 border border-indigo-200/50 backdrop-blur-sm">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="relative">
                                                                <div className="absolute inset-0 bg-indigo-500 rounded-lg blur-sm opacity-50"></div>
                                                                <div className="relative p-2.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-lg">
                                                                    <MdInfo className="w-5 h-5 text-white" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-800 mb-1.5 flex items-center gap-2">
                                                                <span>Pricing Information</span>
                                                                <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">Note</span>
                                                            </h4>
                                                            <p className="text-gray-700 leading-relaxed">
                                                                Final prices may vary based on service complexity and your specific requirements.
                                                                <span className="text-indigo-600 font-medium"> Contact us</span> for a detailed quote tailored to your needs.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Features List */}
                                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                {[
                                                    { Icon: IoFlashSharp, text: "Quick Turnaround", color: "yellow" },
                                                    { Icon: IoCheckmarkCircle, text: "Quality Assured", color: "green" },
                                                    { Icon: IoBriefcase, text: "Professional Service", color: "blue" }
                                                ].map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
                                                        <item.Icon className="text-2xl text-indigo-500" />
                                                        <span className="text-sm font-medium text-gray-700">{item.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <style>{`
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
  to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>




                    </div>

                    {/* job */}
                    {
                        isOwner &&
                        <div ref={postedJobs} className=' w-[95%] h-auto pb-10 mx-200'>


                            <div className='w-full  font-semibold p-2 h-auto text-[26px] flex text-slate-800 font-serif'>

                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="w-full flex flex-col items-center pb-2 pt-2 px-4 md:px-10  rounded-2xl "
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
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                        className="h-1 max-w-xs mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mb-4"
                                    />

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6 }}
                                        className="text-gray-600 text-center font-normal  font-serif text-base max-w-xl"
                                    >
                                        Jobs listing under this Service.
                                    </motion.p>
                                </motion.div>


                            </div>

                            <div className=' w-full grid xl:grid-cols-2 sm:grid-cols-1 md:px-16 lg:px-20 xl:p-2   p-2 gap-10 my-2'>

                                {
                                    serviceDetails?.jobs?.map((job, index) => (
                                        <JobAdvertise key={index} typeText="View" job={job} business={serviceDetails?.bussiness} />

                                    ))
                                }



                            </div>
                            {serviceDetails?.jobs?.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12 px-6 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
                                    <p className="text-gray-600 text-xl font-medium">
                                        No jobs available
                                    </p>
                                    <p className="text-base text-gray-400 mt-1">
                                        New jobs will appear here once they are posted.
                                    </p>
                                </div>
                            )}
                        </div>

                    }





                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full flex flex-col items-center py-10 pt-2 px-4 md:px-10 rounded-3xl relative overflow-hidden"
                    >

                        {/* Content */}
                        <div className="relative z-10 w-full max-w-5xl">
                            {/* Header Section */}
                            <div className="text-center mb-10">


                                <motion.h2
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="text-4xl font-serif font-bold mb-4"
                                >
                                    <span className="text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 bg-clip-text">
                                        Previous Work
                                    </span>
                                </motion.h2>

                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    className="h-1 max-w-xs mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mb-4"
                                />

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7 }}
                                    className="text-gray-600 font-serif text-base max-w-2xl mx-auto leading-relaxed"
                                >
                                    {
                                        isOwner
                                            ? "Showcase your best projects and let your work speak for itself."
                                            : "Show the work done by the provider for you."
                                    }

                                </motion.p>
                            </div>

                            <motion.form
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 }}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="relative group">
                                    {/*  Upload Card */}
                                    <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:border-blue-400 hover:shadow-blue-100">
                                        <div className="p-8 md:p-12">
                                            <div className="flex flex-col md:flex-row items-center gap-6">
                                                {/* Icon  */}
                                                <div className="flex-shrink-0">
                                                    <motion.div
                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                        className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl"
                                                    >
                                                        <IoCloudUploadSharp className="text-4xl text-white" />
                                                    </motion.div>
                                                </div>

                                                {/* Content Section */}
                                                <div className="flex-1 text-center md:text-left">
                                                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                                                        Upload {isOwner ? "Your" : ""} Work
                                                    </h3>
                                                    <p className="text-gray-600 font-serif mb-4">
                                                        Select multiple files to showcase {isOwner ? "your" : ""} portfolio
                                                    </p>

                                                    <div className="flex flex-col sm:flex-row gap-3">
                                                        {/* File Input Button */}
                                                        <label
                                                            className={`relative flex-1 ${(imageUploading || (!isOwner && !hasGivenReview))
                                                                ? "cursor-not-allowed"
                                                                : "cursor-pointer"
                                                                }`}
                                                        >
                                                            <input
                                                                ref={fileInputRef}
                                                                type="file"
                                                                disabled={(imageUploading || (!isOwner && !hasGivenReview))}
                                                                multiple
                                                                onChange={handleWorkPicChange}
                                                                className={`absolute inset-0 w-full h-full opacity-0 
            ${(imageUploading || (!isOwner && !hasGivenReview))
                                                                        ? "cursor-not-allowed"
                                                                        : "cursor-pointer"
                                                                    }
        `}
                                                            />
                                                            <div
                                                                className={`flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl 
            border-2 transition-all duration-300 font-serif font-semibold

            ${(imageUploading || (!isOwner && !hasGivenReview))
                                                                        ? "bg-gray-200 text-gray-400 border-gray-300"
                                                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 hover:border-gray-400"
                                                                    }
        `}
                                                            >
                                                                <RiImage2Line size={20} />
                                                                <span>Browse Files</span>
                                                            </div>
                                                        </label>

                                                        {/* Upload Button */}

                                                        <motion.button
                                                            type="submit"
                                                            whileHover={{ scale: 1.02 }}
                                                            disabled={imageUploading || (!isOwner && !hasGivenReview)}
                                                            whileTap={{ scale: 0.98 }}
                                                            className={`relative px-8 py-3.5 bg-gradient-to-r 
             from-blue-600 to-indigo-600 
             hover:from-blue-700 
             text-white font-serif font-semibold 
             rounded-xl shadow-lg transition-all duration-300
             flex items-center justify-center ${(!isOwner && !hasGivenReview) ? "hover:from-gray-600 hover:to-gray-700 cursor-not-allowed" : "hover:to-indigo-700"}`}
                                                        >
                                                            {imageUploading ? (
                                                                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                            ) : (
                                                                "Upload Now"
                                                            )}
                                                        </motion.button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Info Bar */}
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-4 border-t border-gray-200 flex flex-col gap-4 items-center">
                                            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 font-serif">
                                                <div className="flex items-center gap-1">
                                                    <SiTicktick className="text-blue-600" size={15} />
                                                    <span>JPG, PNG, GIF</span>
                                                </div>
                                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                <div className="flex items-center gap-1">
                                                    <HiOutlineCloudUpload className="text-blue-600" size={16} />
                                                    <span>Max 2MB per file</span>
                                                </div>
                                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                <div className="flex items-center gap-1">
                                                    <BsDownload className="text-blue-600 " size={16} />
                                                    <span>Multiple files supported</span>
                                                </div>

                                            </div>
                                            {(!isOwner && !hasGivenReview) && <>
                                                <div className="flex items-center gap-2 text-red-600">
                                                    <MdWarningAmber className=" text-[30px] md:text-[18px]" />
                                                    <span className="  italic">If you have given  a review, then only your upload will accepted. </span>
                                                </div></>}
                                        </div>

                                    </div>
                                </div>
                            </motion.form>
                        </div>
                    </motion.div>

                    {/* Gallery Section */}
                    <div className="w-full h-auto relative my-8 flex flex-col md:px-5 px-2 font-serif">
                        {/* Preview Files (Before Upload) */}
                        {files.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.5 }}
                                className="w-full mb-8"
                            >
                                {/* Section Header */}
                                <div className="flex items-center gap-3 mb-5">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg"
                                    >
                                        <SiTicktick className="text-white" size={15} />
                                    </motion.div>
                                    <div className="flex-1 ">
                                        <h3 className="text-xl font-serif font-bold text-gray-800">Ready to Upload</h3>
                                        <p className="text-sm text-gray-500">Click upload button to save these images</p>
                                    </div>
                                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                                        {files.length} {files.length === 1 ? 'file' : 'files'}
                                    </span>
                                </div>

                                {/* Preview Grid */}
                                <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 backdrop-blur-sm rounded-2xl border border-emerald-200 shadow-lg p-4 md:p-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                                        {files.map((element, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="relative group aspect-square rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
                                            >
                                                {/* Image */}
                                                <img
                                                    src={URL.createObjectURL(element)}
                                                    alt={`preview-${idx}`}
                                                    className="w-full h-full object-cover"
                                                />

                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                {/* New Badge */}
                                                <div className="absolute top-2 left-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                                    NEW
                                                </div>

                                                {/* Delete Button */}
                                                <motion.button
                                                    onClick={() => handleRemoveFile(idx)}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full  transition-all duration-300 flex items-center justify-center shadow-lg"
                                                >
                                                    <RxCross2 size={20} />
                                                </motion.button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Uploaded Gallery */}
                        {AllPhotos.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="w-full"
                            >
                                <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 rounded-3xl border-2 border-dashed border-gray-300 p-16 md:p-24">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <motion.div
                                            animate={{
                                                y: [0, -15, 0],
                                                rotate: [0, 5, -5, 0]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="mb-8"
                                        >
                                            <div className="relative">
                                                <MdOutlineImageNotSupported className="text-9xl text-gray-300" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-blue-200/40 to-transparent rounded-full blur-3xl"></div>
                                            </div>
                                        </motion.div>
                                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-400 mb-4">
                                            No Images Available
                                        </h3>
                                        <p className="text-gray-500 font-serif text-base md:text-lg max-w-md leading-relaxed">
                                            Service images will appear here once they are uploaded
                                        </p>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="mt-8 flex items-center gap-2 text-blue-500"
                                        >
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (

                            <>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-full"
                                >
                                    {/* Gallery Header */}
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-blue-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-10 bg-gradient-to-b from-blue-600 via-indigo-500 to-blue-600 rounded-full shadow-lg"></div>
                                            <div>
                                                <h3 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                                                    Service Gallery
                                                </h3>
                                                <p className="text-sm text-gray-600 font-serif">Completed work showcase</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full font-serif font-semibold text-sm shadow-lg">
                                            <BsImages size={16} />
                                            <span>{AllPhotos.length}</span>
                                        </div>
                                    </div>

                                    {/* Gallery Container */}
                                    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl relative md:p-8 p-5 overflow-hidden">
                                        {/*  Background Elements */}
                                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
                                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl"></div>

                                        {/* Images Grid */}
                                        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                                            {AllPhotos.slice(0, visibleCount).map((element, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.05, duration: 0.4 }}

                                                    className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border-2 border-blue-300 hover:border-blue-400"
                                                    onClick={() => handleModalOpen(index)}
                                                >
                                                    {/* Image */}
                                                    <div className="aspect-[4/3] overflow-hidden">
                                                        <img
                                                            src={element.imageUrl}
                                                            alt={`img-${index}`}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    </div>

                                                    {/* Gradient Overlay on Hover */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>



                                                    {/* Image Number Badge */}
                                                    <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                                                        #{index + 1}
                                                    </div>
                                                    <div className="absolute bottom-3 right-3 max-w-[85%] bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">

                                                        <span className=" line-clamp-1 overflow-hidden ">

                                                            {element.uploadedBy?._id === serviceDetails?.user?._id
                                                                ? "Service Provider"
                                                                : element.uploadedBy?._id === userDetails?._id
                                                                    ? " You"
                                                                    : " " + element.uploadedBy?.name || "Customer"}
                                                        </span>
                                                    </div>


                                                    {/* Delete Button */}
                                                    {(element.uploadedBy?._id === userDetails?._id || isOwner) && (
                                                        <button
                                                            disabled={imageDeleting}
                                                            className="absolute top-3 right-3 bg-red-600/80 hover:bg-red-700 text-white p-2 rounded-full shadow-lg opacity-100 transition-all duration-300"
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // prevent opening modal

                                                                handleDeleteImage(element.workPhotoId, element._id, element.publicId);

                                                            }}
                                                        >
                                                            <RiDeleteBin2Fill size={18} />
                                                        </button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* More Images  */}
                                        {visibleCount < AllPhotos.length && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="mt-8 text-center cursor-pointer"
                                                onClick={handleLoadMore}
                                            >
                                                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-300 to-indigo-400 text-gray-900 px-6 py-3 rounded-full font-serif font-semibold shadow-md border border-blue-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
                                                    <IoMdAddCircle size={25} />
                                                    <span>{AllPhotos.length - visibleCount} more images in collection</span>
                                                </div>
                                            </motion.div>
                                        )}

                                    </div>


                                </motion.div>
                                {/* Modal */}
                                {isModalOpen !== null && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
                                    >
                                        {/* Close Button */}
                                        <motion.button
                                            onClick={handleModalClose}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute top-6 right-6 md:top-8 md:right-8 w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center z-50 shadow-2xl transition-all duration-300"
                                        >
                                            <IoClose className="text-3xl" />
                                        </motion.button>

                                        {/* Container */}
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                                            className="relative w-[95vw] h-[95vh] max-w-[1800px] max-h-[1000px]"
                                        >

                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] p-4 md:p-6">
                                                {/* Inner Frame */}
                                                <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">

                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

                                                    {/* Image Display */}
                                                    <img
                                                        src={AllPhotos[isModalOpen].imageUrl}
                                                        alt="Full view"
                                                        className="w-full h-full object-cover"
                                                    />


                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
                                                </div>

                                                {/* Bottom Control Bar  */}
                                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 px-6 py-2 rounded-full shadow-lg">

                                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>

                                                    {/* Counter Display */}
                                                    <div className="font-mono text-white text-sm font-bold tracking-wider">
                                                        {String(isModalOpen + 1).padStart(2, '0')} / {String(AllPhotos.length).padStart(2, '0')}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1/3 h-2 bg-gradient-to-r from-red-600 via-blue-800 to-transparent blur-xl"></div>
                                        </motion.div>

                                        {/* Control Buttons */}
                                        <motion.button

                                            whileTap={{ scale: 0.9 }}
                                            className="absolute left-6 md:left-12 top-[45%]  w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-600 hover:to-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-2 border-gray-700 hover:border-blue-500"
                                            onClick={() =>
                                                setIsModalOpen((prev) => (prev > 0 ? prev - 1 : AllPhotos.length - 1))
                                            }
                                        >
                                            <GrCaretPrevious className="text-3xl" />
                                            {/* Button Highlight */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full pointer-events-none"></div>
                                        </motion.button>

                                        <motion.button

                                            whileTap={{ scale: 0.9 }}
                                            className="absolute right-6 md:right-12 top-[45%]  w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-600 hover:to-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-2 border-gray-700 hover:border-blue-500"
                                            onClick={() =>
                                                setIsModalOpen((prev) => (prev < AllPhotos.length - 1 ? prev + 1 : 0))
                                            }
                                        >
                                            <GrCaretNext className="text-3xl" />
                                            {/* Button Highlight */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full pointer-events-none"></div>
                                        </motion.button>

                                        {/* Keyboard Navigation Hints */}
                                        <div className="absolute bottom-8 left-10 bg-gray-900/90 backdrop-blur-md text-gray-300 px-5 py-3 rounded-xl text-sm font-mono border border-gray-700 hidden md:block">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <kbd className="px-3 py-1.5 bg-gray-800 border border-gray-600 rounded shadow-inner text-xs"><FaLongArrowAltLeft size={10} /></kbd>
                                                    <kbd className="px-3 py-1.5 bg-gray-800 border border-gray-600 rounded shadow-inner text-xs"><FaLongArrowAltRight size={10} /></kbd>
                                                </div>
                                                <span className="text-gray-500">|</span>
                                                <kbd className="px-3 py-1.5 bg-gray-800 border border-gray-600 rounded shadow-inner text-xs">ESC</kbd>
                                            </div>
                                        </div>
                                        {/*Uploaded by  */}
                                        <div
                                            className="absolute top-8 left-4 md:top-auto md:bottom-8 md:right-10 md:left-auto   max-w-[220px] max-h-[70px]  bg-gray-900/90 backdrop-blur-md text-gray-300  px-4 py-3 
    rounded-xl  text-sm  font-mono  border  border-gray-700   
  "
                                        >
                                            <div className="flex items-center  gap-1 flex-wrap leading-snug ">
                                                <span className="font-semibold">Uploaded by:</span>

                                                <span className="break-words line-clamp-1 overflow-hidden">
                                                    {AllPhotos[isModalOpen].uploadedBy?._id === serviceDetails?.user?._id
                                                        ? " Service Provider"
                                                        : AllPhotos[isModalOpen].uploadedBy?._id === userDetails?._id
                                                            ? "You"
                                                            : AllPhotos[isModalOpen].uploadedBy?.name || "Customer"}
                                                </span>
                                            </div>
                                        </div>

                                    </motion.div>
                                )}

                            </>
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
                                submessage2={`Service Type: ${serviceDetails?.serviceType}`}
                                closeButton={handlePopupWarningClose}
                                handleRemove={handleServiceRemove}
                                isLoading={isRLoading}
                            />
                        </div>
                    )}

                </>)}
            </div>


            {isLoading ? <>
                <div className="w-full md:px-6 px-4 md:py-6 py-2 mb-6">
                    <div className="xl:max-w-6xl max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
                        {/* Reviews Header */}
                        <div className="mb-6 md:mb-0 text-center md:text-left">
                            <div className="h-10 bg-gray-300 rounded w-48 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-64 mb-4"></div>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="h-8 bg-gray-300 rounded w-12"></div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Add Review Button */}
                        <div className="bg-gray-300 p-4 rounded-lg max-w-md">
                            <div className="h-6 bg-gray-400 rounded w-48 mb-2"></div>
                            <div className="h-4 bg-gray-400 rounded w-40 mb-2"></div>
                            <div className="h-10 bg-gray-400 rounded w-32 mx-auto"></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                    <div className="h-8 bg-gray-300 rounded-full w-24"></div>
                    <div className="h-8 bg-gray-300 rounded-full w-20"></div>
                </div>
                {/* Review Form */}
                <div className="w-full px-6 pt-4 border-t border-gray-200">
                    <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 py-8">
                        <div className="text-center mb-2">
                            <div className="h-8 bg-gray-300 rounded w-64 mb-2"></div>
                            <div className="h-1 bg-gray-300 rounded w-20 mx-auto"></div>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex flex-col items-center gap-2 w-full">
                            <div className="h-5 bg-gray-300 rounded w-48 mb-2"></div>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-7 h-7 bg-gray-300 rounded"></div>
                                ))}
                            </div>
                        </div>

                        {/* Review Textarea */}
                        <div className="w-full flex flex-col items-center gap-2">
                            <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                            <div className="w-full h-[150px] bg-gray-300 rounded-lg"></div>
                            <div className="w-full flex justify-between items-center px-2">
                                <div className="h-4 bg-gray-300 rounded w-16"></div>
                                <div className="h-10 bg-gray-300 rounded-xl w-32"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
                :

                <ReviewSection userDetails={userDetails} serviceDetails={serviceDetails} onReviewSubmitted={setHasGivenReview} />
            }

            {
                !isLoading &&

                <motion.div
                    ref={viewBusinessDetails}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full flex flex-col items-center  pt-6 px-4 md:px-10  rounded-2xl "
                >

                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl font-serif font-bold text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 bg-clip-text mb-2"
                    >
                        Business Details
                    </motion.h2>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="h-1 max-w-xs mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mb-4"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-600 text-center font-normal  font-serif text-base max-w-xl"
                    >Details of the service provider’s business.

                    </motion.p>
                </motion.div>

            }

            <BusinessDetails
                BusiDetails={serviceDetails?.bussiness}
                serviceHeader={"Service Provider  "}
                LogedInUser={userDetails}
                OwnerDetails={serviceDetails?.user}//add owner

                handlePaymentInitiation={handlePaymentInitiation}

                showImageModal={showImageModal}
                setShowImageModal={setShowImageModal}
                handleBookingInitiation={handleBookingInitiation}

                isLoading={isLoading}

                currentServiceId={serviceDetails?._id}

            />







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
                {showSeekerModal && (
                    <SeekerDetailsModal
                        userDetails={userDetails}
                        showSeekerModal={showSeekerModal}
                        setShowSeekerModal={setShowSeekerModal}
                        openPaymentModal={setShowPaymentModal}
                        setSeekerData={setSeekerData}
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
                        basePackage={serviceDetails?.minPrice}
                        premiumPackage={serviceDetails?.maxPrice}
                        price={price}
                        setPrice={setPrice}
                        verifyPaymentAndSubmit={verifyPaymentAndSubmit}
                        upiID={upiID}
                        upiName={upiName}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default ServiceDetail