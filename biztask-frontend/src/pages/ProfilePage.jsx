import JobAdvertise from '../components/JobTemplate/JobAdvertise.jsx'
import ServiceCard from '../components/ServiceCard/ServiceCard.jsx'
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
const ProfilePage = () => {
  return (
    <>

      <div className=' w-full h-auto bg-[#ffffff] flex flex-col p-[100px] items-center justify-center '>


        <div className='w-full text-[26px] text-black font-serif pb-2'>
          <span>Profile Details</span>
        </div>
        <div className=' w-full h-[240px] bg-inherit border-[1px] drop-shadow-lg border-slate-400 mb-10 flex items-center px-10'>

          <div className='w-[180px] h-[180px]  rounded-lg mx-5'>

            <img src="../src/assets/profilepic.jpg" alt="profile picture" className='bg-cover w-full h-full rounded-lg' />
          </div>
          <div className='w-full h-[180px] relative flex items-center flex-col justify-center px-10'>

            <div>
              <Link to={"/profile-edit"}>
                <button className='bg-slate-300 absolute top-3 right-5 rounded-md hover:border-slate-500 border-[1px] hover:bg-slate-200 w-[100px] h-[40px] text-slate-600 font-serif font-normal text-[24px]'>Edit</button>
              </Link> </div>
            <div>
              <Link to={"/bussiness-registration"}>
                <button className='bg-slate-300 absolute bottom-3 right-5 rounded-md hover:border-slate-500 border-[1px] hover:bg-slate-200 w-[250px] h-[40px] text-slate-600 font-serif font-normal text-[24px]'>Register Bussiness</button>
              </Link> </div>


            <div className='w-full text-[22px] text-slate-800 font-serif py-2'>
              <span className=' font-semibold px-2'>Name:</span>
              <span >Neha</span>
            </div>

            <div className='w-full text-[22px] text-slate-800 font-serif flex pb-2'>
            <span className="px-2 font-medium flex items-center"> <MdEmail /></span>
                              
              <span >neha12@gmail.com</span>
            </div>
            <div className='w-full text-[22px] text-slate-800 font-serif flex items-center'>
            <span className="px-2 font-medium flex items-center"> <FaPhone /> </span>
              <span >8521476622</span>
            </div>

          </div>

        </div>


        <div className=' w-full h-auto  mb-10'>

          <div className='w-full  font-semibold p-2 h-auto text-[26px] text-slate-800 font-serif'>
            <div className=' flex justify-between items-center '>
              <span >Posted Jobs</span>
              <Link to={"/jobs"}>
              <span className='px-5 hover:text-slate-600 cursor-pointer'><FaExternalLinkAlt /></span>
              
              </Link></div>
          </div>

          <div className=' w-full grid grid-cols-2 grid-rows-2 p-2 gap-2'>
            <JobAdvertise typeText="Edit" />
            <JobAdvertise typeText="Edit" />
            <JobAdvertise typeText="Edit" />
            <JobAdvertise typeText="Edit" />
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
              <span >Your Bussinesses</span>
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





    </>
  )
}

export default ProfilePage