import { VscAzure } from "react-icons/vsc";
import { FaInstagram, FaLinkedin, FaFacebookSquare, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo-transparent.png';

const Footer = ({ userDetails, handleLogInButtonClick }) => {
  const navigate = useNavigate();
  
  const handleBusinessRegistration = () => {
    if (userDetails) {
      navigate("/profile#bussiness-registration");
    } else {
      handleLogInButtonClick();
    }
  };

  const handleAppliedJob = () => {
    if (userDetails) {
      navigate("/profile#applied-jobs");
    } else {
      handleLogInButtonClick();
    }
  };

  return (
    <footer className="relative pt-12">
     
      
      {/* Main Footer Content */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 w-full pt-12 pb-6 shadow-lg border-t-4 border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
         
          <div className="  md:border-r md:border-cyan-200 md:border-dotted ps-10 xl:ps-0 ">
          <h3 className="text-xl font-serif font-semibold text-cyan-200 mb-4 pb-2">
                About Biztask
              </h3>
              <div className="flex xl:flex-col items-center">
                <div className="xl:h-24 h-28 xl:w-full w-[320px]">
                  <img src={logo} alt='logo' className='h-full w-full object-cover' />
                </div>
                <p className="text-center  font-serif text-cyan-100 hover:text-cyan-300 xl:text-lg  leading-relaxed italic  xl:p-2 pe-3 xl:pt-2">
                  Connecting businesses, workers and service seekers with ease
                </p>
              </div>
            </div>
            {/* Quick Links */}
            <div className="xl:border-r xl:border-cyan-200 xl:border-dotted">
              <h3 className="text-xl font-serif font-semibold text-cyan-200 mb-4  pb-2">
                Quick Links
              </h3>
              <ul className="text-lg font-serif text-cyan-100 flex flex-col gap-3">
                <Link to="/jobs" className="group flex items-center">
                  <span className="w-0 group-hover:w-2 h-4 group-hover:bg-cyan-300 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  <li className="cursor-pointer hover:text-cyan-300 transition-all duration-300">
                    Jobs
                  </li>
                </Link>
                <Link to="/services" className="group flex items-center">
                  <span className="w-0 group-hover:w-2 h-4 group-hover:bg-cyan-300 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  <li className="cursor-pointer hover:text-cyan-300 transition-all duration-300">
                    Services
                  </li>
                </Link>
                <div onClick={handleBusinessRegistration} className="group flex items-center cursor-pointer">
                  <span className="w-0 group-hover:w-2 h-4 group-hover:bg-cyan-300 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  <li className="hover:text-cyan-300 transition-all duration-300">
                    Register Business
                  </li>
                </div>
                <div onClick={handleAppliedJob} className="group flex items-center cursor-pointer">
                  <span className="w-0 group-hover:w-2 h-4 group-hover:bg-cyan-300 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  <li className="hover:text-cyan-300 transition-all duration-300">
                    Applied Jobs
                  </li>
                </div>
              </ul>
            </div>

            {/* Resources */}
            <div className="md:border-r md:border-cyan-200 md:border-dotted ps-10 xl:ps-0">
              <h3 className="text-xl font-serif font-semibold text-cyan-200 mb-4  pb-2">
                Resources
              </h3>
              <ul className="text-lg font-serif text-cyan-100 flex flex-col gap-3">
                <Link to="/#how-it-works" className="group flex items-center">
                  <span className="w-0 group-hover:w-2 h-4 group-hover:bg-cyan-300 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  <li className="cursor-pointer hover:text-cyan-300 transition-all duration-300">
                    How It Works
                  </li>
                </Link>
                <Link to="/support" className="group flex items-center">
                  <span className="w-0 group-hover:w-2 h-4 group-hover:bg-cyan-300 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  <li className="cursor-pointer hover:text-cyan-300 transition-all duration-300">
                    Support
                  </li>
                </Link>
                <Link to="/about-us" className="group flex items-center">
                  <span className="w-0 group-hover:w-2 h-4 group-hover:bg-cyan-300 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  <li className="cursor-pointer hover:text-cyan-300 transition-all duration-300">
                    Developers
                  </li>
                </Link>
               
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-xl font-serif font-semibold text-cyan-200 mb-4  pb-2">
                Contact Us
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <MdLocationOn className="text-cyan-300 text-2xl" />
                  <span className="text-cyan-100 font-serif">Pimpri Chinchwad, Pune</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdEmail className="text-cyan-300 text-xl" />
                  <span className="text-cyan-100 font-serif">AtishKambleXXXX@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-cyan-300 text-xl" />
                  <span className="text-cyan-100 font-serif">(+91) XXXXXXXX54</span>
                </div>
                
                {/* Social Icons */}
                <div className="mt-4">
                  <h4 className="text-lg font-serif text-cyan-200 mb-2">Connect With Us</h4>
                  <div className="flex gap-4">
                    <a href="#" className="h-10 w-10 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-all duration-300">
                      <FaFacebookSquare className="text-white text-xl" />
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-all duration-300">
                      <FaInstagram className="text-white text-xl" />
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-all duration-300">
                      <FaLinkedin className="text-white text-xl" />
                    </a>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright Section */}
          <div className="mt-12 pt-6 border-t border-cyan-300 text-center">
            <p className="text-cyan-100 font-serif">
              © {new Date().getFullYear()} Biztask Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;