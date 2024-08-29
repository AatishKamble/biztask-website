import mongoose from "mongoose";


const ReviewsSchema=new mongoose.Schema({

    service:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"services"
    },
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"users"
    },
    ReviewMessage:{
        type:String,
        required:true
    },
    rating: {
        type: Number,
        required: true,
    },
    postedAt:{
        type:Date,
        default:Date.now()
    },
   
    
},{minimize:false});


const ReviewsModel= mongoose.models.Reviews || mongoose.model('Reviews',ReviewsSchema);

export default ReviewsModel;