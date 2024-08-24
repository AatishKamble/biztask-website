import { MdOutlineAccessTime } from "react-icons/md";

const Review = () => {
  return (
   <>
   
   <div className='bg-[#ffffff] border-[1px] border-[#8895ab]  w-[450px] h-[250px] h-max-[200px] rounded-2xl border-l-4 border-t-4 border-t-yellow-500 border-l-[#b3a8d3] flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center '>
                    <div className=' bg-slate-300 w-[150px] h-[150px] rounded-full ms-2'>

                    </div>
                   
                </div>




                <div className='w-[70%] relative h-full px-4 bg-[#ffffff] rounded-2xl flex flex-col justify-center '>
                    
                    
                    
                   

                    <div className='flex justify-between  py-2 text-slate-900 font-serif font-medium text-[16px]'>
                        <span className="flex justify-center items-center">
                        “The platform made finding reliable workers for my event so easy! The decorator we hired through here did an amazing job, and the entire process was smooth and hassle-free.”
                              </span>
                        

                    </div>
                    <div className='flex justify-between w-inherit py-2 text-gray-600 font-serif font-medium text-[14px]'>
                        <span className="flex justify-center items-center">
                            <span className=" text-slate-900 pe-1"><MdOutlineAccessTime /></span>1 month ago
                        </span>
                         <p className=' text-blue-950 font-serif font-medium text-[16px] pt-2'>
                      <span> Aatish Kamble</span>
                    </p>

                    </div>
                   

                </div>


            </div>
   
   </>
  )
}

export default Review