import bussinessService from "../services/bussiness.service.js"

const createBusiness=async(req,res)=>{

    try {
        let company_logo=`${req.file?.filename}`;
        const userId=req.user._id;
        console.log("con",req.body);
        const business= await bussinessService.createBusiness(userId,req.body,company_logo);
        return res.json({success:true,message:'Business registered',business:business});
    } catch (error) {
    
        return res.json({success:false,message:error.message});
    }



}

//update

const updateBusiness=async(req,res)=>{
try {
    
    let companyLogo=`${req.file?.filename}`;
    const businessId=req.params.id;
const business=await bussinessService.updateBusiness(businessId,req.body,companyLogo);//req body error
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
    getBusinessById
}