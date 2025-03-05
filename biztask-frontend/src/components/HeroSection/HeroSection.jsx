import { HiChevronDoubleRight } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { Link } from "react-router-dom";
import heroSection from "../../assets/hero.jpg";
const HeroSection = () => {

  return (
    <>

      <div className="relative  w-full h-[540px] flex items-center mt-1 xl:h-[100vh] overflow-hidden">
      
        <div className="w-full h-full bg-blue-900 relative">
          <img
            src={heroSection}
            alt="Hero Section"
            className="w-full h-full object-cover opacity-40"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 opacity-50"></div>
        </div>
        <style>
          {`
          @keyframes fadeInZoom {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
        </style>

        <div className="absolute  mt-10 inset-0 flex flex-col justify-center items-center text-center animate-fadeIn">
          <span className="font-serif font-extrabold text-[#111346] text-[40px] drop-shadow-md 
    opacity-0 animate-[fadeInZoom_1.2s_ease-in-out_forwards]">
            Find the right worker, job or service in your area!
          </span>

          <span className="font-sans text-gray-300 sm:pt-3 font-semibold text-[24px] drop-shadow-md 
    opacity-0 animate-[fadeInUp_1.5s_ease-in-out_0.5s_forwards]">
            Connecting businesses, workers and service seekers with ease
          </span>



          <div className="absolute xl:top-[200px]  sm:top-[170px] lg:top-[150px] 2xl:top-[180px] flex gap-12">


            <Link to={"/jobs"}>
              <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 w-[250px] opacity-95 cursor-pointer h-14 rounded-xl flex justify-center items-center text-lg border-2 border-blue-700 shadow-lg 
          transition-all duration-500 hover:scale-105 hover:bg-blue-700 hover:shadow-[0_0_15px_4px_rgba(0,119,255,0.8)]">
                <span className="font-serif font-bold pe-2 text-xl text-white">
                  Search Jobs
                </span>
                <span className="font-serif font-bold text-3xl text-white">
                  <HiChevronDoubleRight />
                </span>
              </div>
            </Link>


            <Link to={"/services"}>
              <div className="relative bg-[#a0afaf] w-[250px] opacity-95 cursor-pointer h-14 rounded-xl flex justify-center items-center text-lg border-2 border-slate-600 shadow-lg 
          transition-all duration-500 hover:scale-105 hover:bg-[#8b9c9c] hover:shadow-[0_0_15px_4px_rgba(119,150,150,0.8)]">
                <span className="font-serif font-bold pe-2 text-xl text-slate-800">
                  Explore Services
                </span>
                <span className="font-serif font-bold text-3xl text-slate-800">
                  <MdOutlineExplore />
                </span>
              </div>
            </Link>

          </div>
        </div>
      </div>


    </>
  )
}

export default HeroSection