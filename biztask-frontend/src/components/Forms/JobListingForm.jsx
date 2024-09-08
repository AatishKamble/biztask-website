
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddedBox from "./AddedBox";
import { useDispatch, useSelector } from "react-redux";
import { getServiceById } from "../../Redux/ServiceR/Action.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobRegister,updateJob,getJobById } from "../../Redux/Job/Action.js";

const JobListingForm = ({registration}) => {

    const dispatch = useDispatch();
    const { id } = useParams();
   

    //get job
    
    useEffect(() => {
        if (id) {
            dispatch(getJobById(id));
        }
    }, [id, dispatch]);

 

    const serviceStore = useSelector(store => store.serviceStore);
   
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
  
    const [formData, setFormData] = useState({
        jobRole: "",
        employmentType: "",
        workingHours: "",
        experienceYear: "",
        minSalary: "",
        maxSalary: "",
        deadline: ""
    });

    //locations
    const [location, setLocation] = useState('');
    const [locationArray, setLocationArray] = useState([]);
    const handleLocationAdd = () => {

        if (location.trim() !== "") {

            const isExists = locationArray.some(l => l.toLowerCase() === location.toLowerCase());
            if (!isExists) {
                setLocationArray([...locationArray, location]);
            }

            setLocation('');
        }

    }

    const handleLocationRemove = (indexRemove) => {
        const newLocation = locationArray.filter((_, ind) => ind !== indexRemove);
        setLocationArray(newLocation);
    }
    //responsibility
    const [responsibilityInput, setResponsibilityInput] = useState('');
    const [responsibilityArray, setResponsibilityArray] = useState([]);
    const handleResponsibilityAdd = () => {

        if (responsibilityInput.trim() !== "") {

            const isExists = responsibilityArray.some(l => l.toLowerCase() === responsibilityInput.toLowerCase());
            if (!isExists) {
                setResponsibilityArray([...responsibilityArray, responsibilityInput]);
            }

            setResponsibilityInput('');
        }

    }

    const handleResponsibilityRemove = (indexRemove) => {
        const newResponsibility = responsibilityArray.filter((_, ind) => ind !== indexRemove);
        setResponsibilityArray(newResponsibility);
    }

    //skillsRequired
    const [skillsRequiredInput, setSkillsRequiredInput] = useState('');
    const [skillsRequiredArray, setSkillsRequiredArray] = useState([]);
    const handleSkillsRequiredAdd = () => {

        if (skillsRequiredInput.trim() !== "") {

            const isExists = skillsRequiredArray.some(l => l.toLowerCase() === skillsRequiredInput.toLowerCase());
            if (!isExists) {
                setSkillsRequiredArray([...skillsRequiredArray, skillsRequiredInput]);
            }

            setSkillsRequiredInput('');
        }

    }


    const handleSkillsRequiredRemove = (indexRemove) => {
        const newSkillsRequired = skillsRequiredArray.filter((_, ind) => ind !== indexRemove);
        setSkillsRequiredArray(newSkillsRequired);
    }


    //on input change
    function handleChange(e) {

       
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });


    }
//jobs
    const jobStore=useSelector(store=>store.jobStore);
   
  
    //handle form submit

    const handleSubmit = (e) => {
        e.preventDefault();

        const formD = new FormData();
        formD.append("jobRole", formData.jobRole);
        formD.append("employmentType", formData.employmentType);
        formD.append("workingHours", formData.workingHours);
        formD.append("experienceYear", Number(formData.experienceYear));
        formD.append("minSalary", Number(formData.minSalary));
        formD.append("maxSalary", Number(formData.maxSalary));
        formD.append("deadline", formData.deadline);
        formD.append("jobLocations", JSON.stringify(locationArray));
        formD.append("responsibilities", JSON.stringify(responsibilityArray));
        formD.append("skillsRequired", JSON.stringify(skillsRequiredArray));

        if(registration==true){
            formD.append("serviceId",serviceStore?.service?._id);
            dispatch(jobRegister(formD,jwt)); 
            navigate(`/service-detail/${serviceStore?.service?._id}`); 
            }
            else{
                dispatch(updateJob(jwt, formD, id));
                  navigate(`/job-detail/${id}`);
            }


        setFormData({
            jobRole: "",
            employmentType: "",
            workingHours: "",
            experienceYear: "",
            minSalary: "",
            maxSalary: "",
            deadline: ""
        });
        setSkillsRequiredArray([]);
        setLocationArray([]);
        setResponsibilityArray([]);
      

    }



      //while updation of job
      useEffect(() => {
        if (jobStore.job && jobStore.job._id === id && registration==false) {
            setFormData({
                jobRole: jobStore.job?.jobRole || "",
                employmentType: jobStore.job?.employmentType || "",
                workingHours: jobStore.job?.workingHours || "",
                experienceYear: jobStore.job?.experienceYear || 0,
                minSalary: jobStore.job?.minSalary || 0,
                maxSalary: jobStore.job?.maxSalary || 0,
                deadline: jobStore.job?.deadline || ""  
            });
    
    
            setLocationArray(jobStore.job?.jobLocations || []);
            setResponsibilityArray(jobStore.job?.responsibility || []);
            setSkillsRequiredArray(jobStore.job?.skillsRequired || []);
        }
    }, [jobStore.job, id, registration]);
    


    return (
        <div className='bg-[#ffffff] py-10 w-full h-auto flex items-center justify-center'>

            <div className='w-[50%] h-full bg-[#f4faff] p-10'>

                <div className='w-full h-[50px] font-semibold flex justify-center pb-10  items-center text-[26px] text-blue-950 font-serif'>
                    <span>{registration==true?"Post Job":"Update Job"}</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='w-full h-[50px]  flex  py-10 justify-center  items-center text-[20px] text-blue-900 font-serif'>
                        <span>Job Details</span>
                    </div>
                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="role" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Job Role :</label>
                        <input type="text" name='jobRole'
                            onChange={handleChange} value={formData.jobRole}
                            placeholder='Enter Job Role' className=' text-[20px] w-full h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md  focus-within:drop-shadow-xl' autoComplete='none' />
                    </div>

                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="eType" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Employment Type :</label>
                        <input type="text" name='employmentType'
                            onChange={handleChange} value={formData.employmentType}
                            placeholder=' ex.Full time, Part time' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                    </div>

                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="experience" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Years of Experience:</label>
                        <input type="text" name='experienceYear'
                            onChange={handleChange} value={formData.experienceYear}
                            placeholder='e.g. 0 ,2 ' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                    </div>

                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="workingHours" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Working Hours:</label>
                        <input type="text" name='workingHours'
                            onChange={handleChange} value={formData.workingHours}
                            placeholder="e.g., 9 AM - 5 PM or Flexible" className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                    </div>
                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="startSal" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Minimum Salary:</label>
                        <input type="text" name='minSalary'
                            onChange={handleChange} value={formData.minSalary}
                            placeholder="Minimum Salary" className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                    </div>
                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="endSal" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Maximum Salary:</label>
                        <input type="text" name='maxSalary'
                            onChange={handleChange} value={formData.maxSalary}
                            placeholder="Maximum Salary " className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                    </div>



                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="deadline" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Application Deadline:</label>
                        <input type="date" name='deadline' onChange={handleChange} value={formData.deadline}
                            placeholder="select Date" className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                    </div>


                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="Locations" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Job Locations :</label>

                        <input type="text" name='Locations'
                            onChange={(e) => setLocation(e.target.value)} value={location}
                            placeholder='Enter Locations' className=' text-[20px] h-[50px] font-serif outline-none px-4 ms-8 w-[700px]  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                        <div className="w-[100px] h-[50px]">
                            <span className=' bg-[#3b65be] text-lg font-serif font-medium hover:bg-[#678bd8] cursor-pointer rounded-full align-middle h-[50px] w-[50px]   drop-shadow-2xl ms-2 flex justify-center items-center' onClick={handleLocationAdd}>
                                Add
                            </span>
                        </div>

                    </div>
                    <div className='w-full h-auto flex flex-col pb-10 pt-5  items-center text-black'>
                        {
                            locationArray.map((l, index) => (
                                <AddedBox key={index} Index={index} Name={l} handleRemove={handleLocationRemove} />
                            ))
                        }



                    </div>


                    <div className='w-full h-[50px]  flex  py-10 justify-center  items-center text-[20px] text-blue-900 font-serif'>
                        <span>Job Overview</span>
                    </div>
                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="responsibility" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Responsibilities:</label>

                        <input type="text" name='responsibilityInput'

                            onChange={(e) => setResponsibilityInput(e.target.value)} value={responsibilityInput}
                            placeholder='Job Responsibilities :' className=' text-[20px] h-[50px] font-serif outline-none px-4 ms-8 w-[700px]  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                        <div className="w-[100px] h-[50px]">
                            <span className=' bg-[#3b65be] text-lg font-serif font-medium hover:bg-[#678bd8] cursor-pointer rounded-full align-middle h-[50px] w-[50px]   drop-shadow-2xl ms-2 flex justify-center items-center' onClick={handleResponsibilityAdd}>
                                Add
                            </span>
                        </div>

                    </div>
                    <div className='w-full h-auto flex flex-col pb-10 pt-5  items-center text-black'>
                        {
                            responsibilityArray.map((r, index) => (
                                <AddedBox key={index} Index={index} Name={r} handleRemove={handleResponsibilityRemove} />
                            ))
                        }



                    </div>

                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="requirement" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Skill Required :</label>

                        <input type="text" name='requirement'

                            onChange={(e) => setSkillsRequiredInput(e.target.value)} value={skillsRequiredInput}
                            placeholder='Skills Requirement' className=' text-[20px] h-[50px] font-serif outline-none px-4 ms-8 w-[700px]  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' />
                        <div className="w-[100px] h-[50px]">
                            <span className=' bg-[#3b65be] cursor-pointer text-lg font-serif font-medium hover:bg-[#678bd8] rounded-full align-middle h-[50px] w-[50px]   drop-shadow-2xl ms-2 flex justify-center items-center' onClick={handleSkillsRequiredAdd}>
                                Add
                            </span>
                        </div>

                    </div>
                    <div className='w-full h-auto flex flex-col pb-10 pt-5  items-center text-black'>
                        {
                            skillsRequiredArray.map((s, index) => (
                                <AddedBox key={index} Index={index} Name={s} handleRemove={handleSkillsRequiredRemove} />
                            ))
                        }



                    </div>




                    <div className='w-full h-[50px]  flex  py-10 justify-center  items-center text-[20px] text-blue-900 font-serif'>
                        <span>other Details </span>
                    </div>

                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Service Type :</label>
                        <input type="text" value={serviceStore.service?.serviceType || ""} className=' text-[20px] w-full h-12 font-serif outline-none px-4  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md  focus-within:drop-shadow-xl' autoComplete='none' disabled />
                    </div>

                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Company Name :</label>
                        <input type="text" value={serviceStore.service?.bussiness?.companyName || ""} className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' disabled />
                    </div>

                    <div className='w-full h-[50px] flex py-10  items-center text-black'>

                        <label htmlFor="email" className=' text-[20px] px-4 font-medium font-serif w-[300px]'> Email :</label>
                        <input type="email" value={serviceStore.service?.user?.email || ""} name='email' className=' text-[20px] h-12 font-serif outline-none px-4 w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl' autoComplete='none' disabled />
                    </div>


                    <div className='w-full h-auto flex py-10  items-center text-black'>

                        <label htmlFor="Name" className=' text-[20px] px-4 font-medium font-serif w-[300px]'>Company description :</label>

                        <textarea name="Description" id="DescriptionBox"
                            value={serviceStore.service?.bussiness?.description || ""}
                            className=' text-[20px] h-auto font-serif outline-none p-4  w-full  focus-within:border-[1px] border-slate-600 bg-[#dfe1e3] rounded-md focus-within:drop-shadow-xl'
                           rows={10}
                            disabled
                        ></textarea>

                    </div>



                    <div className='flex items-center justify-center my-10 h-[200px]'>


                        <button className=' bg-blue-900 hover:bg-[#1e52c3] align-middle h-12 w-[130px] rounded-xl border-blue-950 drop-shadow-2xl mx-3 flex justify-center items-center' >
                            <span className='text-lg font-serif font-medium me-1 text-white'><FaSave /></span>
                            <span className='text-lg font-serif font-medium text-white'>Post</span>

                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default JobListingForm;