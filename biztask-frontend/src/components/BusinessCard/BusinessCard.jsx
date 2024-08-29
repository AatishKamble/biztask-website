import React from 'react'

const BusinessCard = () => {
  return (
    <>
    <div className="  bg-slate-100 w-[400px] h-[140px] flex justify-between items-center rounded-lg drop-shadow-xl shadow-slate-200 mx-5">
           <div className='w-[300px]'>   <span className=' text-blue-950 font-serif font-semibold text-[20px] mx-5 flex justify-center items-center '>Aatish Cleaners</span>

            </div> 
<div className='w-[200px] flex flex-col gap-y-4 pe-2'>
<button className='bg-slate-100  rounded-md hover:border-slate-500 border-[1px] hover:bg-slate-200 w-[160px] h-[30px] text-slate-600 font-serif font-normal text-[18px]'>register service</button>
<button className='bg-slate-100  rounded-md hover:border-slate-500 border-[1px] hover:bg-slate-200 w-[160px] h-[30px] text-slate-600 font-serif font-normal text-[18px]'>view service</button>
     

</div>

</div>
    </>
  )
}

export default BusinessCard