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

<div className="w-full bg-gradient-to-b from-white via-slate-100 to-blue-50 h-auto xl:px-10 lg:px-20 sm:px-5 py-12">
  {/* Heading */}
  <div className="w-full flex justify-center items-center mb-6">
  <span className="relative text-blue-900 font-serif font-bold text-[32px] tracking-wide pb border-blue-800 border-y-4 rounded-xl px-4">
    Recently Posted Job Openings
   

  </span>
</div>


  {/* Job Listings Container */}
  <div className="w-full h-auto grid sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-6 justify-center px-10 py-6 relative">
    {isLoading && (
      <div className="absolute w-full h-[200px] inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-md z-10">
        <JobLoader />
      </div>
    )}

    {!isLoading &&
      jobStore?.jobs?.jobs?.slice(0, 10)?.map((job, index) => (
        <div key={index}>
          <JobAdvertise typeText="Apply" job={job} business={job?.business} />
        </div>
      ))}
  </div>

  {/* View All Button */}
{!isLoading && (
  <div className="w-full flex justify-center items-center mt-4">
    <Link to={"/jobs"}>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 w-[260px] mt-[20px] cursor-pointer h-14 rounded-full flex justify-center items-center text-lg border-2 border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
        <span className="font-serif font-bold text-xl tracking-wide">View All</span>
      </div>
    </Link>
  </div>
)}

</div>


    </>
  )
}

export default FeaturedJob