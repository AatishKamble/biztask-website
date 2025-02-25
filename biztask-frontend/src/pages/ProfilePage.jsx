import JobAdvertise from '../components/JobTemplate/JobAdvertise.jsx'
import ServiceCard from '../components/ServiceCard/ServiceCard.jsx'
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import BusinessCard from '../components/BusinessCard/BusinessCard.jsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaAddressCard } from "react-icons/fa6";
import { API_BASE_URL } from '../configApi/ConfigApi.js';
import { IoPersonCircleOutline } from "react-icons/io5";
import { getJobById } from "../Redux/Job/Action.js";
import PopUp from '../components/PopUp/PopUp.jsx';
import { removeBusiness } from '../Redux/Business/Action.js';
const ProfilePage = ({ userDetails }) => {

  const dispatch = useDispatch();
  const appliedJobsRef = useRef(null);
  const businessRegistrationRef = useRef(null);
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  useEffect(() => {
    if (location.hash === "#applied-jobs" && appliedJobsRef.current) {
      appliedJobsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (location.hash === "#bussiness-registration" && businessRegistrationRef.current) {
      businessRegistrationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location])


  const [popupwarning, setPopupWarning] = useState(false);
  const [currentBusinessId, setCurrentBusinessId] = useState(null);

  const handlePopupWarningOpen = (businessId) => {
    setCurrentBusinessId(businessId);
    setPopupWarning(true);
  };

  const handlePopupWarningClose = () => {
    setPopupWarning(false);
    setCurrentBusinessId(null);
  };

  const handleRemove = () => {
    dispatch(removeBusiness(jwt, currentBusinessId));
    setPopupWarning(false);
    navigate('/profile');
  }

  return (
    <>


      {userDetails &&
        <div className=' w-full h-auto bg-[#ffffff] flex flex-col p-[100px] items-center justify-center '>


          <div className="w-full max-w-4xl text-3xl text-blue-900 font-bold font-serif pb-4 border-b-2 border-blue-400">
            Profile Details
          </div>
          <div className=' w-[80%] h-[240px] bg-gradient-to-r from-purple-500 to-teal-400 rounded-3xl shadow-xl border-[1px] drop-shadow-lg border-slate-400 flex items-center px-10 my-10' >
            <div className="absolute w-32 h-32 bg-white/20 rounded-full -top-6 -left-6 blur-lg"></div>

            <div className="w-40 h-40 rounded-full border-4 border-white p-1 bg-white shadow-lg overflow-hidden flex-shrink-0">
              <img src={`${userDetails.profileImage?.ImageUrl}`} alt="profile picture" className='bg-cover w-full h-full rounded-full' />
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

          <div ref={businessRegistrationRef} className="border-slate-300 w-full h-auto mt-10 bg-white shadow-md rounded-xl p-6">
  {/* Header Section */}
  <div className="w-full font-semibold text-[26px] text-slate-700 font-serif border-b border-slate-300 pb-6">
    <div className="flex justify-between items-center">
      <span>Businesses</span>
      <div>
        <Link to={"/bussiness-registration"}>
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[18px] font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md">
            <FaAddressCard className="text-[22px]" />
            <span>Register</span>
          </button>
        </Link>
      </div>
    </div>
  </div>

  {/* Business Cards Grid */}
  <div className="w-full grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
    {userDetails?.businesses?.map((business, index) => (
      <BusinessCard businessDetails={business} key={index} handlePopupWarningOpen={handlePopupWarningOpen} />
    ))}
    
    
  </div>
</div>



          <div ref={appliedJobsRef} className=' w-full h-auto border-slate-300 mt-10 bg-white shadow-md rounded-xl   mb-10'>

            <div className='w-full font-semibold p-4 h-auto text-[26px] text-slate-600 font-serif'>
              <div className=' flex justify-between items-center relative'>
                <span >Jobs Applied</span>

                <Link to={"/jobs"}>

                  <span className='px-5 hover:text-blue-600 text-blue-600 cursor-pointer'><FaExternalLinkAlt /></span>

                </Link></div>
            </div>

            <div className='lg:px-20 xl:px-0 w-full grid xl:grid-cols-2  sm:grid-cols-1 sm:gap-5  p-2 gap-2'>

              {
                userDetails?.appliedJobs?.map((job, index) => (
                  <JobAdvertise key={index} typeText="View" job={job} business={job?.business} />
                ))
              }

            </div>

          </div>

          {popupwarning && (
            <div className='fixed inset-0 bg-black opacity-50 z-40'></div>
          )}

          {popupwarning && (
            <div className='fixed inset-0 flex items-center justify-center z-50'>
              <PopUp message="Remove Business" submessage="Are you sure you want to remove this business ?" button1="Cancel" button2="Remove" submessage2={`Business Name: ${userDetails?.businesses.find(b => b._id === currentBusinessId)?.companyName}`} closeButton={handlePopupWarningClose} handleRemove={handleRemove} />

            </div>
          )}
        </div>




      }
    </>
  )
}

export default ProfilePage