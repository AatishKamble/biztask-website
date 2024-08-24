import React from 'react'
import Review from '../Reviews/Review'

const WebsiteReviews = () => {
  return (
   <>

<div className='w-full bg-[#ffffff] h-auto px-10'>
    <div className='w-full flex justify-center items-center'>
    <span className=' text-slate-700 font-serif font-semibold text-[30px] mb-4'>What Our Customer Says  !</span>

    </div>
    <div className='w-full h-auto grid grid-cols-3 gap-5 justify-center  py-10 bg-[#ffffff]'>
    <Review/>
    <Review/>
    <Review/>
    
    </div>

    <div className='w-full flex justify-center items-center'>
    <div className='bg-[#eef1f1] hover:bg-[#d1d5d7] w-[200px] opacity-95 my-[20px] cursor-pointer h-10 rounded-xl flex justify-center items-center text-md '>
                    <span className="font-serif font-normal pe-2 text-xl text-slate-800">Load More</span>
</div>
</div>
   </div>
   
   
   </>
  )
}

export default WebsiteReviews