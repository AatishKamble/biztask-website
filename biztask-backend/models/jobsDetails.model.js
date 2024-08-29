import mongoose from "mongoose";

const jobsDetailsShcema=new mongoose.Schema({
                service:{
                    type:mongoose.Schema.ObjectId,
                    required:true,
                    ref:"services"
                },
                jobRole:{
                    type:String,
                    required:true,  
                },
                employmentType:{
                    type:String,
                    required:true,  
                } ,
                workingHours:{
                    type:String,
                    required:true,  
                } ,
                experienceYear:{
                    type:Number,
                    default:0  
                } ,
                minSalary:{
                    type:Number,
                    required:true,
                },
                maxSalary:{
                    type:Number,
                    required:true,
                },
                jobLocations:[{
                    type:String,
                    required:true,  
                }],
                responsibility:[{
                    type:String,
                    required:true,  
                }],
                skillsRequired:[{
                    type:String,
                    required:true,  
                }],
                deadline:{
                    type:Date,
                    required:true, 
                },
                postedAt:{
                    type:Date,
                    default:Date.now()
                },
               

},{minimize:false});


const jobsDetailsModel=mongoose.model.jobsDetails || mongoose.model("jobsDetails",jobsDetailsShcema);

export default jobsDetailsModel;