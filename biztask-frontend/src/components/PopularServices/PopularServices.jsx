import { Link } from "react-router-dom";
import eventDecoration from "../../assets/event-decoration.jpg"
import homeCleaning from "../../assets/clean.jpg";
import plumbing from "../../assets/Plumbing.jpg";
import catering from "../../assets/catering.jpg";
import gardening from "../../assets/Gardening.jpg";
import motor from "../../assets/motor.jpeg";

const PopularServices = () => {
    const services = [
        {
            type: "Event Decoration",
            image:eventDecoration,
             value:"Event Decoration"
        },
        {
            type: "Home Cleaning",
            image: homeCleaning,
             value:"Cleaning"
        },
        {
            type: "Plumbing Services",
            image: plumbing,
            value:"Plumbing"
        },
        {
            type: "Catering Services",
            image: catering,
             value:"Catering"
        },
        {
            type: "Gardening Services",
            image:gardening,
            value:"Gardening"
        },
        {
            type: "Motor Reparing",
            image: motor,
            value:"motor"
        }
    ];


    return (
        <>

            <div className='bg-[#ffffff] w-full h-auto sm:px-10 xl:px-20 my-10 xl:mb-12 flex xl:flex-row sm:flex-col'>

                <div className='  bg-gradient-to-r from-slate-100 via-white xl:to-white sm:to-slate-100 sm:w-full sm:h-[300px] xl:w-[450px] xl:px-4 xl:h-[500px] flex flex-col justify-center  items-center my-2 xl:pe-5'>
                    <span className=' text-blue-950 font-serif font-semibold text-[35px] py-4'>Available Services</span>

                    <p className=' text-blue-950 font-serif font-medium text-[20px] align-middle'>
                        "Connecting You with Skilled Professionals
                        to Get the Job Done Right."
                    </p>
                    <Link to={"/services"}>
                        <div className='bg-[#dde6ed]  hover:bg-[#b2c5d4]  w-[250px] opacity-95 mt-[50px] cursor-pointer h-14 rounded-xl flex justify-center items-center text-lg border-[1px] border-slate-400'>
                            <span className="font-serif font-bold pe-2 text-xl text-slate-800">View All</span>
                        </div>
                    </Link>

                </div>

                <div>

                    <div className="  grid grid-cols-2 gap-6 xl:gap-6 sm:m-2 lg:px-10 sm:ps-2 sm:pt-5  sm:gap-y-6 lg:gap-10  sm:gap-x-4 m-6  ms-8 justify-center items-center">
                        {
                            services.map((element, ind) => (
                                <Link to={`/services?serviceName=${element.value}`} key={ind}>
                                    <div className=" bg-slate-100 w-[400px] sm:w-[400px] lg:w-full h-[140px] xl:h-[140px] lg:h-[160px] flex lg:justify-start lg:ps-[50px] justify-center items-center rounded-lg drop-shadow-xl shadow-slate-200 cursor-pointer hover:bg-slate-300 transition duration-300 sm:mx-2 lg:mx-0 xl:mx-5 mx-5">

                                        <span className="w-[90px] h-[90px] rounded-[100%] bg-slate-800  bg-cover bg-center" style={{ backgroundImage: `url(${element.image})` }}></span>
                                        <span className=' text-blue-950 font-serif font-semibold text-[20px] mx-5 flex justify-center items-center w-[200px]'>{element.type}</span>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>





            </div>

        </>
    )
}

export default PopularServices