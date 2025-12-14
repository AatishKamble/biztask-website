import userModel from "../models/user.model.js";
import userApplicationModel from "../models/userJobApplication.model.js"
import validator from "validator";
import jwtProvider from "../config/jwtProvider.js";
import jobsDetailsModel from "../models/jobsDetails.model.js";
import bcrypt from "bcrypt";
import { unlink } from 'node:fs';
import path from "node:path";
import { get } from "node:http";
import { deleteFromCloudinary } from "../config/Cloudinary.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import "dotenv/config";

import otpModel from "../models/otp.model.js";



// Generate 6-digit OTP
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtp = async (email) => {
    try {

        // Validate email
        if (!validator.isEmail(email)) {
            throw new Error("Please enter a valid email");
        }

        // Check if user already exists 
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Generate new OTP
        const otp = generateOtp();

        // Delete any old OTP for this email
        await otpModel.deleteMany({ email });

        // Save OTP in DB
        await otpModel.create({ email, otp });

        // MAIL CONFIG
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_MAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });

        // MAILGEN TEMPLATE
        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'BizTask',
                link: process.env.FRONT_END_URL
            }
        });

        // EMAIL BODY
        var response = {
            body: {
                name: "User",
                intro: `Your BizTask OTP is: **${otp}**`,
                table: {
                    data: [{ OTP: otp }]
                },
                outro: "If you did not request this, please ignore this email."
            }
        };


        let emailBody = mailGenerator.generate(response);

        let message = {
            from: process.env.NODEMAILER_MAIL,
            to: email,
            subject: "BizTask Email Verification OTP",
            html: emailBody
        };

        // SEND MAIL
        await transporter.sendMail(message);

        return { success: true, message: "OTP sent successfully!" };

    } catch (error) {
        throw new Error(error.message);
    }
};

export const verifyOtp = async (email, otpCode) => {
    try {

        const otpRecord = await otpModel.findOne({ email });

        if (!otpRecord) {
            throw new Error("OTP expired or not found");
        }

        if (otpRecord.otp !== otpCode) {
            throw new Error("Invalid OTP");
        }

        // OTP Verified → delete it
        await otpModel.deleteMany({ email });

        return { success: true, message: "OTP verified successfully!" };

    } catch (error) {
        throw new Error(error.message);
    }
};

const createUser = async (reqData) => {
    try {
        const { email, password } = reqData;
        //checking is user exists
        const isUserExits = await userModel.findOne({ email: email });
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

        const user = await userModel.findOne({ email: userEmail.toLowerCase() });
        if (!user) {
            throw new Error(`User not found with email: ${userEmail}`);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}


const getUserByToken = async (token) => {
    try {
      
        const userId = jwtProvider.getUserByToken(token);

        const user = await userModel.findOne({ _id: userId }).populate("businesses").populate({
            path: "appliedJobs",
            model: "jobsDetails",
            populate: [
                { path: "business" },
                { path: "service" }
            ]

        });

       
        return user || null; 

    } catch (err) {
        return null; 
    }
}


const getUserById = async (userId) => {
    try {

        const user = await userModel.findOne({ _id: userId }).populate("businesses").populate({
            path: "appliedJobs",
            model: "jobsDetails",
            populate: [
                { path: "business" },
                { path: "service" }
            ]

        });

        if (!user) {
            throw new Error("User not found");

        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}


const updateUserProfile = async (userId, userData, imageUrl, imagePublicID) => {
    try {


        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const updateFields = {
            name: userData.name,
            mobileNumber: userData.mobileNumber,

            houseNumber: userData.houseNumber,
            area: userData.area,
            village: userData.village,
            subDistrict: userData.subDistrict,
            district: userData.district,
            pinCode: userData.pinCode,
        };



        if (imageUrl && imagePublicID) {
            if (user.profileImage?.publicId) {
                await deleteFromCloudinary(user.profileImage.publicId);
            }

            updateFields.profileImage = {
                ImageUrl: imageUrl,
                publicId: imagePublicID,
            };
        }

        await userModel.findByIdAndUpdate(userId, updateFields, { new: true });


        const userUpdated = getUserById(userId)
        return userUpdated;

    } catch (error) {
        throw new Error(error.message);
    }

}

const applyJob = async (userId, applicationData, imageUrl = null, imagePublicID = null) => {
    const {
        jobId, fullName, email, phone, profession,
        experience, availability, address, zipCode, skills, hasTools
    } = applicationData;

    try {
        const existingApplication = await userApplicationModel.findOne({ userId, jobId });
        if (existingApplication) {
            throw new Error("You have already applied for this job");
        }

        const newApplication = await userApplicationModel.create({
            userId,
            jobId,
            fullName,
            email,
            phone,
            profession,
            experience,
            availability,
            address,
            zipCode,
            skills,
            hasTools,
            profileImage: {
                imageUrl: imageUrl || "",
                publicId: imagePublicID || ""
            },
            appliedAt: new Date()
        });

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $addToSet: { appliedJobs: jobId } },
            { new: true }
        );

        await jobsDetailsModel.findByIdAndUpdate(
            jobId,
            { $addToSet: { peopleApplied: userId } },
            { new: true }
        );

        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};


//update Job application status

const updateApplicationStatus = async (applicationId, newStatus,messageToUser ) => {
  try {
    const allowedStatuses = [
      "Pending",
      "Shortlisted",
      "Rejected",
      "Interview Scheduled",
      "Hired"
    ];

    if (!allowedStatuses.includes(newStatus)) {
      throw new Error("Invalid application status");
    }

   
    const updatedApplication = await userApplicationModel.findByIdAndUpdate(
      applicationId,
      { status: newStatus ,
          adminMessage: messageToUser || ""
      },
      { new: true }
    )
    .populate("userId")
    .populate({
      path: "jobId",
      model: "jobsDetails",
      populate: {
        path: "business",
        model: "bussiness"
      }
    });

    if (!updatedApplication) {
      throw new Error("Application not found");
    }

  
    return updatedApplication;

  } catch (error) {
    throw new Error(error.message);
  }
};




const forgotpassword = async (email) => {
    try {

        const user = await getUserByEmail(email);

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRETE_KEY, { expiresIn: "5m" });

        const link = `${process.env.FRONT_END_URL}/reset-password/${user._id}/${token}`;


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_MAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });


        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {

                name: 'Biztask',
                link: process.env.FRONT_END_URL

            }
        });

        var response = {
            body: {
                name: user.name,
                intro: 'Welcome to bizTask.',
                action: {
                    instructions: 'To reset your password, please click  below. It will remain valid for the next 5 minutes:',
                    button: {
                        color: '#0000ff',
                        text: 'Reset Password',
                        link: link
                    }
                },

            }
        };

        let mail = mailGenerator.generate(response);

        let message = {
            from: process.env.NODEMAILER_MAIL,
            to: email,
            subject: "Reset your password",
            html: mail
        }
        const info = await transporter.sendMail(message);

        return "Password reset email sent successfully!";


    } catch (error) {
        throw new Error(error.message);
    }
}


const resetpassword = async (id, token, password) => {
    try {

        const user = await getUserById(id);

        const oldUser = jwt.verify(token, process.env.JWT_SECRETE_KEY);

        if (password.length < 8) {
            throw new Error("Password size should be atleast 8 ");
        }


        const saltRounds = 10;
        let hashedPassword = await bcrypt.hash(password, saltRounds);
        const updatedUser = await userModel.findByIdAndUpdate(
            oldUser.id,
            { password: hashedPassword },
            { new: true }
        );

        return "Password updated successfully!";


    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error("Link expired !");
        }
        else {
            throw new Error(error.message);
        }

    }
}

export default {
    createUser,
    getUserByEmail,
    getUserByToken,
    updateUserProfile,
    getUserById,
    applyJob,
    forgotpassword,
    resetpassword,
    sendOtp,
    verifyOtp,
    updateApplicationStatus
}