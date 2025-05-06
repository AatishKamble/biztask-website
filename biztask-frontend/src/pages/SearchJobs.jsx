import React, { useEffect, useState } from 'react'
import FilterBy from '../components/Filter/FilterBy.jsx'
import JobAdvertise from '../components/JobTemplate/JobAdvertise'
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllJobs } from '../Redux/Job/Action.js';
import jobBack from "../assets/jobsbackground.jpg";
import JobLoader from '../components/Loader/JobLoader.jsx';
import HangingBanner from '../components/HangingBanner/HangingBanner.jsx';

const SearchJobs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);

  let pageNumber = searchParams.get("page") || 1;
  let employmentType = searchParams.get("employmentType") || null;
  let minSalary = searchParams.get("minSalary") || 0;
  let maxSalary = searchParams.get("maxSalary") || 10000000000;
  let JobLocations = searchParams.get("jobLocation") || null;
  let jobName = searchParams.get("jobName") || null;

  useEffect(() => {
    const data = {
      jobName: jobName,
      jobLocation: JobLocations,
      minSalary: minSalary,
      maxSalary: maxSalary,
      employmentType: employmentType,
      page: pageNumber,
      limit: 10
    };

    dispatch(getAllJobs(data));
  }, [dispatch, jobName, JobLocations, minSalary, maxSalary, employmentType, pageNumber]);

  const jobStore = useSelector(store => store.jobStore);

  const [nameInput, setNameInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const checkBoxOptions = ["Full Time", "Part Time", "Temporary"];

  //for setting url query field
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const jobsName = searchParams.get("jobName") ? searchParams.get("jobName") : "";
    const locationNames = searchParams.get("jobLocation") ? searchParams.get("jobLocation") : "";
    const minSalary = searchParams.get("minSalary") ? searchParams.get("minSalary") : "";
    const maxSalary = searchParams.get("maxSalary") ? searchParams.get("maxSalary") : "";
    const employmentTypes = searchParams.get("employmentType") ? searchParams.get("employmentType").split(",") : [];

    setNameInput(jobsName);
    setLocationInput(locationNames);
    const updateSalary = minSalary + "," + maxSalary;
    updateSalary === "," ? setPriceInput("") : setPriceInput(minSalary + "," + maxSalary);
    setSelectedCheckbox(employmentTypes);
  }, [location.search]);

  //handling filters in url
  const handleFilter = (sectionId, value) => {
    const searchParams = new URLSearchParams(location.search);
    if (value) {
      searchParams.set(sectionId, value);
    } else {
      searchParams.delete(sectionId);
    }
    searchParams.set("page", 1);
    navigate({ search: searchParams.toString() });
  }

  // Clear specific filter
  const clearFilter = (sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(sectionId);
    navigate({ search: searchParams.toString() });

    // Update local state
    if (sectionId === "jobName") {
      setNameInput("");
    } else if (sectionId === "jobLocation") {
      setLocationInput("");
    } else if (sectionId === "minSalary" || sectionId === "maxSalary") {
      setPriceInput("");
      searchParams.delete("minSalary");
      searchParams.delete("maxSalary");
      navigate({ search: searchParams.toString() });
    } else if (sectionId === "employmentType") {
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
  // Handling the job name input submission
  const handleNameInputSubmit = () => {
    const jobNames = nameInput
      .split(',')
      .map(name => name.trim().toLowerCase())
      .filter((name, index, self) => name !== "" && self.indexOf(name) === index);
    const newValue = jobNames.join(',');
    handleFilter('jobName', newValue);
  };

  // Handling the location input submission
  const handleLocationInputSubmit = () => {
    const jobLocations = locationInput
      .split(',')
      .map(location => location.trim().toLowerCase())
      .filter((location, index, self) => location !== "" && self.indexOf(location) === index);
    const newValue = jobLocations.join(',');
    handleFilter('jobLocation', newValue);
  };

  // Handling the price input submission
  const handlePriceInputSubmit = () => {
    const searchParams = new URLSearchParams(location.search);
    const salaryRange = priceInput.split(",");
    let minSalary = salaryRange[0] ? salaryRange[0] : "";
    let maxSalary = salaryRange[1] ? salaryRange[1] : "";

    if (minSalary !== "") {
      searchParams.set("minSalary", minSalary);
    } else {
      searchParams.delete("minSalary");
    }

    if (maxSalary !== "") {
      searchParams.set("maxSalary", maxSalary);
    } else {
      searchParams.delete("maxSalary");
    }

    navigate({ search: searchParams.toString() });
  };

  //for check box filter 
  function handleCheckboxFilter(sectionId, value) {
    const searchParams = new URLSearchParams(location.search);

    let filterValues = searchParams.get(sectionId) ? searchParams.get(sectionId).split(",") : [];
    if (filterValues.includes(value)) {
      filterValues = filterValues.filter(item => item !== value);
      if (filterValues.length === 0) {
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
    handleCheckboxFilter("employmentType", value);
    setSelectedCheckbox(prevState =>
      prevState.includes(value)
        ? prevState.filter(item => item !== value)
        : [...prevState, value]
    );
  };

  function handlePageChange(event, page) {
    searchParams.set("page", page);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
    window.scrollTo(0, 0);
  }

  const isLoading = useSelector(store => store.jobStore.isLoading);

  return (
    <>
      <div className='relative w-full h-[400px] bg-blue-900 overflow-hidden shadow-xl'>
        <HangingBanner imgage={jobBack} title={`Find Your Dream Job Today`} subtitle="Explore top opportunities, filter what matters, and land where you belong." />
      </div>

      <div className='w-full h-full p-10 flex flex-col xl:flex-row ps-20'>
        <div>
          <div className="mb-6 mx-auto w-full">
            <h1 className="text-3xl font-serif font-bold text-blue-900 flex items-center">
             
              Find Your Perfect Job
              <span className="ml-2 text-blue-500 bg-blue-50 px-2 rounded-xl text-base font-normal">Today</span>
            </h1>
          </div>

          <FilterBy
            nameInput={nameInput}
            handleNameInputChange={(e) => setNameInput(e.target.value)}
            handleNameInputSubmit={handleNameInputSubmit}
            clearNameFilter={() => clearFilter("jobName")}

            locationInput={locationInput}
            handleLocationInputChange={(e) => setLocationInput(e.target.value)}
            handleLocationInputSubmit={handleLocationInputSubmit}
            clearLocationFilter={() => clearFilter("jobLocation")}

            priceInput={priceInput}
            handlePriceInputChange={(e) => setPriceInput(e.target.value)}
            handlePriceInputSubmit={handlePriceInputSubmit}
            clearSalaryFilter={() => clearFilter("minSalary")}

            selectedCheckbox={selectedCheckbox}
            handleCheckboxChange={handleCheckboxChange}
            checkBoxOptions={checkBoxOptions}
            clearEmploymentFilter={() => clearFilter("employmentType")}
            clearAllFilters={clearAllFilters}
          />
        </div>

        <div className='w-full h-auto grid grid-cols-1 gap-10 p-20 py-10 ps-0 relative mx-3'>
          {isLoading === true && (
            <div className="absolute  px-10 inset-0 flex items-center justify-center bg-[#fefefe] opacity-100 z-10">
              <JobLoader />
            </div>
          )}

          {isLoading === false && jobStore.jobs?.jobs?.map((job, index) => (
            <JobAdvertise key={index} typeText="Apply" job={job} business={job.business} />
          ))}

          <div>
            <div className='w-full h-20 flex justify-center items-center pt-20 mt-10'>
              <Pagination
                count={jobStore.jobs?.totalPages || 0}
                variant="outlined"
                shape="rounded"
                size="large"
                page={jobStore.jobs?.currentPage || 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchJobs