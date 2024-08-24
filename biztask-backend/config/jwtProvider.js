import jwt from "jsonwebtoken";


const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRETE_KEY,{expiresIn:"48h"});
    return token;
}

const getUserByToken=(token)=>{
const user=jwt.verify(token,process.env.JWT_SECRETE_KEY);

return user.userId;
}

export default{
    generateToken,
    getUserByToken
}
