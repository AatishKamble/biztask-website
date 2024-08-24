import userModel from "../models/user.model.js";
import validator from "validator";
import jwtProvider from "../config/jwtProvider.js";
import bcrypt from "bcrypt";
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
            email: email,
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
       
        const user = await userModel.findOne({ email:userEmail });
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
       
        const user=await userModel.findOne({ _id: userId });
   
        if(!user){
            throw new Error("User not found");
     
         }
         return user;
    } catch (error) {
        throw new Error(error.message);
    }
}


export default {
    createUser,
    getUserByEmail,
    getUserByToken
}