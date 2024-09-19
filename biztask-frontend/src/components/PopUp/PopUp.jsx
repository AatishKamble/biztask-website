import React from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
const PopUp = ({message,submessage,button1,button2,submessage2,closeButton,handleRemove}) => {
  return (
    <>
    <div className="  bg-slate-100 border-[1px] border-slate-400 w-[800px] drop-shadow-lg h-auto pb-5   fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 ">

<div className="w-full p-4 flex justify-center items-center border-b-slate-400 border-[1px]">
<h1 className=' inline-block text-center text-[26px] px-2 font-bold text-[#861e1e] '><IoWarning /></h1>
    <div className="absolute top-2 right-2 text-[30px] cursor-pointer hover:text-slate-600" onClick={()=>closeButton()} > <span><IoIosCloseCircleOutline /></span></div>
    <h1 className="text-[24px] font-bold text-[#861e1e] ">{message}</h1>
</div>
<div className="flex justify-center flex-col items-center p-5">
    <p className="text-[20px] text-slate-600 font-semibold text-center">{submessage}

        <br />
        {submessage2}
    </p>
</div>
<div className="flex justify-center p-5 gap-x-5">
    <button className='bg-[#a8bcbd]  rounded-md p-2 ms-2  hover:bg-[#64848a]   w-[100px] border-2 border-slate-500 h-auto text-blue-950  font-sans font-bold text-[18px]' onClick={()=>closeButton()}>{button1}</button>
 
        <button className='bg-[#bf3939]  rounded-md p-2 ms-2  hover:bg-[#6a1515]   w-[100px] h-auto text-white  font-sans font-bold text-[18px]' onClick={()=>handleRemove()}>{button2}</button>
  
</div>
</div>
    </>
  )
}

export default PopUp