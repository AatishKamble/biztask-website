import { MdDelete } from "react-icons/md";
const AddedBox = ({Index,Name,handleRemove}) => {

  return (
    <div  className='w-full h-auto flex  py-2 items-center me-4 text-black justify-end'>
                    <div className=' text-[16px] flexflex-col h-auto h-min-[40px] font-serif   w-[450px] me-2  bg-[#dfe1e3] rounded-sm' >
                        <div className="  h-auto relative w-full p-2 flex items-center justify-between  ">

                            <span className="pe-5">{Name}</span>
                            <span className=" text-[20px] hover:bg-[#9c9d9e] hover:text-red-500" onClick={()=>handleRemove(Index)}><MdDelete /></span>
                        </div>
                    </div>

                </div>
  )
}

export default AddedBox