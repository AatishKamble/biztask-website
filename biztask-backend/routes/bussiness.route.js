import express from "express";
import bussinessController from "../controller/bussiness.controller.js";
 import upload from "../config/uploadMulter.js";
import authenticate from "../middleware/authenticate.js";

const router=express.Router();




router.post('/register',authenticate,upload.single("companyLogo"),bussinessController.createBusiness);
router.patch('/update/:id',authenticate,upload.single("companyLogo"),bussinessController.updateBusiness)
router.delete('/remove/:id',authenticate,bussinessController.removeBusiness);
router.get('/details/:id',authenticate,bussinessController.getBusinessById)
export default router


