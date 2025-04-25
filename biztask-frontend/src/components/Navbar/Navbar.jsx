import { VscAzure } from "react-icons/vsc";
import { IoMdLogIn } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Login from "../Login/Login";
import SignUP from "../Login/SignUP";
import { logout } from "../../Redux/Auth/Action.js";
import { useDispatch } from "react-redux";
import logo from "../../assets/logo-transparent.png";
import ForgotPassword from "../Login/ForgotPassword.jsx";

const Navbar = ({ userDetails, login, handleLogInButtonClick, handleSignUpButtonClick, signUp }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  
  
  const dispatch = useDispatch();
  const location = useLocation();
  
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !buttonRef.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && 
          toggleButtonRef.current && !toggleButtonRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    dispatch(logout());
    setIsDropdownOpen(false);
    navigate('/');
  }

  const handleBusinessRegistration = () => {
    if (userDetails) {
      navigate("/profile#bussiness-registration");
    } else {
      handleLogInButtonClick();
      setIsSidebarOpen(false);
    }
  };

  const handleAppliedJob = () => {
    if (userDetails) {
      navigate("/profile#applied-jobs");
    } else {
      handleLogInButtonClick();
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // close sidebar when login/signup buttons are clicked
  const handleLoginFromSidebar = () => {
    handleLogInButtonClick();
    setIsSidebarOpen(false);
  };

  const handleSignUpFromSidebar = () => {
    handleSignUpButtonClick();
    setIsSidebarOpen(false);
  };



  // Handle forgot password modal
  const handleForgotPasswordClick = () => {
    setForgotPassword(!forgotPassword);
    // Close login modal if it's open
    if (login) handleLogInButtonClick();
  };
  const handleBackToLogin=()=>{
    if(forgotPassword) setForgotPassword(false);
    handleLogInButtonClick();
  }
  return (
    <>
      {login && <Login openState={login} type="login" handleButtonClick={handleLogInButtonClick} handleSignUpButtonClick={handleSignUpButtonClick} handleForgotPasswordClick={handleForgotPasswordClick}  />}
      {signUp && <SignUP openState={signUp} type="signup" handleButtonClick={handleSignUpButtonClick} handleLogInButtonClick={handleLogInButtonClick} />}
      {forgotPassword && <ForgotPassword openState={forgotPassword} handleButtonClick={handleForgotPasswordClick} handleBackToLogin={handleBackToLogin} />}

      <div className='bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 w-full h-20 flex items-center shadow-lg drop-shadow-2xl backdrop-blur-sm'>
        <div className='w-full px-4 md:px-6 flex items-center justify-between'>
          {/* Logo Section */}
          <Link to="/" className='h-44 w-44 bg-inherit p-2 flex items-center'>
            <img src={logo} alt='logo' className='h-full w-full object-contain' />
          </Link>

          {/* Navigation Links */}
          <div className='hidden lg:flex absolute left-1/2 transform -translate-x-1/2'>
            <ul className='text-lg gap-6 xl:gap-10 font-serif font-medium text-cyan-100 flex tracking-wide'>
              <Link to={"/"} className="group relative text-cyan-100 hover:text-cyan-300 transition duration-300 ease-in-out font-semibold text-lg tracking-wide">
                <li className='cursor-pointer'>Home
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
                </li>
              </Link>
              <Link to={"/about-us"} className="group relative text-cyan-100 hover:text-cyan-300 transition duration-300 ease-in-out font-semibold text-lg tracking-wide">
                <li className='cursor-pointer'>About Us
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
                </li>
              </Link>
              <Link to={"/#how-it-works"} className="group relative text-cyan-100 hover:text-cyan-300 transition duration-300 ease-in-out font-semibold text-lg tracking-wide">
                <li className='cursor-pointer'>How It Works
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
                </li>
              </Link>
              <button onClick={handleBusinessRegistration} className="group relative text-cyan-100 hover:text-cyan-300 transition duration-300 ease-in-out font-semibold text-lg tracking-wide">
                <li className='cursor-pointer'>Register Businesses
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
                </li>
              </button>
              <button onClick={handleAppliedJob} className="group relative text-cyan-100 hover:text-cyan-300 transition duration-300 ease-in-out font-semibold text-lg tracking-wide">
                <li className='cursor-pointer'>Applied Job
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
                </li>
              </button>
            </ul>
          </div>

          {/* User Actions Section */}
          <div className="flex items-center space-x-2">
            {userDetails ? (
              <div 
                ref={buttonRef} 
                className='bg-cyan-500 w-[40px] md:w-[45px] flex justify-center items-center text-xl md:text-2xl h-[40px] md:h-[45px] rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all duration-300' 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <p className="text-cyan-100 font-extrabold">
                  {userDetails.name && userDetails.name.length > 0 ? userDetails.name[0].toUpperCase() : ""}
                </p>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-5">
                <button
                  className="button-shine hover-glow relative bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 h-10 w-[110px] rounded-lg 
                  shadow-lg flex justify-center items-center transition-all duration-500 hover:scale-105 overflow-hidden group"
                  onClick={handleLogInButtonClick}
                  style={{ animationDelay: "0s" }}
                >
                  <span className="absolute inset-0 bg-cyan-400 opacity-40 blur-lg group-hover:opacity-50 transition-all duration-500"></span>
                  <span className="relative text-md font-serif font-semibold text-white flex items-center gap-2">
                    <IoMdLogIn />
                    Log In
                  </span>
                </button>
              
                <button
                  className="button-shine hover-glow relative bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 h-10 w-[110px] rounded-lg 
                  shadow-lg flex justify-center items-center transition-all duration-500 hover:scale-105 overflow-hidden group"
                  onClick={handleSignUpButtonClick}
                  style={{ animationDelay: "0.3s" }}
                >
                  <span className="absolute inset-0 bg-lime-400 opacity-40 blur-lg group-hover:opacity-50 transition-all duration-500"></span>
                  <span className="relative text-md font-serif text-white flex items-center gap-2">
                    <FaPlus />
                    Sign Up
                  </span>
                </button>
              </div>
            )}
            
            <button
              ref={toggleButtonRef}
              className="lg:hidden text-cyan-100 text-2xl flex items-center justify-center w-10 h-10"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar menu"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar for mobile  */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-[300px] sm:w-[350px] md:w-[400px] bg-gradient-to-b from-blue-700 to-blue-900 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`} ref={sidebarRef}>
        <div className="flex justify-between items-center p-4 border-b border-blue-600">
          <h2 className="text-cyan-100 font-serif font-medium text-base sm:text-lg">Menu</h2>
          <button onClick={toggleSidebar} className="text-cyan-100 text-2xl">
            <FaTimes />
          </button>
        </div>
        
        <ul className="text-cyan-100 font-serif flex flex-col mt-6">
          <Link to="/" className="py-3 px-6 hover:bg-blue-800 transition-colors duration-200 border-b border-blue-600/30">
            <li className="font-medium text-base sm:text-lg">Home</li>
          </Link>
          <Link to="/about-us" className="py-3 px-6 hover:bg-blue-800 transition-colors duration-200 border-b border-blue-600/30">
            <li className="font-medium text-base sm:text-lg">About Us</li>
          </Link>
          <Link to="/#how-it-works" className="py-3 px-6 hover:bg-blue-800 transition-colors duration-200 border-b border-blue-600/30">
            <li className="font-medium text-base sm:text-lg">How It Works</li>
          </Link>
          <button onClick={handleBusinessRegistration} className="py-3 px-6 hover:bg-blue-800 transition-colors duration-200 text-left w-full border-b border-blue-600/30">
            <li className="font-medium text-base sm:text-lg">Register Businesses</li>
          </button>
          <button onClick={handleAppliedJob} className="py-3 px-6 hover:bg-blue-800 transition-colors duration-200 text-left w-full border-b border-blue-600/30">
            <li className="font-medium text-base sm:text-lg">Applied Job</li>
          </button>
        </ul>
        
        {!userDetails && (
          <div className="absolute bottom-6 left-0 right-0 px-6">
            <div className="flex flex-col gap-3">
              <button
                className="button-shine relative bg-gradient-to-r from-cyan-500 to-cyan-600 py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-200 hover:from-cyan-600 hover:to-cyan-700 shadow-md"
                onClick={handleLoginFromSidebar}
              >
                <IoMdLogIn className="text-white text-lg sm:text-xl" />
                <span className="text-white font-serif font-medium text-sm sm:text-base">Log In</span>
              </button>
              
              <button
                className="button-shine relative bg-gradient-to-r from-lime-500 to-lime-600 py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-200 hover:from-lime-600 hover:to-lime-700 shadow-md"
                onClick={handleSignUpFromSidebar}
              >
                <FaPlus className="text-white text-lg sm:text-xl" />
                <span className="text-white font-serif font-medium text-sm sm:text-base">Sign Up</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

     
      {isDropdownOpen  && (
        <div 
          ref={menuRef} 
          className='bg-cyan-500 font-serif text-white drop-shadow-xl shadow-lg w-[130px] sm:w-[150px] absolute rounded-md z-50 right-4 md:right-6 mt-1 overflow-hidden'
          style={{ top: '80px' }}
        >
          <div className="cursor-pointer py-3 w-full flex justify-center items-center hover:bg-blue-500 hover:text-white transition border-blue-900 border-b">
            <Link to="/profile" className="w-full text-center">
              <span className="text-base sm:text-lg font-medium">Profile</span>
            </Link>
          </div>
          <div className="py-3 w-full flex justify-center cursor-pointer items-center hover:bg-blue-500 hover:text-white transition rounded-b-md" onClick={handleLogout}>
            <span className="text-base sm:text-lg font-medium">Logout</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;