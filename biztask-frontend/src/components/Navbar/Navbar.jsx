import { VscAzure } from "react-icons/vsc";
import { IoMdLogIn } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import {Link, useNavigate,useLocation} from 'react-router-dom';
import Login from "../Login/Login";
import SignUP from "../Login/SignUP";
import {logout } from "../../Redux/Auth/Action.js";
import { useDispatch} from "react-redux";

const Navbar = ({userDetails,login,handleLogInButtonClick,handleSignUpButtonClick,signUp}) => {

  
 const navigate=useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 
  const dispatch=useDispatch();
  
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
  let handler =  (event) => {
    if (menuRef.current &&!menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)){
      setIsDropdownOpen(false);
    }
  }
  document.addEventListener("mousedown",handler);

  return () => {
    document.removeEventListener("mousedown",handler)
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



      <div className='bg-[#eef3f3] w-full h-20 flex justify-between items-center drop-shadow-md'>


        <div className='h-20 w-20 bg-inherit p-2 flex items-center'>
          {/*            
            <img src='../../src/assets/Designer.png' alt='logo' className='h-full object-cover'/> */}
          <span className=" font-bold text-[50px] px-6 align-middle items-center text-blue-900">
            <VscAzure /></span>
        </div>
        <div className='h-16 w-[80%] bg-inherit flex justify-center items-center '>
          
          <div className='h-16 ps-5  bg-inherit flex justify-between items-center '>
            <ul className='text-xl xl:gap-16 2xl:gap-20 sm:gap-8 font-serif font-medium text-black  flex justify-between '>
              <Link to={"/"}>
              <li className=' cursor-pointer '>Home</li></Link>
              <Link to={"/about-us"}>
              <li className=' cursor-pointer '>About Us</li></Link>
              <Link to={"/#how-it-works"} >
              <li className=' cursor-pointer ' >How It Works</li>
              </Link>
 <li className=' cursor-pointer' onClick={handleBusinessRegistration}>Register Businesses</li>
          <li className=' cursor-pointer' onClick={handleAppliedJob}>Applied Job</li>

            </ul>

          </div>

        </div>



        {
          userDetails? 
            <>

              <div className="w-[15%] h-14 flex items-center justify-end pe-10 cursor-pointer bg-inherit ">
                {
                  

                  userDetails.name.length>0? <div   ref={buttonRef} className=' bg-slate-300 w-[50px] flex justify-center items-center text-[30px] h-[50px] rounded-full  ' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
  

  
<p className="text-blue-900 font-extrabold ">{userDetails.name.length>0?userDetails.name[0].toUpperCase():""}</p>
</div>:<div   ref={buttonRef} className=' bg-slate-300 w-[50px] flex justify-center items-center text-[30px] h-[50px] rounded-full  ' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>

</div>
                }
               


              </div>
             
            </> :
            <div className='xl:w-[20%] sm:w-[20%] sm:me-2 xl:me-0 h-14 flex items-center justify-beetween bg-inherit '>

              <button className=' bg-blue-800 hover:bg-[#0c2a6c] align-middle h-10 xl:w-[110px] sm:w-[100px] rounded-xl border-blue-950 drop-shadow-2xl mx-3 flex justify-center items-center' onClick={()=>handleLogInButtonClick()}>
                <span className='text-md font-serif font-medium me-1 text-white'><IoMdLogIn /></span>
                <span className='text-md font-serif font-medium text-white'>Log In</span>

              </button>
              <button className=' bg-blue-800 hover:bg-[#0c2a6c]  align-middle h-10 xl:w-[110px]  sm:w-[100px] rounded-xl border-blue-950 drop-shadow-2xl flex justify-center items-center px-1' onClick={()=>handleSignUpButtonClick()}>
                <span className='text-md font-serif font-medium me-1 text-white'><FaPlus /></span>
                <span className='text-md font-serif font-medium text-white'>Sign Up</span>

              </button>
            </div>
        }



      </div>

              {isDropdownOpen &&

                
              <div ref={menuRef} className=' bg-slate-200 drop-shadow-xl shadow-slate-400  w-[120px] h-auto absolute  top-20 right-8 z-50 ' >
              <div className=" cursor-pointer  py-2 w-full flex justify-center items-center hover:bg-slate-300 ">
            <Link to="/profile">
                <span className="text-[20px] font-serif ">Profile</span></Link>
              </div>
              <div className=" py-2 w-full   flex justify-center cursor-pointer items-center hover:bg-slate-300  " onClick={handleLogout}>
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