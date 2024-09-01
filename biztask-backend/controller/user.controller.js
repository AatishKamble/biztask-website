import userService from "../services/user.service.js";
import jwtProvider from "../config/jwtProvider.js";
import bcrypt from "bcrypt";
const registerUser=async(req,res)=>{
try {

    const user=await userService.createUser(req.body);
    const token=jwtProvider.generateToken(user._id);
    return res.json({success:true,token});
    
} catch (error) {
    
    return res.json({
        success:false,
        message:error.message
    });
}
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userService.getUserByEmail(email);
        if (!user) {
            throw new Error(error.message);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Wrong password");
        }
        const token=jwtProvider.generateToken(user._id);
        return res.json({success:true,token});
    
    } catch (error) {
        
        return res.json({
            success:false,
            message:error.message
        });
    }  
}

const getUserProfile=async(req,res)=>{
    try {
        const jwt = req.headers.authorization?.split(" ")[1];
     
        if (!jwt) {
            throw new Error("Token not found");

        }
        const user=await userService.getUserByToken(jwt);
      
    return res.json({success:true,user});

    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        });
    }
}


const updateUserProfile=async(req,res)=>{
try {
    const obj = JSON.parse(JSON.stringify(req.body));
    const userId=req.user._id;
    let image_filename=`${req.file?.filename}`;
 
    const user=await userService.updateUserProfile(userId,obj,image_filename);
    return res.json({success:true,message:"Profile Updated",user:user});
    
} catch (error) {
    return res.json({
        success:false,
        message:error.message
    });
}


}

export default{
    loginUser,
    registerUser,
    getUserProfile,
    updateUserProfile
}