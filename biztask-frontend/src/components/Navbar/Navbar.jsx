import { VscAzure } from "react-icons/vsc";
import { IoMdLogIn } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import {Link} from 'react-router-dom';
import Login from "../Login/Login";
import SignUP from "../Login/SignUP";

const Navbar = ({scrollToSection,howItWorkRef}) => {

  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [loged, setLoged] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



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


  const handleLogInButtonClick = () => {
    setLogin(!login);
  }

  const handleSignUpButtonClick = () => {
    setSignUp(!signUp);
  }



  return (
    <>
      {login &&
        <Login longState={login} handleLogInButtonClick={handleLogInButtonClick} handleSignUpButtonClick={handleSignUpButtonClick} />

      }

      {signUp &&
        <SignUP signUp={signUp} handleSignUpButtonClick={handleSignUpButtonClick} handleLogInButtonClick={handleLogInButtonClick} />

      }



      <div className='bg-[#eef3f3] w-full h-20 flex justify-between items-center drop-shadow-md'>


        <div className='h-20 w-20 bg-inherit p-2 flex items-center'>
          {/*            
            <img src='../../src/assets/Designer.png' alt='logo' className='h-full object-cover'/> */}
          <span className=" font-bold text-[50px] px-6 align-middle items-center text-blue-900">
            <VscAzure /></span>
        </div>
        <div className='h-16 w-[80%] bg-inherit flex justify-center items-center '>

          <div className='h-16 w-[70%] bg-inherit flex justify-between items-center '>
            <ul className='text-xl font-serif font-medium text-black flex justify-between '>
              <Link to={"/"}>
              <li className=' cursor-pointer mx-6'>Home</li></Link>
              <Link to={"/about-us"}>
              <li className='mx-6 cursor-pointer'>About Us</li></Link>
              <li className='mx-6 cursor-pointer' onClick={()=>scrollToSection(howItWorkRef)}>How It Works</li>
             <Link to={"/bussiness-registration"}> <li className='mx-6 cursor-pointer'>Register Businesses</li></Link>
             <Link to={"/job-post"} ><li className='mx-6 cursor-pointer'>Post Job</li></Link>

            </ul>

          </div>

        </div>



        {
          loged ?
            <>

              <div className="w-[20%] h-14 flex items-center justify-end pe-10 cursor-pointer bg-inherit ">
                <div   ref={buttonRef} className=' bg-slate-500 w-[50px] h-[50px] rounded-full  ' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>

                </div>


              </div>
             
            </> :
            <div className='w-[20%] h-14 flex items-center justify-beetween bg-inherit '>

              <button className=' bg-blue-900 hover:bg-[#1e52c3] align-middle h-10 w-[110px] rounded-xl border-blue-950 drop-shadow-2xl mx-3 flex justify-center items-center' onClick={handleLogInButtonClick}>
                <span className='text-md font-serif font-medium me-1 text-white'><IoMdLogIn /></span>
                <span className='text-md font-serif font-medium text-white'>Log In</span>

              </button>
              <button className=' bg-blue-900 hover:bg-[#1e52c3]  align-middle h-10 w-[110px] rounded-xl border-blue-950 drop-shadow-2xl flex justify-center items-center px-1' onClick={handleSignUpButtonClick}>
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
              <div className=" py-2 w-full   flex justify-center cursor-pointer items-center hover:bg-slate-300  ">
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