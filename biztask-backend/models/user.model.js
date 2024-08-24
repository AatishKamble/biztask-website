import mongoose, { mongo } from "mongoose";


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
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,  
    },
    postedJobs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Jobs',
            default:[]
        }
    ],
    appliedJobs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Jobs',
            default:[]
        }
    ],
    businesses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'businesss',
            default:[]
        }
    ]
},{minimize:false});


const userModel= mongoose.models.users || mongoose.model('users',userSchema);

export default userModel;