
import userService from "../services/user.service.js";
async function authenticate(req,res,next){
   
    try {

        const token=req.headers.authorization?.split(" ")[1];
      
        if(!token){
            return res.status(404).json({success:false,message:"token not found"});
        }
        
        const user=await userService.getUserByToken(token);  
   
        req.user=user; 
      
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        });
    }

    next();
}



export default authenticate;