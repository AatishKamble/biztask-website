import mongoose from "mongoose";

const bussinessSchema=new mongoose.Schema(
    {       
            user:{
                type:mongoose.Schema.ObjectId,
                required:true,
                ref:"users"
            }, 
            companyName:{
                type:String,
                required:true
            },
            description: {
                type: String,
                required: true,
            },
        companyLogo:{
                type:String,
                required:false
            },
            services:[
               { type:mongoose.Schema.ObjectId,
                ref:"services",
                default:[]
            }
            ],
            createdAt:{
                type:Date,
                default:Date.now()
            }

},{minimize:false});

const bussinessModel=  mongoose.models.bussiness ||mongoose.model('bussiness',bussinessSchema);

export default bussinessModel

