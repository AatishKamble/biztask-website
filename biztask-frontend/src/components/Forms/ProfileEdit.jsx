import React, { useEffect, useRef, useState } from 'react'
import { FaSave } from "react-icons/fa";
import { updateUserProfile } from "../../Redux/Auth/Action.js";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import dummyPhoto from "../../assets/uploadPhoto.jpg"
const ProfileEdit = ({ userDetails }) => {

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const jwt = localStorage.getItem("jwt");
    const profilePic = useRef(null);
    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        mobileNumber: "",
    });

    useEffect(() => {
        if (userDetails) {
            setFormData({
                name: userDetails.name || "",
                mobileNumber: userDetails.mobileNumber || "",
            });

        }

    }, []);


    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }


    const handleProfileChange = (event) => {

        setImage(event.target.files[0]);
    }

    const handlePhotoUpload = () => {
        profilePic.current.click();

    }

    const handleSubmit = (e) => {
        e.preventDefault();
      
        const formD = new FormData();
        formD.append("name", formData.name);
        formD.append("mobileNumber", formData.mobileNumber);
        formD.append("profileImage", image);
       
        dispatch(updateUserProfile(jwt,formD));
        navigate("/profile");
    }



    return (
        <>
            <div className='bg-[#ffffff] py-20 w-full h-auto flex items-center justify-center'>

                <div className='w-[50%] h-full bg-[#f4faff] p-10'>

                    <div className='w-full h-[50px] font-semibold flex justify-center pb-10  items-center text-[26px] text-blue-900 font-serif'>
                        <span>Edit Profile</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='w-full h-[50px] flex py-10  items-center text-black'>

                            <label htmlFor="Name" className=' text-[24px] px-4 font-medium font-serif w-[200px]'> Name :</label>
                            <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Enter Your Name' className=' text-[20px] w-full h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md  focus-within:drop-shadow-xl' autoComplete='none' />
                        </div>

                        <div className='w-full h-[50px] flex py-10  items-center text-black'>

                            <label htmlFor="Name" className=' text-[22px] px-4 font-medium font-serif w-[200px]'> Email :</label>
                            <input type="email" name='email' value={userDetails?.email || ""} className=' text-[20px] h-12 font-serif text-slate-400 outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' disabled />
                        </div>

                        <div className='w-full h-[50px] flex py-10 items-center text-black'>

                            <label htmlFor="Name" className=' text-[22px] px-4 font-medium w-[200px] font-serif'> Phone :</label>
                            <input type="tel" name='mobileNumber' placeholder='Enter Your Mobile Number' value={formData.mobileNumber} onChange={handleChange} className=' text-[20px] h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md w-full focus-within:drop-shadow-xl' autoComplete='none' />
                        </div>

                        <div className='w-full h-auto flex my-10 items-center  text-black'>

                            <label htmlFor="Name" className=' text-[22px] px-4 font-medium font-serif w-[300px]'> Profile Image :</label>
                            <div className='w-[200px] h-[200px] bg-slate-700 cursor-pointer  border-[1px]  border-slate-200  rounded-xl shadow-blue-700' onClick={handlePhotoUpload}>

                                <img src={image ? URL.createObjectURL(image) : {dummyPhoto}} alt="photo" className='bg-cover rounded-xl  border-[1px] bg-center w-full h-full' />


                            </div>
                            <input type="file" className='  hidden' ref={profilePic} onChange={handleProfileChange} />
                        </div>


                        <div className='flex items-center justify-center my-10 h-[200px]'>


                            <button type='submit' className=' bg-blue-900 hover:bg-[#1e52c3] align-middle h-12 w-[130px] rounded-xl border-blue-950 drop-shadow-2xl mx-3 flex justify-center items-center' >
                                <span className='text-lg font-serif font-medium me-1 text-white'><FaSave /></span>
                                <span className='text-lg font-serif font-medium text-white'>Save</span>

                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}

export default ProfileEdit