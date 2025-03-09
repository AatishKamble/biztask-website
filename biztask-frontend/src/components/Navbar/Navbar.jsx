import { VscAzure } from "react-icons/vsc";
import { IoMdLogIn } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Login from "../Login/Login";
import SignUP from "../Login/SignUP";
import { logout } from "../../Redux/Auth/Action.js";
import { useDispatch } from "react-redux";
import logo from "../../assets/logo-transparent.png";

const Navbar = ({ userDetails, login, handleLogInButtonClick, handleSignUpButtonClick, signUp }) => {


  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();

  function handleLogout() {

    dispatch(logout());
    setIsDropdownOpen(false);
    navigate('/');
  }

  const location = useLocation();
  useEffect(() => {

    setIsDropdownOpen(false);

  }, [location]); //for closing dropdown of profile and logout


  let menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    let handler = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  });




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
      {login &&
        <Login openState={login} type="login" handleButtonClick={handleLogInButtonClick} handleSignUpButtonClick={handleSignUpButtonClick} />

      }

      {signUp &&
        <SignUP openState={signUp} type="signup" handleButtonClick={handleSignUpButtonClick} handleLogInButtonClick={handleLogInButtonClick} />

      }



      <div className='bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 w-full h-20 flex justify-between items-center shadow-lg'>

        <div className='h-44 w-44 bg-inherit p-2 flex items-center'>

          <img src={logo} alt='logo' className='h-full  w-full object-cover' />
          {/* <span className="font-bold text-[50px] px-6 align-middle items-center text-cyan-100 drop-shadow-lg">
         <VscAzure /></span> */}
        </div>
        <div className='h-16 w-[80%] bg-inherit flex justify-center items-center '>

          <div className='h-16 ps-5   bg-inherit flex justify-between items-center '>
            <ul className='text-lg xl:gap-10 2xl:gap-10 sm:gap-8 font-serif font-medium text-cyan-100 flex justify-between tracking-wide'>
              <Link to={"/"}
                className="group relative text-cyan-100  hover:text-cyan-400 transition duration-300 ease-in-out font-medium text-lg tracking-wide"
              >
                <li className=' cursor-pointer  '>Home
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>

                </li></Link>
              <Link to={"/about-us"}
                className="group relative text-cyan-100 hover:text-cyan-400 transition duration-300 ease-in-out font-medium text-lg tracking-wide"
              >
                <li className=' cursor-pointer ' >About Us
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>

                </li></Link>
              <Link to={"/#how-it-works"}
                className="group relative text-cyan-100 hover:text-cyan-400 transition duration-300 ease-in-out font-medium text-lg tracking-wide"
              >
                <li className=' cursor-pointer ' >How It Works
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>


                </li>
              </Link>
              <li>
                <button
                  onClick={handleBusinessRegistration}
                  className="group relative text-cyan-100 hover:text-cyan-400 transition duration-300 ease-in-out font-medium text-lg tracking-wide"
                >
                  Register Businesses
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>

                </button>

              </li>
              <li>
                <button
                  onClick={handleAppliedJob}
                  className="group relative text-cyan-100 hover:text-cyan-400 transition duration-300 ease-in-out font-medium text-lg tracking-wide"
                >
                  Applied Job
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sky-300 transition-all duration-300 group-hover:w-full"></span>

                </button>
              </li>
            </ul>

          </div>

        </div>



        {
          userDetails ?
            <>

              <div className="w-[15%] h-14 flex items-center justify-end pe-10 cursor-pointer bg-inherit ">
                {


                  userDetails.name.length > 0 ? <div ref={buttonRef} className=' bg-cyan-500 w-[50px] flex justify-center items-center text-[30px] h-[50px] rounded-full  ' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>



                    <p className="text-cyan-100 font-extrabold  ">{userDetails.name.length > 0 ? userDetails.name[0].toUpperCase() : ""}</p>
                  </div> : <div ref={buttonRef} className=' bg-slate-300 w-[50px] flex justify-center items-center text-[30px] h-[50px] rounded-full  ' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>

                  </div>
                }



              </div>

            </> :
            <div className="xl:w-[20%] sm:w-[20%] sm:me-4 h-14 flex items-center justify-between bg-inherit">

              {/* Log In Button */}
              <button
                className="relative bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 h-10 xl:w-[110px] sm:w-[100px] rounded-xl border border-yellow-700 shadow-lg mx-2 flex justify-center items-center transition-transform duration-300 hover:scale-110 overflow-hidden group"
                onClick={handleLogInButtonClick}
              >
                {/* Hover Background Glow Effect */}
                <span className="absolute inset-0 bg-cyan-400 opacity-40 blur-lg group-hover:opacity-50 transition-all duration-500"></span>

                {/* Icon & Text */}
                <span className="relative text-md font-serif font-semibold text-white flex items-center gap-2">
                  <IoMdLogIn />
                  Log In
                </span>
              </button>

              {/* Sign Up Button */}
              <button
                className="relative bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 h-10 xl:w-[110px] sm:w-[100px] rounded-xl border border-yellow-700 shadow-lg mx-2 flex justify-center items-center transition-transform duration-300 hover:scale-110 overflow-hidden group"
                onClick={handleSignUpButtonClick}
              >
                {/* Hover Background Glow Effect */}
                <span className="absolute inset-0 bg-lime-400 opacity-40 blur-lg group-hover:opacity-50 transition-all duration-500"></span>

                {/* Icon & Text */}
                <span className="relative text-md font-serif font-medium text-black flex items-center gap-2">
                  <FaPlus />
                  Sign Up
                </span>
              </button>
            </div>

        }





      </div>



      {isDropdownOpen &&


        <div ref={menuRef} className=' bg-cyan-500 text-white drop-shadow-xl shadow-lime-400  w-[120px] h-auto absolute  rounded-b-md top-[84px] right-8 z-50 ' >
          <div className=" cursor-pointer  py-2 w-full flex justify-center items-center hover:bg-blue-500 hover:text-white transition border-blue-900 border-b " style={{ transition: "all 0.3s ease-in-out" }}>
            <Link to="/profile">
              <span className="text-[20px] font-serif ">Profile</span></Link>
          </div>
          <div className=" py-2 w-full   flex justify-center cursor-pointer items-center hover:bg-blue-500 hover:text-white transition rounded-b-md " onClick={handleLogout}>
            <span className="text-[20px] font-serif ">
              Logout
            </span>
          </div>
        </div>
      }



    </>
  );
}

export default Navbar;