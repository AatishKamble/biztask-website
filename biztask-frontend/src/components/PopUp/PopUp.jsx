import React from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
const PopUp = ({message,submessage,button1,button2,submessage2,closeButton,handleRemove}) => {
  return (
    <>
  

<div className="bg-gradient-to-br from-slate-50 to-slate-100 border-[1px] border-slate-300 w-[800px] drop-shadow-xl h-auto pb-5 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transform backdrop-blur-lg animate-scaleIn z-50 rounded-xl">
          <div className="w-full p-5 flex justify-center items-center border-b-slate-300 border-[1px] relative bg-white/50 rounded-t-xl">
            <span className="text-3xl text-red-500 mr-3 animate-pulse"><IoWarning /></span>
            <div className="absolute top-3 right-3 text-[30px] cursor-pointer hover:text-red-500 hover:scale-110 transition-all duration-300 font-serif" onClick={()=>closeButton()}>
            <IoIosCloseCircleOutline />
            </div>
            <h1 className="text-2xl font-bold text-red-500 font-serif">
            {message}
            </h1>
          </div>

          <div className="flex justify-center flex-col font-serif items-center p-6">
            <p className="text-[19px] text-blue-700 font-medium mb-3">{submessage}</p>
            <p className="text-[17px] text-slate-600">{submessage2}</p>
          </div>

          <div className="flex justify-center p-5 gap-x-6">
            <button
              className='bg-gradient-to-r from-[#2E86C1] to-[#3498DB] rounded-xl p-2 hover:from-[#3b3bc7] hover:to-[#4949e4] w-[120px] h-auto text-white font-serif font-bold text-[18px] shadow-lg hover:shadow-blue-200 '
              onClick={()=>closeButton()}>{button1}</button>
            <button
              className='rounded-xl p-2 bg-gradient-to-r from-[#0d7634] to-[#10a049] w-[120px] h-auto text-white font-serif font-bold text-[18px] hover:from-[#1a9d4d] hover:to-[#22c363] shadow-lg hover:shadow-green-200 '
              onClick={()=>handleRemove()}>{button2}</button>
          </div>
        </div>
    </>
  )
}

export default PopUp