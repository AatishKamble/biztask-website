import serviceModel from "../models/service.model.js"
import bussinessModel from "../models/bussiness.model.js";
import jobsDetailsModel from "../models/jobsDetails.model.js";
import workPhotosModel from "../models/workPhotos.model.js";
import ReviewsModel from "../models/Reviews.model.js"
import { deleteFromCloudinary } from "../config/Cloudinary.js";

const createService = async (userId, reqData) => {

  try {
    const service = new serviceModel({
      bussiness: reqData.businessId,
      user: userId,
      serviceType: reqData.serviceType,
      Description: reqData.Description,
      minPrice: reqData.minPrice,
      maxPrice: reqData.maxPrice,
      locations: JSON.parse(reqData.locations),
      features: JSON.parse(reqData.features)

    });
    const newService = await service.save();

    await bussinessModel.findByIdAndUpdate(
      reqData.businessId,
      { $push: { services: newService._id } },
      { new: true }
    );

    return newService;

  } catch (error) {
    throw new Error(error.message);
  }
}


const getServiceById = async (serviceId) => {
  try {

    const service = await serviceModel.findById(serviceId).populate({path:"bussiness",populate:{path:"services"}}).populate("user").populate("jobs").populate({
      path: "WorkImage",
      populate: { path: "user", select: "name email" }  
  }).populate("reviews");

    if (!service) {
      throw new Error("Service Not Found");
    }
    return service;
  } catch (error) {
    throw new Error(error.message);
  }
}


const removeService = async (serviceId, userId, businessId) => {
  try {

    const service = await getServiceById(serviceId);

    if (service.user._id.toString() !== userId.toString()) {
      throw new Error("Service does not belong to this user");
    }

    //remove job
    service.jobs.map(async (job, idx) => {
      await jobsDetailsModel.findByIdAndDelete(job._id);
    })
 
    await serviceModel.findByIdAndDelete(serviceId);

    //business update
    await bussinessModel.findByIdAndUpdate(
      businessId,
      { $pull: { services: serviceId } }, // Remove the service ID from the services in business
      { new: true }
    );

    service.reviews.map(async(review,index)=>{
      await ReviewsModel.findByIdAndDelete(review._id);
    });

//work
    service.WorkImage.map(async(image,index)=>{
      const workPhoto=await workPhotosModel.findById(image._id);
      if(workPhoto && workPhoto.photos.length>0){
        for(const photo of workPhoto.photos){
          const publicIdPhoto=photo.publicId;
          if(publicIdPhoto){
            await deleteFromCloudinary(publicIdPhoto);
          }
        }
      }
      
      await workPhotosModel.findByIdAndDelete(image._id);
    });
    
    return service;


  } catch (error) {
    throw new Error(error.message);
  }


}


const updateService = async (userId, serviceId, reqData) => {
  try {

    const service = await getServiceById(serviceId);


    if (service.user._id.toString() !== userId.toString()) {
      throw new Error("Service does not belong to this user");
    }

    const newService = await serviceModel.findByIdAndUpdate(
      service._id,
      {
        serviceType: reqData.serviceType,
        Description: reqData.Description,
        minPrice: reqData.minPrice,
        maxPrice: reqData.maxPrice,
        locations: JSON.parse(reqData.locations),
        features: JSON.parse(reqData.features)

      },
      { new: true }
    )

    return newService;

  } catch (error) {
    throw new Error(error.message);
  }


}


//get all services
const getAllServices = async (reqQuery) => {
  try {
    const {
      serviceName,
      serviceLocation,
      minPrice,
      maxPrice,
      rating,
      page,
      limit
    } = reqQuery;

    let query = serviceModel.find().populate("bussiness").populate("user").populate('jobs');
    // .populate("reviews").populate("WorkImage");

    // Price filters
    if (minPrice) {
      query.where("minPrice").gte(minPrice);
    }
    if (maxPrice) {
      query.where("maxPrice").lte(maxPrice);
    }

    // Rating filter
    if (rating !== 'null') {
      const ratingArray = rating.split(",");
      query.where("rating").in(ratingArray);
    }

    // Service name filter (case-insensitive)
    if (serviceName !== 'null') {
      const serviceNames = serviceName.split(",").map(name => ({
        serviceType: { $regex: new RegExp(name, 'i') } // Case-insensitive regex
      }));
      query.or(serviceNames); // Match any of the service names
    }

    // Location filter (case-insensitive)
   

    if (serviceLocation !== 'null') {
      const locationArray = serviceLocation.split(",").map(location => location.trim().toLowerCase()); 
      const regexArray = locationArray.map(location => ({
        locations: { $regex: new RegExp(`^${location}$`, 'i') } 
    }));
    
    query.or(regexArray);
  }

    // Pagination logic
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;

    const totalService = await serviceModel.countDocuments(query);

    if (pageNumber !== 0 && pageSize !== 0) {
      const skip = (pageNumber - 1) * pageSize;
      query = query.skip(skip).limit(pageSize);
    }

    // Sort by rating
    query.sort({ rating: -1 });

    // Execute the query
    const services = await query.exec();

    // Calculate total pages
    const totalPages = Math.ceil(totalService / pageSize);

    return { services: services, currentPage: pageNumber, totalPages,totalServices:totalService };

  } catch (error) {
    throw new Error(error.message);
  }
};

//upload work images
const uploadImage = async (userId, serviceId, filesUrl) => {
  try {
    //  Fetch service
    const service = await serviceModel.findById(serviceId).populate("user");

    if (!service) throw new Error("Service not found");

    const ownerId = service.user._id.toString();


    //  If NOT owner → check review
    if (userId.toString() !== ownerId) {

      // Check if customer has written a review
      const hasReview = await ReviewsModel.findOne({
        service: serviceId,
        user: userId
      });

      if (!hasReview) {
        throw new Error("You must give a review before uploading images.");
      }
    }

    // Continue Upload
    const WorkPhoto = new workPhotosModel({
      service: serviceId,
      user: userId,
      photos: filesUrl
    });

    const newWorkPhoto = await WorkPhoto.save();

    //  Push into service
    const updatedService = await serviceModel.findByIdAndUpdate(
      serviceId,
      { $push: { WorkImage: newWorkPhoto._id } },
      { new: true }
    );

    //  Final populated response
    const finalService = await getServiceById(updatedService._id);
    return finalService;

  } catch (error) {
    throw new Error(error.message);
  }
};




//delete image
const deleteWorkImage = async (userId, serviceId, workPhotoId, photoId, publicId) => {
    try {
      
       const service = await serviceModel.findById(serviceId).populate("user");
        if (!service) throw new Error("Service not found");
 const ownerId = service.user._id.toString();
   const workPhoto = await workPhotosModel.findById(workPhotoId);
        if (!workPhoto) throw new Error("Work photo entry not found");

        const uploaderId = workPhoto.user.toString();
         if (userId.toString() !== ownerId) {
            //  Only delete your own uploads
            if (uploaderId !== userId.toString()) {
                throw new Error("You can delete only your own uploaded images.");
            }
        }

        await deleteFromCloudinary(publicId);

        
        const updatedWorkPhoto = await workPhotosModel.findOneAndUpdate(
            { _id: workPhotoId, service: serviceId },
            { $pull: { photos: { _id: photoId } } },
            { new: true }
        );

        //  If no photos left, delete the entire WorkPhoto document
        if (updatedWorkPhoto && updatedWorkPhoto.photos.length === 0) {
            await workPhotosModel.findByIdAndDelete(workPhotoId);

            //  remove its reference from service
            await serviceModel.findByIdAndUpdate(
                serviceId,
                { $pull: { WorkImage: workPhotoId } }
            );
        }

        return  "Image deleted successfully!" ;

    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
  createService,
  getServiceById,
  removeService,
  updateService,
  getAllServices,
  uploadImage,
  deleteWorkImage

}