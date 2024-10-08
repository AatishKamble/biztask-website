import React from 'react';
import { MdPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import aboutPhoto from "../assets/hd-face-cartoon.png";
import { ImLinkedin } from "react-icons/im";
import handShake from "../assets/handShake.png";
const AboutUs = () => {
    return (
        <>

            <div className='w-full px-8 flex justify-center mt-6'>

                <div className='w-[80%] text-[25px] text-black font-serif bg-slate-100 flex justify-center flex-col   items-center p-10  my-5'>

                    <div className=' text-[38px]  text-blue-900  font-serif font-bold flwx justify-center'>

                        <span className='border-b-2 border-slate-400'>Our Mission</span>
                    </div>
                    <p className=' text-[34px] text-center text-blue-950  font-serif font-bold pt-5 '>Bridging Gaps</p>
                    <p className=' text-[20px] text-center text-slate-700 font-serif font-normal '>Find the Perfect Job, Worker, or Service Near You!</p>

                </div>
            </div>
            <div className="w-full flex items-center  justify-center flex-col h-auto   ">
                <div className='  w-[90%] h-auto  my-5 drop-shadow-lg border-slate-400 mb-20 flex  justify-center items-center px-10 '>


                    <div className='w-[50%] h-[400px] me-5 text-[22px] text-slate-800 bg-slate-100  font-serif flex flex-col justify-center items-center px-5 '>
                        <div>
                            <span className="font-bold flex text-[28px] items-center w-[200px] mb-5">About Biztask</span>
                            <span className=' text-justify'>This website is built for easy service and job finding. It helps local service providers to provide different services and people to find the right service.Posting of job openings for particular service</span>
                        </div> </div>

                    <div className=' w-[500px] h-[400px] p-10 '>
                        <img src={handShake} alt="image" className='' />
                    </div>

                </div>

                <div>

                    <div className='w-full text-[26px] text-black font-serif items-center text-center pb-2 p-10 '>
                        <p className='  text-blue-900 font-bold border-b-2 inline-block border-slate-500'>Developer</p>
                    </div>
                    <div className='w-full h-auto bg-slate-100 border-[1px] py-10 my-5 drop-shadow-lg border-slate-400 mb-20  flex flex-row justify-center px-10 
                
                
                '>
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
