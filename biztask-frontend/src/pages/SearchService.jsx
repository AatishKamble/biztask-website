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

  const isLoading = useSelector(store => store.serviceStore.isLoading);

  return (
    <>

      <div className=' bg-blue-950 w-full h-[400px] mt-1 relative drop-shadow-xl shadow-blue-200  '>
        <img src={serviceBack} alt="" className=' w-full h-full object-cover opacity-40 ' />

        <div className='absolute top-[205px] w-full flex flex-col justify-center items-center'>

          <div className='absolute bottom-[85px] left-1/3 w-1 flex flex-col items-center'>
            {
              Array.from({ length: 14 }).map((_, i) => <div className={`w-1 h-3 bg-gray-400 mb-1`}></div>
              )
            }

          </div>

          {/* Right long hanging chain */}
          <div className='absolute bottom-[85px] right-1/3 w-1 flex flex-col items-center'>
            {
              Array.from({ length: 14 }).map((_, i) => <div className={`w-1 h-3 bg-gray-400 mb-1`}></div>
              )
            }
          </div>


          <div className=' w-[600px] bg-gradient-to-b from-teal-50 to-teal-100  font-sans font-semibold text-blue-500 px-10 py-5 rounded-md shadow-lg border-2 border-teal-200 relative transform hover:translate-y-1 transition-all duration-500 swing'>

            <div className='absolute -top-3 left-1/3 w-6 h-6 border-4 border-blue-500 rounded-full bg-rose-300'></div>
            <div className='absolute -top-3 right-1/3 w-6 h-6 border-4 border-blue-500 rounded-full bg-rose-300'></div>

            <div className='absolute inset-0 overflow-hidden opacity-10'>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className='w-full h-1 bg-teal-800 my-3' style={{ marginTop: `${i * 9}px` }}></div>
              ))}
            </div>


            <span className='text-[38px] opacity-80 block text-center drop-shadow-md'>Find Services Effectively!</span>
          </div>

          {/* CSS for gentle swinging animation */}
          <style jsx>{`
    @keyframes swing {
      0% { transform: rotate(-1deg); }
      50% { transform: rotate(1deg); }
      100% { transform: rotate(-1deg); }
    }
    .swing {
      animation: swing 4s infinite ease-in-out;
    }
  `}</style>
        </div>

      </div>
      <div className='  w-full h-full pt-10 pb-10 ps-10 pe-0 flex '>
        <div>


          <div className='ps-4 mb-5 w-[300px]  text-[35px] py-2 '>
            <span className='w-fullflex justify-start items-center text-blue-800 font-serif font-semibold '>Services</span>

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

        <div className=' w-full h-auto  grid grid-cols-3  gap-10 ps-10 pe-2 mt-10 relative '>

          {isLoading == true && (
            <div className="absolute w-full h-[800px] inset-0 flex items-center justify-center bg-[#fefefe] opacity-100 z-10">

              <JobLoader />

            </div>
          )}
          {
            isLoading == false && serviceStore.services?.services?.map((service, index) => (<ServiceCard business={service?.bussiness} service={service} provider={service?.bussiness?.companyName} />))
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