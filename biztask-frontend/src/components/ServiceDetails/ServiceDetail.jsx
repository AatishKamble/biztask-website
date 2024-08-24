import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { BsPostcard } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import React, { useRef, useState } from 'react';
import Review from "../Reviews/Review";

const ServiceDetail = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const workPic = useRef(null);


    const handleModalOpen = () => {
        setIsModalOpen(true);
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleImageUpload = () => {
        workPic.current.click();
    }

    const handleWorkPicChange = () => {
        console.log("click");
    }

    return (
        <>
            <div className='bg-[#ffffff] flex flex-col  items-center w-full h-auto px-20'>


                <div className=' w-[90%] h-[300px] bg-slate-100  drop-shadow-lg  my-10 flex items-center px-10'>


                    <div className='w-full h-[180px] relative flex items-start flex-col justify-center px-10'>



                        <div className='w-full text-[30px] text-slate-800 font-serif py-2'>
                            <span className=' font-semibold px-2'>Cleaning Services</span>

                        </div>

                        <div className='w-full text-[22px] text-slate-600 font-serif pb-2'>
                            <span className=' font-normal px-2'>Aatish Suppliers</span>

                        </div>
                        <div className='w-full px-2 pb-5 flex justify-start items-center  text-[18px] text-blue-950 font-serif'>
                            <span>Ratings : </span>
                            <span className="text-[30px] font-serif font-normal px-2  text-yellow-400">★★★</span>

                        </div>
                        <div className='w-[400px]  h-auto text-[20px] flex justify-start items-center text-blue-950 font-serif px-2 '>
                            <span><IoLocationSharp /></span>
                            <span className=' font-normal px-2 text-slate-900'>Kolhapur, Pune, Jalna</span>

                        </div>


                    </div>

                    <div className='w-[250px] h-[180px]  rounded-full mx-5'>

                        <img src="../src/assets/profilepic.jpg" alt="profile picture" className='bg-cover w-full h-full rounded-full' />
                    </div>
                </div>



                <div className=' w-[90%] h-auto  drop-shadow-lg my-10 flex px-10 gap-10'>

                    <div>
                        <div className='bg-slate-100 w-[600px] h-auto p-5'>
                            <div className="w-full h-12 flex items-center px-4 text-[22px] text-slate-800 font-serif   ">
                                <span><MdOutlineDescription /></span> <span className="px-2 border-b-2 border-slate-600 font-semibold"> Description</span>
                            </div>
                            <div className='flex h-auto  p-4 justify-between  py-2 text-slate-900 font-serif font-medium text-[18px]'>
                                <span className="">
                                    “The platform made finding reliable workers for my event so easy! The decorator we hired through here did an amazing job, and the entire process was smooth and hassle-free.”

                                    “The platform made finding reliable workers for my event so easy! The decorator we hired through here did an amazing job, and the entire process was smooth and hassle-free.”

                                    “The platform made finding reliable workers for my event so easy! The decorator we hired through here did an amazing job, and the entire process was smooth and hassle-free.”

                                    “The platform made finding reliable workers for my event so easy! The decorator we hired through here did an amazing job, and the entire process was smooth and hassle-free.”

                                </span>


                            </div>


                        </div>


                        <div className=' bg-slate-100 w-[600px] h-auto p-5 my-5'>
                            <div className="w-full h-12 flex items-center px-4 text-[22px] text-slate-800 font-serif   ">
                                <span className="px-2 border-b-2 border-slate-600 font-semibold"> Features</span>
                            </div>
                            <div className='flex h-auto bg-slate-100 p-4 justify-between  py-2 text-slate-900 font-serif font-medium text-[18px]'>
                                <span className="">
                                    “The platform made finding reliable workers for my event so easy! The decorator we hired through here did an amazing job, and the entire process was smooth and hassle-free.”

                                    “The platform made finding reliable workers for my event so easy! The decorator we hired through here did an amazing job, and the entire process was smooth and hassle-free.”

                                    “The platform made finding reliable workers for my event so easy! The decorator we hired through here did an amazing job, and the entire process was smooth and hassle-free.”

                                    “The platform made finding reliable workers for my event so easy! The decorator we hired through here did an amazing job, and the entire process was smooth and hassle-free.”

                                </span>


                            </div>
                        </div>




                    </div>
                    <div className=' w-[600px] h-auto p-4'>
                        <div className="bg-slate-100   w-full h-[300px]">
                            <div className="w-full h-12 flex items-center px-4 text-[24px] text-slate-800 font-serif   ">
                                <span className="px-2 font-semibold"> Contact Details</span>
                            </div>

                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif   ">
                                <span className="px-2 font-medium"> Name :</span>
                                <span className=" font-normal">
                                    Aatish Kamble
                                </span>
                            </div>
                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif  ">
                                <span className="px-2 font-medium flex items-center"> <FaPhone /></span>

                                <span className=" align-middle font-normal">2222233333</span>
                            </div>
                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif  ">
                                <span className="px-2 font-medium flex items-center"> <MdEmail /></span>
                                <span className=" align-middle font-normal">Ak123@Gmail.com</span>
                            </div>

                        </div>

                        <div className='  my-5w-full h-auto py-10'>
                            <div className=" w-full h-auto flex flex-col items-start px-4 py-10 text-[22px] text-slate-800 font-serif bg-slate-100  ">
                                <span className="px-2 text-[24px] pb-5 font-semibold"> Pricing Details :</span>
                                <div className="text-[20px] text-black font-serif ">
                                    <span className="px-2 font-medium"> Min Price :</span> <span className="px-2 font-normal"> $40000</span></div>

                                <div className="text-[20px] text-black font-serif ">
                                    <span className="px-2 font-medium"> Max Price :</span> <span className="px-2 font-normal"> $80000</span></div>

                            </div>

                        </div>
                    </div>

                </div>


                <div className=' w-[90%] h-auto relative bg-slate-100 drop-shadow-lg  my-10 flex flex-col px-5'>

                    <div className='w-full flex justify-center items-center py-5'>
                        <span className=' text-blue-950 font-serif font-semibold text-[30px]  mb-4'>Previous Work</span>
                        <span className=' text-blue-950 font-serif font-semibold text-[30px]  mb-4 px-10 cursor-pointer' onClick={handleImageUpload}><IoCloudUploadSharp /> </span>
                        <input type="file" className="hidden" ref={workPic} onChange={handleWorkPicChange} />
                    </div>
                    {
                        isModalOpen &&

                        <div className='w-[700px] z-50 h-[500px] absolute top-20 left-[20%]  bg-slate-400'>

                            <button className="absolute right-3 top-2 text-[30px] hover:text-slate-700" onClick={handleModalClose}>
                                <IoClose />
                            </button>
                            <img src="../src/assets/clean.jpg" alt="image" className="bg-cover w-full h-full" />






                        </div>

                    }

                    <div className={`w-full z-10 h-auto relative grid grid-cols-4 gap-10 p-10 transition-all duration-300 ${isModalOpen ? 'blur-sm brightness-50' : ''}`}>

                        <div className=" bg-slate-400 h-[200px] cursor-pointer" onClick={handleModalOpen}>

                        </div>

                        <div className=" bg-slate-400 h-[200px] cursor-pointer">

                        </div>
                        <div className=" bg-slate-400 h-[200px] cursor-pointer">

                        </div>
                        <div className=" bg-slate-400 h-[200px] cursor-pointer">

                        </div>
                        <div className=" bg-slate-400 h-[200px] cursor-pointer">

                        </div>
                        <div className=" bg-slate-400 h-[200px] cursor-pointer">

                        </div>





                    </div>


                </div>


            </div>



            <div className=' w-full h-auto relative drop-shadow-lg  my-10 flex flex-col px-5'>

                <div className='w-full flex justify-center items-center py-5'>
                    <span className=' text-blue-950 font-serif font-semibold text-[30px]  mb-4'>Reviews</span>
                    <span className=' text-blue-950 font-serif font-semibold text-[30px]  mb-4 px-10 cursor-pointer' ><IoIosAddCircle /> </span>
                </div>

                <div className="w-full flex justify-center items-center">
                    <textarea name="review" id="review"
                        placeholder="Write about work done"
                        className=' text-[20px] h-[200px] font-serif outline-none p-4  w-[700px]  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl'
                        rows={5} cols={40}
                        style={{ resize: 'none', overflow: 'hidden' }}

                    ></textarea></div>
                <div className="w-full grid grid-cols-3 gap-10 py-20 justify-center px-10">

                    <Review />
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                </div>

                <div className='w-full flex justify-center items-center'>
                    <div className='bg-[#eef1f1] hover:bg-[#d1d5d7] w-[200px] opacity-95 my-[20px] cursor-pointer h-10 rounded-xl flex justify-center items-center text-md '>
                        <span className="font-serif font-normal pe-2 text-xl text-slate-800">View All</span>
                    </div>
                </div>
            </div>



        </>
    )
}

export default ServiceDetail