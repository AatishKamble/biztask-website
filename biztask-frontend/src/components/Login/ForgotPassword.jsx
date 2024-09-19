import React from 'react'
import { useState } from 'react';
import { MdOutlineMail } from "react-icons/md";
import { useDispatch } from 'react-redux';
import {forgotPassword} from "../../Redux/Auth/Action.js";
import { Link } from 'react-router-dom';
const ForgotPassword = () => {

    const [emailInput,setEmailInput]=useState("");
const dispatch=useDispatch();
    const handleSubmit=(e)=>{
        e.preventDefault();
       
const formData={
    email:emailInput
}
       dispatch(forgotPassword(formData));
       setEmailInput("");
    }
  return (
    <>
    
 
                    <div className=' bg-inherit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full  h-auto flex justify-center items-center flex-col px-5' >
                        

<form onSubmit={handleSubmit} className='w-[40%] bg-slate-100 px-20 py-10' >

<div className='  h-20 w-full flex flex-col justify-center items-center my-10  rounded-md' >
                            
                            <span className='text-[28px] font-serif font-semibold text-blue-900'>Forgot password</span>
                            <span className='text-[20px] font-serif text-center py-5 text-blue-400'>Enter Email address to get link to reset your password</span>
                             </div>
                        <div className='bg-[#c5c8cd] h-14 w-full flex justify-center items-center text-slate-600 rounded-md' >
                            <div className='w-[4rem] h-10 bg-inherit flex justify-center items-center text-[24px] '>
                                <MdOutlineMail />
                            </div>
                            <input type="text" name='email' value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}}  placeholder='Enter Email' className='w-full p-2 me-4 h-10 text-[20px] align-middle font-sans font-medium outline-none bg-inherit' />
                        </div>



                        <div className='bg-blue-900 hover:bg-[#1e52c3] cursor-pointer rounded-sm my-5 h-16 w-full flex justify-center items-center text-slate-100 hover:text-slate-500' >
                       
                            <button type='submit' className='text-[24px] font-serif font-semibold'>Send Email</button>
                        </div>

<div className='w-full flex justify-center'>
                        <Link to="/" className='my-5 bg-[#2d76a7]  hover:bg-[#105d70] flex justify-center items-center font-serif w-[200px] h-[50px] text-[#c4d5e3] font-bold rounded-xl'>
                            <span > Go to Home</span>
                            </Link>
                            </div>
                        </form>
                    </div>
            
    
    </>
  )
}

export default ForgotPassword