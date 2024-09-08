import mongoose from "mongoose";


const userSchema=new mongoose.Schema({

    name:{
        type:String,
        default:""

    },
    email:{

        type:String,
        required:true,
        unique:true
    },
    mobileNumber:{
        type:String,
        default:"0000000000"
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:"" 
    },
    appliedJobs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'jobsDetails',
            default:[]
        }
    ],
    businesses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'bussiness',
            default:[]
        }
    ]
},{minimize:false});


const userModel= mongoose.models.users || mongoose.model('users',userSchema);

export default userModel;