import JobAdvertise from '../components/JobTemplate/JobAdvertise.jsx'
import ServiceCard from '../components/ServiceCard/ServiceCard.jsx'
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import BusinessCard from '../components/BusinessCard/BusinessCard.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaAddressCard } from "react-icons/fa6";
import { API_BASE_URL } from '../configApi/ConfigApi.js';
import { IoPersonCircleOutline } from "react-icons/io5";
const ProfilePage = ({ userDetails }) => {

  return (
    <>
      {userDetails &&
        <div className=' w-full h-auto bg-[#ffffff] flex flex-col p-[100px] items-center justify-center '>


          <div className='w-full text-[26px] text-slate-600  font-serif pb-2'>
            <span className='border-b-[2px]'>Profile</span>
          </div>
          <div className=' w-[80%] h-[240px] bg-inherit border-[1px] drop-shadow-lg border-slate-400 flex items-center px-10 my-10' >

            <div className='w-[180px] h-[180px]  rounded-lg mx-5'>

              <img src={`${API_BASE_URL}/api/images/` + userDetails.profileImage} alt="profile picture" className='bg-cover w-full h-full rounded-lg' />
            </div>
            <div className='w-full h-[180px] relative flex items-center flex-col justify-center px-10'>

              <div>
                <Link to={"/profile-edit"}>
                  <button className='bg-slate-300 absolute top-3 right-5 rounded-md hover:border-slate-500 border-[1px] hover:bg-slate-200 w-[100px] h-[40px] text-slate-600 font-serif font-normal text-[24px]'>Edit</button>
                </Link>

              </div>



              <div className='w-full text-[22px]  text-slate-800 font-serif py-2'>
                <span className=' font-semibold px-2 inline-block'><IoPersonCircleOutline /></span>
                <span className='inline-block'>{userDetails.name}</span>
              </div>

              <div className='w-full text-[22px] text-slate-800 font-serif flex pb-2'>
                <span className="px-2 font-medium flex items-center"> <MdEmail /></span>

                <span >{userDetails.email}</span>
              </div>
              <div className='w-full text-[22px] text-slate-800 font-serif flex items-center'>
                <span className="px-2 font-medium flex items-center"> <FaPhone /> </span>
                <span >{userDetails.mobileNumber}</span>
              </div>

            </div>

          </div>


          <div className=' border-slate-400 w-full h-auto  my-10'>

            <div className='w-full  font-semibold p-2 h-auto text-[26px] text-slate-800 font-serif'>
              <div className=' flex justify-between items-center py-10 '>
                <span >Businesses</span>
                <div>
                <Link to={"/bussiness-registration"}>
                  <button className=' flex rounded-md hover:text-blue-500 border-[1px] hover:bg-slate-100 w-auto p-2 items-center justify-center h-auto text-slate-600 font-sans font-semibold text-[24px]'><FaAddressCard /><span className='text-[18px] px-4'> Register</span></button>
                </Link>

              </div>
                </div>
            </div>

            <div className=' w-full grid grid-cols-3 grid-rows-2 p-2 gap-2 gap-y-6'>
            {
    userDetails?.businesses?.map((business, index) => (
        <BusinessCard businessDetails={business} key={index} />
    ))
}

            </div>

          </div>


          <div className=' w-full h-auto  mb-10'>

            <div className='w-full font-semibold p-2 h-auto text-[26px] text-slate-800 font-serif'>
              <div className=' flex justify-between items-center '>
                <span >Jobs Applied</span>

                <Link to={"/jobs"}>
                  <span className='px-5 hover:text-slate-600 cursor-pointer'><FaExternalLinkAlt /></span>

                </Link></div>
            </div>

            <div className=' w-full grid grid-cols-2 grid-rows-2 p-2 gap-2'>
              <JobAdvertise typeText="View" />
              <JobAdvertise typeText="View" />
              <JobAdvertise typeText="View" />
              <JobAdvertise typeText="View" />
            </div>

          </div>


          <div className=' w-full h-auto  mb-10'>

            <div className='w-full font-semibold p-2 h-auto text-[26px] text-slate-800 font-serif'>
              <div className=' flex justify-between items-center '>
                <span >Your Services</span>
                <Link to={"/services"}>
                  <span className='px-5 hover:text-slate-600 cursor-pointer'><FaExternalLinkAlt /></span></Link></div>
            </div>

            <div className=' w-full grid grid-cols-4 grid-rows-2 p-2 gap-1 gap-y-8 justify-center items-center'>
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
            </div>

          </div>
        </div>




      }
    </>
  )
}

export default ProfilePage