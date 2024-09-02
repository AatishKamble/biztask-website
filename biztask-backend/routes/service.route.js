import express from "express";
import authenticate from "../middleware/authenticate.js";
import serviceController from "../controller/service.controller.js"
import upload from "../config/uploadMulter.js";
const router=express.Router();

router.post('/register',authenticate,upload.none(),serviceController.createService);
router.get('/details/:id',serviceController.getServiceById);
router.delete('/remove/:id',authenticate,serviceController.removeService);
router.patch('/update/:id',authenticate,upload.none(),serviceController.updateService)
export default router;