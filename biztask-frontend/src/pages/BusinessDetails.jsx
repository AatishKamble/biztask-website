import React, { useState, useEffect } from 'react'
import { MdOutlineDescription, MdVerified } from "react-icons/md";
import ServiceCard from '../components/ServiceCard/ServiceCard.jsx'
import { Link } from 'react-router-dom';
import { FaAddressCard, FaBriefcase, FaBuilding, FaPlus, FaInfo } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getBusinessById } from "../Redux/Business/Action.js";
import { API_BASE_URL } from '../configApi/ConfigApi.js';
import DetailLoader from '../components/Loader/DetailLoader.jsx';
import { motion } from "framer-motion";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: [0, -10, 0],
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const slideRight = {
  hidden: { opacity: 0, x: -50 },
  visible: (i = 1) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const BusinessDetails = ({ userDetails }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");
  const businessStore = useSelector(store => store.businessStore);
  const isLoading = useSelector(store => store.businessStore.isLoading);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    if (jwt && id) {
      dispatch(getBusinessById(id));
    }
  }, [jwt, id, dispatch]);

  const regdate = new Date(businessStore?.business?.createdAt)
  const tabContent = {
    about: (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className=" rounded-2xl  overflow-hidden  "
      >
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py-6">
          <h2 className="text-2xl font-bold flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <MdOutlineDescription className="text-xl" />
            </div>
            About Our Company
          </h2>
        </div>
        <div className="md:p-8 p-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-8 gap-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={slideRight}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100"
            >
              <h3 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                  <FaBuilding className="text-white text-sm" />
                </div>
                Business Owner Details
              </h3>

              <div className="space-y-6">


                <motion.div
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-indigo-100"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                    <IoPersonCircleOutline className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">Owner Name</h4>
                    <p className="text-base text-gray-600 font-medium">{userDetails?.name || "N/A"}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-indigo-100"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                    <FaPhone className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">Mobile Number</h4>
                    <p className="text-base text-gray-600 break-all  ">
                      {userDetails?.mobileNumber
                      }
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-indigo-100"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg">
                    <MdEmail className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                    <p className="text-base text-gray-600 font-medium">{userDetails?.email
                    }</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={slideRight}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100"
            >
              <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                  <FaBriefcase className="text-white text-sm" />
                </div>
                Owner Image
              </h3>

              <div className="space-y-6">


                <div className="bg-white rounded-xl w-[300px] h-[300px]  shadow-sm border border-purple-100 ">

                  <img className=' w-full h-full object-fill' src={userDetails?.profileImage?.ImageUrl} alt="owner" />


                </div>
              </div>
            </motion.div>

           
          </div>
           <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 col-span-2">
              <div className="flex flex-col  gap-4">
                
                <div className=' flex items-center justify-start'>
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center ">
                  <MdOutlineDescription className="text-white text-xl" />
                </div>
                 <h3 className="text-xl font-semibold text-emerald-800 px-2 ">Company Description</h3>
               </div>
                 
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {businessStore.business?.description || "No description available for this business."}
                  </p>
               
              </div>
            </div>

        </div>
      </motion.div>
    ),

    info: (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="rounded-2xl  overflow-hidden mt-8 "
      >
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-6">
          <h2 className="text-2xl font-bold flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <FaAddressCard className="text-xl" />
            </div>
            Business Information
          </h2>
        </div>
        <div className="md:p-8 p-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={slideRight}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100"
            >
              <h3 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                  <FaBuilding className="text-white text-sm" />
                </div>
                Business Details
              </h3>

              <div className="space-y-6">
                <motion.div
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-indigo-100"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                    <FaBuilding className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">Business ID</h4>
                    <p className="text-sm text-gray-600 break-all font-mono bg-gray-100 px-2 py-1 rounded mt-1">
                      {businessStore.business?._id}
                    </p>
                  </div>
                </motion.div>



                <motion.div
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-indigo-100"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg">
                    <FaBuilding className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">Company Name</h4>
                    <p className="text-base text-gray-600 font-medium">{businessStore.business?.companyName || "N/A"}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-indigo-100"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                    <IoPersonCircleOutline className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">Registeration Date</h4>
                    <p className="text-base text-gray-600 font-medium">{regdate.toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={slideRight}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100"
            >
              <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                  <FaBriefcase className="text-white text-sm" />
                </div>
                Service Statistics
              </h3>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 font-semibold text-lg">Total Services</span>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-purple-600">{businessStore.business?.services?.length || 0}</span>
                      <p className="text-sm text-gray-500">Services Available</p>
                    </div>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full shadow-sm"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, (businessStore.business?.services?.length || 0) * 10)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MdVerified className="text-white text-2xl" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Verified Business</h4>
                    <p className="text-sm text-gray-600">Trusted local service provider</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeUp}
            className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
          >
            <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                <FaInfo className="text-white text-sm" />
              </div>
              Business Hours
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Weekly Schedule</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-semibold text-gray-700 flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      Monday - Saturday
                    </span>
                    <span className="text-blue-600 font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-semibold text-gray-700 flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      Sunday
                    </span>
                    <span className="text-red-500 font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <motion.div
                  className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-200 w-full max-w-sm"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Current Status</h4>
                    <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-lg">
                      OPEN NOW
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    ),

    services: (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className=" rounded-2xl  overflow-hidden mt-8 "
      >
        <div className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-8 py-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center">
            <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center mr-3">
              <FaBriefcase className="text-xl" />
            </div>
            All Services
          </h2>
          <Link to={`/service-registration/${businessStore.business?._id}`}>
            <motion.button
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl flex items-center font-semibold text-lg transition-all shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus className="mr-2" />
              <span className="hidden sm:block">Add Service</span>
            </motion.button>
          </Link>
        </div>

        <div className="md:p-8 p-2">
          {businessStore.business?.services?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {businessStore.business?.services?.map((service, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index + 1}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ServiceCard
                    business={businessStore?.business}
                    service={service}
                    provider={businessStore.business?.companyName}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-16 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-dashed border-orange-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBriefcase className="text-white text-4xl" />
              </div>
              <h3 className="text-gray-800 text-2xl font-bold mb-2">No Services Added Yet</h3>
              <p className="text-gray-600 text-lg mb-6">Start offering your services to customers</p>
              <Link to={`/service-registration/${businessStore.business?._id}`}>
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl transition-all duration-300 shadow-lg font-semibold text-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add Your First Service
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  };

  return (
    <>
      <div className="min-h-screen bg-white font-serif">
        {isLoading ? (
          <div className="w-full h-screen flex items-center justify-center bg-white opacity-100 z-40">
            <DetailLoader />
          </div>
        ) : (
          <>
            {/*  Hero Banner */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="bg-white border border-gray-200 mx-auto rounded-3xl shadow-2xl mt-8 mb-8 max-w-7xl overflow-hidden"
            >
              <div className="bg-gradient-to-br from-blue-600 via-blue-400 to-indigo-700 px-8 py-12 relative overflow-hidden">


                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                  {/* Logo */}
                  <motion.div
                    className="w-44 h-44 rounded-3xl border-4 border-gray-200 bg-white p-4 shadow-2xl flex-shrink-0 overflow-hidden"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={businessStore.business.companyLogo?.imageUrl}
                      alt="Company Logo"
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  </motion.div>

                  {/*  Business Info */}
                  <div className="text-center lg:text-left text-gray-50 flex-1">
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                      <h1 className="text-3xl font-bold">{businessStore.business?.companyName}</h1>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <MdVerified className="text-green-400 text-3xl" />
                      </motion.div>
                    </div>


                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                      <motion.span
                        className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white flex items-center font-semibold border border-white/30"
                        whileHover={{ scale: 1.05, bg: "rgba(255,255,255,0.3)" }}
                      >
                        <FaBuilding className="mr-2" /> Verified Business
                      </motion.span>

                      <Link to={`/service-registration/${businessStore.business?._id}`}>
                        <motion.button
                          className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl flex items-center font-semibold text-lg transition-all shadow-lg"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaPlus className="mr-2" /> Add Service
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="max-w-7xl mx-auto sm:px-6 px-2 pb-16">
              {/* Tabs Navigation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-8 py-4 rounded-2xl text-lg font-semibold transition-all shadow-lg ${activeTab === "about"
                    ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-xl"
                    : "bg-white text-gray-700 hover:bg-emerald-50 border border-emerald-100"
                    }`}
                  onClick={() => setActiveTab("about")}
                >
                  <div className="flex items-center justify-center gap-2">
                    <MdOutlineDescription className="text-xl" />
                    About Company
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-8 py-4 rounded-2xl text-lg font-semibold transition-all shadow-lg ${activeTab === "info"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl"
                    : "bg-white text-gray-700 hover:bg-indigo-50 border border-indigo-100"
                    }`}
                  onClick={() => setActiveTab("info")}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FaAddressCard className="text-xl" />
                    Business Information
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-8 py-4 rounded-2xl text-lg font-semibold transition-all shadow-lg ${activeTab === "services"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl"
                    : "bg-white text-gray-700 hover:bg-orange-50 border border-orange-100"
                    }`}
                  onClick={() => setActiveTab("services")}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FaBriefcase className="text-xl" />
                    Services
                  </div>
                </motion.button>
              </div>

              {/* Tab Content */}
              {tabContent[activeTab]}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BusinessDetails;