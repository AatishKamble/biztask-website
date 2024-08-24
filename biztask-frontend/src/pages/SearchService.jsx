
import FilterServices from '../components/Filter/FilterServices';
import JobAdvertise from '../components/JobTemplate/JobAdvertise'
import Pagination from '@mui/material/Pagination';
import ServiceCard from '../components/ServiceCard/ServiceCard';
const SearchService = () => {
  return (
    <>

      <div className=' bg-blue-950 w-full h-[400px]  relative drop-shadow-xl shadow-blue-200  '>
        <img src="../src/assets/service.jpg" alt="" className=' w-full h-full object-cover opacity-40 ' />

        <div className='  absolute top-44 w-full flex flex-col justify-center items-center'>
          <span className=' font-mono font-semibold text-white text-[38px] opacity-75'>Find Services Effectively!</span>


        </div>

      </div>
      <div className='  w-full h-full p-10 pe-0 flex '>
        <div>


          <div className='mx-10 mb-5 w-[300px]  text-[35px] py-5 '>
            <span className='w-fullflex justify-start items-center text-blue-800 font-sans font-semibold '> Services</span>

          </div>

          <FilterServices />


        </div>
        <div className=' w-full h-auto  grid grid-cols-3 py-20 gap-10 ps-10 pe-2 mt-10 '>
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <div>

          

          </div>

        </div>




      </div>
      <div className=' w-full h-20 flex ms-[150px] justify-center items-center py-5 mb-5'>
              <Pagination
                count={5}
                variant="outlined"
                shape="rounded"
                size="large"
              />
            </div>




    </>
  )
}

export default SearchService