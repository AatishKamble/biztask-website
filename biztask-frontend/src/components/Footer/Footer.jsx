import { VscAzure } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className='bg-[#eef3f3] w-full h-[350px] flex justify-between items-center '>
        <div className='w-full h-full grid grid-cols-4 bg-[#eef3f3] gap-5 p-8 '>
          <div className='flex flex-col justify-start items-center '>

            {/* logo */}
            <div className='h-20 w-20 bg-inherit  flex items-center '>
              {/*            
            <img src='../../src/assets/Designer.png' alt='logo' className='h-full object-cover'/> */}
              <span className=" font-bold text-[70px]  align-middle items-center text-blue-900">
                <VscAzure /></span>
            </div>
            <span className=' font-serif font-semibold text-blue-950  text-[28px]'>bizTask</span>

            <span className=' font-sans font-normal text-slate-800  text-[18px]'>Connecting businesses, workers, and service seekers with ease</span>




          </div>

          <div className="bg-[#eef3f3] p-2 ps-8 border-r-2 border-sky-900 border-dotted">
            <span className="text-xl font-serif font-semibold  text-slate-700 ">Quick Links</span>
            <ul className='text-lg font-serif font-light text-black flex flex-col gap-2 justify-between mt-4'>
              <Link to={"/jobs"}>
              <li className=' cursor-pointer'>Jobs</li></Link>

              <Link to={"/services"}>
              <li className='cursor-pointer'>Services</li>
              </Link>
              <Link to={"/bussiness-registration"}>
              <li className='cursor-pointer'>Register Businesses</li>
              </Link>
              <Link to={"/job-post"}>
              <li className=' cursor-pointer'>Job Post</li>
</Link>
            </ul>
          </div>

          

          <div className="bg-[#eef3f3] p-2 ps-8 border-r-2 border-sky-900 border-dotted">
            <span className="text-xl font-serif font-semibold  text-slate-700 ">Resources</span>
            <ul className='text-lg font-serif font-light text-black flex flex-col gap-2 justify-between mt-4'>
              <Link to={"/profile"}>
              <li className=' cursor-pointer'>Profile</li>
              </Link>
              <li className='cursor-pointer'>Support</li>

              <Link to={"/about-us"}>
              <li className='cursor-pointer'>Developers</li>
              
</Link>
            </ul>
          </div>

          <div className="bg-[#eef3f3] p-2 ps-8 flex flex-col justify-center items-center ">
            
           
            
            <div className='text-lg font-serif font-light text-black flex gap-6 mt-5 justify-evenly'>
             <span className='font-serif font-light text-blue-950 text-[35px] cursor-pointer'><FaInstagram/></span>
            
             <span className='font-serif font-light text-blue-950 text-[35px] cursor-pointer '><FaLinkedin/></span>
             <span className='font-serif font-light text-blue-950 text-[35px] cursor-pointer '><FaFacebookSquare/></span>
           
            </div>

            <span className="text-xl font-serif font-semibold  text-slate-700  mt-8 ">Contac Us</span>

          </div>
        </div>


      </div>

    </>
  )
}

export default Footer