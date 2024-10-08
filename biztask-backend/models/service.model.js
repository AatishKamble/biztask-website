import mongoose from "mongoose";

const serviceShcema=new mongoose.Schema({
                bussiness:{
                    type:mongoose.Schema.ObjectId,
                    required:true,
                    ref:"bussiness"
                },
                user:{
                    type:mongoose.Schema.ObjectId,
                    required:true,
                    ref:"users"
                },
                serviceType:{
                    type:String,
                    required:true,  
                },
                Description:{
                    type:String,
                    required:true,  
                } ,
                minPrice:{
                    type:Number,
                    default:0  
                } ,
                maxPrice:{
                    type:Number,
                    required:true,
                },
                locations:[{
                    type:String,
                    required:true,  
                }],
                features:[{
                    type:String,
                    required:true,  
                }],
                createdAt:{
                    type:Date,
                    default:Date.now()
                },
                WorkImage:[{
                    type:mongoose.Schema.ObjectId,
                    ref:"workPhotos",
                default:[]
                }],
                jobs:[{
                    type:mongoose.Schema.ObjectId,
                    ref:"jobsDetails",
                default:[]
                }],
                rating:{
                    type:Number,
                    required:true,
                    default:0
                },
                reviews:[{
                    type:mongoose.Schema.ObjectId,
                    ref:"Reviews",
                    default:[]
                }]


},{minimize:false});


const serviceModel= mongoose.models.services || mongoose.model("services",serviceShcema);

export default serviceModel;