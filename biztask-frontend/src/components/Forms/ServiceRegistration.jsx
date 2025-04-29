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

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    // Form submission
    const handleSubmit = (e) => {
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

        if (wordCount < 100 ) {
            toast.error('Description cannot be smaller than 100 words');
            return;
        }
        if (wordCount > 500 ) {
            toast.error('Description cannot be longer than 500 words');
            return;
        }


        if (formData.minPrice.trim() === "") {
            toast.error('Minimum price is required');
            return;
        }
        if (formData.maxPrice.trim() === "") {
            toast.error('Maximum price is required');
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

        if (registration === true) {
            setIsButtonDisabled(true);
            formD.append("businessId", businessStore.business?._id);
            dispatch(serviceRegister(formD, jwt));
            setTimeout(()=>{
                toast.success("Registered successfully ! want to add more.");
                setIsButtonDisabled(false)
        setFormData({
            serviceType: "",
            Description: "",
            minPrice: "",
            maxPrice: ""
        });
        setFeatureArray([]);
        setLocationArray([]);
               },2000);
            
        } else {
            setIsButtonDisabled(true);
            dispatch(updateService(jwt, formD, id)); // service id
             setTimeout(()=>{
                
                setIsButtonDisabled(false)
                navigate(`/service-detail/${serviceStore.service?._id}`);
            
        setFormData({
            serviceType: "",
            Description: "",
            minPrice: "",
            maxPrice: ""
        });
        setFeatureArray([]);
        setLocationArray([]);
               },2000);
           
      
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
        <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-12">
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
                            {registration ? "Create Your Local Service" : "Update Your Service"}
                        </h1>
                        <p className="text-teal-100 text-center mt-2 font-serif">Connect with your community by offering your specialized services</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 lg:p-8">
                        {/* Service Type and Company Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="flex items-center text-teal-800 font-medium font-serif">
                                    <BiCategoryAlt className="text-teal-600 mr-2 text-xl" />
                                    Service Type
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="serviceType"
                                        value={formData.serviceType}
                                        onChange={handleChange}
                                        placeholder="Cleaning, Event decoration etc."
                                        className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-teal-800 font-medium font-serif">
                                    <FaBuilding className="text-teal-600 mr-2 text-xl" />
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={businessStore.business?.companyName}
                                    className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg bg-gray-50 cursor-not-allowed shadow-sm"
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Section: Contact Details */}
                        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 mb-8 border border-teal-100 shadow-sm">
                            <h2 className="text-xl text-teal-800 font-medium font-serif mb-4 flex items-center">
                                <FaUser className="mr-2 text-teal-700" />
                                Contact Details (Provider)
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center text-teal-700 font-medium font-serif">
                                        <MdPersonAddAlt className="text-teal-600 mr-2" />
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
                                    <label className="flex items-center text-teal-700 font-medium font-serif">
                                        <FaPhone className="text-teal-600 mr-2" />
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
                                    <label className="flex items-center text-teal-700 font-medium font-serif">
                                        <FaEnvelope className="text-teal-600 mr-2" />
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
                        <div className="bg-white rounded-xl p-6 mb-8 border border-teal-200 shadow-md">
                            <h2 className="text-xl text-teal-800 font-medium font-serif mb-6 flex items-center">
                                <MdDescription className="mr-2 text-teal-700" />
                                Service Details
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="flex items-center text-teal-700 font-medium font-serif mb-2">

                                        Description
                                    </label>
                                    <textarea
                                        name="Description"
                                        id="DescriptionBox"
                                        value={formData.Description}
                                        onChange={handleChange}
                                        placeholder="Tell potential customers about your service expertise, quality guarantees, and what makes your service special... "
                                        className="w-full h-60 px-4 py-3 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-inner"
                                        style={{ resize: 'none' }}
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center text-teal-700 font-medium font-serif mb-2">
                                            <RiPriceTag3Line className="text-teal-600 mr-2 text-xl" />
                                            Min Price
                                        </label>
                                        <input
                                            type="text"
                                            name="minPrice"
                                            value={formData.minPrice}
                                            onChange={handleChange}
                                            placeholder="Enter service Starting Price"
                                            className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center text-teal-700 font-medium font-serif mb-2">
                                            <FaIndianRupeeSign className="text-teal-600 mr-2 text-xl" />
                                            Max Price
                                        </label>
                                        <input
                                            type="text"
                                            name="maxPrice"
                                            value={formData.maxPrice}
                                            onChange={handleChange}
                                            placeholder="Enter ending price of service"
                                            className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section: Locations */}
                        <div className="bg-white rounded-xl p-6 mb-8 border border-teal-200 shadow-md">
                            <h2 className="text-xl text-teal-800 font-medium font-serif mb-4 flex items-center">
                                <TbMapPin className="mr-2 text-teal-700 text-xl" />
                                Service Locations
                            </h2>

                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                <div className="flex-grow">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="Enter neighborhood, area or city you serve"
                                            className="w-full h-12 pl-10 pr-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                                        />
                                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600" />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLocationAdd}
                                    className="flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white h-12 px-6 rounded-lg transition-colors duration-200 shadow-md"
                                >
                                    <HiPlus className="mr-2" />
                                    <span className="font-serif">Add Location</span>
                                </button>
                            </div>

                            {locationArray.length > 0 && (
                                <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg shadow-inner">
                                    <h3 className="text-sm text-teal-700 mb-3 font-serif flex items-center">
                                        <FaCheckCircle className="text-teal-500 mr-2" />
                                        Areas You Serve:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {locationArray.map((l, index) => (
                                            <AddedBox key={index} Index={index} Name={l} handleRemove={handleLocationRemove} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Section: Features */}
                        <div className="bg-white rounded-xl p-6 mb-8 border border-teal-200 shadow-md">
                            <h2 className="text-xl text-teal-800 font-medium font-serif mb-4 flex items-center">
                                <GoChecklist className="mr-2 text-teal-700 text-xl" />
                                Service Features
                            </h2>

                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                <div className="flex-grow">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={featureInput}
                                            onChange={(e) => setFeatureInput(e.target.value)}
                                            placeholder="Add key service benefits or special features"
                                            className="w-full h-12 pl-10 pr-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                                        />
                                        <MdOutlineFeaturedPlayList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600" />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleFeatureAdd}
                                    className="flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white h-12 px-6 rounded-lg transition-colors duration-200 shadow-md"
                                >
                                    <HiPlus className="mr-2" />
                                    <span className="font-serif">Add Feature</span>
                                </button>
                            </div>

                            {featureArray.length > 0 && (
                                <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg shadow-inner">
                                    <h3 className="text-sm text-teal-700 mb-3 font-serif flex items-center">
                                        <FaCheckCircle className="text-teal-500 mr-2" />
                                        Your Service Features:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {featureArray.map((l, index) => (
                                            <AddedBox key={index} Index={index} Name={l} handleRemove={handleFeatureRemove} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Company Logo */}
                        <div className="bg-white rounded-xl p-6 mb-8 border border-teal-200 shadow-md">
                            <h2 className="text-xl text-teal-800 font-medium font-serif mb-4 flex items-center">
                                <FaBuilding className="mr-2 text-teal-700" />
                                Company Branding
                            </h2>

                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="w-36 h-36 rounded-xl overflow-hidden border-2 border-teal-100 shadow-lg">
                                    <img
                                        src={businessStore.business?.companyLogo ? `${businessStore.business?.companyLogo?.imageUrl}` : dummyPhoto}
                                        alt="Company Logo"
                                        className="w-full h-full object-scale-down"
                                    />
                                </div>
                                <div className="text-teal-700 font-serif">
                                    <p>This is your company logo displayed to local customers.</p>
                                    <p className="text-sm mt-2 text-teal-600">To update your logo, please edit your business profile.</p>
                                </div>
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
                                disabled={isButtonDisabled}
                                className={`bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-serif font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center ${
                                    isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                                  }`}  >
                                <FaSave className="mr-2" />
                                {registration ? "Launch My Service" : "Update My Service"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ServiceRegistration;