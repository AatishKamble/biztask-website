import express from "express";
import authenticate from "../middleware/authenticate.js";
import bookingController from "../controller/booking.controller.js";
const router=express.Router();

router.post("/create", authenticate, bookingController.createBooking);
router.get("/my-bookings", authenticate, bookingController.getMyBookings);
router.get("/provider-bookings", authenticate, bookingController.getProviderBookings);

router.post("/send-completion-otp/:id",bookingController.sendCompletionOTP);

router.post("/verify-completion-otp/:id", bookingController.verifyCompletionOTP);
router.put("/provider/cancel/:id", authenticate, bookingController.cancelBookingByProvider);

router.put("/seeker/cancel/:id", authenticate, bookingController.cancelBookingBySeeker);

export default router;
