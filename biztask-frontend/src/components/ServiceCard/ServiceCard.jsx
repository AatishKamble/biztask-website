import { Link } from "react-router-dom"
import Star from "../Reviews/Star"
import { API_BASE_URL } from "../../configApi/ConfigApi"

const ServiceCard = ({business,service,provider}) => {

  return (
   <>
   <div className='bg-slate-200 w-[300px] h-[420px] flex flex-col drop-shadow-xl border-[1px]  shadow-slate-100'>
<div className={`w-full h-[280px] p-5 `}>

<img src={`${business?.companyLogo?.imageUrl}`} alt="" className="bg-cover bg-center w-full h-full" />
</div>


<div className=' flex flex-col justify-center items-center p-4'>
<span className="text-xl font-serif font-semibold  text-[#323d80]">{service?.serviceType}</span>
<span className="text-md font-serif font-normal  text-[#3b3f55]">{provider}</span>
</div>

<div className=' flex justify-between items-center px-4 pb-4'>
    
    <Link to={`/service-detail/${service?._id}`}>
    <div className='w-[80px] cursor-pointer h-[40px] hover:border-[1px] shadow-blue-800 border-blue-400 flex justify-center items-center'>
<span className="text-md font-serif font-semibold  text-slate-700 hover:text-blue-900  p-2 ">View</span>
</div>
</Link>

<div className='w-auto h-auto flex justify-center items-center'>
<span className="text-2xl font-serif font-normal  text-yellow-400">
  <Star star={service?.rating} />
</span>
</div>
</div>

   </div>
   
   
   </>
  )
}

export default ServiceCard