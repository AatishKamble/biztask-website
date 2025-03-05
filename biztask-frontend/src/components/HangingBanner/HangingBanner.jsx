const HangingBanner=({title})=>{


    return (
<>
<div className="absolute top-[205px] w-full flex flex-col justify-center items-center">

          {/* Left Hanging Chain */}
          <div className="absolute bottom-[85px] left-1/3 w-1 flex flex-col items-center">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="w-1 h-3 bg-gray-400 mb-1"></div>
            ))}
          </div>

          {/* Right Hanging Chain */}
          <div className="absolute bottom-[85px] right-1/3 w-1 flex flex-col items-center">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="w-1 h-3 bg-gray-400 mb-1"></div>
            ))}
          </div>

          {/*  Search Banner */}
          <div className="w-[600px] bg-gradient-to-b from-gray-50 to-gray-200 font-sans font-semibold text-blue-600 px-10 py-5 rounded-lg shadow-xl border-2 border-blue-400 relative transform hover:translate-y-1 transition-all duration-500 swing">


            <div className="absolute -top-3 left-1/3 w-6 h-6 border-4 border-gray-600 rounded-full bg-blue-400"></div>
            <div className="absolute -top-3 right-1/3 w-6 h-6 border-4 border-gray-600 rounded-full bg-blue-400"></div>


            <div className="absolute inset-0 overflow-hidden opacity-10">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-full h-1 bg-gray-500 my-3"></div>
              ))}
            </div>

            <span className="text-[38px] font-semibold opacity-85 block text-center drop-shadow-md">
              {title}
            </span>
          </div>

          {/* CSS for Swinging Animation */}
          <style jsx>{`
    @keyframes swing {
      0% { transform: rotate(-1deg); }
      50% { transform: rotate(1deg); }
      100% { transform: rotate(-1deg); }
    }
    .swing {
      animation: swing 4s infinite ease-in-out;
    }
  `}</style>
        </div>
</>
    );
}


export default HangingBanner;