import { Link } from 'react-router-dom'
import JobAdvertise from '../JobTemplate/JobAdvertise'

const FeaturedJob = () => {
  return (
   <>
   
   <div className='w-full bg-[#ffffff] h-auto px-10'>
    <div className='w-full flex justify-center items-center'>
    <span className=' text-blue-950 font-serif font-semibold text-[30px]  border-b-2 border-b-blue-950 mb-4'>Recently Posted Job Openings</span>

    </div>
    <div className='w-full h-auto grid grid-cols-2 gap-5 justify-center px-10 py-10 bg-[#ffffff]'>
    <JobAdvertise typeText="Apply"/>
    <JobAdvertise typeText="Apply"/>
    <JobAdvertise typeText="Apply"/>
    <JobAdvertise typeText="Apply"/>
    
    </div>

    <div className='w-full flex justify-center items-center'>

    
<Link to={"/jobs"}>
<div className='bg-[#eef1f1] hover:bg-[#d1d5d7] w-[250px] opacity-95 mt-[20px] cursor-pointer h-14 rounded-xl flex justify-center items-center text-lg border-[1px] border-slate-400'>
                    <span className="font-serif font-bold pe-2 text-xl text-slate-800">View All</span>
</div></Link></div>
   </div>
   
   
   </>
  )
}

export default FeaturedJob