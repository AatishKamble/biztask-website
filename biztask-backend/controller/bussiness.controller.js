import bussinessService from "../services/bussiness.service.js"

const createBusiness=async(req,res)=>{

    try {
        const business= await bussinessService.createBusiness(req.body,req.file);
        return res.json({success:true,message:'Business registered'});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }



}


export default{
    createBusiness
}