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
import { RiMenu2Fill } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { IoMdLogOut } from "react-icons/io";
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
  const handleBackToLogin = () => {
    if (forgotPassword) setForgotPassword(false);
    handleLogInButtonClick();
  }


  return (
    <>
      {login && <Login openState={login} type="login" handleButtonClick={handleLogInButtonClick} handleSignUpButtonClick={handleSignUpButtonClick} handleForgotPasswordClick={handleForgotPasswordClick} />}
      {signUp && <SignUP openState={signUp} type="signup" handleButtonClick={handleSignUpButtonClick} handleLogInButtonClick={handleLogInButtonClick} />}
      {forgotPassword && <ForgotPassword openState={forgotPassword} handleButtonClick={handleForgotPasswordClick} handleBackToLogin={handleBackToLogin} />}

      <div className='bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 w-full h-20 flex items-center shadow-lg drop-shadow-2xl backdrop-blur-sm'>
        <div className='w-full pe-4 md:pe-6 flex items-center justify-between'>
          {/* Logo Section */}
          <div className='sm:h-20 sm:w-44 h-20 w-[170px] bg-inherit  flex items-center'>
            <img src={logo} alt='logo' className='h-full w-full object-cover' />
          </div>

          {/* Navigation Links */}
          <div className='hidden lg:flex '>
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
               <Link to={"/services"} className="group relative text-cyan-100 hover:text-cyan-300 transition duration-300 ease-in-out font-semibold text-lg tracking-wide">
                <li className='cursor-pointer'>Services
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
                </li>
              </Link>
               <Link to={"/jobs"} className="group relative text-cyan-100 hover:text-cyan-300 transition duration-300 ease-in-out font-semibold text-lg tracking-wide">
                <li className='cursor-pointer'>Jobs
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>
                </li>
              </Link>
            
            </ul>
          </div>

          {/* User Actions Section */}
          <div className="flex items-center space-x-2">
            {userDetails ? (
              <div className="w-[40px] md:w-[240px] flex justify-end ">
                <div
                  ref={buttonRef}
                  className='bg-cyan-500 w-[40px] md:w-[50px] flex justify-center items-center text-xl md:text-2xl h-[40px] md:h-[50px] rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all duration-300'
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {/* <p className="text-cyan-100 font-extrabold">
                  {userDetails.name && userDetails.name.length > 0 ? userDetails.name[0].toUpperCase() : ""}
                </p> */}
                  <img src={userDetails?.profileImage?.ImageUrl} alt="profile image" className="w-full h-full rounded-full" />
                </div></div>
            ) : (
              <div className="hidden lg:flex items-center space-x-5">
                <button
                  className="button-shine  relative bg-gradient-to-r from-blue-500 to-blue-600 border border-white  h-10 w-[110px] rounded-lg 
                  shadow-lg flex justify-center items-center transition-all duration-500 hover:scale-105 overflow-hidden group"
                  onClick={handleLogInButtonClick}
                  style={{ animationDelay: "0s" }}
                >
                  <span className="absolute inset-0 bg-blue-400 opacity-40 blur-lg group-hover:opacity-50 transition-all duration-500"></span>
                  <span className="relative text-md font-serif font-semibold text-white flex items-center gap-2">
                    <IoMdLogIn />
                    Log In
                  </span>
                </button>

                <button
                  className="button-shine border border-green-700 relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-10 w-[110px] rounded-lg 
                  shadow-lg flex justify-center items-center transition-all duration-500 hover:scale-105 overflow-hidden group"
                  onClick={handleSignUpButtonClick}
                  style={{ animationDelay: "0.3s" }}
                >
                  <span className="absolute inset-0 bg-green-400 opacity-40 blur-lg group-hover:opacity-50 transition-all duration-500"></span>
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
        <div className="flex justify-between items-center px-5 py-4 border-b border-blue-700/50 bg-blue-900/40 backdrop-blur-sm">
          <h2 className="text-cyan-100 font-serif text-xl sm:text-2xl flex items-center gap-2">
            <RiMenu2Fill className="text-cyan-200" />
            <span className="font-medium">Menu</span>
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-cyan-200 hover:text-white transition duration-200 text-2xl"
          >
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
         
               <Link to="/services" className="py-3 px-6 hover:bg-blue-800 transition-colors duration-200 border-b border-blue-600/30">
            <li className="font-medium text-base sm:text-lg">Services</li>
          </Link>

          <Link to="/jobs" className="py-3 px-6 hover:bg-blue-800 transition-colors duration-200 border-b border-blue-600/30">
            <li className="font-medium text-base sm:text-lg">Jobs</li>
          </Link>
               
        </ul>

        {!userDetails && (
          <div className="absolute bottom-6 left-0 right-0 px-6">
            <div className="flex flex-col gap-3">
              <button
                className="button-shine relative bg-gradient-to-r from-blue-500 to-blue-600 border border-white py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-200  shadow-md"
                onClick={handleLoginFromSidebar}
              >
                <IoMdLogIn className="text-white text-lg sm:text-xl" />
                <span className="text-white font-serif font-medium text-sm sm:text-base">Log In</span>
              </button>

              <button
                className="button-shine border-green-700 relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-200  shadow-md"
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


      {isDropdownOpen && (
     <div
  ref={menuRef}
  className="absolute right-2 sm:right-4 md:right-6 mt-2 w-[220px] 
     bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 
     text-white font-serif rounded-2xl shadow-2xl
     overflow-hidden z-50 transform transition-all duration-300 ease-out
     animate-fadeIn border border-blue-400/30 backdrop-blur-md"
  style={{ top: '68px' }}
>
  
  <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400"></div>

  {/* Menu Content */}
  <div className="p-2">
    {/* Profile Link */}
    <Link
      to="/profile"
      className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl
         hover:bg-white/15 active:bg-white/25 transition-all duration-200
         group relative overflow-hidden"
    >
      
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/15 to-cyan-400/0 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full 
          bg-gradient-to-br from-cyan-400 to-blue-400 shadow-lg
          group-hover:scale-110 group-hover:shadow-cyan-400/50
          transition-all duration-200">
        <ImProfile className="text-[18px] text-blue-900" />
      </div>
      <div className="relative flex flex-col">
        <span className="text-base sm:text-lg font-semibold tracking-wide">
          Profile
        </span>
        <span className="text-xs text-blue-200 font-light">View your account</span>
      </div>
    </Link>

    {/*  divider */}
    <div className="flex items-center gap-2 px-2 my-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
      <div className="w-1 h-1 rounded-full bg-blue-300"></div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
    </div>

    {/* Logout Button */}
    <div
      onClick={handleLogout}
      className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl cursor-pointer
         hover:bg-white/15 active:bg-white/25 transition-all duration-200
         group relative overflow-hidden"
    >
      
      <div className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-rose-400/15 to-rose-400/0 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full 
          bg-gradient-to-br from-rose-400 to-pink-400 shadow-lg
          group-hover:scale-110 group-hover:shadow-rose-400/50
          transition-all duration-200">
        <IoMdLogOut className="text-[18px] text-rose-900" />
      </div>
      <div className="relative flex flex-col">
        <span className="text-base sm:text-lg font-semibold tracking-wide">
          Logout
        </span>
        <span className="text-xs text-blue-200 font-light">End your session</span>
      </div>
    </div>
  </div>

  
  <div className="h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
</div>


      )}
    </>
  );
}

export default Navbar;