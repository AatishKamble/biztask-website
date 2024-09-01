import React from 'react'
import { API_BASE_URL } from '../../configApi/ConfigApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { removeBusiness } from '../../Redux/Business/Action.js';

const BusinessCard = ({ businessDetails, index }) => {

  const jwt=localStorage.getItem("jwt");
  const dispatch=useDispatch();
  const navigate=useNavigate();

const handleRemove=()=>{
  dispatch(removeBusiness(jwt,businessDetails._id));
 
  navigate('/profile');
}

  return (
    <>
      <div id={index} className="  bg-slate-100 w-auto h-auto  rounded-lg drop-shadow-xl shadow-slate-200 mx-5 "

      >


        <div className='w-auto flex  p-5' >
          <div className=' w-[120px] h-[90px] rounded-full '
            style={{
              backgroundImage: `url(${API_BASE_URL}/api/images/${businessDetails.companyLogo})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}>

          </div>
          <div className='w-full flex justify-center'>
        <span className=' text-blue-950 font-serif font-semibold text-[20px] mx-5 flex justify-center items-center '>{businessDetails?.companyName}</span>

        </div>
        </div>
        <div className='w-full my-5 h-10 flex justify-center  px-2'>
        <Link to={`/bussiness/details/${businessDetails?._id}`}>
           <button className='bg-[#9fe59b]  rounded-md p-2 me-2   hover:bg-slate-400 w-auto h-auto text-slate-600 font-sans font-bold text-[18px]'>View services</button>
           </Link>
          <Link to={`/bussiness-update/${businessDetails?._id}`}>
          <button className='bg-[#66cae1]  rounded-md p-[7px]  hover:bg-[#88d4e6] w-auto h-auto text-slate-600  font-sans font-bold text-[18px]' >Update</button>
          </Link>
          <button className='bg-[#d28d8d]  rounded-md p-2 ms-2  hover:bg-[#d8b0b0]   w-auto h-auto text-slate-600  font-sans font-bold text-[18px]' onClick={handleRemove}>Remove</button>
         

        </div>

      </div>
    </>
  )
}

export default BusinessCard