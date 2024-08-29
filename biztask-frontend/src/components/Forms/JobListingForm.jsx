
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddedBox from "./AddedBox";

const JobListingForm = () => {
    return (
        <div className='bg-[#ffffff] py-10 w-full h-auto flex items-center justify-center'>

            <div className='w-[50%] h-full bg-[#f4faff] p-10'>

                <div className='w-full h-[50px] font-semibold flex justify-center pb-10  items-center text-[26px] text-blue-950 font-serif'>
                    <span>Post Job</span>
                </div>

                <div className='w-full h-[50px]  flex  py-10 justify-center  items-center text-[20px] text-blue-900 font-serif'>
                    <span>Job Details</span>
                </div>
                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="role" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Job Role :</label>
                    <input type="text" name='role' placeholder='Enter Job Role' className=' text-[20px] w-full h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md  focus-within:drop-shadow-xl' autoComplete='none' />
                </div>

                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="eType" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Employment Type :</label>
                    <input type="text" name='eType' placeholder=' ex.Full time, Part time' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                </div>

                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="experience" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Years of Experience:</label>
                    <input type="text" name='experience' placeholder='e.g. 0 ,2 ' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                </div>

                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="workingHours" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Working Hours:</label>
                    <input type="text" name='workingHours' placeholder="e.g., 9 AM - 5 PM or Flexible" className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                </div>
                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="startSal" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Minimum Salary:</label>
                    <input type="text" name='startSal' placeholder="Minimum Salary" className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                </div>
                <div className='w-full h-[50px] flex py-10  items-center text-black'>

<label htmlFor="endSal" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Maximum Salary:</label>
<input type="text" name='endSal' placeholder="Maximum Salary " className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
</div>

               

                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="deadline" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Application Deadline:</label>
                    <input type="date" name='deadline' placeholder="select Date" className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                </div>


                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="Locations" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Job Locations :</label>

                    <input type="text" name='Locations' placeholder='Enter Locations' className=' text-[20px] h-[50px] font-serif outline-none px-4 ms-8 w-[700px]  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                    <div className="w-[100px] h-[50px]">
                        <button className=' bg-[#3b65be] text-lg font-serif font-medium hover:bg-[#678bd8] rounded-full align-middle h-[50px] w-[50px]   drop-shadow-2xl ms-2 flex justify-center items-center'>
                            Add
                        </button>
                    </div>

                </div>

                <AddedBox />
                <div className='w-full h-[50px]  flex  py-10 justify-center  items-center text-[20px] text-blue-900 font-serif'>
                    <span>Job Overview</span>
                </div>
                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="responsibility" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Responsibilities:</label>

                    <input type="text" name='responsibility' placeholder='Job Responsibilities :' className=' text-[20px] h-[50px] font-serif outline-none px-4 ms-8 w-[700px]  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                    <div className="w-[100px] h-[50px]">
                        <button className=' bg-[#3b65be] text-lg font-serif font-medium hover:bg-[#678bd8] rounded-full align-middle h-[50px] w-[50px]   drop-shadow-2xl ms-2 flex justify-center items-center'>
                            Add
                        </button>
                    </div>

                </div>
                <AddedBox />

                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="requirement" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Skill Required :</label>

                    <input type="text" name='requirement' placeholder='Job Responsibilities :' className=' text-[20px] h-[50px] font-serif outline-none px-4 ms-8 w-[700px]  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                    <div className="w-[100px] h-[50px]">
                        <button className=' bg-[#3b65be] text-lg font-serif font-medium hover:bg-[#678bd8] rounded-full align-middle h-[50px] w-[50px]   drop-shadow-2xl ms-2 flex justify-center items-center'>
                            Add
                        </button>
                    </div>

                </div>
                <AddedBox />





                <div className='w-full h-[50px]  flex  py-10 justify-center  items-center text-[20px] text-blue-900 font-serif'>
                    <span>other Details </span>
                </div>

                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Service Type :</label>
                    <input type="text" className=' text-[20px] w-full h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md  focus-within:drop-shadow-xl' autoComplete='none' disabled="true" />
                </div>

                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Company Name :</label>
                    <input type="text" className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' disabled="true" />
                </div>

                <div className='w-full h-[50px] flex py-10  items-center text-black'>

                    <label htmlFor="email" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Email :</label>
                    <input type="email" name='email' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' disabled="true" />
                </div>


                <div className='w-full h-[300px] flex py-10  items-center text-black'>

                    <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Company description :</label>

                    <textarea name="Description" id="DescriptionBox"

                        className=' text-[20px] h-[300px] font-serif outline-none p-4  w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl'
                        rows={5} cols={40}
                        style={{ resize: 'none', overflow: 'hidden' }}
                        disabled="true"
                    ></textarea>

                </div>



                <div className='flex items-center justify-between my-10 h-[200px]'>

                    <button className=' bg-[#3ca462] hover:bg-[#2cc163] align-middle h-12 w-[130px] rounded-xl border-blue-950 drop-shadow-2xl mx-3 flex justify-center items-center' >

                        <span className='text-lg font-serif font-medium text-white'>Cancel</span>

                    </button>

                    <button className=' bg-blue-900 hover:bg-[#1e52c3] align-middle h-12 w-[130px] rounded-xl border-blue-950 drop-shadow-2xl mx-3 flex justify-center items-center' >
                        <span className='text-lg font-serif font-medium me-1 text-white'><FaSave /></span>
                        <span className='text-lg font-serif font-medium text-white'>Post</span>

                    </button>
                </div>
            </div>
        </div >
    )
}

export default JobListingForm;