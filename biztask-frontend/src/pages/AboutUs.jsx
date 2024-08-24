import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const AboutUs = () => {
    return (
        <>

<div className='w-full text-[26px] text-black font-serif flex justify-center pb-2 m-10'>
          <span>Developer Details</span>
        </div>

            <div className=' w-full h-auto bg-inherit border-[1px] py-20  my-5 drop-shadow-lg border-slate-400 mb-10   flex justify-center items-center px-10'>



                <div className='w-[300px] h-[300px]  rounded-lg mx-1'>

                    <img src="../src/assets/profilepic.jpg" alt="profile picture" className='bg-cover w-full h-full rounded-lg' />
                </div>
                <div className='w-full h-[180px]  flex items-start  flex-col justify-start px-10'>

                    <div >



                        <div className='w-full text-[22px]  text-slate-800 font-serif py-2'>

                            <span className=" px-2">Aatish</span>
                        </div>

                        <div className='w-full text-[22px] text-slate-800 font-serif flex pb-2'>
                            <span className="px-2 font-medium flex items-center"> <MdEmail /></span>

                            <span >neha12@gmail.com</span>
                        </div>
                        <div className='w-full text-[22px] text-slate-800 font-serif flex items-center'>
                            <span className="px-2 font-medium flex items-center"> <FaPhone /> </span>
                            <span >8521476622</span>
                        </div>

                        <div className='w-full text-[22px] text-slate-800 font-serif flex flex-col py-10'>
                            <span className=" font-bold flex items-center w-[200px]"> About Website :</span>
                            <span >This is the website is build for easy service find and job find. this will help local service providers and peoples to find right service.</span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs