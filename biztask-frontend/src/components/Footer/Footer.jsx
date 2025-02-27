import { VscAzure } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const Footer = ({ userDetails, handleLogInButtonClick }) => {

  const navigate = useNavigate()
  const handleBusinessRegistration = () => {
    if (userDetails) {
      // If user is logged in, navigate to business registration
      navigate("/profile#bussiness-registration");
    } else {
      // If user is not logged in, open the login modal
      handleLogInButtonClick();
    }
  };

  const handleAppliedJob = () => {
    if (userDetails) {
      // If user is logged in, navigate to business registration
      navigate("/profile#applied-jobs");
    } else {
      // If user is not logged in, open the login modal
      handleLogInButtonClick();
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200  w-full h-[350px] flex justify-between items-center shadow-lg border-t-4 border-cyan-500">

        <div className="w-full h-full grid grid-cols-4 gap-5 p-8">

          {/* Logo & Description */}
          <div className="flex flex-col justify-start items-center gap-3">
            <div className="h-20 w-20 flex items-center justify-center">
              <span className="text-[70px] text-blue-900 font-bold drop-shadow-md">
                <VscAzure />
              </span>
            </div>
            <span className="font-serif font-semibold text-blue-900 text-[30px]">
              bizTask
            </span>
            <p className="text-center font-serif text-slate-800 text-[18px] leading-relaxed px-4">
              Connecting businesses, workers, and service seekers with ease
            </p>
          </div>

          <div className="p-4 ps-8 border-r-2 border-blue-900 border-dotted">
            <span className="text-xl font-serif font-semibold text-blue-900">
              Quick Links
            </span>
            <ul className="text-lg font-serif font-light text-black flex flex-col gap-3 mt-3">
              <Link to={"/jobs"}>
                <li className="cursor-pointer hover:text-cyan-500 hover:translate-x-1 transition-all duration-300">
                  Jobs
                </li>
              </Link>
              <Link to={"/services"}>
                <li className="cursor-pointer hover:text-cyan-500 hover:translate-x-1 transition-all duration-300">
                  Services
                </li>
              </Link>
              <li
                className="cursor-pointer hover:text-cyan-500 hover:translate-x-1 transition-all duration-300"
                onClick={handleBusinessRegistration}
              >
                Register Businesses
              </li>
              <li
                className="cursor-pointer hover:text-cyan-500 hover:translate-x-1 transition-all duration-300"
                onClick={handleAppliedJob}
              >
                Applied Job
              </li>
            </ul>
          </div>


          {/* Resources */}
          <div className="p-2 ps-8 border-r-2 border-sky-900 border-dotted">
            <span className="text-xl font-serif font-semibold text-blue-900">
              Resources
            </span>
            <ul className="text-lg font-serif font-light text-black flex flex-col gap-2 mt-4">
              <Link to={"/#how-it-works"}>
                <li className="cursor-pointer hover:text-cyan-500 transition-all duration-300">
                  How It Works
                </li>
              </Link>
              <li className="cursor-pointer hover:text-cyan-500 transition-all duration-300">
                Support
              </li>
              <Link to={"/about-us"}>
                <li className="cursor-pointer hover:text-cyan-500 transition-all duration-300">
                  Developers
                </li>
              </Link>
            </ul>
          </div>

          <div className="p-4 ps-8 flex flex-col justify-center items-center">
            {/* Social Icons */}
            <div className="text-lg font-serif font-light text-black flex gap-6 mt-5 justify-evenly">
              <span className="text-blue-900 text-[35px] cursor-pointer hover:text-blue-600 hover:scale-110 transition-all duration-300">
                <FaInstagram />
              </span>
              <span className="text-blue-900 text-[35px] cursor-pointer hover:text-blue-600 hover:scale-110 transition-all duration-300">
                <FaLinkedin />
              </span>
              <span className="text-blue-900 text-[35px] cursor-pointer hover:text-blue-600 hover:scale-110 transition-all duration-300">
                <FaFacebookSquare />
              </span>
            </div>

            <span className="text-xl font-serif font-semibold text-blue-950 mt-8">
              Contact Us
            </span>
          </div>



        </div>
      </div>


    </>
  )
}

export default Footer