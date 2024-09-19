
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useRef, useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { useNavigate,useParams, useLocation } from 'react-router-dom';
import AddedBox from "./AddedBox";
import { businessRegister,getBusinessById,updateBusiness } from "../../Redux/Business/Action.js";
import { useEffect } from "react";
import dummyPhoto from "../../assets/uploadPhoto.jpg"

const BusinessRegistration = ({ userDetails,registration }) => {

    const profilePic = useRef(null);
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");

    const [formData, setFormData] = useState({
        companyName: "",
        description: "",
    });

    const { id } = useParams();   
  

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });


    }

const businessStore=useSelector(store=>store.businessStore)

   useEffect(() => {
        if (id) {
         
            dispatch(getBusinessById(id)); 
        }
    }, [id, dispatch]);
  
    useEffect(() => {
        if (businessStore.business && businessStore.business._id === id) {
           
            setFormData({
                companyName: businessStore.business.companyName,
                description: businessStore.business.description,
            });
        }
    }, [businessStore.business, id]);

    const handleProfileChange = (event) => {

        setImage(event.target.files[0]);
    }

    const handlePhotoUpload = () => {
        profilePic.current.click();

    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const formD = new FormData();
        formD.append("companyName", formData.companyName);
        formD.append("description", formData.description);
        if(image){
            
        }
        formD.append("companyLogo", image);
      

        if(registration==true){
        dispatch(businessRegister(formD,jwt));     
        }
        else{
            dispatch(updateBusiness(jwt, formD, id))
        }
       
        navigate("/profile");
    }

    return (
        <div className='bg-[#ffffff] py-10 w-full h-auto flex items-center justify-center'>

            <div className='w-[50%] h-full bg-[#f4faff] p-10'>

                <div className='w-full h-[50px] font-semibold flex justify-center pb-10  items-center text-[26px] text-blue-950 font-serif'>
                    <span>{registration==true?"Register Your Business":"Update Business"}</span>
                </div>


                <form onSubmit={handleSubmit}>
                    <div className='w-full h-[50px]  flex  py-10 justify-center  items-center text-[20px] text-blue-900 font-serif'>
                        <span className="ps-20">Contact Details (Provider)</span>
                    </div>


                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Name :</label>
                        <input type="text" value={userDetails?.name || ""} className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' disabled />
                    </div>
                    <div className='w-full h-[50px] flex py-10 items-center text-black'>

                        <label htmlFor="mono" className=' text-[20px] px-4 font-medium w-[300px] font-serif'> Phone :</label>
                        <input type="tel" name="mono" value={userDetails?.mobileNumber || ""} className=' text-[20px] h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md w-full focus-within:drop-shadow-xl' autoComplete='none' disabled />
                    </div>

                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="email" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Email :</label>
                        <input type="email" name="email" value={userDetails?.email || ""} className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' disabled />
                    </div>





                    <div className='w-full h-[50px]  flex  py-10 justify-center  items-center text-[20px] text-blue-900 font-serif'>
                        <span className="ps-20">Business Details </span>
                    </div>
                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Company Name :</label>
                        <input type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder='Enter Your company Name' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                    </div>


                    <div className='w-full h-[300px] flex py-10  items-center text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Company Description :</label>

                        <textarea name="description" id="DescriptionBox"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description about your Business (maxLength-300 words)"
                            className=' text-[20px] h-[300px] font-serif outline-none p-4  w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl'
                            rows={5} cols={40}
                            style={{ resize: 'none', overflow: 'hidden' }}

                        ></textarea>

                    </div>







                    <div className='w-full h-auto flex my-10 items-center  text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Company Logo:</label>
                        <div className='w-[200px] h-[200px] bg-slate-700 cursor-pointer   border-[1px]  border-slate-200  rounded-xl shadow-blue-700' onClick={handlePhotoUpload}>
                       
                        <img src={image ? URL.createObjectURL(image) : dummyPhoto} alt="photo" className='bg-cover rounded-xl  border-[1px] bg-center w-full h-full' />


                        </div>
                        <input type="file" className=' hidden' ref={profilePic} onChange={handleProfileChange} />
                    </div>


                    <div className='flex items-center justify-center my-10 h-[200px]'>


                        <button type='submit' className=' bg-blue-900 hover:bg-[#1e52c3] align-middle h-12 w-[130px] rounded-xl border-blue-950 drop-shadow-2xl mx-3 flex justify-center items-center' >
                            <span className='text-lg font-serif font-medium me-1 text-white'><FaSave /></span>
                            <span className='text-lg font-serif font-medium text-white'>Submit</span>

                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default BusinessRegistration