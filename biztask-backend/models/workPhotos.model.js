import mongoose from "mongoose";

const workPhotosShcema=new mongoose.Schema({
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
                createdAt:{
                    type:Date,
                    default:Date.now()
                },
                


},{minimize:false});


const workPhotosModel=mongoose.model.workPhotos || mongoose.model("workPhotos",workPhotosShcema);

export default workPhotosModel;