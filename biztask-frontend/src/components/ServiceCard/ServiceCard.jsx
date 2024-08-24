import { Link } from "react-router-dom"

const ServiceCard = () => {
  return (
   <>
   <div className='bg-slate-200 w-[300px] h-[400px] flex flex-col drop-shadow-xl  shadow-slate-100'>
<div className='w-full h-[280px] bg-[url(../../src/assets/clean.jpg)] bg-cover bg-center'>


</div>


<div className=' flex flex-col justify-center items-center p-4'>
<span className="text-xl font-serif font-semibold  text-[#323d80]">Cleaning Service</span>
<span className="text-md font-serif font-normal  text-[#3b3f55]">Aatish Cleaners</span>
</div>

<div className=' flex justify-between items-center px-4 pb-4'>
    
    <Link to={"/service-detail"}>
    <div className='w-[80px] cursor-pointer h-[40px] hover:border-[1px] shadow-blue-800 border-blue-400 flex justify-center items-center'>
<span className="text-md font-serif font-semibold  text-slate-700 hover:text-blue-900  p-2 ">View</span>
</div>
</Link>

<div className='w-auto h-auto flex justify-center items-center'>
<span className="text-2xl font-serif font-normal  text-yellow-400">★★★</span>
</div>
</div>

   </div>
   
   
   </>
  )
}

export default ServiceCard