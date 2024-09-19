import express from "express";
import userController from "../controller/user.controller.js";
import upload from "../config/uploadMulter.js";
import authenticate from "../middleware/authenticate.js";
const userRouter=express.Router();
userRouter.post('/signUp',userController.registerUser);
userRouter.post('/signIn',userController.loginUser);
userRouter.get('/profile',userController.getUserProfile);
userRouter.patch('/profile-update',authenticate,upload.single("profileImage"),userController.updateUserProfile);
userRouter.patch('/apply',authenticate,upload.none(),userController.applyJob);
userRouter.post('/forgot-password',userController.forgotpassword);//forgotpassword
userRouter.post('/reset-password/:id/:token',userController.resetpassword);

export default userRouter;


