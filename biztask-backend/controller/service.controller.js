import { uploadOnCloudinary } from "../config/Cloudinary.js";
import servicesService from "../services/services.service.js";


const createService = async (req, res) => {

    try {

        const userId = req.user._id;
        const service = await servicesService.createService(userId, req.body);
        return res.json({ success: true, message: 'Service registered', service: service });
    } catch (error) {

        return res.json({ success: false, message: error.message });
    }



}

const getServiceById = async (req, res) => {
    try {
        const serviceId = req.params.id;

        const service = await servicesService.getServiceById(serviceId);

        return res.json({ success: true, service: service });

    } catch (error) {

        return res.json({ success: false, message: error.message });
    }

}


const removeService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const userId = req.user._id;
        const businessId = req.query.businessId; // Access businessId from query parameters

        const service = await servicesService.removeService(serviceId, userId, businessId);

        return res.json({ success: true, message: "Service Removed", service:service });

    } catch (error) {

        return res.json({ success: false, message: error.message });
    }



}

const updateService = async (req, res) => {
    try {


        const serviceId = req.params.id;
        const userId = req.user._id;
        const service = await servicesService.updateService(userId, serviceId, req.body);//req body error
        return res.json({ success: true, message: 'Service updated', service: service });


    } catch (error) {

        return res.json({ success: false, message: error.message });
    }

}




const getAllServices = async (req, res) => {
    {
        try {
         
            const allServices = await servicesService.getAllServices(req.query);

            return res.json({ success: true, message: 'All Services', services: allServices.services, totalPages: allServices.totalPages, currentPage: allServices.currentPage });

        } catch (error) {

            return res.json({ success: false, message: error.message });
        }

    }
}



const uploadImage = async (req, res) => {

    try {

        const userId = req.user._id;
        const files = req.files.length > 0 && req.files;
        let filesUrl = [];
        //for storing multiple images on cloudinary
        for(const file of files){
            const uploadedImage=await uploadOnCloudinary(file.path);
            filesUrl.push({
                imageUrl:uploadedImage.secure_url,
                publicId:uploadedImage.public_id
            });

        }
       
        const {serviceId}=req.body;
        const service = await servicesService.uploadImage(userId,serviceId,filesUrl);
        return res.json({ success: true, message:'Images uploaded Successfully', service: service });
    } catch (error) {

        return res.json({ success: false, message: error.message });
    }



}
export default {
    createService,
    getServiceById,
    removeService,
    updateService,
    getAllServices,
    uploadImage

}