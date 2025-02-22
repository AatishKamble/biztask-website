import React from 'react';
import { MdPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import aboutPhoto from "../assets/hd-face-cartoon.png";
import { ImLinkedin } from "react-icons/im";
import handShake from "../assets/handShake.png";
const AboutUs = () => {
    
    return (
        <>
<div className="w-full px-8 flex justify-center mt-10 font-serif">
  {/* Mission Section */}
  <div className="relative w-[85%] text-white bg-gradient-to-br from-blue-950 to-blue-800 shadow-2xl rounded-3xl flex flex-col items-center p-12 overflow-hidden">
    
    {/* Abstract Shapes */}
    <div className="absolute top-5 left-5 w-20 h-20 bg-blue-400 opacity-30 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute bottom-5 right-10 w-28 h-28 bg-teal-500 opacity-25 rounded-full blur-2xl animate-bounce"></div>

    {/* Content */}
    <h2 className="text-4xl font-extrabold tracking-wide border-b-4 border-teal-400 pb-2">
      Our Mission
    </h2>
    <p className="text-2xl text-center font-semibold mt-4 text-teal-300 tracking-wide">
      Bridging Gaps
    </p>
    <p className="text-lg text-center text-gray-300 mt-2 max-w-[600px] leading-relaxed">
      Find the Perfect Job, Worker, or Service Near You!
    </p>
  </div>
</div>

{/* About Section with Modern Background */}
<div className="w-full flex flex-col items-center mt-16">
  <div className="relative w-[85%] bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl rounded-2xl flex flex-col md:flex-row justify-between items-center p-12 border border-gray-400">
    
    {/* Left Content */}
    <div className="w-full md:w-1/2 text-slate-900 p-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-4 border-l-4 border-blue-600 pl-3">
        About Biztask
      </h2>
      <p className="text-lg text-gray-800 leading-relaxed font-serif">
        BizTask is designed to simplify job and service finding. It connects local service providers with people looking for services, allowing seamless posting of job openings.
      </p>
    </div>

    {/* Right Image */}
    <div className="w-full md:w-1/2 flex justify-center">
      <img src={handShake} alt="About" className="w-[380px] rounded-xl transition-transform duration-300 hover:scale-105" />
    </div>

    {/* Floating Elements */}
    <div className="absolute -top-6 -left-6 w-16 h-16 bg-teal-400 opacity-30 rounded-full blur-xl animate-spin-slow"></div>
    <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-500 opacity-30 rounded-full blur-xl animate-pulse"></div>
  </div>
</div>

{/* Developer Details Section with Modern Look */}
<div className="w-full mt-16 mb-20">
  <div className="w-full text-center pb-6">
    <h2 className="text-3xl text-blue-800 font-bold border-b-4 border-teal-500 inline-block pb-1 font-serif ">
      Developer Details
    </h2>
  </div>

  <div className="relative w-[85%] mx-auto bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl rounded-2xl py-10 px-8 flex flex-col md:flex-row items-center">
    
    {/* Profile Image */}
    <div className="w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-teal-400 mb-5 md:mb-0 md:mr-10 shadow-lg">
      <img src={aboutPhoto} alt="Profile" className="w-full h-full object-fit" />
    </div>

    {/* Developer Info */}
    <div className="text-white text-center md:text-left">
      <h2 className="text-3xl font-bold text-teal-300 font-serif">Aatish Kamble</h2>
      <p className="text-slate-400 mt-2 text-lg font-serif">Full Stack Developer</p>
      
      <div className="flex flex-col space-y-3 mt-4 text-slate-300">
        <div className="flex items-center space-x-2">
          <MdEmail className="text-blue-400 text-xl" />
          <span className="hover:text-blue-500 transition font-serif">Atishk2454@gmail.com</span>
        </div>
        <div className="flex items-center space-x-2">
          <MdPhone className="text-teal-400 text-xl" />
          <span className="hover:text-teal-500 transition">9373912454</span>
        </div>
        <div className="flex items-center space-x-2">
          <ImLinkedin className="text-blue-500 text-xl" />
          <span className="hover:text-blue-600 transition ">aatish-kamble2003</span>
        </div>
      </div>
    </div>

    {/* Floating Effects */}
    <div className="absolute -top-6 left-10 w-14 h-14 bg-blue-400 opacity-30 rounded-full blur-lg animate-pulse"></div>
    <div className="absolute bottom-5 right-10 w-24 h-24 bg-teal-500 opacity-20 rounded-full blur-2xl animate-bounce"></div>
  </div>
</div>

{/* Custom Animations */}
<style>
{`
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .animate-spin-slow {
    animation: spin-slow 12s linear infinite;
  }
`}
</style>


        </>
    );
}

export default AboutUs;
