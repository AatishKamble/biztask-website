import {uploadOnCloudinary} from "../config/Cloudinary.js";
import bussinessService from "../services/bussiness.service.js"

const createBusiness=async(req,res)=>{

    try {
   
        const userId=req.user._id;
        const imageUploadUrl=await uploadOnCloudinary(req.file?.path);
     
        if(!imageUploadUrl){
            throw new Error("Logo Image Not Found");
        }
        const business= await bussinessService.createBusiness(userId,req.body,imageUploadUrl.secure_url,imageUploadUrl.public_id);
     
        return res.json({success:true,message:'Business registered',business:business});
    } catch (error) {
    
        return res.json({success:false,message:error.message});
    }



}

//update

const updateBusiness=async(req,res)=>{
try {
    
    const imageUploadUrl=await uploadOnCloudinary(req.file?.path);
     
        if(!imageUploadUrl){
            throw new Error("Logo Image Not Found");
        }
    const businessId=req.params.id;
const business=await bussinessService.updateBusiness(businessId,req.body,imageUploadUrl.secure_url,imageUploadUrl.public_id);//req body error
return res.json({success:true,message:'Business updated',business:business});


} catch (error) {
    
    return res.json({success:false,message:error.message});
}

}


const removeBusiness=async(req,res)=>{
    try {
        const businessId=req.params.id;
        const userId=req.user._id;
    const message=await bussinessService.removeBusiness(businessId,userId);

    return res.json({success:true,message:message});
    
    } catch (error) {
        
        return res.json({success:false,message:error.message});
    }
    
    }
    

    const getBusinessById=async(req,res)=>{
        try {
            const businessId=req.params.id;
         
        const business=await bussinessService.findBusinessById(businessId);
    
        return res.json({success:true,business:business});
        
        } catch (error) {
            
            return res.json({success:false,message:error.message});
        }
        
        }
        
    

export default{
    createBusiness,
    updateBusiness,
    removeBusiness,
    getBusinessById,
    
}