
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
        <div className="bg-white py-10 w-full h-auto flex items-center justify-center">
          <div className="w-[50%] bg-blue-50 p-10 rounded-lg shadow-lg">
            <div className="w-full h-12 flex justify-center items-center pb-5 text-2xl text-slate-600 font-sans font-bold">
              <span>{registration ? "Register Your Business" : "Update Business"}</span>
            </div>
      
            <form onSubmit={handleSubmit}>
              {/* Contact Details Header */}
              <div className="w-full flex justify-center items-center py-4 text-lg text-blue-900 font-sans font-semibold">
                <span>Contact Details (Provider)</span>
              </div>
      
              {/* Name Field */}
              <div className="w-full flex items-center py-3 text-black">
                <label htmlFor="Name" className="text-lg px-4 font-medium font-sans w-40">
                  Name:
                </label>
                <input
                  type="text"
                  value={userDetails?.name || ""}
                  className="text-lg h-12 font-sans outline-none px-4 w-full border border-gray-300 bg-gray-50 rounded-md focus:ring-2 focus:ring-teal-500"
                  autoComplete="off"
                  disabled
                />
              </div>
      
              {/* Phone Field */}
              <div className="w-full flex items-center py-3 text-black">
                <label htmlFor="mono" className="text-lg px-4 font-medium font-sans w-40">
                  Phone:
                </label>
                <input
                  type="tel"
                  name="mono"
                  value={userDetails?.mobileNumber || ""}
                  className="text-lg h-12 font-sans outline-none px-4 w-full border border-gray-300 bg-gray-50 rounded-md focus:ring-2 focus:ring-teal-500"
                  autoComplete="off"
                  disabled
                />
              </div>
      
              {/* Email Field */}
              <div className="w-full flex items-center py-3 text-black">
                <label htmlFor="email" className="text-lg px-4 font-medium font-sans w-40">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={userDetails?.email || ""}
                  className="text-lg h-12 font-sans outline-none px-4 w-full border border-gray-300 bg-gray-50 rounded-md focus:ring-2 focus:ring-teal-500"
                  autoComplete="off"
                  disabled
                />
              </div>
      
              {/* Business Details Header */}
              <div className="w-full flex justify-center items-center py-4 text-lg text-blue-900 font-sans font-semibold">
                <span>Business Details</span>
              </div>
      
              {/* Company Name Field */}
              <div className="w-full flex items-center py-3 text-black">
                <label htmlFor="companyName" className="text-lg px-4 font-medium font-sans w-40">
                  Company Name:
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter Your Company Name"
                  className="text-lg h-12 font-sans outline-none px-4 w-full border border-gray-300 bg-gray-50 rounded-md focus:ring-2 focus:ring-teal-500"
                  autoComplete="off"
                />
              </div>
      
              {/* Company Description */}
              <div className="w-full flex items-start py-3 text-black">
                <label htmlFor="description" className="text-lg px-4 font-medium font-sans w-40">
                  Company Description:
                </label>
                <textarea
                  name="description"
                  id="DescriptionBox"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description about your Business (maxLength-300 words)"
                  className="text-lg h-32 font-sans outline-none p-4 w-full border border-gray-300 bg-gray-50 rounded-md focus:ring-2 focus:ring-teal-500 resize-none"
                  rows={5}
                  cols={40}
                  style={{ overflow: "hidden" }}
                ></textarea>
              </div>
      
              {/* Company Logo */}
              <div className="w-full flex items-center py-5 text-black">
                <label htmlFor="companyLogo" className="text-lg px-4 font-medium font-sans w-40">
                  Company Logo:
                </label>
                <div
                  className="w-48 h-48 bg-gray-700 cursor-pointer border border-gray-300 rounded-lg shadow-md overflow-hidden"
                  onClick={handlePhotoUpload}
                >
                  <img
                    src={image ? URL.createObjectURL(image) : dummyPhoto}
                    alt="Company Logo"
                    className="object-cover w-full h-full"
                  />
                </div>
                <input type="file" className="hidden" ref={profilePic} onChange={handleProfileChange} />
              </div>
      
              {/* Submit Button */}
              <div className="flex items-center justify-center my-8">
                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-800 h-12 w-32 rounded-xl shadow-lg mx-3 flex justify-center items-center"
                >
                  <span className="text-lg font-sans font-medium mr-2 text-white">
                    <FaSave />
                  </span>
                  <span className="text-lg font-sans font-medium text-white">Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      );
      
      
}

export default BusinessRegistration