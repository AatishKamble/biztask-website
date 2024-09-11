import { HiChevronDoubleRight } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { Link } from "react-router-dom";
import heroSection from "../../assets/hero.jpg";
const HeroSection = () => {
  return (
    <>
    
    <div className=' z-0 relative w-full h-[540px] xl:h-[560px] '>

    <div className='w-full h-[540px] xl:h-[560px] bg-slate-700 '>

    <img src={heroSection} alt="" className=' w-full h-full object-cover opacity-40 ' />

    </div>
        <div className='  absolute xl:top-44 sm:top-36 lg:top-40 w-full flex flex-col justify-center items-center'>
        <span className=' font-serif font-semibold text-blue-950 text-center  text-[38px]'>Find the Right Worker, Job, or Service in Your Area!</span>
        
        <span className=' font-sans  text-slate-800 sm:pt-2 font-semibold  text-[24px]'>Connecting businesses, workers, and service seekers with ease</span>


        <div className=' absolute xl:top-[130px] sm:top-[170px] lg:top-[150px] w-[700px] h-[100px] flex justify-around items-center '>

          <Link to={"/jobs"}>
         
            <div className='bg-[#98b1c1] hover:bg-[#6e8da0] w-[250px] opacity-95 cursor-pointer h-14 rounded-xl flex justify-center items-center text-lg border-[2px] border-slate-600'>
            <span className="font-serif font-bold pe-2 text-xl text-slate-800">Search Jobs</span>
            <span className="font-serif font-bold  text-3xl text-slate-800"><HiChevronDoubleRight /></span>
            </div>

            </Link>

            <Link to={"/services"}>
            <div className='bg-[#a0afaf] hover:bg-[#6e8da0] w-[250px] opacity-95 cursor-pointer h-14 rounded-xl flex justify-center items-center text-lg border-[2px] border-slate-600'>
            <span className="font-serif font-bold pe-2 text-xl text-slate-800">Explore Services</span>
            <span className="font-serif font-bold  text-3xl text-slate-800"><MdOutlineExplore /></span>
            </div></Link>
        </div>
        </div>
       
   


    

    </div>
    
    </>
  )
}

export default HeroSection