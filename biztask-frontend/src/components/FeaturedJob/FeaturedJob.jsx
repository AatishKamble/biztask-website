import { Link } from 'react-router-dom'
import JobAdvertise from '../JobTemplate/JobAdvertise'
import { getAllJobs } from '../../Redux/Job/Action.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import JobLoader from '../Loader/JobLoader.jsx';

const FeaturedJob = () => {

  const dispatch = useDispatch();
  const jobStore = useSelector(store => store.jobStore);

  useEffect(() => {
    const data = {
      jobName: null,
      jobLocation: null,
      minSalary: 0,
      maxSalary: 1000000000000000,
      employmentType: null,
      page: 1,
      limit: 10
    };
    dispatch(getAllJobs(data));

  }, [])

  const isLoading = useSelector(store => store.jobStore.isLoading);

  return (
    <>

      <div className='w-full bg-[#ffffff] h-auto xl:px-10 lg:px-20 sm:px-5 '>
        <div className='w-full flex justify-center items-center'>
          <span className=' text-blue-950 font-serif font-semibold text-[30px]  border-b-2 border-b-blue-950 mb-4'>Recently Posted Job Openings</span>

        </div>

        <div className='w-full h-auto grid sm:grid-cols-1  lg:grid-cols-1 xl:grid-cols-2  gap-5 justify-center px-10  py-10 bg-[#ffffff] sm:px-20 xl:px-10 relative'>
          {isLoading == true && (
            <div className="absolute w-full h-[200px]  inset-0 flex items-center justify-center bg-[#fefefe] opacity-100 z-10">

              <JobLoader />

            </div>
          )}
          {
            !isLoading  && jobStore?.jobs?.jobs?.slice(0, 10)?.map((job, index) => (<JobAdvertise key={index} typeText="Apply" job={job} business={job?.business} />))
          }

        </div>

        {
            !isLoading  &&
        <div className='w-full flex justify-center items-center'>

            <Link to={"/jobs"}>
              <div className='bg-[#eef1f1] hover:bg-[#d1d5d7] w-[250px] opacity-95 mt-[20px] cursor-pointer h-14 rounded-xl flex justify-center items-center text-lg border-[1px] border-slate-400'>
                <span className="font-serif font-bold pe-2 text-xl text-slate-800">View All</span>
              </div></Link>

              </div>
            }
      </div>


    </>
  )
}

export default FeaturedJob