import ReviewsModel from "../models/Reviews.model.js";
import serviceModel from "../models/service.model.js";
import servicesService from "./services.service.js";
const createReview = async (userId, reqData) => {

    try {

        const review = new ReviewsModel({
            service: reqData.serviceId,
            user: userId,
            ReviewMessage: reqData.review,
            rating: reqData.rating
        });

        const newReview = await review.save();
        await serviceModel.findByIdAndUpdate(
            reqData.serviceId,
            { $push: { reviews: newReview._id } },
            { new: true }
        );


        const allReviews = await ReviewsModel.find({ service: reqData.serviceId });
        const averageRating = allReviews.reduce((acc, rev) => acc + rev.rating, 0) / allReviews.length;

        // Update the service's average rating
        await serviceModel.findByIdAndUpdate(
            reqData.serviceId,
            { rating: averageRating },
            { new: true }
        );

        const upReview=await getReviewById(newReview._id);
        return upReview;

    } catch (error) {
        throw new Error(error.message);
    }
}


const getReviewById = async (reviewId) => {
    try {


        const review = await ReviewsModel.findById(reviewId).populate("service").populate("user");

        if (!review) {
            throw new Error("Job Not Found");
        }
        return review;
    } catch (error) {
        throw new Error(error.message);
    }
}

const removeReview = async (reviewId, userId) => {
    try {

        const review = await getReviewById(reviewId);

        if (review.user._id.toString() !== userId.toString()) {
            throw new Error("Review does not belong to this user");
        }


        await ReviewsModel.findByIdAndDelete(reviewId);

        //service update
        await serviceModel.findByIdAndUpdate(
            review.service._id,
            { $pull: { reviews: reviewId } }, // Remove the job ID from the jobs in service
            { new: true }
        );

        const allReviews = await ReviewsModel.find({ service: review.service._id });
        const averageRating = allReviews.length > 0 
            ? allReviews.reduce((acc, rev) => acc + rev.rating, 0) / allReviews.length
            : 0;

     
        await serviceModel.findByIdAndUpdate(
            review.service._id,
            { rating: averageRating },
            { new: true }
        );

        return review;


    } catch (error) {
        throw new Error(error.message);
    }


}



// const updateReview = async (userId, reviewId, reqData) => {
//     try {

//         const review = await getReviewById(reviewId);

//         if (review.user._id.toString() !== userId.toString()) {
//             throw new Error("Review does not belong to this user");
//         }

//         const newReview = await ReviewsModel.findByIdAndUpdate(
//             review._id,
//             {
//                 ReviewMessage: reqData.review,
//                 rating: reqData.rating
//             }
//             ,
//             { new: true }
//         )

//         return newReview;

//     } catch (error) {
//         throw new Error(error.message);
//     }


// }


const getAllReviews=async(serviceId)=>{
try {
    
const service=await servicesService.getServiceById(serviceId);

const reviews=await ReviewsModel.find({service:serviceId}).populate("service").populate("user").exec();

return reviews;
} catch (error) {
    throw new Error(error.message);
}

}
export default {
    createReview,
    removeReview,
    // updateReview,
    getAllReviews
}