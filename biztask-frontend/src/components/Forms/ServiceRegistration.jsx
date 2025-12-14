import React, { useEffect, useRef, useState } from 'react'
import { FaSave, FaBuilding, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { MdDelete, MdDescription, MdOutlineAttachMoney, MdOutlineLocationCity, MdOutlineFeaturedPlayList } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddedBox from "./AddedBox";
import { API_BASE_URL } from "../../configApi/ConfigApi";
import { serviceRegister, updateService, getServiceById } from "../../Redux/ServiceR/Action.js";
import { toast } from "react-toastify";
import { getBusinessById } from "../../Redux/Business/Action.js";
import dummyPhoto from "../../assets/uploadPhoto.jpg";
import { IoArrowBack } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";
import { BiCategoryAlt } from "react-icons/bi";
import { RiPriceTag3Line } from "react-icons/ri";
import { TbMapPin } from "react-icons/tb";
import { GoChecklist } from "react-icons/go";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdPersonAddAlt } from "react-icons/md";
import { motion } from 'framer-motion';
import { ImCancelCircle } from "react-icons/im";

const ServiceRegistration = ({ userDetails, registration }) => {
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const [formData, setFormData] = useState({
        serviceType: "",
        Description: "",
        minPrice: "",
        maxPrice: ""
    });

    const { id } = useParams();
    const dispatch = useDispatch();
    const businessStore = useSelector(store => store.businessStore);

    // Handle location
    const [location, setLocation] = useState('');
    const [locationArray, setLocationArray] = useState([]);

    const handleLocationAdd = () => {
        if (location.trim() !== "") {
            const isExists = locationArray.some(l => l.toLowerCase() === location.toLowerCase());
            if (!isExists) {
                setLocationArray([...locationArray, location]);
            }
            setLocation('');
        }
    }

    const handleLocationRemove = (indexRemove) => {
        const newLocation = locationArray.filter((_, ind) => ind !== indexRemove);
        setLocationArray(newLocation);
    }

    // Handle feature
    const [featureInput, setFeatureInput] = useState('');
    const [featureArray, setFeatureArray] = useState([]);

    const handleFeatureAdd = () => {
        if (featureInput.trim() !== "") {
            const isExists = featureArray.some(l => l.toLowerCase() === featureInput.toLowerCase());
            if (!isExists) {
                setFeatureArray([...featureArray, featureInput]);
            }
            setFeatureInput('');
        }
    }

    const handleFeatureRemove = (indexRemove) => {
        const newFeature = featureArray.filter((_, ind) => ind !== indexRemove);
        setFeatureArray(newFeature);
    }

    // Form data handle
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

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


    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();


        const minPriceValue = Number(formData.minPrice);
        const maxPriceValue = Number(formData.maxPrice);

        if (isNaN(minPriceValue) || isNaN(maxPriceValue)) {
            toast.error('Invalid price values');
            return;
        }
        if (minPriceValue < 0 || maxPriceValue < 0) {
            toast.error('Prices cannot be negative');
            return;
        }
        if (minPriceValue >= maxPriceValue) {
            toast.error('Minimum price must be less than Maximum price');
            return;
        }

        if (formData.serviceType.trim() === "") {
            toast.error('Service type is required');
            return;
        }
        if (!/^[A-Za-z\s]+$/.test(formData.serviceType)) {
            toast.error('Service type must only contain alphabets and spaces');
            return;
        }

        if (formData.Description.trim() === "") {
            toast.error('Description is required');
            return;
        }


        const words = formData.Description.trim().split(/\s+/);
        const wordCount = words.filter(word => word).length;

        if (wordCount < 100) {
            toast.error('Description cannot be smaller than 100 words');
            return;
        }
        if (wordCount > 500) {
            toast.error('Description cannot be longer than 500 words');
            return;
        }


        if (!locationArray || locationArray.length === 0) {
            toast.error('Location is required');
            return;
        }
        if (!featureArray || featureArray.length === 0) {
            toast.error('Feature is required');
            return;
        }

        const formD = new FormData();
        formD.append("serviceType", formData.serviceType);
        formD.append("Description", formData.Description);
        formD.append("minPrice", minPriceValue);
        formD.append("maxPrice", maxPriceValue);
        formD.append("locations", JSON.stringify(locationArray));
        formD.append("features", JSON.stringify(featureArray));

        try {
            setIsButtonDisabled(true);

            let result;
            if (registration === true) {
                formD.append("businessId", businessStore.business?._id);
                result = await dispatch(serviceRegister(formD, jwt));
            } else {
                result = await dispatch(updateService(jwt, formD, id)); // service id
            }

            if (result?.success) {
                toast.success(result.message || "Operation successful!");
                setFormData({
                    serviceType: "",
                    Description: "",
                    minPrice: "",
                    maxPrice: ""
                });
                setFeatureArray([]);
                setLocationArray([]);

                if (registration) {
                    navigate(`/service-detail/${result.id}`);
                } else {
                    navigate(`/service-detail/${serviceStore.service?._id}`);
                }
            } else {
                toast.error(result?.message || "Something went wrong!");
            }

        } catch (error) {
            toast.error("Unexpected error occurred");
        } finally {
            setIsButtonDisabled(false);
        }

    }

    useEffect(() => {
        if (registration === false && id) {
            dispatch(getServiceById(id));
        } else {
            dispatch(getBusinessById(id));
        }
    }, [id, registration, dispatch]);

    const serviceStore = useSelector(store => store.serviceStore);

 
    // While updating
    useEffect(() => {
        if (registration === false && serviceStore.service && serviceStore.service._id === id) {
            setFormData({
                serviceType: serviceStore.service?.serviceType,
                Description: serviceStore.service?.Description,
                minPrice: serviceStore.service?.minPrice,
                maxPrice: serviceStore.service?.maxPrice
            });

            setLocationArray([...serviceStore.service?.locations || []]);
            setFeatureArray([...serviceStore.service?.features || []]);
        }
    }, [serviceStore.service, registration, id]);


    return (
        <div className={`min-h-screen bg-white py-8 px-2 sm:px-6 lg:px-12 font-serif `}>
            <div className="max-w-5xl mx-auto">


                <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10 border border-teal-100">
                    {/* Header */}


                    <motion.div
                        className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 sm:px-8 py-8 sm:py-10 overflow-hidden"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10 text-center">

                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2"> {registration ? "Register Your  Service" : "Update Your Service"}</h2>
                            <p className="text-blue-100 text-sm sm:text-base">Connect with your community by offering your specialized services</p>
                        </div>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="sm:p-6 p-4 lg:p-8">
                        {/* Service Type and Company Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="flex items-center text-slate-600 font-medium font-serif">
                                    <BiCategoryAlt className=" mr-2 text-xl" />
                                    Service Type
                                </label>
                                <div className="relative">
                                    <input
                                        disabled={isButtonDisabled}
                                        type="text"
                                        name="serviceType"
                                        value={formData.serviceType}
                                        onChange={handleChange}
                                        placeholder="Cleaning, Event decoration etc."
                                        className={`w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                            }`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-slate-600 font-medium font-serif">
                                    <FaBuilding className=" mr-2 text-xl" />
                                    Company Name
                                </label>
                                <input

                                    type="text"
                                    value={(businessStore.business?.companyName ? businessStore.business?.companyName : serviceStore.service?.bussiness?.companyName) || ""}
                                    className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg bg-gray-50 cursor-not-allowed shadow-sm"
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Section: Contact Details */}
                        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl sm:p-6 p-4 mb-8 border border-teal-100 shadow-sm">

                            <h2 className="text-xl sm:text-2xl font-bold text-gray-600 mb-6 font-serif flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                                    <FaUser className="text-white text-lg" />
                                </div>
                                Contact Details (Provider)
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center text-slate-500 font-medium font-serif">
                                        <MdPersonAddAlt className="text-slate-600 mr-2" />
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={userDetails?.name || ""}
                                        className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg bg-white/80 cursor-not-allowed shadow-sm"
                                        disabled
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center text-slate-500 font-medium font-serif">
                                        <FaPhone className="text-slate-600 mr-2" />
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={userDetails?.mobileNumber || ""}
                                        className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg bg-white/80 cursor-not-allowed shadow-sm"
                                        disabled
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center text-slate-500 font-medium font-serif">
                                        <FaEnvelope className="text-slate-600 mr-2" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={userDetails?.email || ""}
                                        className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg bg-white/80 cursor-not-allowed shadow-sm"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Service Details */}
                        <div className="bg-white rounded-xl sm:p-6 p-4 mb-8 border border-teal-200 shadow-md">

                            <h2 className="text-xl sm:text-2xl font-bold text-gray-600 mb-6 font-serif flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                    <MdDescription className="text-white text-lg" />
                                </div>
                                Service Details
                            </h2>


                            <div className="space-y-6">
                                <div>
                                    <label className="flex items-center text-slate-500 font-medium font-serif mb-2">

                                        Description
                                    </label>
                                    <textarea
                                        disabled={isButtonDisabled}
                                        name="Description"
                                        id="DescriptionBox"
                                        value={formData.Description}
                                        onChange={handleChange}
                                        placeholder="Tell potential customers about your service expertise, quality guarantees, and what makes your service special... "
                                        className={`w-full h-60 px-4 py-3 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-inner ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                            }`}
                                        style={{ resize: 'none' }}
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center text-slate-500 font-medium font-serif mb-2">
                                            <RiPriceTag3Line className="text-slate-600 mr-2 text-xl" />
                                            Min Price
                                        </label>
                                        <input
                                            disabled={isButtonDisabled}
                                            type="text"
                                            name="minPrice"
                                            value={formData.minPrice}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder="Enter service Starting Price"
                                            className={`w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                                }`}
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center text-slate-500 font-medium font-serif mb-2">
                                            <FaIndianRupeeSign className="text-slate-600 mr-2 text-xl" />
                                            Max Price
                                        </label>
                                        <input
                                            disabled={isButtonDisabled}
                                            type="text"
                                            name="maxPrice"
                                            value={formData.maxPrice}
                                            required={true}
                                            onChange={handleChange}
                                            placeholder="Enter ending price of service"
                                            className={`w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                                }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section: Locations */}
                        <div className="bg-white rounded-xl sm:p-6 p-4 mb-8 border border-teal-200 shadow-md">

                            <h2 className="text-xl sm:text-2xl font-bold text-gray-600 mb-6 font-serif flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                    <TbMapPin className="text-white text-lg" />
                                </div>
                                Service Locations
                            </h2>

                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                <div className="flex-grow">
                                    <div className="relative">
                                        <input
                                            disabled={isButtonDisabled}
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="Enter neighborhood, area or city you serve"
                                            className={`w-full h-12 pl-10 pr-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                                }`}
                                        />
                                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600" />
                                    </div>
                                </div>

                                <button
                                    disabled={isButtonDisabled}
                                    type="button"
                                    onClick={handleLocationAdd}
                                    className={`flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-teal-600 hover:to-teal-700 text-white h-12 px-6 rounded-lg transition-colors duration-200 shadow-md ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <HiPlus className="mr-2" />
                                    <span className="font-serif">Add Location</span>
                                </button>
                            </div>

                            {locationArray.length > 0 && (
                                <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg shadow-inner">
                                    <h3 className="text-sm text-slate-500 mb-3 font-serif flex items-center">
                                        <FaCheckCircle className="text-teal-500 mr-2" />
                                        Areas You Serve:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {locationArray.map((l, index) => (
                                            <AddedBox key={index} Index={index} Name={l} handleRemove={handleLocationRemove} isButtonDisabled={isButtonDisabled} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Section: Features */}
                        <div className="bg-white rounded-xl sm:p-6 p-4 mb-8 border border-teal-200 shadow-md">

                            <h2 className="text-xl sm:text-2xl font-bold text-gray-600 mb-6 font-serif flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                    <GoChecklist className="text-white text-lg" />
                                </div>
                                Service Features
                            </h2>

                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                <div className="flex-grow">
                                    <div className="relative">
                                        <input
                                            disabled={isButtonDisabled}
                                            type="text"
                                            value={featureInput}
                                            onChange={(e) => setFeatureInput(e.target.value)}
                                            placeholder="Add key service benefits or special features"
                                            className={`w-full h-12 pl-10 pr-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                                }`}
                                        />
                                        <MdOutlineFeaturedPlayList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600" />
                                    </div>
                                </div>

                                <button
                                    disabled={isButtonDisabled}
                                    type="button"
                                    onClick={handleFeatureAdd}
                                    className={`flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-teal-600 hover:to-teal-700 text-white h-12 px-6 rounded-lg transition-colors duration-200 shadow-md ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <HiPlus className="mr-2" />
                                    <span className="font-serif">Add Feature</span>
                                </button>
                            </div>

                            {featureArray.length > 0 && (
                                <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg shadow-inner">
                                    <h3 className="text-sm text-slate-500 mb-3 font-serif flex items-center">
                                        <FaCheckCircle className="text-teal-500 mr-2" />
                                        Your Service Features:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {featureArray.map((l, index) => (
                                            <AddedBox key={index} Index={index} Name={l} handleRemove={handleFeatureRemove} isButtonDisabled={isButtonDisabled} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Company Logo */}

                        <motion.div
                            className="mb-8 sm:mb-10"
                            variants={itemVariants}
                        >
                            <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-md">

                                <h2 className="text-xl sm:text-2xl font-bold text-gray-600 mb-6 font-serif flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                        <FaBuilding className="text-white text-lg" />
                                    </div>
                                    Company Branding
                                </h2>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 p-6 rounded-2xl ">

                                    {/* Company Logo */}
                                    <div className="text-center">

                                        <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-2xl overflow-hidden ring-4 ring-teal-200 shadow-lg">
                                            <img
                                                src={businessStore?.business?.companyLogo?.imageUrl ? businessStore?.business?.companyLogo?.imageUrl : serviceStore.service?.bussiness?.companyLogo?.imageUrl || dummyPhoto}
                                                alt="Company Logo"
                                                className="w-full h-full object-scale-down"
                                            />
                                        </div>

                                    </div>


                                    <div className="text-center sm:text-left space-y-2  text-slate-500 font-serif">
                                        <p className="text-base ">
                                            This is your company logo displayed to local customers.
                                        </p>
                                        <p className="text-sm  text-red-600 flex items-center ">

                                            To update your logo, please edit your business profile.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </motion.div>


                        <motion.div
                            variants={itemVariants}
                            className="pt-6 flex flex-col sm:flex-row justify-center  gap-4 sm:gap-6 w-full">


                            <button
                                type="button"
                                disabled={isButtonDisabled}
                                onClick={() => navigate(-1)}
                                className={`flex-1 px-6 py-3.5 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 border-2 border-red-300 hover:border-red-400 rounded-xl font-bold text-base transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isButtonDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                                <ImCancelCircle className="text-lg" />
                                <span>Cancel</span>
                            </button>

                            <button
                                type="submit"
                                disabled={isButtonDisabled}
                                className={`flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${isButtonDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                                {isButtonDisabled ? (
                                    <>
                                        <span className="animate-spin border-3 border-white border-t-transparent rounded-full w-5 h-5"></span>
                                        <span>Wait...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="text-lg" />
                                        {registration ? "Launch Service" : "Update Service"}
                                    </>
                                )}
                            </button>
                        </motion.div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default ServiceRegistration;