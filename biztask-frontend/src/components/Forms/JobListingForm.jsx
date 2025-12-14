import { FaSave, FaBuilding, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { MdDelete, MdDescription, MdOutlineAttachMoney, MdOutlineLocationCity, MdOutlineFeaturedPlayList } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";
import { BiCategoryAlt } from "react-icons/bi";
import { RiPriceTag3Line } from "react-icons/ri";
import { TbMapPin } from "react-icons/tb";
import { GoChecklist } from "react-icons/go";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { BsBriefcase, BsCalendarDate, BsClockHistory } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { MdOutlineDateRange, MdTask } from "react-icons/md";
import { toast } from "react-toastify";
import AddedBox from "./AddedBox";
import { useDispatch, useSelector } from "react-redux";
import { getServiceById } from "../../Redux/ServiceR/Action.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobRegister, updateJob, getJobById } from "../../Redux/Job/Action.js";

const JobListingForm = ({ registration }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    // Get job
    useEffect(() => {
        if (id) {
            if (registration) {
                dispatch(getServiceById(id))
            }
            else {
                dispatch(getJobById(id));
            }


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

    // Locations
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

    // Responsibility
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

    // Skills Required
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

    // On input change
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    // Jobs
    const jobStore = useSelector(store => store.jobStore);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.jobRole.trim() === "") {
            toast.error("Job role is required");
            return;
        }
        if (!/^[A-Za-z\s]+$/.test(formData.jobRole)) {
            toast.error("Job role must only contain alphabets and spaces");
            return;
        }

        const validEmploymentTypes = ["Full Time", "Part Time", "Temporary"];

        if (formData.employmentType.trim() === "") {
            toast.error("Employment type is required");
            return;
        }
        if (!validEmploymentTypes.includes(formData.employmentType.trim())) {
            toast.error("Employment type must be 'Full Time', 'Part Time', or 'Temporary'");
            return;
        }


        const experience = Number(formData.experienceYear);
        if (formData.experienceYear === "" || isNaN(experience) || experience < 0) {
            toast.error("Experience must be a valid non-negative number");
            return;
        }
        const minSalary = Number(formData.minSalary);
        const maxSalary = Number(formData.maxSalary);

        if (formData.minSalary === "" || isNaN(minSalary) || minSalary < 0) {
            toast.error("Minimum salary must be a valid non-negative number");
            return;
        }
        if (formData.maxSalary === "" || isNaN(maxSalary) || maxSalary < 0) {
            toast.error("Maximum salary must be a valid non-negative number");
            return;
        }
        if (minSalary > maxSalary) {
            toast.error("Minimum salary cannot be greater than maximum salary");
            return;
        }

        const deadlineDate = new Date(formData.deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (deadlineDate < today) {
            toast.error("Deadline must be a future date");
            return;
        }

        if (!locationArray || locationArray.length === 0) {
            toast.error("At least one job location is required");
            return;
        }


        if (!responsibilityArray || responsibilityArray.length === 0) {
            toast.error("At least one responsibility is required");
            return;
        }


        if (!skillsRequiredArray || skillsRequiredArray.length === 0) {
            toast.error("At least one required skill must be added");
            return;
        }

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
        //new

        try {
            setIsButtonDisabled(true);

            let result;
            if (registration === true) {
                formD.append("serviceId", serviceStore?.service?._id);
                result = await dispatch(jobRegister(formD, jwt));
            } else {
                result = await dispatch(updateJob(jwt, formD, id));
            }

            if (result?.success) {
                toast.success(result.message || "Operation successful!");
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

                if (registration) {
                    navigate(`/service-detail/${serviceStore?.service?._id}`);
                } else {
                    navigate(`/job-detail/${id}`);
                }
            } else {
                toast.error(result?.message || "Something went wrong!");
            }

        } catch (error) {
            toast.error("Unexpected error occurred");
        } finally {
            setIsButtonDisabled(false);
        }


    }

    // While updating job
    useEffect(() => {
        if (jobStore.job && jobStore.job._id === id && registration === false) {

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
        <div className="min-h-screen bg-white py-8 px-2 sm:px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
                {/* Back navigation */}
                <div className="mb-6">
                    <button
                        disabled={isButtonDisabled}
                        onClick={() => navigate(-1)}
                        className={`flex items-center text-teal-700 hover:text-teal-900 transition-colors font-serif ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                            }`}
                    >
                        <IoArrowBack className="mr-2" />
                        <span>Back</span>
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10 border border-teal-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-8 py-8">
                        <h1 className="text-3xl font-semibold text-white text-center font-serif">
                            {registration ? "Post New Job Opportunity" : "Update Job Listing"}
                        </h1>
                        <p className="text-teal-100 text-center mt-2 font-serif">Connect with qualified candidates for your business needs</p>
                    </div>

                    <form onSubmit={handleSubmit} className="sm:p-6 p-4 lg:p-8">
                        {/* Job Basic Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="flex items-center text-teal-800 font-medium font-serif">
                                    <BsBriefcase className="text-teal-600 mr-2 text-xl" />
                                    Job Role
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="jobRole"
                                        value={formData.jobRole}
                                        disabled={isButtonDisabled}
                                        onChange={handleChange}
                                        placeholder="Enter Job Role"
                                        className={`w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""}`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-teal-800 font-medium font-serif">
                                    <BiCategoryAlt className="text-teal-600 mr-2 text-xl" />
                                    Employment Type
                                </label>

                                <select
                                    name="employmentType"
                                    disabled={isButtonDisabled}
                                    value={formData.employmentType}
                                    onChange={handleChange}
                                    className={`w-full h-12 px-4 py-2 text-base font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""}`}
                                >
                                    <option value="">Select Employment Type</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Temporary">Temporary</option>

                                </select>
                            </div>

                        </div>

                        {/* Section: Job Requirements */}
                        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 mb-8 border border-teal-100 shadow-sm">
                            <h2 className="text-xl text-teal-800 font-medium font-serif mb-4 flex items-center">
                                <GiSkills className="mr-2 text-teal-700" />
                                Job Requirements
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="flex items-center text-teal-700 font-medium font-serif">
                                        <BsClockHistory className="text-teal-600 mr-2" />
                                        Working Hours
                                    </label>
                                    <input
                                        type="text"
                                        name="workingHours"
                                        disabled={isButtonDisabled}
                                        value={formData.workingHours}
                                        onChange={handleChange}
                                        placeholder="e.g., 9 AM - 5 PM or Flexible"
                                        className={`w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""}`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center text-teal-700 font-medium font-serif">
                                        <MdTask className="text-teal-600 mr-2" />
                                        Years of Experience
                                    </label>
                                    <input
                                        type="text"
                                        name="experienceYear"
                                        disabled={isButtonDisabled}
                                        value={formData.experienceYear}
                                        onChange={handleChange}
                                        placeholder="e.g. 0, 2, 5+"
                                        className={`w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""}`}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center text-teal-700 font-medium font-serif">
                                        <RiPriceTag3Line className="text-teal-600 mr-2" />
                                        Minimum Salary
                                    </label>
                                    <input
                                        type="text"
                                        name="minSalary"
                                        disabled={isButtonDisabled}
                                        value={formData.minSalary}
                                        onChange={handleChange}
                                        placeholder="Enter minimum salary"
                                        className={`w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""}`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center text-teal-700 font-medium font-serif">
                                        <FaIndianRupeeSign className="text-teal-600 mr-2" />
                                        Maximum Salary
                                    </label>
                                    <input
                                        type="text"
                                        name="maxSalary"
                                        disabled={isButtonDisabled}
                                        value={formData.maxSalary}
                                        onChange={handleChange}
                                        placeholder="Enter maximum salary"
                                        className={`w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""}`}
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="flex items-center text-teal-700 font-medium font-serif mb-2">
                                    <BsCalendarDate className="text-teal-600 mr-2" />
                                    Application Deadline
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    disabled={isButtonDisabled}
                                    value={formData.deadline ? formData.deadline.split("T")[0] : ""}
                                    onChange={handleChange}
                                    className={`w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""}`}
                                />
                            </div>
                        </div>

                        {/* Section: Job Locations */}
                        <div className="bg-white rounded-xl p-6 mb-8 border border-teal-200 shadow-md">
                            <h2 className="text-xl text-teal-800 font-medium font-serif mb-4 flex items-center">
                                <TbMapPin className="mr-2 text-teal-700 text-xl" />
                                Job Locations
                            </h2>

                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                <div className="flex-grow">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={location}
                                            disabled={isButtonDisabled}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="Enter neighborhood, area or city for job location"
                                            className={`w-full h-12 pl-10 pr-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""}`}
                                        />
                                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600" />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLocationAdd}
                                    disabled={isButtonDisabled}
                                    className={`flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white h-12 px-6 rounded-lg transition-colors duration-200 shadow-md ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""}`}
                                >
                                    <HiPlus className="mr-2" />
                                    <span className="font-serif">Add Location</span>
                                </button>
                            </div>

                            {locationArray.length > 0 && (
                                <div className=" p-4  border-t-2 border-indigo-200 rounded-t-lg">
                                    <h3 className="text-sm text-teal-700 mb-3 font-serif flex items-center">
                                        <FaCheckCircle className="text-teal-500 mr-2" />
                                        Job Locations:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {locationArray.map((l, index) => (
                                            <AddedBox key={index} Index={index} Name={l} handleRemove={handleLocationRemove} isButtonDisabled={isButtonDisabled} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Section: Responsibilities */}
                        <div className="bg-white rounded-xl p-6 mb-8 border border-teal-200 shadow-md">
                            <h2 className="text-xl text-teal-800 font-medium font-serif mb-4 flex items-center">
                                <GoChecklist className="mr-2 text-teal-700 text-xl" />
                                Job Responsibilities
                            </h2>

                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                <div className="flex-grow">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={responsibilityInput}
                                            disabled={isButtonDisabled}
                                            onChange={(e) => setResponsibilityInput(e.target.value)}
                                            placeholder="Add key job responsibilities"
                                            className={`w-full h-12 pl-10 pr-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""}`}
                                        />
                                        <MdTask className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600" />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleResponsibilityAdd}
                                    disabled={isButtonDisabled}
                                    className={`flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white h-12 px-6 rounded-lg transition-colors duration-200 shadow-md ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""}`}
                                >
                                    <HiPlus className="mr-2" />
                                    <span className="font-serif">Add Responsibility</span>
                                </button>
                            </div>

                            {responsibilityArray.length > 0 && (
                                <div className="border-t-2 border-indigo-200 rounded-t-lg p-4">
                                    <h3 className="text-sm text-teal-700 mb-3 font-serif flex items-center">
                                        <FaCheckCircle className="text-teal-500 mr-2" />
                                        Job Responsibilities:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {responsibilityArray.map((r, index) => (
                                            <AddedBox key={index} Index={index} Name={r} handleRemove={handleResponsibilityRemove} isButtonDisabled={isButtonDisabled} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Section: Skills Required */}
                        <div className="bg-white rounded-xl p-6 mb-8 border border-teal-200 shadow-md">
                            <h2 className="text-xl text-teal-800 font-medium font-serif mb-4 flex items-center">
                                <GiSkills className="mr-2 text-teal-700 text-xl" />
                                Skills Required
                            </h2>

                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                <div className="flex-grow">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={skillsRequiredInput}
                                            disabled={isButtonDisabled}
                                            onChange={(e) => setSkillsRequiredInput(e.target.value)}
                                            placeholder="Add required skills for this position"
                                            className={`w-full h-12 pl-10 pr-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""}`}
                                        />
                                        <MdOutlineFeaturedPlayList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600" />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSkillsRequiredAdd}
                                    disabled={isButtonDisabled}
                                    className={`flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white h-12 px-6 rounded-lg transition-colors duration-200 shadow-md ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""} `}
                                >
                                    <HiPlus className="mr-2" />
                                    <span className="font-serif">Add Skill</span>
                                </button>
                            </div>

                            {skillsRequiredArray.length > 0 && (
                                <div className=" p-4 border-t-2 border-indigo-200 rounded-t-lg">
                                    <h3 className="text-sm text-teal-700 mb-3 font-serif flex items-center">
                                        <FaCheckCircle className="text-teal-500 mr-2" />
                                        Required Skills:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skillsRequiredArray.map((s, index) => (
                                            <AddedBox key={index} Index={index} Name={s} handleRemove={handleSkillsRequiredRemove} isButtonDisabled={isButtonDisabled} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Section: Company Information */}
                        <div className="bg-white rounded-xl p-6 mb-8 border border-teal-200 ">
                            <h2 className="text-xl text-teal-800 font-medium font-serif mb-6 flex items-center">
                                <FaBuilding className="mr-2 text-teal-700" />
                                Company Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="flex items-center text-teal-700 font-medium font-serif">
                                        <BiCategoryAlt className="text-teal-600 mr-2" />
                                        Service Type
                                    </label>
                                    <input
                                        type="text"
                                        value={serviceStore.service?.serviceType || ""}
                                        className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg bg-gray-50 cursor-not-allowed shadow-sm"
                                        disabled
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center text-teal-700 font-medium font-serif">
                                        <FaBuilding className="text-teal-600 mr-2" />
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        value={serviceStore.service?.bussiness?.companyName || ""}
                                        className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg bg-gray-50 cursor-not-allowed shadow-sm"
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="flex items-center text-teal-700 font-medium font-serif mb-2">
                                    <FaEnvelope className="text-teal-600 mr-2" />
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    value={serviceStore.service?.user?.email || ""}
                                    className="w-full h-12 px-4 py-2 text-lg font-serif outline-none border border-teal-200 rounded-lg bg-gray-50 cursor-not-allowed shadow-sm"
                                    disabled
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-teal-700 font-medium font-serif mb-2">
                                    <MdDescription className="text-teal-600 mr-2" />
                                    Company Description
                                </label>
                                <textarea
                                    value={serviceStore.service?.bussiness?.description || ""}
                                    rows="10"
                                    className="w-full px-4 py-3 text-lg font-serif outline-none border border-teal-200 rounded-lg bg-gray-50 cursor-not-allowed shadow-inner"
                                    disabled
                                ></textarea>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                            <button
                                disabled={isButtonDisabled}
                                type='button'
                                onClick={() => navigate(-1)}
                                className={` bg-white border border-teal-300 hover:bg-teal-50 text-teal-700 font-serif font-medium py-3 px-8 rounded-lg shadow-sm transition-colors  duration-200 flex items-center justify-center ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                    }`}
                            >
                                Cancel
                            </button>

                            <button
                                type='submit'
                                disabled={isButtonDisabled}
                                className={`bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-serif font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                    }`}  >



                                {isButtonDisabled ? (
                                    <>
                                        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                                        <span className='px-1'>wait...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="mr-2" />
                                        {registration ? "Post Job" : "Update Job Details"}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default JobListingForm;