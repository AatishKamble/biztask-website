import React from 'react'
import { useState } from 'react';
import { GoLock } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetPassword } from '../../Redux/Auth/Action';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const ResetPassword = () => {


    const [formData,setFormData]=useState({
        password:"",
        confPassword:""
    });

    const dispatch=useDispatch()
    const handleInputChange=(e)=>{
        const value=e.target.value;
        const name=e.target.name;
        setFormData({
            ...formData,
            [name]:value
        });
    }

    const authStore=useSelector(store=>store.auth);

const {id,token}=useParams();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (formData.password == formData.confPassword) {
            
           dispatch(resetPassword({password:formData.password},id,token))
        }
        else {
            setFormData({
                password:"",
                confPassword:""
            });
        
        toast.error("Password and confirm Password should be same");
        }
    }
  return (
    <>
   
                    <div className=' bg-inherit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-auto flex justify-center items-center flex-col px-5' >
                    {
                        authStore.message?<div className='w-[40%]  bg-slate-100 flex flex-col justify-center items-center p-10 text-center'>
                            <span className='text-[28px] font-serif font-semibold text-blue-900'>{authStore.message}</span>
                            <Link to="/" className='my-10 bg-[#2534a5] hover:bg-[#283069] flex justify-center items-center font-serif w-[200px] h-[50px] text-[#c4d5e3] font-bold rounded-xl'>
                            <span > Go to Home</span>
                            </Link>
                        </div>:
                       
                    <form onSubmit={handleSubmit} className='w-[40%] bg-slate-100 px-10 pb-10'>
                       
                        
                    <div className='  h-14 w-full flex flex-col justify-center items-center my-10  rounded-md' >
                            
                            <span className='text-[28px] font-serif font-semibold text-blue-900'>Reset Password</span>
                            <span className='text-[18px] text-blue-900 font-serif'>to continue with bizTask</span>
                                </div>
                        <div className='bg-[#c5c8cd] rounded-md mt-5 h-14 w-full flex justify-center items-center text-slate-600'>
                            <div className='w-[4rem] h-10 bg-inherit flex justify-center items-center text-[24px] '>
                                <GoLock />
                            </div>
                            <input type="password" name='password' value={formData.password} onChange={handleInputChange}  placeholder='password' className='w-full p-2 me-4 h-12 text-[20px] align-middle font-sans font-medium outline-none bg-inherit' autoComplete='false' />
                        </div>

                       <div className='bg-[#c5c8cd] rounded-md my-5 h-14 w-full flex justify-center items-center text-slate-600'>
                            <div className='w-[4rem] h-10 bg-inherit flex justify-center items-center text-[24px] '>
                                <GoLock />
                            </div>
                       
                            <input type="password" name='confPassword' value={formData.confPassword} onChange={handleInputChange}  placeholder='Confirm password' className='w-full p-2 me-4 h-12 text-[20px] align-middle font-sans font-medium outline-none bg-inherit' autoComplete='false' />
                        </div>
                        


                        <div className='bg-blue-900 hover:bg-[#1e52c3] cursor-pointer rounded-sm my-5 h-16 w-full flex justify-center items-center text-slate-100 hover:text-slate-500' >
                            {/* //diff */}
                            <button type='submit' className='text-[24px] font-serif font-semibold'>Reset</button>
                        </div>


                      
 </form>
}
                    </div>
               
    
    </>
  )
}

export default ResetPassword;