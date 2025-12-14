import React, { useState, useEffect } from 'react'
import { MdOutlineDescription, MdVerified } from "react-icons/md";
import ServiceCard from '../ServiceCard/ServiceCard.jsx'
import { Link } from 'react-router-dom';
import { FaAddressCard, FaBriefcase, FaBuilding, FaPlus, FaInfo, FaMapMarkerAlt, FaCalendarAlt, FaAward, FaInfoCircle } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getBusinessById } from "../../Redux/Business/Action.js";
import { API_BASE_URL } from '../../configApi/ConfigApi.js';
import DetailLoader from '../Loader/DetailLoader.jsx';
import { AnimatePresence, motion } from "framer-motion";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import ContactInformation from '../ContactInformation/ContactInformation.jsx';
import ImageZoom from '../ContactInformation/ImageZoom.jsx';
import BusinessSchedule from '../BusinessSchedule/BusinessSchedule.jsx';
import { FaLock } from 'react-icons/fa';

const BusinessDetails = ({ BusiDetails, serviceHeader, OwnerDetails, LogedInUser = {}, handlePaymentInitiation = () => { },handleBookingInitiation=()=>{}, hasPaid = false, showImageModal, setShowImageModal, isBusiness = false, isLoading, currentServiceId = null }) => {






  const [activeTab, setActiveTab] = useState("about");




  const regdate = new Date(BusiDetails?.createdAt);


  //user photo 



  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
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


  const tabContent = {
    about: (<>
      <div className=" text-emerald-500 px-1 py-4 border-b-2 border-gray-300">
        <h2 className="relative text-2xl md:text-3xl font-bold flex items-center gap-2">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <MdOutlineDescription className="text-3xl" />
          </div>
          About Business
        </h2>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="overflow-hidden"
      >


        <div className="md:p-8 p-2 flex flex-col lg:flex-row  gap-6">

          <ContactInformation
            serviceHeader={serviceHeader}
            LogedInUser={LogedInUser}
            handlePaymentInitiation={handlePaymentInitiation}
            handleBookingInitiation={handleBookingInitiation}
            hasPaid={hasPaid}
            OwnerDetails={OwnerDetails}
            setShowImageModal={setShowImageModal}
            isBusiness={isBusiness}
          />
          <div className="bg-gradient-to-br from-emerald-100 to-teal-50 rounded-2xl p-8 border lg:max-w-[50%] border-emerald-200">
            <div className="flex flex-col gap-4">
              <div className='flex items-center justify-start border-b-2 border-emerald-200 py-2 text-emerald-800'>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-2 rounded-xl shadow-lg">
                  <FaInfoCircle className="text-xl text-white" />
                </div>
                <h3 className="text-xl font-semibold  px-2">About Us</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed text-justify">
                {BusiDetails?.description || "No description available for this business."}
              </p>
            </div>
          </div>
        </div>



      </motion.div>



    </>
    ),

    info: (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="overflow-hidden "
      >


        <div className=" text-blue-700 px-1 py-4 border-b-2 border-gray-300">
          <h2 className="relative text-2xl md:text-3xl font-bold flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <FaAddressCard className="text-2xl" />
            </div>
            Business Information
          </h2>
        </div>
        <div className="bg-white  p-4 md:p-8 space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

         

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="lg:col-span-2 rounded-3xl p-6 md:p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-200">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg">
                  <FaMapMarkerAlt className="text-xl text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-blue-900">Address Details</h3>
              </div>

            
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {[
                    { label: "House/Building No.", value: BusiDetails?.houseNumber },
                    { label: "Area", value: BusiDetails?.area },
                    { label: "Village", value: BusiDetails?.village },
                    { label: "Sub-District", value: BusiDetails?.subDistrict },
                    { label: "District", value: BusiDetails?.district },
                    { label: "Pin Code", value: BusiDetails?.pinCode }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100"
                      whileHover={{ y: -3 }}
                    >
                      <h4 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">{item.label}</h4>
                      <p className="text-base md:text-lg text-gray-900 font-bold capitalize truncate">{item.value || "N/A"}</p>
                    </motion.div>
                  ))}
                </div>
                
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={slideRight}
              className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-2 border-purple-200 shadow-lg  transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-purple-200">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg">
                  <FaBriefcase className="text-xl text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-purple-900">Statistics</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-purple-100">
                  <div className="text-center mb-4">
                    <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {BusiDetails?.services?.length || 0}
                    </span>
                    <p className="text-sm md:text-base text-gray-600 font-semibold mt-2">Total Services</p>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full shadow-sm"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, (BusiDetails?.services?.length || 0))}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-green-100">
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <MdVerified className="text-white text-3xl md:text-4xl" />
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1">Verified Business</h4>
                    <p className="text-sm md:text-base text-gray-600">Trusted Provider</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <BusinessSchedule Details={BusiDetails} />
        </div>
      </motion.div>
    ),

    services: (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className=" overflow-hidden "
      >
        <div className=" text-white  py-2 flex justify-between items-center border-b-2 border-gray-300">
          <div className=" text-orange-700 px-1  ">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <FaBriefcase className="text-2xl" />
              </div>
              {currentServiceId === null ? "All Services" : "Other Services"}

            </h2>
          </div>

          {isBusiness &&
            <Link to={`/service-registration/${BusiDetails?._id}`}>
              <motion.button
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600  px-6 py-3 rounded-xl flex items-center font-semibold text-lg transition-all shadow-lg"
               
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus className="mr-2" />
                <span className="hidden sm:block">Add Service</span>
              </motion.button>
            </Link>}
        </div>


        <div className="md:p-8 p-2">
          {BusiDetails?.services?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {BusiDetails?.services?.filter(service => service._id !== currentServiceId).map((service, index) => (
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
                    business={BusiDetails}
                    service={service}
                    provider={BusiDetails?.companyName}
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
              <Link to={`/service-registration/${BusiDetails?._id}`}>
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

          {BusiDetails?.services?.length===1 && !isBusiness && <div className=' p-2 bg-orange-100 border-2 border-dashed border-orange-300 rounded-xl flex justify-center items-center text-semibold gap-2 text-lg'>
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center ">
                <FaBriefcase className="text-white text-xl" />
              </div> 
            Other services not available.</div> }
        </div>
      </motion.div>
    )
  };


  const tabNavi = [
    { key: "about", icon: MdOutlineDescription, label: "About Company", gradient: "from-emerald-500 to-teal-500" },
    { key: "info", icon: FaAddressCard, label: "Business Info", gradient: "from-blue-500 to-indigo-600" },
    { key: "services", icon: FaBriefcase, label: "Services", gradient: "from-orange-500 to-red-500" }
  ];

  const bDetails = [
    { icon: FaBuilding, label: "Business ID", value: BusiDetails?._id, gradient: "from-indigo-500 to-purple-500" },
    { icon: FaCalendarAlt, label: "Registration Date", value: regdate.toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' }), gradient: "from-purple-500 to-pink-500" },
    { icon: FaBuilding, label: "Company Name", value: BusiDetails?.companyName, gradient: "from-pink-500 to-rose-500" },
    { icon: FaBriefcase, label: "Business Type", value: BusiDetails?.businessName, gradient: "from-green-500 to-emerald-500" },
    { icon: FaBriefcase, label: "Business Category", value: BusiDetails?.businessCategory, gradient: "from-blue-500 to-cyan-500" },
    { icon: FaAward, label: "Years of Experience", value: BusiDetails?.yearsOfExperience ? `${BusiDetails.yearsOfExperience} Years` : "N/A", gradient: "from-orange-500 to-red-500" }
  ];

  return (
    <>
      <div className="min-h-screen bg-white font-serif">
        {(isLoading && isBusiness) ? (
          <div className="w-full h-screen flex items-center justify-center bg-white opacity-100 z-40">
            <DetailLoader />
          </div>
        ) : (
          <>
            <div className={`min-h-screen  p-4 md:p-8  ${isBusiness ?"md:pt-8" : " md:pt-1"}`}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                variants={fadeUp}
                className="mx-auto mt-8 mb-8 max-w-7xl font-serif"
              >
                {/* Hero Banner */}

                {isBusiness && <h2 className="text-3xl  lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-indigo-600 mb-10 text-center">
                  Business Overview
                </h2>}

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-3xl  p-8 mb-8 border border-blue-100"
                >


                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <motion.div
                      className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 shrink-0"

                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-slate-500 rounded-3xl  opacity-60"></div>

                      <motion.div
                        className="relative w-full h-full bg-white rounded-3xl shadow-xl p-4 md:p-6 flex items-center justify-center border-4 border-gray-800"
                        whileHover={{ rotate: [0, -2, 2, -2, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={BusiDetails?.companyLogo?.imageUrl}
                          alt="Company Logo"
                          className="w-full h-full object-contain"
                        />
                      </motion.div>


                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 w-full">
                      {bDetails.map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                          whileHover={{ scale: 1.03, y: -3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg`}>
                            <item.icon className="text-lg md:text-xl" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">{item.label}</h4>
                            <p className="text-sm md:text-base text-gray-900 font-bold break-all">{item.value || "N/A"}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>



                  </div>
                </motion.div>









                {/* Tabs Navigation */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-6">
                  {tabNavi.map((tab, index) => (
                    <motion.button
                      key={tab.key}

                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`group relative px-4 py-4 md:px-6 md:py-5 rounded-2xl text-base md:text-lg font-bold transition-all duration-300 shadow-lg overflow-hidden ${activeTab === tab.key
                        ? "bg-white shadow-2xl"
                        : "bg-gradient-to-br from-gray-50 to-white hover:shadow-xl"
                        }`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {activeTab === tab.key && (
                        <motion.div
                          layoutId="activeTab"
                          className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-2xl`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <div className={`relative flex items-center justify-center gap-2 ${activeTab === tab.key ? "text-white" : "text-gray-700"
                        }`}>
                        <tab.icon className="text-xl md:text-2xl" />
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>




                <div className="max-w-7xl mt-6 sm:mt-2 mx-auto">
                  {/* Tab Content */}
                  {tabContent[activeTab]}
                </div>
              </motion.div>
            </div >


          </>
        )}
      </div >




    </>
  );
};

export default BusinessDetails;