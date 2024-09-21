import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";

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

import { FaStar } from "react-icons/fa";

import { addReview, getAllReviews } from "../../Redux/Review/Action.js";
import Star from "../Reviews/Star.jsx";
import PopUp from "../PopUp/PopUp.jsx";
import DetailLoader from "../Loader/DetailLoader.jsx";
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
    }

    const handleMouseLeave = (value) => {
        setHoverValue(undefined);
    }


    const handleSubmitReview = () => {
        const formData = new FormData();
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
                    <div className="absolute w-full h-[100%] inset-0 flex items-center justify-center bg-[#ffffff]  opacity-100 z-10">

                        <DetailLoader />
                    </div>
                )}
                <div className=' 2xl:w-[90%] sm:w-full h-auto py-10 bg-slate-100  drop-shadow-lg  my-10 flex items-center px-10'>


                    <div className='w-full h-[180px] relative flex items-start flex-col justify-center px-10'>



                        <div className='w-full text-[30px] text-slate-800 font-serif py-2'>
                            <span className=' font-semibold px-2'>{serviceDetails?.serviceType}</span>

                        </div>

                        <div className='w-full text-[22px] text-slate-600 font-serif pb-2'>
                            <span className=' font-normal px-2'>{serviceDetails?.bussiness?.companyName}
                            </span>

                        </div>
                        <div className='w-full px-2 pb-5 flex justify-start items-center  text-[18px] text-blue-950 font-serif'>
                            <span>Ratings : </span>
                            <span className="text-[30px] font-serif font-normal px-2  text-yellow-400"><Star star={serviceDetails?.rating} /> </span>

                        </div>
                        <div className='w-[400px]  h-auto text-[20px] flex justify-start items-center text-blue-950 font-serif px-2 '>
                            <span><IoLocationSharp /></span>

                            {
                                serviceDetails?.locations?.map((location, idx) => (
                                    <span key={idx} className=' font-normal px-2 text-slate-900'>{location}</span>

                                ))

                            }

                        </div>


                    </div>

                    <div className="flex flex-col w-[600px] items-center justify-center">
                        <div className='w-[190px] h-[180px]   rounded-full m-5'>

                            <img src={`${serviceDetails?.bussiness?.companyLogo?.imageUrl}`} alt="profile picture" className='bg-cover w-full h-full rounded-full' />
                        </div>

                        {
                            userDetails?._id == serviceDetails?.user?._id &&

                            <div>

                                <button className='bg-[#94b6b5]  rounded-md p-2 me-2   hover:bg-[#79bdba] w-auto h-auto text-slate-600 font-sans font-bold text-[18px]' onClick={() => scrollToSection(postedJobs)}> View posted Job</button>

                                <Link to={`/service-update/${serviceDetails?._id}`}>
                                    <button className='bg-[#69a5b6]  rounded-md p-[7px]  hover:bg-[#4492a7] w-auto h-auto text-slate-600  font-sans font-bold text-[18px]' >Update</button>
                                </Link>

                                <button className='bg-[#d28d8d]  rounded-md p-2 ms-2  hover:bg-[#996767]   w-auto h-auto text-slate-600  font-sans font-bold text-[18px]' onClick={handlePopupWarningOpen}>Remove</button>
                            </div>

                        }
                    </div>

                </div>

                <div className=' 2xl:w-[90%] sm:w-full h-auto  drop-shadow-lg my-10 flex px-10 sm:px-2 sm:flex-col xl:flex-row gap-10'>

                    <div>
                        <div className='bg-slate-100 xl:w-[600px] sm:w-full h-auto p-5'>
                            <div className="w-full h-12 flex items-center px-4 text-[22px] text-slate-800 font-serif   ">
                                <span><MdOutlineDescription /></span> <span className="px-2 border-b-2 border-slate-600 font-semibold"> Description</span>
                            </div>
                            <div className='flex h-auto  p-4 justify-between  py-2 text-slate-900 font-serif font-medium text-[18px]'>
                                <span className="">
                                    {
                                        serviceDetails?.Description

                                    }
                                </span>


                            </div>


                        </div>


                        <div className=' bg-slate-100 w-[600px] sm:w-full h-auto p-5 my-5'>
                            <div className="w-full h-12 flex items-center px-4 text-[22px] text-slate-800 font-serif   ">
                                <span className="px-2 border-b-2 border-slate-600 font-semibold"> Features</span>
                            </div>
                            <div className='flex flex-col h-auto bg-slate-100 p-4 justify-between  py-2 text-slate-900 font-serif font-medium text-[18px]'>

                                {
                                    serviceDetails?.features?.map((features, idx) => (
                                        <span key={idx} >{idx + 1}. {features}</span>

                                    ))
                                }



                            </div>
                        </div>




                    </div>
                    <div className=' xl:w-[600px] sm:w-full sm:gap-5 h-auto p-4 xl:p-0 sm:flex xl:flex-col     sm:justify-evenly'>
                        <div className="bg-slate-100   w-full h-[280px]">
                            <div className="w-full h-12 flex items-center px-4 text-[24px] text-slate-800 font-serif   ">
                                <span className="px-2 font-semibold"> Contact Details</span>
                            </div>

                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif   ">
                                <span className="px-2 font-medium"> Name :</span>
                                <span className=" font-normal">
                                    {
                                        serviceDetails?.user?.name
                                    }
                                </span>
                            </div>
                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif  ">
                                <span className="px-2 font-medium flex items-center"> <FaPhone /></span>

                                <span className=" align-middle font-normal">
                                    {
                                        serviceDetails?.user?.mobileNumber

                                    }
                                </span>
                            </div>
                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif  ">
                                <span className="px-2 font-medium flex items-center"> <MdEmail /></span>
                                <span className=" align-middle font-normal">
                                    {
                                        serviceDetails?.user?.email

                                    }
                                </span>
                            </div>

                        </div>

                        <div className='  my-5 w-full h-auto py-10 xl:py-0 sm:py-0 '>
                            <div className=" w-full h-auto flex flex-col items-start px-4 py-10 text-[22px] text-slate-800 font-serif bg-slate-100  ">
                                <span className="px-2 text-[24px] pb-5 font-semibold"> Pricing Details :</span>
                                <div className="text-[20px] text-black font-serif ">
                                    <span className="px-2 font-medium"> Min Price :</span> <span className="px-2 font-normal">{
                                        serviceDetails?.minPrice

                                    }</span></div>

                                <div className="text-[20px] text-black font-serif ">
                                    <span className="px-2 font-medium"> Max Price :</span> <span className="px-2 font-normal"> {
                                        serviceDetails?.maxPrice

                                    }</span></div>

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
                                <button className=' flex rounded-md hover:text-[#3543be] border-[1px] hover:bg-slate-100 w-[180px] p-2  items-center justify-center h-auto text-slate-600 font-sans font-semibold text-[24px]'><FaAddressCard /><span className='text-[18px] px-4'> Post Job</span></button>
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


                <div className="pt-16">
                    <span className=' text-blue-950 font-serif font-semibold text-[30px] border-b-[2px] my-4'>Previous Work</span>

                </div>
                <div className=' w-[90%] h-auto relative  drop-shadow-lg  my-10 flex flex-col px-5'>

                    <form onSubmit={handleSubmit}>
                        <div className='w-full flex relative justify-center items-center py-5'>

                            <input type="file" className="bg-slate-100 w-[300px] p-5 outline-none font-sans font-semibold" onChange={handleWorkPicChange} multiple />
                            <button type="submit" className=' text-blue-950 font-serif font-semibold text-[30px]  ps-10 cursor-pointer'  ><IoCloudUploadSharp onMouseEnter={() => setUploadButtonHover(!uploadButtonHover)} onMouseLeave={() => setUploadButtonHover(!uploadButtonHover)} /></button>
                            {
                                uploadButtonHover && <div className="bg-blue-100 absolute  right-80 text-[18px] h-10 flex items-center justify-center w-[80px] ms-2 font-serif">
                                    upload

                                </div>

                            }
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


                            <div className={`${isModalOpen !== null ? "h-[700px]" : "h-auto"} w-full bg-slate-100 z-10 relative grid grid-cols-4 gap-10 p-10 transition-all duration-300`}>


                                {

                                    AllPhotos.map((element, index) => {
                                        return (
                                            <>
                                                <div key={index} className=" bg-slate-400 h-[200px] border-2 border-slate-600 cursor-pointer" onClick={() => handleModalOpen(index)} >
                                                    <img src={`${element.imageUrl}`} alt="picture" className=" bg-cover w-full h-full" />
                                                </div>
                                                {
                                                    isModalOpen == index &&

                                                    <div className='w-full z-50 h-[600px] absolute top-10  border-4 border-[#7da2a9]  bg-slate-400'>

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
                    <div className='fixed inset-0 bg-black opacity-50 z-40'></div>
                )}

                {popupwarning && (
                    <div className='fixed inset-0 flex items-center justify-center z-50'>
                        <PopUp message="Remove Service" submessage="Are you sure you want to remove this service ?" button1="Cancel" button2="Remove" submessage2={`Service Name: ${serviceDetails?.serviceType}`} closeButton={handlePopupWarningClose} handleRemove={handleServiceRemove} />

                    </div>
                )}

            </div>


           { isLoading == false &&
            <div className=' w-full h-auto relative drop-shadow-lg  my-10 flex flex-col px-5'>

                <div className='w-full flex justify-center items-center py-5'>
                    <span className=' text-blue-950 font-serif font-semibold text-[30px] '>Reviews</span>
                    <button onClick={() => handleSubmitReview()} className='mx-2 text-slate-200 flex items-center justify-center h-[40px] font-serif font-semibold text-[20px] w-[120px] px-10  bg-blue-700 rounded-2xl'>
                        <span className="px-2"><IoIosAddCircle /> </span>
                        <span>Add</span>
                    </button>

                    <div className="flex">

                        {stars.map((_, index) => {
                            return (
                                <FaStar key={index} size={24}
                                    style={{ marginRight: 10, cursor: "pointer" }}
                                    className={`${(hoverValue || currentValue) > index ? 'text-yellow-600' : "text-slate-700"}`}
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
                        placeholder="Give review About Service Provider"
                        className=' text-[20px] h-[200px] font-serif outline-none p-4  w-[700px]  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl'
                        rows={5} cols={40}
                        style={{ resize: 'none', overflow: 'hidden' }}
                        value={input}
                        onChange={handleInputChange}
                    ></textarea>

                    <p>{wordCount} / 20 words</p>
                </div>
                <div className="w-full grid grid-cols-2 gap-10 py-20 justify-center px-10">


                    {reviewStore?.reviews.slice(0, visibleReviews).map((review, index) => (<Review key={index} review={review} userDetails={userDetails} handleReviewDelete={handleReviewDelete} />))}
                </div>

                {
                    visibleReviews < reviewStore?.reviews.length &&
                    <div className='w-full flex justify-center items-center'>
                        <div className='bg-[#eef1f1] hover:bg-[#d1d5d7] w-[200px] opacity-95 my-[20px] cursor-pointer h-10 rounded-xl flex justify-center items-center text-md '>
                            <span className="font-serif font-normal pe-2 text-xl text-slate-800">View All</span>
                        </div>
                    </div>}

            </div>


}
        </>
    )
}

export default ServiceDetail