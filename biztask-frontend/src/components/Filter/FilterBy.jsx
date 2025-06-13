import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdOutlineMyLocation, MdWorkOutline } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsBriefcase, BsClock, BsCalendarEvent } from "react-icons/bs";

const FilterBy = ({
  nameInput, handleNameInputChange, handleNameInputSubmit, clearNameFilter,
  locationInput, handleLocationInputChange, handleLocationInputSubmit, clearLocationFilter,
  priceInput, handlePriceInputChange, handlePriceInputSubmit, clearSalaryFilter,
  selectedCheckbox, handleCheckboxChange, checkBoxOptions, clearEmploymentFilter,clearAllFilters
}) => {
  const [expandedSection, setExpandedSection] = useState(null);
  
 
  const salaryRange = priceInput ? priceInput.split(',') : ["0", "200000"];
  const minSalary = parseInt(salaryRange[0] || 0);
  const maxSalary = parseInt(salaryRange[1] || 200000);

  
  const updateSalaryRange = (min, max) => {
    const newPriceInput = `${min},${max}`;
    handlePriceInputChange({ target: { value: newPriceInput } });
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    collapsed: { height: 76 },
    expanded: { height: "auto" }
  };

  const contentVariants = {
    collapsed: { opacity: 0 },
    expanded: { opacity: 1, transition: { delay: 0.2 } }
  };

  const iconMap = {
    "Full Time": <BsBriefcase className="text-blue-700" />,
    "Part Time": <BsClock className="text-green-600" />,
    "Temporary": <BsCalendarEvent className="text-amber-600" />
  };

  const formatSalary = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };


  

  return (
    <motion.div
      className="xl:w-full mx-auto grid grid-cols-1"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Job Title Search */}
      <motion.div
        className={`bg-white mb-4 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${expandedSection === 'job' ? 'ring-2 ring-blue-400' : ''}`}
        variants={cardVariants}
        animate={expandedSection === 'job' ? 'expanded' : 'collapsed'}
      >
        <div
          className="p-6 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('job')}
        >
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <MdWorkOutline className="text-blue-600 text-xl" />
            </div>
            <h3 className="ml-4 text-xl font-serif font-semibold text-blue-900">Job Title</h3>
          </div>
          <div className="flex items-center">
            {nameInput && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  clearNameFilter();
                }}
                className="mr-2 p-1 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoMdClose className="text-blue-600 text-lg" />
              </motion.button>
            )}
            <motion.div
              animate={{ rotate: expandedSection === 'job' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="px-6 pb-6"
          variants={contentVariants}
          initial="collapsed"
          animate={expandedSection === 'job' ? 'expanded' : 'collapsed'}
        >
          <div className="relative">
            <input
              type="text"
              name="name"
              value={nameInput}
              onChange={handleNameInputChange}
              placeholder="Enter Job Role"
              className="w-full h-12 pl-4 pr-12 py-2 text-base font-serif border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50"
            />
            <motion.button
              onClick={handleNameInputSubmit}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <CiSearch className="text-xl" />
            </motion.button>
          </div>
          
          {nameInput && (
            <motion.button
              onClick={clearNameFilter}
              className="mt-3 w-full py-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-blue-700 font-serif rounded-lg border border-gray-300"
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <IoMdClose className="mr-1" /> Clear Job Title Filter
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Location Search */}
      <motion.div
        className={`bg-white mb-4 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${expandedSection === 'location' ? 'ring-2 ring-blue-400' : ''}`}
        variants={cardVariants}
        animate={expandedSection === 'location' ? 'expanded' : 'collapsed'}
      >
        <div
          className="p-6 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('location')}
        >
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <MdOutlineMyLocation className="text-green-600 text-xl" />
            </div>
            <h3 className="ml-4 text-xl font-serif font-semibold text-blue-900">Location</h3>
          </div>
          <div className="flex items-center">
            {locationInput && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  clearLocationFilter();
                }}
                className="mr-2 p-1 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoMdClose className="text-green-600 text-lg" />
              </motion.button>
            )}
            <motion.div
              animate={{ rotate: expandedSection === 'location' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="px-6 pb-6"
          variants={contentVariants}
          initial="collapsed"
          animate={expandedSection === 'location' ? 'expanded' : 'collapsed'}
        >
          <div className="relative">
            <input
              type="text"
              name="location"
              value={locationInput}
              onChange={handleLocationInputChange}
              placeholder="Enter City, State, Village etc.."
              className="w-full h-12 pl-4 pr-12 py-2 text-base font-serif border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-green-50"
            />
            <motion.button
              onClick={handleLocationInputSubmit}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center bg-green-600 text-white rounded-full hover:bg-green-700"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <MdOutlineMyLocation className="text-xl" />
            </motion.button>
          </div>
          
          {locationInput && (
            <motion.button
              onClick={clearLocationFilter}
              className="mt-3 w-full py-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-green-700 font-serif rounded-lg border border-gray-300"
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <IoMdClose className="mr-1" /> Clear Location Filter
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Salary Range */}
      <motion.div
        className={`bg-white mb-4 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${expandedSection === 'salary' ? 'ring-2 ring-blue-400' : ''}`}
        variants={cardVariants}
        animate={expandedSection === 'salary' ? 'expanded' : 'collapsed'}
      >
        <div
          className="p-6 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('salary')}
        >
          <div className="flex items-center">
            <div className="bg-amber-100 p-3 rounded-full">
              <FaMoneyBillWave className="text-amber-600 text-xl" />
            </div>
            <h3 className="ml-4 text-xl font-serif font-semibold text-blue-900">Salary Range</h3>
          </div>
          <div className="flex items-center">
            {priceInput && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  clearSalaryFilter();
                }}
                className="mr-2 p-1 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoMdClose className="text-amber-600 text-lg" />
              </motion.button>
            )}
            <motion.div
              animate={{ rotate: expandedSection === 'salary' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="px-6 pb-6"
          variants={contentVariants}
          initial="collapsed"
          animate={expandedSection === 'salary' ? 'expanded' : 'collapsed'}
        >
          {/* Minimum Salary Slider */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-serif font-medium text-blue-800">Minimum Salary</span>
              <span className="text-sm font-serif font-bold text-blue-600">{formatSalary(minSalary)}</span>
            </div>

            <div className="relative py-2">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute h-2 bg-gradient-to-r from-blue-200 to-blue-500 rounded-full"
                  style={{ width: `${(minSalary / 200000) * 100}%` }}
                ></div>
              </div>

              <input
                type="range"
                min="0"
                max="200000"
                step="10000"
                value={minSalary}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value < maxSalary) {
                    updateSalaryRange(value, maxSalary);
                  }
                }}
                className="absolute top-0 left-0 w-full h-8 opacity-0 cursor-pointer"
              />

              <motion.div
                className="absolute top-0 w-6 h-6 -mt-2 bg-white border-2 border-blue-500 rounded-full cursor-pointer shadow-md"
                style={{ left: `calc(${(minSalary / 200000) * 100}% - 12px)` }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              ></motion.div>
            </div>
          </div>

          {/* Maximum Salary Slider */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-serif font-medium text-amber-800">Maximum Salary</span>
              <span className="text-sm font-serif font-bold text-amber-600">{formatSalary(maxSalary)}</span>
            </div>

            <div className="relative py-2">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute h-2 bg-gradient-to-r from-amber-200 to-amber-500 rounded-full"
                  style={{ width: `${(maxSalary / 200000) * 100}%` }}
                ></div>
              </div>

              <input
                type="range"
                min="0"
                max="200000"
                step="10000"
                value={maxSalary}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value > minSalary) {
                    updateSalaryRange(minSalary, value);
                  }
                }}
                className="absolute top-0 left-0 w-full h-8 opacity-0 cursor-pointer"
              />

              <motion.div
                className="absolute top-0 w-6 h-6 -mt-2 bg-white border-2 border-amber-500 rounded-full cursor-pointer shadow-md"
                style={{ left: `calc(${(maxSalary / 200000) * 100}% - 12px)` }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              ></motion.div>
            </div>
          </div>

          {/* Current Range Display */}
          <div className="px-2 py-3 mb-5 bg-gradient-to-r from-blue-50 to-amber-50 rounded-lg border border-gray-200">
            <p className="text-center font-serif text-gray-700">
              Searching for salaries between <span className="font-semibold text-blue-600">{formatSalary(minSalary)}</span> and <span className="font-semibold text-amber-600">{formatSalary(maxSalary)}</span>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <motion.button
              onClick={handlePriceInputSubmit}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-amber-500 text-white font-serif font-medium rounded-lg shadow transition-colors hover:from-blue-600 hover:to-amber-600"
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
            >
              Apply Salary Range
            </motion.button>
            
            {priceInput && (
              <motion.button
                onClick={clearSalaryFilter}
                className="w-full py-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-amber-700 font-serif rounded-lg border border-gray-300"
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
              >
                <IoMdClose className="mr-1" /> Clear Salary Filter
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Employment Type */}
      <motion.div
        className={`bg-white mb-4 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${expandedSection === 'employment' ? 'ring-2 ring-blue-400' : ''}`}
        variants={cardVariants}
        animate={expandedSection === 'employment' ? 'expanded' : 'collapsed'}
      >
        <div
          className="p-6 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('employment')}
        >
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <BsBriefcase className="text-blue-600 text-xl" />
            </div>
            <h3 className="ml-4 text-xl font-serif font-semibold text-blue-900">Employment Type</h3>
          </div>
          <div className="flex items-center">
            {selectedCheckbox.length > 0 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  clearEmploymentFilter();
                }}
                className="mr-2 p-1 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoMdClose className="text-blue-600 text-lg" />
              </motion.button>
            )}
            <motion.div
              animate={{ rotate: expandedSection === 'employment' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="px-6 pb-6"
          variants={contentVariants}
          initial="collapsed"
          animate={expandedSection === 'employment' ? 'expanded' : 'collapsed'}
        >
          <div className="grid grid-cols-1 gap-3">
            {checkBoxOptions.map((item, id) => (
              <motion.label
                key={id}
                className={`flex items-center p-4 rounded-lg cursor-pointer ${selectedCheckbox.includes(item)
                    ? 'bg-blue-100 border-2 border-blue-400'
                    : 'bg-gray-50 border border-gray-200 hover:border-blue-300'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="checkbox"
                  name={item}
                  value={item}
                  checked={selectedCheckbox.includes(item)}
                  onChange={handleCheckboxChange}
                  className="hidden"
                />
                <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md mr-3 ${selectedCheckbox.includes(item) ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'
                  }`}>
                  {selectedCheckbox.includes(item) && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="mr-3">{iconMap[item]}</span>
                  <span className="text-base font-serif">{item}</span>
                </div>
              </motion.label>
            ))}
          </div>
          
          {selectedCheckbox.length > 0 && (
            <motion.button
              onClick={clearEmploymentFilter}
              className="mt-4 w-full py-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-blue-700 font-serif rounded-lg border border-gray-300"
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <IoMdClose className="mr-1" /> Clear Employment Filters
            </motion.button>
          )}
        </motion.div>
      </motion.div>

     
      {/* Clear All Filters Button - Only appears when there are active filters */}
      {(nameInput || locationInput || priceInput || selectedCheckbox.length > 0) && (
        <motion.button
          className="w-full py-3 mt-3 bg-white text-blue-700 border border-blue-300 font-serif font-medium rounded-xl shadow-sm hover:bg-blue-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            clearAllFilters();
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center">
            <IoMdClose className="mr-2 text-lg" /> Clear All Filters
          </div>
        </motion.button>
      )}
    </motion.div>
  );
}

export default FilterBy;