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
            image: eventDecoration,
            value: "Event Decoration"
        },
        {
            type: "Home Cleaning",
            image: homeCleaning,
            value: "Cleaning"
        },
        {
            type: "Plumbing Services",
            image: plumbing,
            value: "Plumbing"
        },
        {
            type: "Catering Services",
            image: catering,
            value: "Catering"
        },
        {
            type: "Gardening Services",
            image: gardening,
            value: "Gardening"
        },
        {
            type: "Motor Reparing",
            image: motor,
            value: "motor"
        }
    ];


    return (
        <>
            <div className="bg-gradient-to-b from-white via-slate-100 to-blue-50 w-full py-12 sm:px-10 xl:px-20 xl:ps-24 flex xl:flex-row sm:flex-col items-center mx-auto">

               {/* Left Section: Available Services */}
<div className="bg-gradient-to-r from-[#4163ba] to-[#4266df] text-white sm:w-full xl:w-[450px] xl:h-[500px] flex flex-col justify-center items-center rounded-[50px] shadow-xl p-6 sm:h-[320px] relative overflow-hidden ">

{/* Title */}
<span className="text-white font-serif font-extrabold text-[36px] py-4">
  Available Services
</span>

{/* Subtitle */}
<p className="text-white font-serif font-medium text-[20px] text-center px-4 opacity-90">
  "Connecting You with Skilled Professionals to Get the Job Done Right."
</p>

{/* Floating Glow Effect */}
<div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white opacity-20 rounded-full blur-xl"></div>

{/* View All Button */}
<Link to={"/services"}>
  <div className="bg-white hover:bg-[#61c5c9] text-blue-900 w-[250px] mt-6 cursor-pointer h-14 rounded-full flex justify-center items-center text-lg border-2 border-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
    <span className="font-serif font-bold pe-2 text-xl">View All</span>
  </div>
</Link>

</div>


   {/* Right Section: Service Cards Grid */}
<div className="grid grid-cols-2 gap-8 xl:gap-6 xl:gap-x-9 lg:px-10 sm:px-4 lg:gap-10 justify-center items-center self-center my-auto lg:ms-10">
  {services.map((element, ind) => (
    <Link to={`/services?serviceName=${element.value}`} key={ind}>
      <div className="relative bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 w-[400px] sm:w-[380px] lg:w-full h-[160px] rounded-[40px] shadow-md flex items-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        
        {/* Circular Icon Section */}
        <div className="w-[90px] h-[90px] rounded-full bg-[#8ec2d4] shadow-lg flex justify-center items-center ml-6">
          <span
            className="w-[80px] h-[80px] rounded-full"
            style={{
              backgroundImage: `url(${element.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></span>
        </div>

        {/* Service Name */}
        <div className="flex-grow pl-6 pr-4">
          <span className="text-[#1F2937] font-serif font-semibold text-[22px] break-words">
            {element.type}
          </span>
        </div>

        {/* Right Glow Effect for Hover */}
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 rounded-lg opacity-30 transition-all duration-300"></div>

      </div>
    </Link>
  ))}
</div>


            </div>

        </>
    )
}

export default PopularServices