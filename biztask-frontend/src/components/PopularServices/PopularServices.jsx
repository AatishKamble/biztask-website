import { Link } from "react-router-dom";

const PopularServices = () => {
    const services = [
        {
            type: "Event Decoration",
            image: "../../src/assets/event-decoration.jpg"
        },
        {
            type: "Home Cleaning",
            image: "../../src/assets/clean.jpg"
        },
        {
            type: "Plumbing Services",
            image: "../../src/assets/Plumbing.jpg"
        },
        {
            type: "Catering Services",
            image: "../../src/assets/catering.jpg"
        },
        {
            type: "Gardening Services",
            image: "../../src/assets/Gardening.jpg"
        },
        {
            type: "Stationery Shop",
            image: "../../src/assets/stationery.jpg"
        }
    ];
    

    return (
        <>

            <div className='bg-[#ffffff] w-full h-auto px-20 my-10 flex'>

                <div className='bg-[#ffffff] w-[450px] h-[350px] flex flex-col justify-center  items-center my-2 pe-5'>
                    <span className=' text-blue-950 font-serif font-semibold text-[35px] py-4'>Available Services</span>

                    <p className=' text-blue-950 font-serif font-medium text-[20px] align-middle'>
                        "Connecting You with Skilled Professionals 
                        to Get the Job Done Right."
                    </p>
                    <Link to={"/services"}>
                    <div className='bg-[#eef1f1] hover:bg-[#d1d5d7] w-[250px] opacity-95 mt-[50px] cursor-pointer h-14 rounded-xl flex justify-center items-center text-lg border-[1px] border-slate-400'>
                        <span className="font-serif font-bold pe-2 text-xl text-slate-800">View All</span>
                    </div>
                    </Link>

                </div>

                <div>

                    <div className=" grid grid-cols-2 gap-6 m-6 ms-8 justify-center items-center">
{
    services.map((element,ind) =>(
        <Link to={"/services"}>
        <div className=" bg-slate-100 w-[400px] h-[140px] flex justify-center items-center rounded-lg drop-shadow-xl shadow-slate-200 cursor-pointer hover:bg-slate-300 duration-0 mx-5">

        <span className="w-[90px] h-[90px] rounded-[100%] bg-slate-800  bg-cover bg-center" style={{backgroundImage:`url(${element.image})`}}></span>
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