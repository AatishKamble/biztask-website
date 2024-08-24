import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
const JobDetail = () => {
    return (
        <>
            <div className='bg-[#ffffff] flex flex-col  items-center w-full h-auto px-20'>


                <div className=' w-[90%] h-[200px] bg-slate-100  drop-shadow-lg  my-10 flex items-center px-10'>


                    <div className='w-full h-[180px] relative flex items-start flex-col justify-center px-10'>



                        <div className='w-full text-[30px] text-slate-800 font-serif py-2'>
                            <span className=' font-semibold px-2'>Plumber</span>

                        </div>

                        <div className='w-full text-[22px] text-slate-600 font-serif pb-2'>
                            <span className=' font-normal px-2'>Aatish Plumbing</span>

                        </div>

                        <div className='w-[400px]  h-auto text-[20px] flex justify-start items-center text-blue-950 font-serif '>
                            <span><IoLocationSharp /></span>
                            <span className=' font-normal px-2 text-slate-900'>Kolhapur, Pune, Jalna</span>

                        </div>

                        <div className='w-full px-2 pt-5 flex justify-start items-center  text-[18px] text-slate-600 font-serif'>
                            <span><IoMdTime /></span>
                            <span className="text-[16px] font-serif font-normal px-2 "> 2 days ago</span>

                        </div>


                    </div>
                   <div className="absolute right-10 bottom-5  border-1  hover:bg-[#2c4a92] rounded-md flex justify-center items-center bg-[#4e30e3] w-28 h-10">
                    <p className=' text-[#eff0f2] font-serif font-medium text-[24px] cursor-pointer '>
                     Apply
                    </p>
                    </div>

                </div>



                <div className=' w-[90%] h-auto  drop-shadow-lg my-10 flex px-10 gap-10'>

                    <div>
                        <div className="w-full h-12 flex items-center px-4 text-[22px] text-slate-800 font-serif   ">
                            <span className="px-2  font-semibold"> Job Overview</span>
                        </div>
                        <div className='bg-slate-100 w-[600px] h-auto p-5'>
                            <div className="w-full h-12 flex items-center px-4 text-[22px] text-slate-800 font-serif   ">
                                <span><MdOutlineDescription /></span> <span className="px-2  font-medium"> Responsibilities</span>
                            </div>
                            <div className='flex flex-col h-auto  p-4 justify-between  py-2 text-slate-900 font-serif font-medium text-[18px]'>
                                <span className="">
                                    1. Assist customers in identifying and purchasing the right office supplies. </span>

                                <span>
                                    2.Manage inventory and restock shelves as needed.</span>
                                <span>
                                    3.Operate the cash register and handle transactions efficiently.</span>
                                <span>
                                    4.Maintain a clean and organized store environment.</span>




                            </div>


                        </div>


                        <div className='bg-slate-100 w-[600px] h-auto p-5 mt-8'>
                            <div className="w-full h-12 flex items-center px-4 text-[22px] text-slate-800 font-serif   ">
                            <span className="px-2  font-medium"> Skill Required </span>
                            </div>
                            <div className='flex flex-col h-auto  p-4 justify-between  py-2 text-slate-900 font-serif font-medium text-[18px]'>
                                <span className="">
                                    1. Assist customers in identifying and purchasing the right office supplies. </span>

                                <span>
                                    2.Manage inventory and restock shelves as needed.</span>
                                <span>
                                    3.Operate the cash register and handle transactions efficiently.</span>
                                <span>
                                    4.Maintain a clean and organized store environment.</span>




                            </div>


                        </div>




                       


                    </div>
                    <div className=' w-[600px] h-auto p-4'>
                        <div className="bg-slate-100   w-full h-auto">
                            <div className="w-full h-12 flex items-center px-4 text-[24px] text-slate-800 font-serif   ">
                                <span className="px-2 font-semibold"> Other Details</span>
                            </div>

                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif   ">
                                <span className="px-2 font-medium"> Employment Type :</span>
                                <span className=" font-extralight">
                                  Full Time
                                </span>
                            </div>

                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif   ">
                                <span className="px-2 font-medium">Experience :</span>
                                <span className=" font-extralight">
                                 2 years
                                </span>
                            </div>

                           

                            <div className="w-full h-auto flex py-5 flex-col items-start justify-start px-4 text-[20px] text-slate-800 font-serif   ">
                                <span className="px-2 font-medium"> Working Hours:</span>
                                <span className=" font-extralight px-2">
                                 9 AM - 5 PM, Monday to Friday
                                </span>
                            </div>

                           

                            
                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif   ">
                                <span className="px-2 font-medium"> Application Deadline:</span>
                                <span className=" font-extralight">
                                 10  August 2024
                                </span>
                            </div>
                           
                        </div>

                        <div className='  my-5w-full h-auto py-10'>
                            <div className=" w-full h-auto flex flex-col items-start px-4 py-10 text-[22px] text-slate-800 font-serif bg-slate-100  ">
                                <span className="px-2 text-[24px] pb-5 font-semibold"> Salary Details </span>
                                <div className="text-[20px] text-black font-serif ">
                                    <span className="px-2 font-medium"> Min Price :</span> <span className="px-2 font-extralight"> $40000</span></div>

                                <div className="text-[20px] text-black font-serif ">
                                    <span className="px-2 font-medium"> Max Price :</span> <span className="px-2 font-extralight"> $80000</span></div>

                            </div>

                        </div>
                    </div>

                </div>


                <div className=' w-[90%] h-auto  drop-shadow-lg my-10 flex px-10 gap-10 '>
                <div className='bg-slate-100 w-[900px] h-auto pb-10'>
                            <div className="w-full h-12 flex items-center px-4 text-[22px] text-slate-800 font-serif   ">
                            <span className="px-2  font-semibold"> About the Company</span>
                            </div>
                            <div className='flex flex-col h-auto  p-4 justify-between  py-2 text-slate-900 font-serif font-medium text-[18px]'>
                                <span className="">
                                The platform made finding reliable workers for my event so easy! The decorator we hired through here did an amazing job, and the entire process was smooth and hassle-free.

The platform made finding reliable workers for my event so easy! The decorator we hired through here did an amazing job, and the entire process was smooth and hassle-free.

                                     </span>

                             

                            </div>

                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif   ">
                                <span className="px-2 font-medium">Business type  :</span>
                                <span className=" font-extralight">
                                Plumbing Services
                                </span>
                            </div>

                            <div className="w-full h-12 flex items-center px-4 text-[20px] text-slate-800 font-serif   ">
                                <span className="px-2 font-medium">Email :</span>
                                <span className=" border-b-[1px] border-slate-800 font-extralight">
                                Ak123@Gmail.com
                                </span>
                            </div>

                        </div>
                       </div>

            </div>




        </>
    )
}

export default JobDetail