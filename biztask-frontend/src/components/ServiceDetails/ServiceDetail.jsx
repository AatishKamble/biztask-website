import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserSecret } from "react-icons/fa";

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

import { addReview, getAllReviews } from "../../Redux/Review/Action.js";
import Star from "../Reviews/Star.jsx";
import PopUp from "../PopUp/PopUp.jsx";
import DetailLoader from "../Loader/DetailLoader.jsx";
import { toast } from "react-toastify";
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


    //upload image submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        // new Chnage
        if (files.length === 0) {
            toast.error('Please upload at least one image.');
            return;}
        for (let file of files) {
            formData.append("previousImages", file);
        }

        formData.append("serviceId", serviceDetails._id);
        dispatch(uploadImage(formData, jwt));
        setFiles([]);
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

        if(input.trim()===""){
                toast.error('Please enter at least one character.');
                return;
        }
        if(currentValue===0){
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


    const [uploadButtonHover, setUploadButtonHover] = useState(false);

    const isLoading = useSelector(store => store.serviceStore.isLoading);

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
                            <span className=' font-normal px-2'>{serviceDetails?.bussiness?.companyName}
                            </span>

                        </div>
                        <div className='w-full px-2 pb-5 flex justify-start items-center  text-[16px] text-blue-950 font-serif'>
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

                                <button className='bg-[#94b6b5]  rounded-md p-2 me-2   hover:bg-[#79bdba] w-auto h-auto text-slate-600 font-serif font-bold text-[16px]' onClick={() => scrollToSection(postedJobs)}> View posted Job</button>

                                <Link to={`/service-update/${serviceDetails?._id}`}>
                                    <button className='bg-[#69a5b6]  rounded-md p-[7px]  hover:bg-[#4492a7] w-auto h-auto text-slate-600  font-serif font-bold text-[16px]' >Update</button>
                                </Link>

                                <button className='bg-[#d28d8d]  rounded-md p-2 ms-2  hover:bg-[#996767]   w-auto h-auto text-slate-600  font-serif font-bold text-[16px]' onClick={handlePopupWarningOpen}>Remove</button>
                            </div>

                        }
                    </div>

                </div>

                <div className="2xl:w-[90%] sm:w-full h-auto drop-shadow-lg my-10 mt-5 flex flex-col xl:flex-row gap-10 px-6 sm:px-2">

  {/* Left Section */}
  <div className="flex flex-col  xl:w-2/3 gap-6">
    
    {/* Description Section */}
    <div className="bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl p-6 shadow-lg">
      <div className="w-full flex items-center text-[24px] text-blue-900 font-serif font-semibold pb-3 border-b-2 border-blue-500">
        <MdOutlineDescription className="mr-2" /> Description
      </div>
      <p  className='flex h-auto text-justify  p-4 justify-between  py-2 text-slate-900 font-serif  text-[16px]'>
                            
        {serviceDetails?.Description}
      </p>
    </div>

    {/* Features Section */}
    <div className="bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl p-6 shadow-lg">
      <div className="w-full flex items-center text-[24px] text-blue-900 font-serif font-semibold pb-3 border-b-2 border-blue-500">
        Features
      </div>
      <ul className='flex flex-col h-auto  p-4 justify-between  py-2 text-slate-900 font-serif font-medium text-[16px]'>


        {serviceDetails?.features?.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-blue-600  mr-2">{idx + 1}.</span> {feature}
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Right Section */}
  <div className="w-full flex  min-w-[30%] max-w-[40%] flex-col gap-6">
    
    {/* Contact Details */}
    <div className="bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl p-6 shadow-lg flex flex-col sm:flex-row items-center sm:items-start">
      
      {/* Contact Info */}
      <div className="flex-1 px-4 space-y-3">
        <div className="text-[24px] text-blue-900 font-serif font-semibold pb-3">Contact Details</div>

        {/* Name */}
        <div className="flex flex-wrap items-center text-[18px] text-slate-800 font-serif ">
                                    <span className="px-2 text-blue-700 font-medium ">
                                        <FaUserSecret />
                                    </span>
                                    <span className=" break-words font-medium">
                                        {serviceDetails?.user?.name}
                                    </span>
                                </div>
        {/* Phone */}
        <div className="flex flex-wrap items-center text-[18px] text-slate-800 " style={{ fontFamily: 'sans-serif' }}>
                                    <span className="px-2 font-medium flex text-blue-700 items-center">
                                        <FaPhone />
                                    </span>
                                    <span className=" break-words  font-medium ">
                                        {serviceDetails?.user?.mobileNumber}
                                    </span>
                                </div>

        {/* Email */}
        <div className="flex  items-center text-[18px] text-slate-800 font-serif  font-medium">
                                    <span className="px-2 text-blue-700 font-medium flex items-center">
                                        <MdEmail />
                                    </span>
                                    <span className=" flex flex-wrap  font-medium break-words">
                                        {serviceDetails?.user?.email}
                                    </span>
                                </div>
                            </div>


      {/* Profile Image */}
      <div className="w-[160px] h-[180px] rounded-xl overflow-hidden shadow-md border-2 border-blue-300">
        <img
          src={serviceDetails?.user?.profileImage?.ImageUrl}
          alt="Owner Photo"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>

    {/* Pricing Details */}
    <div className="bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl p-6 shadow-lg">
      <div className="text-[24px] text-blue-900 font-serif font-semibold pb-3 border-b-2 border-blue-500">
        Pricing Details
      </div>

      <div className="flex mt-6 items-center text-[18px] font-serif">
                                    <span className="px-2 font-semibold font-serif">Min Price:</span>
                                    <span className="px-2  flex items-center">
                                        <MdOutlineCurrencyRupee className=" text-blue-700  " /> {serviceDetails?.minPrice}
                                    </span>
                                </div>

                                {/* Max Price Row */}
                                <div className="flex items-center text-[18px]  font-serif w-full">
                                    <span className="px-2 font-semibold font-serif">Max Price:</span>
                                    <span className="px-2  flex items-center">
                                        <MdOutlineCurrencyRupee className=" text-blue-700 " /> {serviceDetails?.maxPrice}
                                    </span>
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


                <div className="pt-16 border-b-[1px] border-dashed border-slate-500 w-full flex justify-center">
                    <span className=' text-blue-950 font-serif font-semibold text-[30px]  my-4'>Previous Work</span>

                </div>
                <div className=' w-full h-auto relative    my-10 mt-6 flex flex-col px-5'>

                    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                        <div className="flex items-center justify-center py-5 mb-5 space-x-4">
                            <input
                                type="file"
                                multiple
                                onChange={handleWorkPicChange}
                                className="w-64 p-3 bg-slate-100 border border-gray-300 rounded-md text-gray-800 font-serif  focus:outline-none focus:ring-2 "
                            />
                            <div className="w-[20%] flex">
                                <button type="submit" className=' text-blue-950 font-serif font-semibold text-[30px]  ps-10 cursor-pointer'  ><IoCloudUploadSharp onMouseEnter={() => setUploadButtonHover(!uploadButtonHover)} onMouseLeave={() => setUploadButtonHover(!uploadButtonHover)} /></button>
                                {
                                    uploadButtonHover && <div className="bg-white border-black border px-4 rounded-xl rounded-bl-none  text-[16px] h-10 flex items-center justify-center w-[80px] ms-2  font-serif">
                                        upload
                                    </div>

                                }</div>
                        </div>
                    </form>


                    {

                        files.length > 0 && (
                            <div className={`w-full bg-slate-100 z-10 mb-5 h-auto relative grid grid-cols-4 gap-10 p-10 transition-all duration-300 `}>

                                {
                                    files.map((element, idx) => {
                                        return (
                                            <div key={idx} className=" bg-slate-400 h-[200px] border-2 border-slate-600" >
                                                <img src={URL.createObjectURL(element)} alt="picture" className=" bg-cover w-full h-full" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )

                    }





                        
                    {
                    
                       AllPhotos.length == 0 ?
                            <div className="w-full  flex items-center justify-center">
                                <span className="text-[35px]  text-[#b0d0d2]  font-bold">
                                    No Images Available
                                </span></div> :


                            <div className={`${isModalOpen !== null ? "h-[700px]" : "h-auto"} w-full bg-white  border-y border-slate-500 rounded-xl   relative grid grid-cols-4 gap-10 p-10 transition-all duration-300`}>


                                {

                                    AllPhotos.map((element, index) => {
                                        return (
                                            <>
                                                <div key={index} className=" bg-slate-400 h-[200px] border-2 border-slate-600 cursor-pointer" onClick={() => handleModalOpen(index)} >
                                                    <img src={`${element.imageUrl}`} alt="picture" className=" bg-cover w-full h-full" />
                                                </div>
                                                {
                                                    isModalOpen == index &&

                                                    <div className='w-full z-50 h-[600px] absolute top-10  border-2 border-[#203337]  bg-slate-400'>

                                                        <button className="absolute right-3 top-2 text-[#becbc7] text-[30px] hover:text-slate-700" onClick={handleModalClose}>
                                                            <IoClose size={40} />
                                                        </button>
                                                        <img src={`${element.imageUrl}`} alt="image" className="bg-cover w-full h-full" />





                                                    </div>

                                                }
                                            </>
                                        )
                                    })
                                }





                            </div>

                    }
                </div>


                {popupwarning && (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40'></div>
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
               <div className='w-full h-auto relative my-10 flex flex-col px-5 bg-gray-50 rounded-xl py-8'>
    <div className='w-full flex flex-col md:flex-row justify-center items-center gap-4 py-5'>
    <span className='text-blue-950 font-serif font-semibold text-[32px] border-b-2 border-blue-800 pb-1'>Reviews</span>
       <button onClick={() => handleSubmitReview()}
       className='flex items-center justify-center h-[40px] text-white font-serif font-semibold text-[18px] w-[140px] px-5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-md hover:from-blue-700 hover:to-blue-900 transition-all duration-300'>
       
                            <span className="px-2"><IoIosAddCircle /> </span>
                            <span className="ml-2">Add</span>
                        </button>

                        <div className="flex gap-1">

                            {stars.map((_, index) => {
                                return (
                                    <FaStar key={index} size={24}
                                        style={{ marginRight: 10, cursor: "pointer" }}
                                        className={`${(hoverValue || currentValue) > index ? 'text-yellow-500 drop-shadow-md' : "text-gray-400"} transition-all duration-200`}
                                        onClick={() => handleClick(index + 1)}
                                        onMouseOver={() => handleMouseHover(index + 1)}
                                        onMouseLeave={() => handleMouseLeave(index + 1)}
                                    />
                                )
                            })}
                        </div>

                    </div>

                    <div className="w-full flex justify-center flex-col items-center">
                        <textarea name="review" id="review"
                           placeholder="Share your experience with the service provider..."
                           className='text-[16px] h-[180px] text-gray-700 font-serif outline-none p-4 w-[90%] md:w-[700px] border border-gray-400 bg-white rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 transition-all duration-200'
                          
                           rows={5} 
                           style={{ resize: 'none' }}
                           value={input}
                            onChange={handleInputChange}
                        ></textarea>

<p className="font-serif text-gray-500 mt-2">{wordCount} / 20 words</p>
                    </div>
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

                </div>


            }
        </>
    )
}

export default ServiceDetail