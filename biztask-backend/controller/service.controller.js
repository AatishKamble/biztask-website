import servicesService from "../services/services.service.js";


const createService=async(req,res)=>{

    try {
      
const userId=req.user._id;
        const service= await servicesService.createService(userId,req.body);
        return res.json({success:true,message:'Service registered',service:service});
    } catch (error) {
    
        return res.json({success:false,message:error.message});
    }



}

const getServiceById=async(req,res)=>{
    try {
        const serviceId=req.params.id;
     
    const service=await servicesService.getServiceById(serviceId);

    return res.json({success:true,service:service});
    
    } catch (error) {
        
        return res.json({success:false,message:error.message});
    }
    
    }


    const removeService=async(req,res)=>{
        try {
            const serviceId=req.params.id;
            const userId=req.user._id;
            const businessId = req.query.businessId; // Access businessId from query parameters

        const message=await servicesService.removeService(serviceId,userId,businessId);
    
        return res.json({success:true,message:message});
        
        } catch (error) {
            
            return res.json({success:false,message:error.message});
        }



    }

    const updateService=async(req,res)=>{
        try {
            
           
            const serviceId=req.params.id;
            const userId=req.user._id;
        const service=await servicesService.updateService(userId,serviceId,req.body);//req body error
        return res.json({success:true,message:'Service updated',service:service});
        
        
        } catch (error) {
            
            return res.json({success:false,message:error.message});
        }
        
        }
        

export default{
    createService,
    getServiceById,
    removeService,
    updateService
    
}