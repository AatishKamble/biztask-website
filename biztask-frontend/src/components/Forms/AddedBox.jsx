import { MdDelete } from "react-icons/md";
const AddedBox = () => {
  return (
    <div className='w-full h-auto flex py-2 items-center me-4 text-black justify-end'>
                    <div className=' text-[16px] flexflex-col h-[40px] font-serif  px-4 w-[450px]  bg-[#dfe1e3] rounded-sm' >
                        <div className="  h-auto relative w-full p-2 flex items-center justify-between  ">

                            <span className="pe-5">dsds</span>
                            <button className=" text-[20px] hover:bg-[#9c9d9e] hover:text-red-500"><MdDelete /></button>
                        </div>
                    </div>

                </div>
  )
}

export default AddedBox