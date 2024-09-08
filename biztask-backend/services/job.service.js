import serviceModel from "../models/service.model.js"
import jobsDetailsModel from "../models/jobsDetails.model.js";
import servicesService from "../services/services.service.js";

const createJob = async (userId, reqData) => {

    try {
       const service= await servicesService.getServiceById(reqData.serviceId);
        const job = new jobsDetailsModel({
            service: reqData.serviceId,
            user: userId,
            business:service.bussiness._id,
            jobRole: reqData.jobRole,
            employmentType: reqData.employmentType,
            workingHours: reqData.workingHours,
            experienceYear: reqData.experienceYear,
            minSalary: reqData.minSalary,
            maxSalary:reqData.maxSalary,
            jobLocations: JSON.parse(reqData.jobLocations),
            responsibility: JSON.parse(reqData.responsibilities),
            skillsRequired: JSON.parse(reqData.skillsRequired),
            deadline: new Date(reqData.deadline),
        });


        const newJob = await job.save();

        await serviceModel.findByIdAndUpdate(
            reqData.serviceId,
            { $push: { jobs: newJob._id } },
            { new: true }
        );

        return newJob;

    } catch (error) {
        throw new Error(error.message);
    }
}



//get 
const getJobById=async(jobId)=>{
    try {

        
        const job=await jobsDetailsModel.findById(jobId).populate("service").populate("user").populate('business').populate("peopleApplied");
 
        if(!job){
            throw new Error("Job Not Found");
        }
        return job;
    } catch (error) {
        throw new Error(error.message);
    }
}


const updateJob=async(userId,jobId,reqData)=>{
    try {
      
       const job=await getJobById(jobId);
    

       if (job.user._id.toString() !== userId.toString()) {
        throw new Error("Job not posted by this user");
    }
    
       const newJob=await jobsDetailsModel.findByIdAndUpdate(
        job._id,
           {
            jobRole: reqData.jobRole,
            employmentType: reqData.employmentType,
            workingHours: reqData.workingHours,
            experienceYear: reqData.experienceYear,
            minSalary: reqData.minSalary,
            maxSalary:reqData.maxSalary,
            jobLocations: JSON.parse(reqData.jobLocations),
            responsibility: JSON.parse(reqData.responsibilities),
            skillsRequired: JSON.parse(reqData.skillsRequired),
            deadline: new Date(reqData.deadline),
    
           }  ,
              {new:true}
       )
   
   return newJob;
   
    } catch (error) {
       throw new Error(error.message);
    }
   
   
   }

   //remove

   const removeJob=async(jobId,userId,serviceId)=>{
    try {
    
        const job=await getJobById(jobId);
      
        if (job.user._id.toString() !== userId.toString()) {
         throw new Error("Job does not belong to this user");
     }
     
         
        await jobsDetailsModel.findByIdAndDelete(jobId);

        //service update
       await serviceModel.findByIdAndUpdate(
        serviceId,
             { $pull: { jobs: jobId } }, // Remove the job ID from the jobs in service
             { new: true } 
         );
 
     return "Job Removed";
     
    
     } catch (error) {
        throw new Error(error.message);
     }
    

}

//get all jobs
const getAllJob=async(reqQuery)=>{
    try {

        const {
            jobName,
            jobLocation,
            minSalary,
            maxSalary,
            employmentType,
            page,
            limit
        }=reqQuery;

        let query= jobsDetailsModel.find().populate("service").populate("user").populate('business').populate("peopleApplied");

       
        if(minSalary){
            query.where("minSalary").gte(minSalary);
        }
        if(maxSalary){
            query.where("maxSalary").lte(maxSalary);
        }


        if (employmentType !== 'null') {
            const employmentArray = employmentType.split(",").map(name => ({
                employmentType: { $regex: new RegExp(name, 'i') } // Case-insensitive regex
            }));
            query.or(employmentArray); // Match any of the service names
          }

        
        if (jobName !== 'null') {
            const jobNames = jobName.split(",").map(name => ({
                jobRole: { $regex: new RegExp(name, 'i') } // Case-insensitive regex
            }));
            query.or(jobNames); // Match any of the service names
          }

          if (jobLocation !== 'null') {
            const locationArray = jobLocation.split(",").map(location => location.trim().toLowerCase());
            const regexArray = locationArray.map(location => ({
                jobLocations: { $regex: new RegExp(`^${location}$`, 'i') }
            }));
            query.or(regexArray);
        }
        

        


        const pageNumber=parseInt(page,10) ||1;
        const pageSize=parseInt(limit,10) || 10;

const totalJobs=await jobsDetailsModel.countDocuments(query);

        if(pageNumber !==0 && pageSize !==0){

            const skip = (pageNumber - 1) * pageSize;
        query = query.skip(skip).limit(pageSize);
          }

          query.sort({postedAt:-1});

        const jobs=await query.exec();


        const totalPages=Math.ceil(totalJobs/pageSize);

        return {jobs:jobs,currentPage:pageNumber,totalPages};
        
    } catch (error) {
        throw new Error(error.message);
    }
}
export default{
    createJob,
    getJobById,
    updateJob,
    removeJob,
    getAllJob
  
}