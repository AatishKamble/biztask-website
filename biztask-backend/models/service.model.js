import mongoose from "mongoose";

const serviceShcema=new mongoose.Schema({
                business:{
                    type:mongoose.Schema.ObjectId,
                    required:true,
                    ref:"bussiness"
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
                reviews:[{
                    type:mongoose.Schema.ObjectId,
                    ref:"Reviews",
                    default:[]
                }]


},{minimize:false});


const serviceModel=mongoose.model.services || mongoose.model("services",serviceShcema);

export default serviceModel;