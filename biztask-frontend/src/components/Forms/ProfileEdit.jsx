import React, { useRef, useState } from 'react'
import { FaSave } from "react-icons/fa";
const ProfileEdit = () => {

    const profilePic=useRef(null);
const [image,setImage]=useState(null);

const handleProfileChange=(event)=>{
 
    setImage(event.target.files[0]);
}
    const handlePhotoUpload=()=>{
        profilePic.current.click();

    }
  return (
    <>
    <div className='bg-[#ffffff] py-20 w-full h-auto flex items-center justify-center'>

        <div className='w-[50%] h-full bg-[#f4faff] p-10'>

        <div className='w-full h-[50px] font-semibold flex justify-center pb-10  items-center text-[26px] text-blue-900 font-serif'>
            <span>Edit Profile</span>
</div>

            <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="Name" className=' text-[24px] px-4 font-medium font-serif w-[200px]'> Name :</label>
                    <input type="text"  placeholder='Enter Your Name' className=' text-[20px] w-full h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md  focus-within:drop-shadow-xl' autoComplete='none'/>
            </div>
            
            <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="Name" className=' text-[22px] px-4 font-medium font-serif w-[200px]'> Email :</label>
                    <input type="email"  placeholder='Enter Your Email' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none'/>
            </div>
            
            <div className='w-full h-[50px] flex py-10 items-center text-black'>

                    <label htmlFor="Name" className=' text-[22px] px-4 font-medium w-[200px] font-serif'> Phone :</label>
                    <input type="tel"  placeholder='Enter Your Mobile Number' className=' text-[20px] h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md w-full focus-within:drop-shadow-xl' autoComplete='none'/>
            </div>
            
            <div className='w-full h-auto flex my-10 items-center  text-black'>

                    <label htmlFor="Name" className=' text-[22px] px-4 font-medium font-serif w-[300px]'> Profile Image :</label>
                    <div className='w-[200px] h-[200px] bg-slate-700 cursor-pointer  border-[2px]  border-slate-400  rounded-xl shadow-blue-700' onClick={handlePhotoUpload}>
                  
                        {image?
                            <img src={URL.createObjectURL(image)} alt="photo" className='bg-cover rounded-xl  border-[2px] bg-center w-full h-full'/>
                        : 
                         <img src="../src/assets/uploadPhoto.jpg" alt="photo" className='bg-cover rounded-xl  border-[2px] bg-center w-full h-full'/>
                  }
                    
                    </div>
                    <input type="file" className=' hidden' ref={profilePic} onChange={handleProfileChange} />
            </div>


<div className='flex items-center justify-center my-10 h-[200px]'>


            <button className=' bg-blue-900 hover:bg-[#1e52c3] align-middle h-12 w-[130px] rounded-xl border-blue-950 drop-shadow-2xl mx-3 flex justify-center items-center' >
                <span className='text-lg font-serif font-medium me-1 text-white'><FaSave /></span>
                <span className='text-lg font-serif font-medium text-white'>Save</span>

              </button>
              </div>
        </div>
    </div>
    
    
    </>
  )
}

export default ProfileEdit