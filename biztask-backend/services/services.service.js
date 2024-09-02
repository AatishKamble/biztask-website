import serviceModel from "../models/service.model.js"
import bussinessModel from "../models/bussiness.model.js";
const createService = async (userId,reqData) => {

    try {
        console.log("in ser service",reqData);

        
       const service=new serviceModel({
        bussiness:reqData.businessId,
        user:userId,
        serviceType:reqData.serviceType,
        Description:reqData.Description,
        minPrice:reqData.minPrice,
        maxPrice:reqData.maxPrice,
        locations:JSON.parse(reqData.locations),
        features:JSON.parse(reqData.features)

       });
        const newService= await service.save();

        await bussinessModel.findByIdAndUpdate(
            reqData.businessId,
            {$push:{services:newService._id}},
            {new:true}
        );

        return newService;

    } catch (error) {
        throw new Error(error.message);
    }
}


const getServiceById=async(serviceId)=>{
    try {

        console.log(serviceId)
        const service=await serviceModel.findById(serviceId).populate("bussiness").populate("user");
  console.log(service)
        if(!service){
            throw new Error("Service Not Found");
        }
        return service;
    } catch (error) {
        throw new Error(error.message);
    }
}


const removeService=async(serviceId,userId,businessId)=>{
    try {
       console.log("rs",businessId)
        const service=await getServiceById(serviceId);
      
        if (service.user._id.toString() !== userId.toString()) {
         throw new Error("Service does not belong to this user");
     }
     
         
        await serviceModel.findByIdAndDelete(serviceId);

        //business update
       await bussinessModel.findByIdAndUpdate(
        businessId,
             { $pull: { services: serviceId } }, // Remove the service ID from the services in business
             { new: true } 
         );
 
     return "Service Removed";
     
    
     } catch (error) {
        throw new Error(error.message);
     }
    

}


const updateService=async(userId,serviceId,reqData)=>{
    try {
      
       const service=await getServiceById(serviceId);
    

       if (service.user._id.toString() !== userId.toString()) {
        throw new Error("Service does not belong to this user");
    }
    
       const newService=await serviceModel.findByIdAndUpdate(
        service._id,
           {
            serviceType:reqData.serviceType,
            Description:reqData.Description,
            minPrice:reqData.minPrice,
            maxPrice:reqData.maxPrice,
            locations:JSON.parse(reqData.locations),
            features:JSON.parse(reqData.features)
    
           }  ,
              {new:true}
       )
   
   return newService;
   
    } catch (error) {
       throw new Error(error.message);
    }
   
   
   }


export default{
    createService,
    getServiceById,
    removeService,
    updateService

}