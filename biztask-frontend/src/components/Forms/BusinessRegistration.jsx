
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useRef, useState } from 'react'
import AddedBox from "./AddedBox";
const BusinessRegistration = () => {

    const profilePic = useRef(null);
    const [image, setImage] = useState(null);

    const handleProfileChange = (event) => {

        setImage(event.target.files[0]);
    }
    const handlePhotoUpload = () => {
        profilePic.current.click();

    }
    return (
        <div className='bg-[#ffffff] py-10 w-full h-auto flex items-center justify-center'>

            <div className='w-[50%] h-full bg-[#f4faff] p-10'>

                <div className='w-full h-[50px] font-semibold flex justify-center pb-10  items-center text-[26px] text-blue-950 font-serif'>
                    <span>Register Your Service</span>
                </div>

                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Business Type :</label>
                    <input type="text" placeholder='Business type e.g.Cleaning,event decoration' className=' text-[20px] w-full h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md  focus-within:drop-shadow-xl' autoComplete='none' />
                </div>

                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Company Name :</label>
                    <input type="text" placeholder='Enter Your company Name' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                </div>


                <div className='w-full h-[50px]  flex  py-10 justify-center  items-center text-[20px] text-blue-900 font-serif'>
                    <span className="ps-20">Contact Details (Provider)</span>
                </div>


                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Name :</label>
                    <input type="text" placeholder='Enter Your Name' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                </div>
                <div className='w-full h-[50px] flex py-10 items-center text-black'>

                    <label htmlFor="Name" className=' text-[20px] px-4 font-medium w-[300px] font-serif'> Phone :</label>
                    <input type="tel" placeholder='Enter Your Mobile Number' className=' text-[20px] h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md w-full focus-within:drop-shadow-xl' autoComplete='none' />
                </div>

                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Email :</label>
                    <input type="email" placeholder='Enter Your Email' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                </div>


                <div className='w-full h-[50px]  flex  py-10 justify-center  items-center text-[20px] text-blue-900 font-serif'>
                    <span>Service Details</span>
                </div>
                <div className='w-full h-[300px] flex py-10  items-center text-black'>

                    <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Description :</label>

                    <textarea name="Description" id="DescriptionBox"
                        placeholder="Description about your Service (maxLength-300 words)"
                        className=' text-[20px] h-[300px] font-serif outline-none p-4  w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl'
                        rows={5} cols={40}
                        style={{ resize: 'none', overflow: 'hidden' }}

                    ></textarea>

                </div>


                <div className='w-full h-[40px] flex py-10  items-center text-black'>

                    <label htmlFor="MinPrice" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Min Price :</label>
                    <input type="text" placeholder='Enter service Starting Price' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />

                </div>
                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="MaxPrice" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Max Price :</label>
                    <input type="text" placeholder='Enter ending price of service ' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />

                </div>



                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="Locations" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Locations :</label>
                    
                    <input type="text" placeholder='Enter Locations' className=' text-[20px] h-[50px] font-serif outline-none px-4 ms-8 w-[700px]  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                    <div className="w-[100px] h-[50px]">
                        <button className=' bg-[#3b65be] text-lg font-serif font-medium hover:bg-[#678bd8] rounded-full align-middle h-[50px] w-[50px]   drop-shadow-2xl ms-2 flex justify-center items-center'>
                            Add
                        </button>
                    </div>
                
                </div>
                <AddedBox />
                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="Features" className=' text-[20px] px-4 font-medium font-serif w-[200px]'> Features :</label>
                    <input type="text" placeholder='Enter Features' className=' text-[20px] h-[50px] font-serif outline-none px-4 ms-[90px] w-[700px]  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                    <div className="w-[100px] h-[50px]">
                        <button className=' bg-[#3b65be] text-lg font-serif font-medium hover:bg-[#678bd8] rounded-full align-middle h-[50px] w-[50px]   drop-shadow-2xl ms-2 flex justify-center items-center'>
                            Add
                        </button>
                    </div>

                </div>

                <AddedBox />
                <div className='w-full h-auto flex my-10 items-center  text-black'>

                    <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Company Logo:</label>
                    <div className='w-[200px] h-[200px] bg-slate-700 cursor-pointer  border-[2px]  border-slate-400  rounded-xl shadow-blue-700' onClick={handlePhotoUpload}>

                        {image ?
                            <img src={URL.createObjectURL(image)} alt="photo" className='bg-cover rounded-xl  border-[2px] bg-center w-full h-full' />
                            :
                            <img src="../src/assets/uploadPhoto.jpg" alt="photo" className='bg-cover rounded-xl  border-[2px] bg-center w-full h-full' />
                        }

                    </div>
                    <input type="file" className=' hidden' ref={profilePic} onChange={handleProfileChange} />
                </div>


                <div className='flex items-center justify-center my-10 h-[200px]'>


                    <button className=' bg-blue-900 hover:bg-[#1e52c3] align-middle h-12 w-[130px] rounded-xl border-blue-950 drop-shadow-2xl mx-3 flex justify-center items-center' >
                        <span className='text-lg font-serif font-medium me-1 text-white'><FaSave /></span>
                        <span className='text-lg font-serif font-medium text-white'>Submit</span>

                    </button>
                </div>
            </div>
        </div >
    )
}

export default BusinessRegistration