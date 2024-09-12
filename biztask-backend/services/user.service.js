import userModel from "../models/user.model.js";
import validator from "validator";
import jwtProvider from "../config/jwtProvider.js";
import jobsDetailsModel from "../models/jobsDetails.model.js";
import bcrypt from "bcrypt";
import { unlink } from 'node:fs';
import path from "node:path";
import { get } from "node:http";
import { deleteFromCloudinary } from "../config/Cloudinary.js";
const createUser = async (reqData) => {
    try {
        const { email, password } = reqData;
        //checking is user exists
        const isUserExits = await userModel.findOne({email:email});
        if (isUserExits) {
            throw new Error("User already exists");
        }

        //if user not exists
        //validating email format and strong password
        if (!validator.isEmail(email)) {
            throw new Error("Please enter valid email");
        }

        if (password.length < 8) {
            throw new Error("Password size should be atleast 8 ");
        }


        const saltRounds = 10;
        let hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new userModel({
            email: email.toLowerCase(),
            password: hashedPassword
        });

        const user = await newUser.save();
        return user;

    } catch (error) {
        throw new Error(error.message);
    }

}


async function getUserByEmail(userEmail) {
    try {
       
        const user = await userModel.findOne({ email:userEmail.toLowerCase() });
        if (!user) {
            throw new Error(`User not found with email: ${userEmail}`);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}


const getUserByToken=async(token)=>{
    try {
        const userId=jwtProvider.getUserByToken(token);
       
        const user=await userModel.findOne({ _id: userId }).populate("businesses").populate({
            path:"appliedJobs",
            model:"jobsDetails",
            populate:[
               { path:"business"},
                {path:"service"}
            ]
           
        });
   
        if(!user){
            throw new Error("User not found");
     
         }
         return user;
    } catch (error) {
        throw new Error(error.message);
    }
}


const getUserById=async(userId)=>{
    try {
    
        const user=await userModel.findOne({ _id: userId }).populate("businesses").populate({
            path:"appliedJobs",
            model:"jobsDetails",
            populate:[
               { path:"business"},
                {path:"service"}
            ]
           
        });
   
        if(!user){
            throw new Error("User not found");
     
         }
         return user;
    } catch (error) {
        throw new Error(error.message);
    }
}


const updateUserProfile=async(userId,userData,imageUrl,imagePublicID)=>{
try {

const {name,mobileNumber}=userData;
const user=await userModel.findById(userId);

if(user.profileImage && user.profileImage.publicId){
    await deleteFromCloudinary(user.profileImage.publicId);
}

const updatedUser=await userModel.findByIdAndUpdate(
    userId,
    {name:name,mobileNumber:mobileNumber,profileImage:{ImageUrl:imageUrl,publicId:imagePublicID}},
    { new: true }
);

const userUpdated=getUserById(userId)
return userUpdated;

} catch (error) {
    throw new Error(error.message);
}

}

const applyJob=async(userId,jobId)=>{
    try {

        const user=await getUserById(userId);
        if(user.appliedJobs.includes(jobId)){
            throw new Error("You have already applied for this job");
        }
        const updatedUser=await userModel.findByIdAndUpdate(
            userId,
            { $push: { appliedJobs: jobId } },
            { new: true }
        );


        await jobsDetailsModel.findByIdAndUpdate(
            jobId,
            {$push:{peopleApplied:userId}},
            { new: true }
        );

        
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default {
    createUser,
    getUserByEmail,
    getUserByToken,
    updateUserProfile,
    getUserById,
    applyJob
}