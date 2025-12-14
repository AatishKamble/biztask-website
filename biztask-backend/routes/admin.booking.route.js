import express from "express";
import bookingController from "../controller/booking.controller.js"
import authenticate from "../middleware/authenticate.js";
import adminAuth from "../middleware/adminAuth.js"

const router = express.Router();


router.get(
  "/bookings",
  authenticate,
  adminAuth,
  bookingController.getAllBookingsAdmin
);

router.put(
  "/bookings/:id/verify",
  authenticate,
  adminAuth,
  bookingController.verifyPayment
);

router.put(
  "/bookings/:id/reject",
  authenticate,
  adminAuth,
  bookingController.rejectPayment
);

export default router;
