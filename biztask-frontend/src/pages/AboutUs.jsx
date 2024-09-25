import React from 'react';
import { MdPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import aboutPhoto from "../assets/hd-face-cartoon.png";
import { ImLinkedin } from "react-icons/im";
const AboutUs = () => {
    return (
        <>
            <div className='w-full text-[30px] text-black font-serif  items-center pb-2 p-10'>
                <p className=' text-center text-blue-900 font-bold '>About Us</p>
            </div>

            <div className="w-full flex items-center  justify-center flex-col h-auto  ">
                <div className='w-[70%] h-auto bg-slate-100 border-[1px]  my-5 drop-shadow-lg border-slate-400 mb-20 flex flex-col justify-center items-center px-10 '>

                    
                    <div className='w-[90%] text-[22px] text-slate-800 font-serif flex flex-col py-10'>
                            <span className="font-bold flex items-center w-[200px]">About Biztask</span>
                            <span>This website is built for easy service and job finding. It helps local service providers to provide different services and people to find the right service.Posting of job openings for particular service</span>
                        </div>

                </div>

                <div>
                <div className='w-full h-auto bg-slate-100 border-[1px] py-10 my-5 drop-shadow-lg border-slate-400 mb-20  flex flex-row justify-center px-10'>
                        <div className='w-[200px] h-[180px] rounded-lg'>
                            <img src={aboutPhoto} alt="profile picture" className='bg-cover w-full h-full rounded-lg' />
                        </div>
                        <div className='px-5'>
                            <div className='w-full text-[22px] text-slate-800 font-serif py-2'>
                                <span className="px-2 text-[30px] font-bold ">Aatish Kamble</span>
                            </div>
                            <div className='w-full text-[22px] text-slate-800 font-serif flex pb-2'>
                                <span className="px-2 font-medium flex items-center"><MdEmail /></span>
                                <span>Atishk2454@gmail.com</span>
                            </div>
                            <div className='w-full text-[22px] text-slate-800 font-serif flex pb-2'>
                                <span className="px-2 font-medium flex items-center"><MdPhone /></span>
                                <span className=' font-serif '>9373912454</span>
                            </div>
                            <div className='w-full text-[22px] text-slate-800 font-serif flex pb-2'>
                                <span className="px-2 font-medium flex items-center"><ImLinkedin /></span>
                                <span className=' font-serif '>aatish-kamble-367700259</span>
                            </div>
                        </div>

                    </div>
                </div>
               
            </div>


        </>
    );
}

export default AboutUs;
