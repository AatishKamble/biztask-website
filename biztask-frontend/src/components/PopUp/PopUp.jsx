import React, { useState, useEffect } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoWarning } from "react-icons/io5";

const PopUp = ({ message, submessage, button1, button2, submessage2, closeButton, handleRemove, isLoading = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40 flex items-center justify-center font-serif p-4">
        <div className={`w-full max-w-2xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Card  */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            {/* Side accent  */}
            <div className="flex">
              <div className="w-2 bg-indigo-600 hidden md:block"></div>

              <div className="flex-1">
                {/* Header  */}
                <div className="flex items-start p-6 pb-0">
                  <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-3 rounded-lg shadow-lg mr-4">
                    <IoWarning className="text-xl" />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                      {message}
                    </h2>

                    <p className="text-lg text-indigo-700 font-medium">
                      {submessage}
                    </p>
                  </div>

                  <button
                    className={`ml-4 text-gray-400 hover:text-indigo-500 transition-colors duration-300 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                    onClick={() => closeButton()}
                    aria-label="Close popup"
                  >
                    <IoIosCloseCircleOutline className="text-2xl" />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6">
                  <p className="text-gray-700 leading-relaxed">
                    {submessage2}
                  </p>
                </div>

                {/* Footer  */}
                <div className="p-6 bg-blue-100 flex flex-col-reverse md:flex-row md:justify-end gap-3 border-t border-gray-100">
                  <button
                    className={`px-6 py-3 text-red-700 font-medium rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all duration-300 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                    onClick={() => closeButton()}
                  >
                    {button1}
                  </button>

                  <button
                    onClick={handleRemove}
                    disabled={isLoading}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300
    ${isLoading
                        ? "bg-gradient-to-r from-indigo-400 to-purple-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg"
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin px-[1px]"></span>
                        <span>Wait...</span>
                      </>
                    ) : (
                      <span>{button2}</span>
                    )}
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PopUp