import express from "express";
import authenticate from "../middleware/authenticate.js";
import upload from "../config/uploadMulter.js";
import reviewController from "../controller/review.controller.js";
const router=express.Router();


router.post("/add",authenticate,upload.none(),reviewController.createReview);
router.delete('/remove/:id',authenticate,reviewController.removeReview)
// router.patch('/update/:id',authenticate,upload.none(),reviewController.updateReview)
router.get('/all',reviewController.getAllReviews);
export default router;