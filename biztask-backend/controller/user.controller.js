import userService from "../services/user.service.js";
import jwtProvider from "../config/jwtProvider.js";
import bcrypt from "bcrypt";
const registerUser=async(req,res)=>{
try {

    const user=await userService.createUser(req.body);
    const token=jwtProvider.generateToken(user._id);
    return res.json({success:true,token});
    
} catch (error) {
    console.log(error);
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
            return res.status(401).json({
                success: false,
                message: "User not exists"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Wrong password" });
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
            return res.status(404).send({ error: "Token not found" });

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

export default{
    loginUser,
    registerUser,
    getUserProfile
}