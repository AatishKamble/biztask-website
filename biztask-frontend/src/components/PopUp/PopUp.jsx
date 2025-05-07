import React, { useState, useEffect } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoWarning } from "react-icons/io5";

const PopUp = ({message, submessage, button1, button2, submessage2, closeButton, handleRemove}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 d z-40 flex items-center justify-center">
        <div className={`w-11/12 max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Top Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-red-500 via-orange-400 to-red-500"></div>
          
          {/* Header */}
          <div className="relative px-6 pt-8 pb-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mr-4">
                <span className="text-2xl text-red-500">
                  <IoWarning />
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 pr-10 break-all">
                {message}
              </h1>
            </div>
            <button 
              className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-red-500 transition-colors duration-300" 
              onClick={() => closeButton()}
              aria-label="Close popup"
            >
              <IoIosCloseCircleOutline />
            </button>
          </div>
          
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          
          {/* Body */}
          <div className="px-6 py-8 bg-gray-50">
            <p className="text-lg font-medium text-blue-600 mb-3 text-center">{submessage}</p>
            <p className="text-gray-600 text-center">{submessage2}</p>
          </div>
          
          {/* Footer */}
          <div className="px-6 py-6 bg-white flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="w-full sm:w-40 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-300 transition-colors duration-300"
              onClick={() => closeButton()}
            >
              {button1}
            </button>
            <button
              className="w-full sm:w-40 px-6 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 shadow-md hover:shadow-lg hover:shadow-red-100 transition-all duration-300"
              onClick={() => handleRemove()}
            >
              {button2}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PopUp