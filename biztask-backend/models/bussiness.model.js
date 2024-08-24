import mongoose from "mongoose";

const bussinessSchema=new mongoose.Schema(
    {
            bussinessType:{
                type:String,
                required:true
            },
            companyName:{
                type:String,
                required:true
            },
            OwnerName:{
                type:String,
                required:true
            },
            mobileNumber:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            description: {
                type: String,
                required: true,
            },
            minPrice: {
                type: Number,
                required: true,
            },
            maxPrice: {
                type: Number,
                required: true,
            },
            locations:[
                {
                    type:String,
                }
            ],
            features:[
                {
                    type:String,
                }
            ],  
            companyLogo:{
                type:String,
                required:false
            }

});

const bussinessModel=  mongoose.models.bussiness ||mongoose.model('bussiness',bussinessSchema);

export default bussinessModel

