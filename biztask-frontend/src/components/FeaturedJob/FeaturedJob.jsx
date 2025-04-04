import { Link } from 'react-router-dom'
import JobAdvertise from '../JobTemplate/JobAdvertise'
import { getAllJobs } from '../../Redux/Job/Action.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import JobLoader from '../Loader/JobLoader.jsx';
import { HiOutlineBriefcase } from 'react-icons/hi';
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
      <div className="w-full bg-gradient-to-b from-white via-blue-50 to-white h-auto xl:px-10 lg:px-20 sm:px-5 py-10">
        {/* Heading */}
        <div className="w-full flex justify-center items-center mb-8">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-6 py-3 rounded-xl  border border-blue-200 flex items-center gap-3">
            <HiOutlineBriefcase className="text-blue-700 text-2xl" />
            <h2 className="text-2xl  font-serif font-bold text-blue-900 tracking-wide text-center">
              Recently Posted Job Openings
            </h2>
          </div>
        </div>

        {/* Job Listings Container */}
        <div className="w-full h-auto grid sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-8 justify-center px-6 py-6 relative">
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
          <div className="w-full flex justify-center items-center mt-8">
            <Link to={"/jobs"}>
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 w-[260px] cursor-pointer h-14 rounded-full flex justify-center items-center text-lg border-2 border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                <span className="font-serif font-bold text-xl tracking-wide">View All</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default FeaturedJob