import reviewService from "../services/review.service.js";

const createReview=async(req,res)=>{

    try {
      
const userId=req.user._id;

        const review= await reviewService.createReview(userId,req.body);
 
        return res.json({success:true,message:'Review Added',review:review});
    } catch (error) {
    
        return res.json({success:false,message:error.message});
    }



}

const removeReview=async(req,res)=>{
    try {
        const reviewId=req.params.id;
        const userId=req.user._id;
       
    const review=await reviewService.removeReview(reviewId,userId);

    return res.json({success:true,message:"Review Removed",review:review});
    
    } catch (error) {
        
        return res.json({success:false,message:error.message});
    }



}


// const updateReview=async(req,res)=>{
//     try {
        
       
//         const reviewId=req.params.id;
//         const userId=req.user._id;
//     const review=await reviewService.updateReview(userId,reviewId,req.body);
//     return res.json({success:true,message:"Review Updated",review:review});
    
//     } catch (error) {
        
//         return res.json({success:false,message:error.message});
//     }
    
//     }


    const getAllReviews=async(req,res)=>{
        try {
        
            const serviceId=req.query.serviceId;
     
        const reviews=await reviewService.getAllReviews(serviceId);
        return res.json({success:true,reviews:reviews});
        
        } catch (error) {
            
            return res.json({success:false,message:error.message});
        }
        
    }

export default{
    createReview,
    removeReview,
    // updateReview,
    getAllReviews
}
