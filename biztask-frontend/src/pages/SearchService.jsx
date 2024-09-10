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
  const checkBoxOptions = [1, 2, 3, 4, 5];


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
  return (
    <>

      <div className=' bg-blue-950 w-full h-[400px]  relative drop-shadow-xl shadow-blue-200  '>
        <img src={serviceBack} alt="" className=' w-full h-full object-cover opacity-40 ' />

        <div className='  absolute top-44 w-full flex flex-col justify-center items-center'>
          <span className=' font-mono font-semibold text-[#ffffff]  text-[38px] opacity-75'>Find Services Effectively!</span>


        </div>

      </div>
      <div className='  w-full h-full pt-10 pb-10 ps-10 pe-0 flex '>
        <div>


          <div className='mx-10 mb-5 w-[300px]  text-[35px] py-5 '>
            <span className='w-fullflex justify-start items-center text-blue-800 font-sans font-semibold '> Services</span>

          </div>



          <FilterServices
            nameInput={nameInput}
            handleNameInputChange={(e) => setNameInput(e.target.value)}
            handleNameInputSubmit={handleNameInputSubmit}

            locationInput={locationInput}
            handleLocationInputChange={(e) => setLocationInput(e.target.value)}
            handleLocationInputSubmit={handleLocationInputSubmit}

            priceInput={priceInput}
            handlePriceInputChange={(e) => setPriceInput(e.target.value)}
            handlePriceInputSubmit={handlePriceInputSubmit}

            selectedCheckbox={selectedCheckbox}
            handleCheckboxChange={handleCheckboxChange}
            checkBoxOptions={checkBoxOptions}

          />
        </div>
        <div className=' w-full h-auto  grid grid-cols-3 py-20 gap-10 ps-10 pe-2 mt-10 '>


          {
            serviceStore.services?.services?.map((service, index) => (<ServiceCard business={service?.bussiness} service={service} provider={service?.bussiness?.companyName} />))
          }



          <div>



          </div>

        </div>




      </div>
      <div className=' w-full h-20 flex ps-[150px] justify-center items-center py-5 mb-5'>
        <Pagination
          count={serviceStore.services?.totalPages || 0}
          variant="outlined"
          shape="rounded"
          size="large"
          page={serviceStore.services?.currentPage || 1}
          onChange={handlePageChange}
        />
      </div>




    </>
  )
}

export default SearchService