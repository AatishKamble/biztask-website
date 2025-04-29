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

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
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

  const tabContent = {

    about: (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="bg-white rounded-xl shadow-lg overflow-hidden mt-8"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4">
          <h2 className="text-xl font-bold flex items-center">
            <MdOutlineDescription className="mr-2 text-2xl" /> About Company
          </h2>
        </div>
        <div className="p-8">

          <div className=" bg-blue-50 rounded-lg p-6">
            <p className="text-slate-700 text-lg italic leading-relaxed">
              {businessStore.business?.description || "No description available for this business."}     </p>
          </div>


        </div>
      </motion.div>
    ),

    info: (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="bg-white rounded-xl shadow-lg overflow-hidden mt-8"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4">
          <h2 className="text-xl font-bold flex items-center">
            <FaAddressCard className="mr-2 text-2xl" /> Business Information
          </h2>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={slideRight}
              className="bg-blue-50 rounded-lg p-6"
            >
              <h3 className="text-xl font-bold text-blue-800 mb-4">Business Details</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FaBuilding className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Business ID</h3>
                    <p className="text-base text-slate-600 break-all">{businessStore.business?._id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <IoPersonCircleOutline className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Owner Name</h3>
                    <p className="text-base text-slate-600">{userDetails?.name || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FaBuilding className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Company Name</h3>
                    <p className="text-base text-slate-600">{businessStore.business?.companyName || "N/A"}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={slideRight}
              className="bg-blue-50 rounded-lg p-6"
            >
              <h3 className="text-xl font-bold text-blue-800 mb-4">Service Statistics</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700 font-semibold">Total Services</span>
                    <span className="font-bold text-blue-800">{businessStore.business?.services?.length || 0}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(100, (businessStore.business?.services?.length || 0) * 10)}%` }}></div>
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
            className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-blue-800 mb-4">Business Hours</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="font-semibold text-slate-700">Monday - Saturday</span>
                  <span className="text-blue-800">9:00 AM - 6:00 PM</span>
                </div>

                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="font-semibold text-slate-700">Sunday</span>
                  <span className="text-blue-800">Closed</span>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-end">
                <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-auto">
                  <div className="text-center">
                    <span className="block text-xl font-bold text-blue-800">Current Status</span>
                    <span className="block text-green-500 font-semibold mt-2">OPEN </span>

                  </div>
                </div>
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
        className="bg-white rounded-xl shadow-lg overflow-hidden mt-8"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <FaBriefcase className="mr-2 text-2xl" /> All Services
          </h2>
          <Link to={`/service-registration/${businessStore.business?._id}`}>
            <button className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-full flex items-center font-semibold text-lg transition-all">
              <FaPlus className="mr-2" /> Add Service
            </button>
          </Link>
        </div>

        <div className="p-8">
          {businessStore.business?.services?.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessStore.business?.services?.map((service, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index + 1}
                  variants={fadeUp}
                >
                  <ServiceCard business={businessStore?.business} service={service} provider={businessStore.business?.companyName} />
                </motion.div>
              ))}


            </div>
            :

            <p className="text-slate-700 text-center text-lg italic leading-relaxed">
              No Service Added     </p>
          }
        </div>
      </motion.div>
    )
  };

  return (
    <>
      <div className="mt-10 font-serif">
        {isLoading ? (
          <div className="w-full h-screen flex items-center justify-center bg-white opacity-100 z-40">
            <DetailLoader />
          </div>
        ) : (
          <>
            {/* Hero Banner */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="bg-white text-gray-700 w-11/12 border border-teal-300 mx-auto rounded-lg shadow-xl"
            >
              <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-40 h-40 rounded-full border-2 border-blue-600 bg-white p-2 shadow-2xl flex-shrink-0">
                    <div className="w-full text-center   h-full rounded-full overflow-hidden">
                      <img
                        src={businessStore.business.companyLogo?.imageUrl}
                        alt="Company Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <h1 className="text-4xl font-bold">{businessStore.business?.companyName}</h1>
                      <MdVerified className="text-green-700 text-3xl" />
                    </div>
                    <p className="text-xl text-blue-500 mb-2">{userDetails?.name}</p>
                    <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
                      <span className=" bg-white bg-opacity-10 px-5 py-2 rounded-lg text-green-500  flex items-center">
                        <FaBuilding className="mr-2" /> Registered Business
                      </span>
                      <Link to={`/service-registration/${businessStore.business?._id}`}>
                        <button className="bg-blue-500 text-white hover:bg-blue-700 px-6 py-2 rounded-full flex items-center font-semibold text-lg transition-all">
                          <FaPlus className="mr-2" /> Add Service
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 py-14">
              {/* Tabs Navigation */}
              <div className="flex flex-wrap overflow-x-auto p-4  gap-2 mb-6">

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-6 py-3 rounded-full text-lg font-semibold transition-all ${activeTab === "about"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-blue-100 text-slate-700 hover:bg-blue-200"
                    }`}
                  onClick={() => setActiveTab("about")}
                >
                  About Company
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-6 py-3 rounded-full text-lg font-semibold transition-all ${activeTab === "info"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-blue-100 text-slate-700 hover:bg-blue-200"
                    }`}
                  onClick={() => setActiveTab("info")}
                >
                  Business Information
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-6 py-3 rounded-full text-lg font-semibold transition-all ${activeTab === "services"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-blue-100 text-slate-700 hover:bg-blue-200"
                    }`}
                  onClick={() => setActiveTab("services")}
                >
                  Services
                </motion.button>
              </div>

              {/* Tab Content */}
              {tabContent[activeTab]}
            </div></>)}
      </div>
    </>
  );
};

export default BusinessDetails;