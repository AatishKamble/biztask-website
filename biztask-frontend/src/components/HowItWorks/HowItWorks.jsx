import { TiBusinessCard } from "react-icons/ti";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdMiscellaneousServices } from "react-icons/md";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
const HowItWorks = ({HowItWorks}) => {

   
    return (
        <>
            <div ref={HowItWorks}  className='w-full   h-[600px] px-10 my-20 flex justify-center'>

                <div  className=' bg-blue-900 relative h-full w-[70%] rounded-2xl flex flex-col'>
                    <div className='w-full flex justify-center items-center h-24 bg-blue-900 py-10 mt-10'>
                        <span className=' font-serif font-semibold text-[#eeeef0] text-[38px]'>How It Works</span>
                    </div>

                    <div className='w-full flex justify-between px-24 items-center h-[400px] bg-blue-900 '>
                        <div className="flex flex-col justify-center items-center">
                            <div className=' text-[60px] rounded-full w-[80px] h-[80px] bg-yellow-600 flex justify-center items-center font-serif font-bold text-white '>
                                <TiBusinessCard />

                            </div>
                            <div className="flex flex-col items-center justify-center">

                                <span className=' text-slate-100 font-serif font-bold text-[24px] pt-5'> For Businesses</span>
                                <ol className=' text-slate-200 font-serif font-normal list-disc text-[18px] pt-2 w-[200px]'>
                                    <li>Register Your Businesss.</li>
                                    <li>Under Bisiness Register services.</li>
                                    <li>Post Job Openigns for particular Service.</li>
                                </ol>


                            </div>
                        </div>
                       
                        <div className="flex flex-col justify-center items-center">
                            <div className=' text-[60px] rounded-full w-[80px] h-[80px] bg-yellow-600 flex justify-center items-center font-serif font-bold text-white '>
                            <FaPeopleGroup />

                            </div>
                            <div className="flex flex-col mb-20  h-auto items-start justify-start">

                                <span className=' text-slate-100 font-serif font-bold text-[24px] pt-5'> For Workers</span>
                                <ol className=' text-slate-200 font-serif font-normal list-disc text-[18px] pt-2 w-[200px]'>
                                    <li>Find Jobs .</li>
                                    <li>Start Services Providing.</li>
                                    
                                </ol>


                            </div>
                        </div>
                       
                      
                        <div className="flex flex-col  mb-6 justify-center items-center">
                            <div className=' text-[60px] rounded-full w-[80px] h-[80px] bg-yellow-600 flex justify-center items-center font-serif font-bold text-white '>
                            <MdMiscellaneousServices />

                            </div>
                            <div className="flex flex-col h-auto items-start justify-start">

                                <span className=' text-slate-100 font-serif font-bold text-[24px] pt-5'> For Service Seekers</span>
                              
                                <ol className=' text-slate-200 font-serif font-normal list-disc text-[18px] pt-2 w-[200px]'>
                                    <li>Search Services that you Need.</li>
                                    <li>Flexible for Your Location.</li>
                                    </ol>

                            </div>
                        </div>
                       
                           
                    </div>
                </div>


            </div>

        </>
    )
}

export default HowItWorks