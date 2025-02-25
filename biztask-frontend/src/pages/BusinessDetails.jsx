import React, { useEffect } from 'react'
import { MdOutlineDescription } from "react-icons/md";
import ServiceCard from '../components/ServiceCard/ServiceCard.jsx'
import { Link } from 'react-router-dom';
import { FaAddressCard } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getBusinessById } from "../Redux/Business/Action.js";
import { API_BASE_URL } from '../configApi/ConfigApi.js';
import JobLoader from '../components/Loader/JobLoader.jsx';
import Loader from '../components/Loader/Loader.jsx';
import DetailLoader from '../components/Loader/DetailLoader.jsx';
const BusinessDetails = ({ userDetails }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const jwt = localStorage.getItem("jwt");

    const businessStore = useSelector(store => store.businessStore)


    useEffect(() => {
        if (jwt && id) {
            dispatch(getBusinessById(id));
        }

    }, [jwt, id, dispatch]);

    const isLoading = useSelector(store => store.businessStore.isLoading);



    return (
        <>

<div className='bg-white flex relative flex-col items-center w-full h-auto px-6 sm:px-10 lg:px-16'>
      {isLoading && (
        <div className="absolute w-full h-full inset-0 flex items-center justify-center bg-white opacity-100 z-10">
          <DetailLoader />
        </div>
      )}

      {/* Profile Section */}
      <div className='w-full bg-gradient-to-r from-blue-50 to-slate-100 drop-shadow-lg mt-10 mb-6 flex flex-col justify-center items-center p-10 rounded-2xl shadow-md'>
        <div className="bg-white w-full rounded-2xl shadow-xl overflow-hidden mb-8 p-8 sm:p-12">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <div className="relative mb-6">
              <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                <img src={businessStore.business.companyLogo?.imageUrl} alt="profile" className='w-full h-full object-cover' />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 mb-2 break-words w-[90%] sm:w-[60%]">
              {businessStore.business?.companyName}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-serif">{userDetails?.name}</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className='w-[90%] bg-white rounded-xl shadow-lg p-6 mb-8'>
        <div className='text-[24px] text-slate-800 font-serif pb-4 border-b-2 flex items-center'>
        
          <span className='font-semibold'>About the Company</span>
        </div>
        <p className='text-slate-900 font-serif font-medium text-[18px] mt-4 break-words'>
          {businessStore.business?.description}
        </p>
      </div>

      {/* Services Section */}
      <div className='w-full h-auto mb-10 px-6'>
        <div className='flex justify-between items-center text-[24px] text-slate-800 font-serif pb-4 border-b-2'>
          <span className='font-semibold'>Your Services</span>
          <Link to={`/service-registration/${businessStore.business?._id}`}>
            <button className='flex rounded-md text-white bg-blue-600 hover:bg-blue-700  border-[1px]  w-auto p-2 items-center justify-center font-sans font-semibold text-[18px] shadow-md transition-all duration-300'>
              <FaAddressCard className='mr-2' /> Register
            </button>
          </Link>
        </div>
      </div>

      {/* Services Grid */}
      <div className='w-full grid xl:grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-6 justify-center items-center mt-5 mb-10'>
        {businessStore.business?.services?.map((service, index) => (
          <ServiceCard key={index} business={businessStore?.business} service={service} provider={businessStore.business?.companyName} />
        ))}
      </div>
    </div>






        </>
    )
}

export default BusinessDetails