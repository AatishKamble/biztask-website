import bussinessModel from "../models/bussiness.model.js";

const createBusiness=async(reqData,reqFile)=>{

    const image_filename=`${reqFile.filename}`;

const business=new bussinessModel({
    bussinessType:reqData.bussinessType,
    companyName:reqData.companyName,
    OwnerName:reqData.OwnerName,
    mobileNumber:reqData.mobileNumber,
    email:reqData.email,
    description:reqData.description,
    minPrice:reqData.minPrice,
    maxPrice:reqData.maxPrice,
    locations:reqData.locations,
    features:reqData.features,
    companyLogo:image_filename

});

try {
    return await business.save();
} catch (error) {
    throw new Error(error);
}

}


export default{
    createBusiness
}