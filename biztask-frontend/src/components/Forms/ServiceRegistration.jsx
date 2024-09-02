
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useEffect, useRef, useState } from 'react'
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddedBox from "./AddedBox";
import { API_BASE_URL } from "../../configApi/ConfigApi";
import {serviceRegister,updateService,getServiceById} from "../../Redux/ServiceR/Action.js";
// import { getBusinessById } from "../../Redux/Business/Action";
const ServiceRegistration = ({ userDetails,registration }) => {
    const navigate=useNavigate();
    const jwt = localStorage.getItem("jwt");
    const [formData, setFormData] = useState({
        serviceType: "",
        Description: "",
        minPrice: "",
        maxPrice: ""

    });


    const {id}=useParams();

    const dispatch = useDispatch();
    const businessStore = useSelector(store => store.businessStore)
    //handle location

    const [location, setLocation] = useState('');
    const [locationArray, setLocationArray] = useState([]);
    const handleLocationAdd = () => {

        if (location.trim() !== "") {

            const isExists = locationArray.some(l => l.toLowerCase() === location.toLowerCase());
            if (!isExists) {
                setLocationArray([...locationArray, location]);
            }

            setLocation('');
        }

    }

    const handleLocationRemove = (indexRemove) => {
        const newLocation = locationArray.filter((_, ind) => ind !== indexRemove);
        setLocationArray(newLocation);
    }



    //handle feature

    const [featureInput, setFeatureInput] = useState('');
    const [featureArray, setFeatureArray] = useState([]);
    const handleFeatureAdd = () => {

        if (featureInput.trim() !== "") {

            const isExists = featureArray.some(l => l.toLowerCase() === featureInput.toLowerCase());
            if (!isExists) {
                setFeatureArray([...featureArray, featureInput]);
            }

            setFeatureInput('');
        }

    }

    const handleFeatureRemove = (indexRemove) => {
        const newFeature = featureArray.filter((_, ind) => ind !== indexRemove);
        setFeatureArray(newFeature);
    }


    //form data handle

    function handleChange(e) {

       
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });


    }


    //form submission
    const handleSubmit = (e) => {
        e.preventDefault();
       
        const formD = new FormData();
        formD.append("serviceType", formData.serviceType);
        formD.append("Description", formData.Description);
        formD.append("minPrice", Number(formData.minPrice));
        formD.append("maxPrice", Number(formData.maxPrice));
        formD.append("locations", JSON.stringify(locationArray));
        formD.append("features", JSON.stringify(featureArray));
       
        if(registration==true){
            formD.append("businessId",businessStore?.business?._id);
            dispatch(serviceRegister(formD,jwt));  
            }
            else{
                dispatch(updateService(jwt, formD, id));//service id
            }
       

      setFormData (
        {
            serviceType: "",
            Description: "",
            minPrice: "",
            maxPrice: ""
    
        });
        setFeatureArray([]);
        setLocationArray([]);
        navigate(`/bussiness/details/${businessStore?.business?._id}`);

    }


   
    useEffect(() => {
        if (id) {
            dispatch(getServiceById(id));
        }
    }, [id, dispatch]);

const serviceStore=useSelector(store=>store.serviceStore);

//while updating
useEffect(() => {
    if (serviceStore.service && serviceStore.service._id === id) {
       
        setFormData(
            {
                serviceType: serviceStore.service.serviceType,
                Description:  serviceStore.service.Description,
                minPrice:serviceStore.service.minPrice,
                maxPrice: serviceStore.service.maxPrice
        
        });

        setLocationArray([...serviceStore.service.locations]);
        setFeatureArray([...serviceStore.service.features]);
        
    }
}, [serviceStore.service, id]);
    


    return (
        <div className='bg-[#ffffff] py-10 w-full h-auto flex items-center justify-center'>

            <div className='w-[50%] h-full bg-[#f4faff] p-10'>

                <div className='w-full h-[50px] font-semibold flex justify-center pb-10  items-center text-[26px] text-blue-950 font-serif'>
                    <span>{registration==true?"Register Your Service":"Update Service"}</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Service Type :</label>
                        <input type="text"
                        onChange={handleChange} name="serviceType" value={formData.serviceType} placeholder='e.g.Cleaning,event decoration' className=' text-[20px] w-full h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md  focus-within:drop-shadow-xl' autoComplete='none' />
                    </div>

                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Company Name :</label>
                        <input type="text" value={businessStore.business?.companyName} className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' disabled />
                    </div>


                    <div className='w-full h-[50px]  flex  py-10 justify-center  items-center text-[20px] text-blue-900 font-serif'>
                        <span className="ps-20">Contact Details (Provider)</span>
                    </div>


                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Name :</label>
                        <input type="text" value={userDetails?.name || ""} className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' disabled />
                    </div>
                    <div className='w-full h-[50px] flex py-10 items-center text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium w-[300px] font-serif'> Phone :</label>
                        <input type="tel" value={userDetails?.mobileNumber || ""} className=' text-[20px] h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md w-full focus-within:drop-shadow-xl' autoComplete='none' disabled />
                    </div>

                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Email :</label>
                        <input type="email" value={userDetails?.email || ""} className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' disabled />
                    </div>


                    <div className='w-full h-[50px]  flex  py-10 justify-center  items-center text-[20px] text-blue-900 font-serif'>
                        <span>Service Details</span>
                    </div>
                    <div className='w-full h-[300px] flex py-10  items-center text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Description :</label>

                        <textarea name="Description" id="DescriptionBox"
                            value={formData.Description}
                            onChange={handleChange}
                            placeholder="Description about your Service (maxLength-300 words)"
                            className=' text-[20px] h-[300px] font-serif outline-none p-4  w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl'
                            rows={5} cols={40}
                            style={{ resize: 'none', overflow: 'hidden' }}

                        ></textarea>

                    </div>


                    <div className='w-full h-[40px] flex py-10  items-center text-black'>

                        <label htmlFor="MinPrice" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Min Price :</label>
                        <input type="text"
                            name="minPrice" value={formData.minPrice}
                            onChange={handleChange}
                            placeholder='Enter service Starting Price' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />

                    </div>
                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="MaxPrice" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Max Price :</label>
                        <input type="text"
                            name="maxPrice"
                            value={formData.maxPrice}
                            onChange={handleChange}
                            placeholder='Enter ending price of service ' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />

                    </div>



                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="Locations" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Locations :</label>

                        <input type="text" value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder='Enter Locations'
                            className=' text-[20px] h-[50px] font-serif outline-none px-4 ms-8 w-[700px]  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl'
                            autoComplete='none' />
                        <div className="w-[100px] h-[50px]">
                            <span className=' bg-[#3b65be] text-lg font-serif font-medium hover:bg-[#678bd8] rounded-full align-middle h-[50px] w-[50px]   drop-shadow-2xl ms-2 flex justify-center items-center' onClick={handleLocationAdd}>
                                Add
                            </span>
                        </div>

                    </div>

                    <div className='w-full h-auto flex flex-col pb-10 pt-5  items-center text-black'>
                        {
                            locationArray.map((l, index) => (
                                <AddedBox key={index} Index={index} Name={l} handleRemove={handleLocationRemove} />
                            ))
                        }



                    </div>

                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="Features" className=' text-[20px] px-4 font-medium font-serif w-[200px]'> Features :</label>
                        <input type="text"
                            placeholder='Enter Features'
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            className=' text-[20px] h-[50px] font-serif outline-none px-4 ms-[90px] w-[700px]  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                        <div className="w-[100px] h-[50px]">
                            <span className=' bg-[#3b65be] text-lg font-serif font-medium hover:bg-[#678bd8] rounded-full align-middle h-[50px] w-[50px]   drop-shadow-2xl ms-2 flex justify-center items-center' onClick={handleFeatureAdd}>
                                Add
                            </span>
                        </div>

                    </div>
                    <div className='w-full h-auto flex flex-col py-10  items-center text-black'>
                        {
                            featureArray.map((l, index) => (
                                <AddedBox key={index} Index={index} Name={l} handleRemove={handleFeatureRemove} />
                            ))
                        }

                    </div>
                    <div className='w-full h-auto flex my-10 items-center  text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Company Logo:</label>
                        <div className='w-[200px] h-[200px] bg-slate-700  border-[2px]  border-slate-400  rounded-xl shadow-blue-700' >

                            <img src={businessStore.business?.companyLogo ? `${API_BASE_URL}/api/images/${businessStore.business?.companyLogo}` : "../src/assets/uploadPhoto.jpg"} alt="photo" className='bg-cover rounded-xl  border-[2px] bg-center w-full h-full' />


                        </div>
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

export default ServiceRegistration