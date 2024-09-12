import React, { useEffect } from 'react'
import { MdOutlineDescription } from "react-icons/md";
import ServiceCard from '../components/ServiceCard/ServiceCard.jsx'
import { Link } from 'react-router-dom';
import { FaAddressCard } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getBusinessById } from "../Redux/Business/Action.js";
import { API_BASE_URL } from '../configApi/ConfigApi.js';
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

    return (
        <>

            <div className='bg-[#ffffff] flex flex-col  items-center w-full h-auto px-20 lg:px-10 xl:px-16'>


                <div className=' w-[100%] h-auto bg-slate-100  drop-shadow-lg  mt-10 mb-4 flex flex-col justify-center items-center p-10'>



                    <div className='w-[200px] h-[200px]  rounded-full mx-5'>

                        <img src={`${businessStore.business.companyLogo?.imageUrl}`} alt="profile picture" className='bg-cover w-full h-full rounded-full' />
                    </div>
                    <div>
                        <div className='w-full h-auto  flex flex-col  px-10'>



                            <div className='w-full text-[30px] flex items-center justify-center text-slate-800 font-serif py-2'>
                                <span className=' font-semibold px-2'>{businessStore.business?.companyName}</span>

                            </div>

                            <div className='w-full text-[22px] flex items-center justify-center  text-slate-600 font-serif'>
                                <span className=' font-normal px-2 text-[22px]  text-slate-600 font-serif '>{userDetails?.name}</span>

                            </div>



                        </div>
                    </div>
                </div>


                <div className='w-full text-[26px]  text-slate-600  font-serif pb-2 mt-6'>
                    <span className='inline-block'><MdOutlineDescription /></span> <span className='border-b-[2px] font-semibold'> About the Company</span>

                </div>
                <div className='flex w-[90%]  h-auto mb-10  p-4  py-2 text-slate-900 font-serif font-medium text-[18px]'>
                    <span className="">
                        {businessStore.business?.description}
                    </span>


                </div>


                <div className=' w-full h-auto  mb-10'>


                    <div className='w-full  font-semibold p-2 h-auto text-[26px] flex text-slate-800 font-serif'>
                        <div className='w-full text-[26px] text-slate-600  font-serif pb-2'>
                            <span className='border-b-[2px]'>Your Services</span>
                        </div>
                        <Link to={`/service-registration/${businessStore.business?._id}`}>
                            <button className=' flex rounded-md hover:text-[#3543be] border-[1px] hover:bg-slate-100 w-auto p-2 mx-10 items-center justify-center h-auto text-slate-600 font-sans font-semibold text-[24px]'><FaAddressCard /><span className='text-[18px] px-4'> Register</span></button>
                        </Link>

                    </div>
                </div>


                <div className=' w-full grid xl:grid-cols-4 sm:grid-cols-2 sm:ps-10  xl:px-0 lg:gap-5 lg:px-0 sm:gap-y-8 lg:grid-cols-3 xl:gap-5   p-2 gap-1 gap-y-8 justify-center items-center mb-10'>
                   {
                    businessStore.business?.services?.map((business,index)=>(
<ServiceCard key={index} business={businessStore?.business} service={business} provider={businessStore.business?.companyName}/>
                    ))
                   }
                </div>

            </div >






        </>
    )
}

export default BusinessDetails