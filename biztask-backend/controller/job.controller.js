import jobService from "../services/job.service.js";
const createJob=async(req,res)=>{

    try {
      
const userId=req.user._id;
        const job= await jobService.createJob(userId,req.body);
 
        return res.json({success:true,message:'Job registered',job:job});
    } catch (error) {
    
        return res.json({success:false,message:error.message});
    }



}



const getJobById=async(req,res)=>{
    try {
        const jobId=req.params.id;
     
    const job=await jobService.getJobById(jobId);

    return res.json({success:true,job:job});
    
    } catch (error) {
        
        return res.json({success:false,message:error.message});
    }
    
    }


    const removeJob=async(req,res)=>{
        try {
            const jobId=req.params.id;
            const userId=req.user._id;
            const serviceId = req.query.serviceId; // Access serviceId from query parameters

        const message=await jobService.removeJob(jobId,userId,serviceId);
    
        return res.json({success:true,message:message});
        
        } catch (error) {
            
            return res.json({success:false,message:error.message});
        }



    }

    const updateJob=async(req,res)=>{
        try {
            
           
            const jobId=req.params.id;
            const userId=req.user._id;
        const job=await jobService.updateJob(userId,jobId,req.body);
        return res.json({success:true,message:'Job updated',job:job});
        
        
        } catch (error) {
            
            return res.json({success:false,message:error.message});
        }
        
        }


const getAllJob=async(req,res)=>{{
    try {
       
      const allJobs=await jobService.getAllJob(req.query);

    return res.json({success:true,message:'All Jobs',jobs:allJobs.jobs,totalPages:allJobs.totalPages,currentPage:allJobs.currentPage});
    
    } catch (error) {
        
        return res.json({success:false,message:error.message});
    }
    
}}
export default{
    createJob,
    getJobById,
    updateJob,
    removeJob,
    getAllJob
    
}