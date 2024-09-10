import React from 'react';
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import aboutPhoto from "../assets/pexels-ashutoshsonwani-1852389.jpg";
const AboutUs = () => {
    return (
        <>
            <div className='w-full text-[26px] text-black font-serif flex justify-center items-center pb-2 p-10'>
                <span>Developer Details</span>
            </div>

            <div className="w-full flex items-center justify-center h-auto ">
                <div className='w-[80%] h-auto bg-inherit border-[1px] py-20 my-5 drop-shadow-lg border-slate-400 mb-10 flex justify-center items-center px-10'>
                    <div className='w-[300px] h-[300px] rounded-lg mx-1'>
                        <img src={aboutPhoto} alt="profile picture" className='bg-cover w-full h-full rounded-lg' />
                    </div>
                    <div className='w-full h-auto flex items-start flex-col justify-start px-10'>
                        <div>
                            <div className='w-full text-[22px] text-slate-800 font-serif py-2'>
                                <span className="px-2 text-[50px] font-bold typing-animation">Aatish Kamble</span>
                            </div>
                            <div className='w-full text-[22px] text-slate-800 font-serif flex pb-2'>
                                <span className="px-2 font-medium flex items-center"><MdEmail /></span>
                                <span>Atishk2454@gmail.com</span>
                            </div>
                            <div className='w-full text-[22px] text-slate-800 font-serif flex flex-col py-10'>
                                <span className="font-bold flex items-center w-[200px]">About Website:</span>
                                <span>This website is built for easy service and job finding. It helps local service providers and people to find the right service.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inline CSS styles */}
            <style jsx>{`
                @keyframes typing {
                    from { width: 0; }
                    to { width: 100%; }
                }

                @keyframes blinkCursor {
                    0% { border-right: 2px solid transparent; }
                    100% { border-right: 2px solid black; }
                }

               

                .typing-animation {
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    border-right: 2px solid black;
                    animation: typing 4s steps(30, end) infinite, blinkCursor 0.75s step-end infinite, colorChange 5s linear infinite;
                    font-size: 50px;
                }
            `}</style>
        </>
    );
}

export default AboutUs;
