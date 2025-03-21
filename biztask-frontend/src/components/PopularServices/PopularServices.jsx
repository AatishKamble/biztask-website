import { Link } from "react-router-dom";
import eventDecoration from "../../assets/event-decoration.jpg";
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
      value: "Event Decoration",
      gradient: "from-purple-500 via-purple-400 to-purple-500", // Unique gradient for each card
    },
    {
      type: "Home Cleaning",
      image: homeCleaning,
      value: "Cleaning",
      gradient: "from-green-500 via-green-400 to-green-500",
    },
    {
      type: "Plumbing Services",
      image: plumbing,
      value: "Plumbing",
      gradient: "from-blue-500 via-blue-400 to-blue-500",
    },
    {
      type: "Catering Services",
      image: catering,
      value: "Catering",
      gradient: "from-orange-500 via-orange-400 to-orange-500",
    },
    {
      type: "Gardening Services",
      image: gardening,
      value: "Gardening",
      gradient: "from-teal-500 via-teal-400 to-teal-500",
    },
    {
      type: "Motor Repairing",
      image: motor,
      value: "motor",
      gradient: "from-red-500 via-red-400 to-red-500",
    },
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-white via-blue-50 to-white w-full py-12 sm:px-6 lg:px-12 xl:px-24 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mx-auto">
        {/* Left Section: Available Services */}
        <div className="bg-gradient-to-r from-[#6E45E2] to-[#88a2d3] text-white w-full lg:w-[400px] xl:w-[500px] h-[320px] lg:h-[500px] flex flex-col justify-center items-center rounded-3xl shadow-xl p-6 relative overflow-hidden">
          {/* Title */}
          <h2 className="text-white font-serif font-extrabold text-2xl lg:text-3xl text-center py-2">
            Available Services
          </h2>

          {/* Subtitle */}
          <p className="text-white font-serif font-medium text-lg lg:text-lg text-center px-4 opacity-90">
            "Connecting You with Skilled Professionals to Get the Job Done Right."
          </p>

          {/* Floating Glow Effect */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white opacity-20 rounded-full blur-xl"></div>

          {/* View All Button */}
          <Link to="/services" aria-label="View All Services">
            <div className="bg-white hover:bg-[#6bdfff] text-[#6E45E2] w-[230px] mt-6 cursor-pointer h-12 rounded-full flex justify-center items-center text-lg border-2 border-white transition-all duration-300 shadow-lg hover:shadow-xl  group-hover:bg-[#FF6B6B] group-hover:text-white">
              <span className="font-serif font-bold pe-2 text-xl">View All</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </Link>
        </div>

        {/* Right Section: Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {services.map((element, ind) => (
            <Link
              to={`/services?serviceName=${element.value}`}
              key={ind}
              aria-label={`Explore ${element.type}`}
            >
              <div
                className={`relative w-full h-[280px] rounded-3xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group overflow-hidden bg-gradient-to-r ${element.gradient}`}
              >
                {/* Image Section */}
                <div
                  className="w-full h-[200px] bg-cover bg-center rounded-t-3xl"
                  style={{
                    backgroundImage: `url(${element.image})`,
                  }}
                ></div>

                {/* Text Section */}
                <div className="absolute bottom-0 left-0 w-full h-[80px] bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-b-3xl">
                  <span className="text-[#1F2937] font-serif font-semibold text-xl text-center px-4">
                    {element.type}
                  </span>
                </div>

                {/* Hover Effect: Floating Arrow */}
                <div className={`bg-gradient-to-r from-[#8ea0cf] to-[#7088d7] absolute -right-4 -top-4 w-16 h-16 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center `}>
                  <span className={`text-white text-2xl `}>→</span>
                </div>

                {/* Hover Effect: Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularServices;