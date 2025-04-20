import { Link } from 'react-router-dom'
import JobAdvertise from '../JobTemplate/JobAdvertise'
import { getAllJobs } from '../../Redux/Job/Action.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DetailLoader from '../Loader/DetailLoader.jsx';
import { HiOutlineBriefcase } from 'react-icons/hi';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FeaturedJob = () => {
  const dispatch = useDispatch();
  const jobStore = useSelector(store => store.jobStore);
  const isLoading = useSelector(store => store.jobStore.isLoading);

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
  }, [dispatch]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  };


  return (
    <section className="w-full  py-16 xl:px-10 lg:px-20 sm:px-5">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute right-0 bottom-1/4 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center gap-3 mb-2">

            <h2 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-700 text-transparent bg-clip-text tracking-wide">
              Explore Recently Posted Jobs
            </h2>
          </div>
          <div className="h-1.5 w-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mt-3"></div>
          <p className="text-gray-600 text-base mt-4 max-w-2xl mx-auto">
            Discover the latest opportunities that match your skills and career goals
          </p>
        </motion.div>
        {/* Loader Overlay */}
        {isLoading?  (
          <div className="relative inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm z-10 rounded-xl h-[200px]">
            <DetailLoader />
          </div>
        ):(<>
        {/* Job Listings Container */}
        <motion.div
          className="w-full relative px-6 py-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >


          {/* Job Cards Grid */}
          <div className={`grid sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-8 justify-center transition-opacity duration-300 ${isLoading ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
            {jobStore?.jobs?.jobs?.slice(0, 10)?.map((job, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="transform hover:-translate-y-1  transition-all duration-300"
              >
                <JobAdvertise typeText="Apply" job={job} business={job?.business} />
              </motion.div>
            ))}
            {!isLoading && jobStore?.jobs?.jobs?.length > 0 && (
              <motion.div
                className="w-full flex justify-center items-center xl:border mt-5 xl:mt-0 rounded-xl border-blue-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Link to="/jobs" className="relative group">
                  {/* Glowing Background */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:blur-md"></div>

                  {/* Button */}
                  <motion.button
                    className="relative z-10 bg-white text-blue-700 px-8 py-3.5 rounded-full text-lg font-semibold font-serif flex items-center gap-3 shadow-md hover:shadow-xl transition-all duration-300 border border-blue-200 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white w-full justify-center md:w-auto min-w-[240px]"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="transition-all duration-300">Explore All Jobs</span>
                    <FaArrowRight className="text-xl transform transition-transform duration-300 group-hover:translate-x-2" />
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* No Jobs Found Message */}
          {!isLoading && jobStore?.jobs?.jobs?.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-gray-400 text-6xl mb-4">
                <HiOutlineBriefcase className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-700">No jobs found</h3>
              <p className="text-gray-500 mt-2">Check back later for new opportunities</p>
            </motion.div>
          )}

          {/* View All Jobs Button */}

        </motion.div></>)}
      </div>
    </section>
  );
}

export default FeaturedJob;