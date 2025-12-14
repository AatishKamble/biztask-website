import { MdDelete } from "react-icons/md";
const AddedBox = ({Index,Name,handleRemove, isButtonDisabled=false}) => {

  return (
    <div  className='  w-full h-auto flex  py-2 items-center me-4 text-black justify-end'>
                    <div className=' text-[16px] flexflex-col h-auto h-min-[40px] font-serif   w-[450px] me-2  border border-teal-200  rounded-xl' >
                        <div className=" font-serif   h-auto relative w-full p-2 flex items-center justify-between  ro ">

                            <span className="pe-5 text-[18px]">{Name}</span>
                            <button type="button"
                             disabled={isButtonDisabled} className={` text-[20px]   ${isButtonDisabled ? ' cursor-not-allowed' : 'text-red-500 cursor-pointer'}`}  onClick={()=>handleRemove(Index)}><MdDelete /></button>
                        </div>
                    </div>

                </div>
  )
}

export default AddedBox