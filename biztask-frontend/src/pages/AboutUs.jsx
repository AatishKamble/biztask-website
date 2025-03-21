import React from 'react';
import { MdPhone, MdEmail } from "react-icons/md";
import { ImLinkedin } from "react-icons/im";
import aboutPhoto from "../assets/hd-face-cartoon.png";
import handShake from "../assets/handShake.png";

const AboutUs = () => {
  return (
    <>
      {/* Mission Section */}
      <div className="w-full px-8 flex justify-center mt-10 font-serif">
        <div className="relative w-[85%] text-white bg-gradient-to-br from-blue-950 to-blue-800 shadow-2xl rounded-3xl flex flex-col items-center p-12 overflow-hidden group">
          {/* Abstract Shapes */}
          <div className="absolute top-5 left-5 w-20 h-20 bg-blue-400 opacity-30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-5 right-10 w-28 h-28 bg-teal-500 opacity-25 rounded-full blur-2xl animate-bounce"></div>

          {/* Content */}
          <h2 className="text-4xl font-extrabold tracking-wide border-b-2 border-teal-400 pb-2">
            Our Mission
          </h2>
          <p className="text-2xl text-center font-semibold mt-4 text-teal-300 tracking-wide">
            Bridging Gaps
          </p>
          <p className="text-lg text-center text-gray-300 mt-2 max-w-[600px] leading-relaxed">
            Find the Perfect Job, Worker, or Service Near You!
          </p>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-blue-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full flex flex-col items-center mt-16">
        <div className="relative w-[85%] bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl rounded-2xl flex flex-col md:flex-row justify-between items-center p-12 border border-gray-400 group">
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
            <img
              src={handShake}
              alt="About"
              className="w-[380px] rounded-xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-teal-400 opacity-30 rounded-full blur-xl animate-spin-slow"></div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-500 opacity-30 rounded-full blur-xl animate-pulse"></div>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300/50 to-gray-400/50 opacity-0 rounded-lg group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* Developer Details Section */}
      <div className="w-full mt-16 mb-20">
        <div className="w-full text-center pb-6">
          <h2 className="text-3xl text-blue-800 font-bold border-b-4 border-teal-400 rounded-b-lg px-3  inline-block pb-1 font-serif">
            Developer Details
          </h2>
        </div>
        <div className="relative w-[40%] mx-auto bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl rounded-2xl p-8 flex flex-col md:flex-row items-center group hover:-translate-y-2 hover:shadow-teal-500/30 transition-all duration-500 ease-in-out">
          {/* Profile Image */}
          <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border-4 border-teal-400 mb-8 md:mb-0 md:mr-8 shadow-lg relative group-hover:border-teal-300 transition-all duration-500">
            <img
              src={aboutPhoto}
              alt="Profile"
              className="w-full h-full object-fit transition-transform duration-500 group-hover:scale-110"
            />
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full border-2 border-teal-400 opacity-0 group-hover:opacity-100 group-hover:animate-glow transition-opacity duration-500"></div>
          </div>

          {/* Developer Info */}
          <div className="text-white text-center md:text-left flex-1">
            <h2 className="text-4xl font-bold text-teal-400 font-serif mb-4 drop-shadow-md">Aatish Kamble</h2>
            <p className="text-slate-300 text-xl font-serif mb-6">Full Stack Developer</p>

            <div className="flex flex-col ">
              <div className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-all duration-300">
                <MdEmail className="text-blue-400 text-2xl" />
                <span className="text-slate-300 hover:text-blue-400 transition font-serif" title="Email">Atishk2454@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-all duration-300">
                <MdPhone className="text-teal-400 text-2xl" />
                <span className="text-slate-300 hover:text-teal-400 transition font-serif" title="Phone">9373912454</span>
              </div>
              <div className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-all duration-300">
                <ImLinkedin className="text-blue-500 text-2xl" />
                <span className="text-slate-300 hover:text-blue-500 transition font-serif" title="LinkedIn">aatish-kamble2003</span>
              </div>
            </div>
          </div>

          {/* Floating Effects */}
          <div className="absolute -top-6 left-10 w-14 h-14 bg-blue-400 opacity-30 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute bottom-5 right-10 w-24 h-24 bg-teal-500 opacity-20 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute top-10 right-20 w-12 h-12 bg-purple-400 opacity-30 rounded-full blur-lg animate-pulse"></div>

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

          @keyframes glow {
  0% {
    box-shadow: 0 0 10px rgba(45, 212, 191, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(45, 212, 191, 0.8);
  }
  100% {
    box-shadow: 0 0 10px rgba(45, 212, 191, 0.5);
  }
}

.animate-glow {
  animation: glow 2s infinite;
}
        `}
      </style>
    </>
  );
};

export default AboutUs;