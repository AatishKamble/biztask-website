import express from "express";
import authenticate from "../middleware/authenticate.js";
import jobController from "../controller/job.controller.js";
import upload from "../config/uploadMulter.js";
const router=express.Router();

router.post('/register',authenticate,upload.none(),jobController.createJob);
router.get('/details/:id',jobController.getJobById);
router.get('/people-applied/:id',jobController.getPeopleAppliedByJobId)
router.delete('/remove/:id',authenticate,jobController.removeJob);
router.patch('/update/:id',authenticate,upload.none(),jobController.updateJob);
router.get('/all',jobController.getAllJob);

export default router;