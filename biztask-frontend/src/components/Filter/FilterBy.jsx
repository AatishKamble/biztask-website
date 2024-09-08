import React from 'react';
import { CiSearch } from "react-icons/ci";
import { MdOutlineMyLocation } from "react-icons/md";
import { LiaSearchDollarSolid } from "react-icons/lia";

const FilterBy = ({
  nameInput, handleNameInputChange, handleNameInputSubmit,
  locationInput, handleLocationInputChange, handleLocationInputSubmit,
  priceInput, handlePriceInputChange, handlePriceInputSubmit,
  selectedCheckbox, handleCheckboxChange, checkBoxOptions
}) => {

  return (
    <div className='bg-[#ffffff] border-[1px] border-slate-300 w-[400px] drop-shadow-xl rounded-2xl shadow-slate-800 h-auto mx-10'>
      <div className='px-10 py-10 border-[1px] border-slate-300 w-full drop-shadow-xl rounded-t-2xl shadow-slate-800 h-[200px]'>
        <div className='w-full text-[24px] flex justify-start items-center text-blue-950 font-serif py-2'>
          <span className='font-semibold px-2'>Find Job</span>
        </div>
        <div className='w-full h-[50px] flex py-10 items-center text-black'>
          <input 
            type="text"
            name="name"
            value={nameInput}
            onChange={handleNameInputChange}
            placeholder='Find job with name'
            className='text-[20px] h-12 font-serif outline-none px-4 w-full focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-md'
          />
          <button className='text-[28px] font-serif font-bold align-middle h-[50px] w-[50px] hover:text-blue-950 drop-shadow-2xl flex justify-center items-center' onClick={handleNameInputSubmit}>
            <CiSearch />
          </button>
        </div>
      </div>

      <div className='px-10 py-10 border-[1px] border-slate-300 w-full drop-shadow-xl shadow-slate-800 h-[200px]'>
        <div className='w-full text-[24px] flex justify-start items-center text-blue-950 font-serif py-2'>
          <span className='font-semibold px-2'>Locations</span>
        </div>
        <div className='w-full h-[50px] flex py-10 items-center text-black'>
          <input 
            type="text"
            name="location"
            value={locationInput}
            onChange={handleLocationInputChange}
            placeholder='Find job with Location'
            className='text-[20px] h-12 font-serif outline-none px-4 w-full focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-md'
          />
          <button className='text-[28px] hover:text-blue-950 font-serif font-bold align-middle h-[50px] w-[50px] drop-shadow-2xl flex justify-center items-center' onClick={handleLocationInputSubmit}>
            <MdOutlineMyLocation />
          </button>
        </div>
      </div>

      <div className='px-10 py-10 border-[1px] border-slate-300 w-full drop-shadow-xl shadow-slate-800 h-[200px]'>
        <div className='w-full text-[24px] flex justify-start items-center text-blue-950 font-serif py-2'>
          <span className='font-semibold px-2'>Salary</span>
        </div>
        <div className='w-full h-[50px] flex py-10 items-center text-black'>
          <input 
            type="text"
            name="salary"
            value={priceInput}
            onChange={handlePriceInputChange}
            placeholder='Enter Salary (Min,Max)'
            className='text-[20px] h-12 font-serif outline-none px-4 w-full focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-md'
          />
          <button className='text-[28px] font-serif font-bold align-middle h-[50px] w-[50px] hover:text-blue-950 drop-shadow-2xl flex justify-center items-center -rotate-90' onClick={handlePriceInputSubmit}>
            <LiaSearchDollarSolid />
          </button>
        </div>
      </div>

      <div className='px-10 py-10 border-[1px] border-slate-300 w-full drop-shadow-xl shadow-slate-800 h-auto rounded-b-2xl'>
        <div className='w-full text-[24px] flex justify-start items-center text-blue-950 font-serif py-2'>
          <span className='font-semibold px-2'>Employment Type</span>
        </div>
        <div className='w-full h-auto pb-6 ps-4 pt-3 transition-all duration-1000 ease-in-out'>
          <ul className='list-none'>
            {
              checkBoxOptions.map((item, id) => (
                <li key={id} className='text-[1.2rem] font-normal font-serif text-slate-950'>
                  <div className='flex items-center'>
                    <input 
                      type="checkbox" 
                      name={item} 
                      value={item} 
                      checked={selectedCheckbox.includes(item)}
                      onChange={handleCheckboxChange}
                      className='h-5 w-[18px] me-3 cursor-pointer accent-blue-500' 
                    />
                    <label htmlFor={item}>{item}</label>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FilterBy;
