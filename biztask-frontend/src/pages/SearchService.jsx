import React, { useEffect, useState } from 'react'
import FilterBy from '../components/Filter/FilterBy.jsx';
import FilterServices from "../components/Filter/FilterServices.jsx"
import JobAdvertise from '../components/JobTemplate/JobAdvertise'
import Pagination from '@mui/material/Pagination';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllServices } from '../Redux/ServiceR/Action.js';
import serviceBack from "../assets/service.jpg"
import JobLoader from '../components/Loader/JobLoader.jsx';
import HangingBanner from '../components/HangingBanner/HangingBanner.jsx';
import { motion } from 'framer-motion';
import { FaSearchDollar } from 'react-icons/fa';
import { MdOutlineAddCircleOutline } from 'react-icons/md';

const SearchService = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);

  let page = searchParams.get("page") || 1;
  let rating = searchParams.get("rating") || null;
  let minPrice = searchParams.get("minPrice") || 0;
  let maxPrice = searchParams.get("maxPrice") || 1000000000000000;
  let serviceLocation = searchParams.get("serviceLocation") || null;
  let serviceName = searchParams.get("serviceName") || null;
  let limit = 10;

  useEffect(() => {
    const data = {
      serviceName: serviceName,
      serviceLocation: serviceLocation,
      minPrice: minPrice,
      maxPrice: maxPrice,
      rating: rating,
      page,
      limit
    };

    dispatch(getAllServices(data));

  }, [dispatch, serviceName, serviceLocation, minPrice, maxPrice, rating, page, limit]);


  const serviceStore = useSelector(store => store.serviceStore);

  const [nameInput, setNameInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const checkBoxOptions = [0,1, 2, 3,3.5, 4, 5];


  //for seting from url
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const serviceName = searchParams.get("serviceName") ? searchParams.get("serviceName") : "";
    const serviceLocation = searchParams.get("serviceLocation") ? searchParams.get("serviceLocation") : "";
    const minPrice = searchParams.get("minPrice") ? searchParams.get("minPrice") : "";
    const maxPrice = searchParams.get("maxPrice") ? searchParams.get("maxPrice") : "";

    const filterValues = searchParams.get("rating") ? searchParams.get("rating").split(",") : [];

    setNameInput(serviceName);
    setLocationInput(serviceLocation);
    const updatePrice = minPrice + "," + maxPrice;
    updatePrice == "," ? setPriceInput("") : setPriceInput(minPrice + "," + maxPrice);

    setSelectedCheckbox(filterValues);
  }, [location.search]);

  const handleFilter = (sectionId, value) => {
    const searchParams = new URLSearchParams(location.search);
    if (value) {
      searchParams.set(sectionId, value);
    } else {
      searchParams.delete(sectionId);
    }
    navigate({ search: searchParams.toString() });

  }

  //for service name
  const handleNameInputSubmit = () => {
    const serviceName = nameInput
      .split(',')
      .map(name => name.trim())
      .filter((name, index, self) => name !== "" && self.indexOf(name) === index);
    const newValue = serviceName.join(',');
    handleFilter('serviceName', newValue);

  };

  //for location
  const handleLocationInputSubmit = () => {
    const serviceLocation = locationInput
      .split(',')
      .map(location => location.trim().toLowerCase())
      .filter((location, index, self) => location !== "" && self.indexOf(location) === index);
    const newValue = serviceLocation.join(',');
    handleFilter('serviceLocation', newValue);
  };

  //for price

  const handlePriceInputSubmit = () => {
    const searchParams = new URLSearchParams(location.search);
    const priceRange = priceInput.split(",");
    let minPrice = priceRange[0] ? priceRange[0] : "";
    let maxPrice = priceRange[1] ? priceRange[1] : "";

    if (minPrice !== "") {
      searchParams.set("minPrice", minPrice);
    } else {
      searchParams.delete("minPrice");
    }


    if (maxPrice !== "") {
      searchParams.set("maxPrice", maxPrice);
    } else {
      searchParams.delete("maxPrice");
    }


    navigate({ search: searchParams.toString() });
  };



  //for check box filter 
  function handleCheckboxFilter(sectionId, value) {
    const searchParams = new URLSearchParams(location.search);

    let filterValues = searchParams.get(sectionId) ? searchParams.get(sectionId).split(",") : [];
    if (filterValues.includes(value)) {
      filterValues = filterValues.filter(item => item !== value);
      if (filterValues.length == 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValues.push(value);
    }


    if (filterValues.length) {
      searchParams.set(sectionId, filterValues.join(","));
    }

    navigate({ search: searchParams.toString() });
  }


  // Handling checkbox selection
  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    handleCheckboxFilter("rating", value);
    setSelectedCheckbox(prevState =>
      prevState.includes(value)
        ? prevState.filter(item => item !== value)
        : [...prevState, value]
    );
  };



  function handlePageChange(event, page) {

    searchParams.set("page", page);
    const query = searchParams.toString();
    navigate({ search: `?${query}` })
    window.scrollTo(0, 0);

  }

  const isLoading = useSelector(store => store.serviceStore.isLoading);


  // Clear specific filter
  const clearFilter = (sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(sectionId);
    navigate({ search: searchParams.toString() });

    // Update local state
    if (sectionId === "serviceName") {
      setNameInput("");
    } else if (sectionId === "serviceLocation") {
      setLocationInput("");
    } else if (sectionId === "minPrice" || sectionId === "maxPrice") {
      setPriceInput("");
      searchParams.delete("minPrice");
      searchParams.delete("maxPrice");
      navigate({ search: searchParams.toString() });
    } else if (sectionId === "rating") {
      setSelectedCheckbox([]);
    }
  }

  //clear All filter
  const clearAllFilters = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", 1);
    navigate({ search: searchParams.toString() });

    // Reset all state
    setNameInput("");
    setLocationInput("");
    setPriceInput("");
    setSelectedCheckbox([]);
  };


  const hasNoServices = !isLoading && (!serviceStore.services?.services || serviceStore.services?.services.length === 0);

  return (
    <>


      <div className='relative w-full h-[400px] bg-blue-900 overflow-hidden shadow-xl'>

        <HangingBanner imgage={serviceBack} title={`Discover Top Services Around You`} subtitle=" Filter what matters and connect with the right service providers easily." />

      </div>
      <div className='  w-full h-full  xl:ps-14 p-4 md:pt-10 pt-8 xl:pe-0 flex flex-col xl:flex-row'>
        <div>


<div className="mb-6 mx-auto w-full">
            <h1 className="text-2xl font-serif font-semibold text-blue-700 flex items-center">
             
              Sort by Your Priorities
            
            </h1>
          </div>



          <FilterServices
            nameInput={nameInput}
            handleNameInputChange={(e) => setNameInput(e.target.value)}
            handleNameInputSubmit={handleNameInputSubmit}
            clearNameFilter={() => clearFilter("serviceName")}

            locationInput={locationInput}
            handleLocationInputChange={(e) => setLocationInput(e.target.value)}
            handleLocationInputSubmit={handleLocationInputSubmit}
            clearLocationFilter={() => clearFilter("serviceLocation")}

            priceInput={priceInput}
            handlePriceInputChange={(e) => setPriceInput(e.target.value)}
            handlePriceInputSubmit={handlePriceInputSubmit}
            clearPriceFilter={() => clearFilter("minPrice")}

            selectedCheckbox={selectedCheckbox}
            handleCheckboxChange={handleCheckboxChange}
            checkBoxOptions={checkBoxOptions}
            clearRatingFilter={() => clearFilter("rating")}

            clearAllFilters={clearAllFilters}
          />
        </div>

        <div className='w-full h-auto grid grid-cols-1 xl:grid-cols-3 gap-10 md:px-12 px-2 mt-14 relative font-serif'>
      {isLoading && (
        <div className="absolute px-10 md:ms-2 inset-0 flex items-center justify-center bg-[#fefefe] opacity-100 z-10">
          <JobLoader />
        </div>
      )}

      {hasNoServices && (
        <div className="col-span-1 xl:col-span-3 py-16 flex flex-col items-center justify-center text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <div className="mb-6 p-6 bg-indigo-50 rounded-full">
            <FaSearchDollar className="text-5xl text-indigo-500" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3">No Services Found</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6 font-serif">
            We couldn't find any services matching your criteria. Try adjusting your filters or check back later for new listings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-serif font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2" 
            onClick={()=>clearAllFilters()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Reset Filters
            </button>
            
          </div>
        </div>
      )}

      {!isLoading && serviceStore.services?.services?.length > 0 && (
        serviceStore.services.services.map((service, index) => (
          <div key={index} className='flex justify-center'>
            <ServiceCard 
              business={service?.bussiness} 
              service={service} 
              provider={service?.bussiness?.companyName} 
            />
          </div>
        ))
      )}

      <div>
        {/* Empty div preserved from original code */}
      </div>
    </div>



      </div>

      {isLoading == true ?"":
      <div className=' w-full h-20 flex xl:ps-[500px] justify-center items-center py-5 mb-5'>
        <Pagination
          count={serviceStore.services?.totalPages || 0}
          variant="outlined"
          shape="rounded"
          size="large"
          page={serviceStore.services?.currentPage || 1}
          onChange={handlePageChange}
        />
      </div>
      

      }

    </>
  )
}

export default SearchService