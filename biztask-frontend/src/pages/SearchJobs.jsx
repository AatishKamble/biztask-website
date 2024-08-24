import React from 'react'
import FilterBy from '../components/Filter/FilterBy'
import JobAdvertise from '../components/JobTemplate/JobAdvertise'
import Pagination from '@mui/material/Pagination';
const SearchJobs = () => {
    return (
        <>

        <div className=' bg-blue-950 w-full h-[400px]  relative drop-shadow-xl shadow-blue-200  '>
<img src="../src/assets/jobsbackground.jpg" alt="" className=' w-full h-full object-cover opacity-40 ' />

<div className='  absolute top-44 w-full flex flex-col justify-center items-center'>
        <span className=' font-mono font-semibold text-white text-[38px] opacity-75'>Finding Jobs became easy !</span>
        

</div>

        </div>
            <div className='  w-full h-full p-10 flex '>
                <div>


                    <div className='b mx-10 mb-5 w-[300px]  text-[35px] '>
                        <span className='w-fullflex justify-start items-center text-blue-800 font-sans font-semibold '> Jobs</span>

                    </div>

                    <FilterBy />


                </div>
                <div className=' w-full h-auto  grid grid-cols-1 gap-10 p-20 '>

                    <JobAdvertise typeText="Apply" />
                    <JobAdvertise typeText="Apply" />
                    <JobAdvertise typeText="Apply" />
                    <JobAdvertise typeText="Apply" />
                    <JobAdvertise typeText="Apply" />
                    <div>

    <div className=' w-full h-20 flex justify-center items-center pt-20 mt-10'>
        <Pagination
            count={5}
            variant="outlined"
            shape="rounded"
 size="large"
        />
    </div>

</div>

                </div>




            </div>

           



        </>
    )
}

export default SearchJobs