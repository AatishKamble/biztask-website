import React from 'react'

import { FaStarHalfStroke } from "react-icons/fa6";
import { AiOutlineStar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
const Star = ({star}) => {

    const reatingArray=Array.from({length:5},(el,index)=>{
let number=index+0.5;

        return(
            <span key={index} className='text-yellow-700'>
            {
star>=index+1?(<FaStar size={20}/>):
star>=number?(<FaStarHalfStroke size={20}/>):
(<AiOutlineStar size={20}/>)
            }
            </span>
        )

    })

  return (
<>
<div className='flex'>
    {reatingArray}
</div>
</>
  )
}

export default Star