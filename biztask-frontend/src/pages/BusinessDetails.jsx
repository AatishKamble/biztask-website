import React, { useEffect } from 'react'
import { MdOutlineDescription, MdVerified } from "react-icons/md";
import ServiceCard from '../components/ServiceCard/ServiceCard.jsx'
import { Link } from 'react-router-dom';
import { FaAddressCard, FaBriefcase, FaBuilding, FaPlus } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getBusinessById } from "../Redux/Business/Action.js";
import { API_BASE_URL } from '../configApi/ConfigApi.js';
import JobLoader from '../components/Loader/JobLoader.jsx';
import Loader from '../components/Loader/Loader.jsx';
import DetailLoader from '../components/Loader/DetailLoader.jsx';

import { IoPersonCircleOutline } from "react-icons/io5";
const BusinessDetails = ({ userDetails }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const jwt = localStorage.getItem("jwt");

  const businessStore = useSelector(store => store.businessStore)

  useEffect(() => {
    if (jwt && id) {
      dispatch(getBusinessById(id));
    }
  }, [jwt, id, dispatch]);

  const isLoading = useSelector(store => store.businessStore.isLoading);

  return (
    <>
      <div className="min-h-screen bg-slate-50 mt-10">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
            <DetailLoader />
          </div>
        )}

        {/* Hero Banner */}
        <div className="bg-gradient-to-r font-serif from-blue-300 to-indigo-500 text-white w-[90%] mx-auto rounded-md">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Company Logo */}
              <div className="w-40 h-40 rounded-full bg-white p-2 shadow-2xl flex-shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={businessStore.business.companyLogo?.imageUrl}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Company Info */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h1 className="text-3xl  font-bold">{businessStore.business?.companyName}</h1>
                  <MdVerified className="text-green-300 text-2xl" />
                </div>
                <p className="text-xl text-blue-100">{userDetails?.name}</p>
                <div className="mt-4 flex items-center justify-center md:justify-start gap-2">
                  <span className=" border border-x-blue-50 bg-opacity-50 px-4 py-2 rounded-lg text-greylate-400 flex items-center">
                    <FaBuilding className="mr-2" /> Registered Business
                  </span>
                  <Link to={`/service-registration/${businessStore.business?._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full flex items-center font-semibold text-lg transition-all">
                      <FaPlus className="mr-2" /> Add Service
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="flex border-b-2 border-slate-200 mb-8">
            <div className="text-blue-700 border-b-4 border-blue-700 px-8 py-4 font-bold text-xl">Overview</div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <div className="lg:col-span-1">

              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <MdOutlineDescription className="mr-2 text-2xl" /> About Company
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-slate-700 text-base  text-justify">
                    {businessStore.business?.description}  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <FaAddressCard className="mr-2 text-2xl" /> Business Information
                  </h2>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                  {/* Business ID */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <FaBuilding />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-800">Business ID</h3>
                      <p className="text-base text-slate-600 break-all">{businessStore.business?._id}</p>
                    </div>
                  </div>

                  {/* Owner Name */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <IoPersonCircleOutline />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-800">Owner Name</h3>
                      <p className="text-base text-slate-600">{userDetails?.name}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>


            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center">
                    <FaBriefcase className="mr-2 text-2xl" /> Services Offered
                  </h2>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-lg">
                    {businessStore.business?.services?.length || 0} Services
                  </span>
                </div>

                {/* Services Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {businessStore.business?.services?.map((service, index) => (
                      <ServiceCard key={index} business={businessStore?.business} service={service} provider={businessStore.business?.companyName} />
                    ))}


                    <Link to={`/service-registration/${businessStore.business?._id}`}>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-300 p-6 flex flex-col items-center justify-center h-full hover:bg-blue-100 transition-all cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                          <FaPlus className="text-2xl" />
                        </div>
                        <p className="text-blue-700 font-serif text-xl">Add New Service</p>
                        <p className="text-slate-700 text-center mt-2 text-lg">Expand your business offerings</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessDetails