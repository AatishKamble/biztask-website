import { VscAzure } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo-transparent.png';
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
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500  w-full h-[350px] flex justify-between items-center shadow-lg border-t-4 border-blue-900">

        <div className="w-full h-full grid grid-cols-4 gap-10 p-8 ">

          {/* Logo & Description */}
          <div className=" relative flex flex-col justify-start items-center  ">
            <div className="h-44 w-[250px] ">
            <img src={logo} alt='logo' className='h-full  w-full object-fit'/>
        
            </div>
        
            <p className=" absolute bottom-20 text-center font-serif text-cyan-200 text-[18px] leading-relaxed px-4">
              Connecting businesses, workers and service seekers with ease
            </p>
          </div>

          <div className="p-4  border-r-2 border-cyan-200 border-dotted">
            <span className="text-xl font-serif font-semibold text-cyan-200">
              Quick Links
            </span>
            <ul className="text-lg font-serif  text-cyan-100 flex flex-col font-semibold gap-3 mt-3">
              <Link to={"/jobs"}>
                <li className="cursor-pointer hover:text-cyan-400 hover:translate-x-1 transition-all duration-300">
                  Jobs
                </li>
              </Link>
              <Link to={"/services"}>
                <li className="cursor-pointer hover:text-cyan-400 hover:translate-x-1 transition-all duration-300">
                  Services
                </li>
              </Link>
              <li
                className="cursor-pointer hover:text-cyan-400 hover:translate-x-1 transition-all duration-300"
                onClick={handleBusinessRegistration}
              >
                Register Businesses
              </li>
              <li
                className="cursor-pointer hover:text-cyan-400 hover:translate-x-1 transition-all duration-300"
                onClick={handleAppliedJob}
              >
                Applied Job
              </li>
            </ul>
          </div>


          {/* Resources */}
          <div className="p-4  border-r-2 border-cyan-200 border-dotted">
            <span className="text-xl font-serif font-semibold text-cyan-200">
              Resources
            </span>
            <ul className="text-lg font-serif  text-cyan-100 flex font-semibold flex-col gap-2 mt-4">
              <Link to={"/#how-it-works"}>
                <li className="cursor-pointer hover:text-cyan-400 transition-all duration-300">
                  How It Works
                </li>
              </Link>
              <Link to={"/support"}>
              <li className="cursor-pointer hover:text-cyan-400 transition-all duration-300">
                Support 
              </li> </Link>
              <Link to={"/about-us"}>
                <li className="cursor-pointer hover:text-cyan-400 transition-all duration-300">
                  Developers
                </li>
              </Link>
            </ul>
          </div>

          <div className="p-4  flex flex-col justify-center items-center">
            {/* Social Icons */}
            <div className="text-lg font-serif font-light text-cyan-100 flex gap-6 mt-5 justify-evenly">
              <span className="text-cyan-100 text-[35px] cursor-pointer hover:text-cyan-400 hover:scale-110 transition-all duration-300">
                <FaInstagram />
              </span>
              <span className="text-cyan-100 text-[35px] cursor-pointer hover:text-cyan-400 hover:scale-110 transition-all duration-300">
                <FaLinkedin />
              </span>
              <span className="text-cyan-100 text-[35px] cursor-pointer hover:text-cyan-400 hover:scale-110 transition-all duration-300">
                <FaFacebookSquare />
              </span>
            </div>

            <span className="text-xl font-serif font-semibold text-cyan-200 mt-8">
              Contact Us
            </span>
          </div>



        </div>
      </div>


    </>
  )
}

export default Footer