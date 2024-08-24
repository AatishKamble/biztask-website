import express from "express";
import userController from "../controller/user.controller.js";
const userRouter=express.Router();


userRouter.post('/signUp',userController.registerUser);
userRouter.post('/signIn',userController.loginUser);
userRouter.get('/profile',userController.getUserProfile);

export default userRouter;


