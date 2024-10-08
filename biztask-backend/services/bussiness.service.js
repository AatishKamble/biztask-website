import bussinessModel from "../models/bussiness.model.js";
import userModel from "../models/user.model.js";
import servicesService from "./services.service.js";
import { unlink } from 'node:fs';
import { deleteFromCloudinary } from "../config/Cloudinary.js";
const createBusiness = async (userId, reqData, companyLogoImage,imagePublicID) => {

    try {
        
        const business = new bussinessModel({
            user: userId,
            companyName: reqData.companyName,
            description: reqData.description,
            companyLogo:{
                imageUrl:companyLogoImage,
                publicId:imagePublicID
            }

        });

        const newBusiness = await business.save();

        await userModel.findByIdAndUpdate(
            userId,
            {$push:{businesses:newBusiness._id}},
            {new:true}
        );

        return newBusiness;

    } catch (error) {
        throw new Error(error.message);
    }

}


const findBusinessById=async(businessId)=>{
    try {

       
        const business=await bussinessModel.findById(businessId).populate("services");

        if(!business){
            throw new Error("Business Not Found");
        }
        return business;
    } catch (error) {
        throw new Error(error.message);
    }
}


const updateBusiness=async(businessId,reqData,companyLogoImage,imagePublicID)=>{
 try {
    const {companyName,description}=reqData;
    const business=await findBusinessById(businessId);
    // unlink(`uploads/${business.companyLogo}`,()=>{});//for deleting previous image
    if(business.companyLogo && business.companyLogo.publicId){
        await deleteFromCloudinary(business.companyLogo.publicId);
    }

    const newBusiness=await bussinessModel.findByIdAndUpdate(
        businessId,
        {companyName:companyName,description:description, companyLogo:{
                imageUrl:companyLogoImage,
                publicId:imagePublicID
            }},
        {new:true}
    )

return newBusiness;

 } catch (error) {
    throw new Error(error.message);
 }


}


const removeBusiness=async(businessId,userId)=>{
    try {
       
       const business=await findBusinessById(businessId);
     
       if (business.user.toString() !== userId.toString()) {
        throw new Error("Business does not belong to this user");
    }
    
        // unlink(`uploads/${business.companyLogo}`,()=>{});//for deleting previous image
        
//delete image uploaded on cloudinary
if(business.companyLogo && business.companyLogo.publicId){
    await deleteFromCloudinary(business.companyLogo.publicId);
}
        business.services.map(async(service,idx)=>{
            await servicesService.removeService(service._id,business.user,business._id);
         })
       await bussinessModel.findByIdAndDelete(businessId);
      await userModel.findByIdAndUpdate(
            userId,
            { $pull: { businesses: businessId } }, // Remove the business ID from the array
            { new: true } 
        );

    return "Business Removed";
    
   
    } catch (error) {
       throw new Error(error.message);
    }
   
   
   }
   


   

export default {
    createBusiness,
    updateBusiness,
    removeBusiness,
    findBusinessById,
    
    
}