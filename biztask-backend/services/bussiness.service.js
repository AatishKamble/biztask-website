import bussinessModel from "../models/bussiness.model.js";
import userModel from "../models/user.model.js";
import servicesService from "./services.service.js";
import { unlink } from 'node:fs';
import { deleteFromCloudinary } from "../config/Cloudinary.js";
const createBusiness = async (userId, reqData, companyLogoImage, imagePublicID) => {
  try {
    const business = new bussinessModel({
      user: userId,

      // Basic Info
      companyName: reqData.companyName,
      description: reqData.description,

      // Business Info
      businessName: reqData.businessName,
      businessCategory: reqData.businessCategory,
      yearsOfExperience: reqData.yearsOfExperience,

      // Company Logo
      companyLogo: {
        imageUrl: companyLogoImage || null,
        publicId: imagePublicID || null,
      },

      // Address
      houseNumber: reqData.houseNumber,
      village: reqData.village || "",
      area: reqData.area,
      subDistrict: reqData.subDistrict,
      district: reqData.district,
      pinCode: reqData.pinCode,

      // Operating Hours
      openingTime: reqData.openingTime,
      closingTime: reqData.closingTime,

      // Working Days (parse because coming from FormData as JSON string)
      workingDays: JSON.parse(reqData.workingDays),

      // Default services array
      services: [],
    });

    const newBusiness = await business.save();

    // Push business id into user's businesses array
    await userModel.findByIdAndUpdate(
      userId,
      { $push: { businesses: newBusiness._id } },
      { new: true }
    );

    return newBusiness;

  } catch (error) {
    throw new Error(error.message);
  }
};



const findBusinessById=async(businessId)=>{
    try {

       
        const business=await bussinessModel.findById(businessId).populate("services").populate("user");

        if(!business){
            throw new Error("Business Not Found");
        }
        return business;
    } catch (error) {
        throw new Error(error.message);
    }
}


const updateBusiness = async (businessId, reqData, companyLogoImage, imagePublicID) => {
  try {
    const business = await findBusinessById(businessId);

    if (!business) {
      throw new Error("Business not found");
    }

    // Prepare update object
    const updateObj = {
      companyName: reqData.companyName,
      description: reqData.description,
      businessName: reqData.businessName,
      businessCategory: reqData.businessCategory,
      yearsOfExperience: reqData.yearsOfExperience,

      houseNumber: reqData.houseNumber,
      village: reqData.village || "", // optional
      area: reqData.area,
      subDistrict: reqData.subDistrict,
      district: reqData.district,
      pinCode: reqData.pinCode,

      openingTime: reqData.openingTime,
      closingTime: reqData.closingTime,
      workingDays: JSON.parse(reqData.workingDays),
    };

    // If NEW image uploaded
    if (companyLogoImage && imagePublicID) {
      // delete old image
      if (business.companyLogo?.publicId) {
        await deleteFromCloudinary(business.companyLogo.publicId);
      }

      updateObj.companyLogo = {
        imageUrl: companyLogoImage,
        publicId: imagePublicID,
      };
    }

    // update DB
    const updatedBusiness = await bussinessModel.findByIdAndUpdate(
      businessId,
      updateObj,
      { new: true }
    );

    return updatedBusiness;

  } catch (error) {
    throw new Error(error.message);
  }
};


const removeBusiness=async(businessId,userId)=>{
    try {
       
       const business=await findBusinessById(businessId);
     
       if (business.user._id.toString() !== userId.toString()) {
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