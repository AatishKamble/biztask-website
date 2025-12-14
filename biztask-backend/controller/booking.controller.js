import bookingService from "../services/booking.service.js";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import "dotenv/config";
import sendMail from "../config/sendMail.js"

const createBooking = async (req, res) => {
  try {
    const userId = req.user._id; 

    const newBooking = await bookingService.createBooking(userId, req.body);

    return res.json({
      success: true,
      message: "Booking created successfully. Waiting for admin verification.",
      booking: newBooking
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookingsAdmin();

    return res.json({
      success: true,
      bookings
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


const verifyPayment = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const updatedBooking = await bookingService.verifyBooking(bookingId);

    return res.json({
      success: true,
      message: "Booking verified successfully",
      booking: updatedBooking
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const rejectPayment = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const rejectedBooking = await bookingService.rejectBooking(bookingId);

    return res.json({
      success: true,
      message: "Booking rejected successfully",
      booking: rejectedBooking
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};


const getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await bookingService.getBookingsBySeeker(userId);

    res.json({ success: true, bookings });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

const getProviderBookings = async (req, res) => {
  try {
    const providerId = req.user._id;

    const bookings = await bookingService.getBookingsByProvider(providerId);

    res.json({ success: true, bookings });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

const sendCompletionOTP = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await bookingService.generateCompletionOTP(id);

    await sendMail({
      to: booking.seekerEmail,
      subject: "Service Completion OTP",
      name: booking.seekerName,
      intro: "Your OTP for service completion is:",
      tableData: [{ OTP: booking.completionOTP }],
      outro: "Please share this OTP with the provider to complete the service."
    });

    res.json({ success: true, message: "OTP sent to seeker email" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const verifyCompletionOTP = async (req, res) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;

    const booking = await bookingService.verifyCompletionOTP(id, otp);

    res.json({
      success: true,
      message: "Service marked as COMPLETED",
      booking
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};


const cancelBookingByProvider = async (req, res) => {
  try {
    const providerId = req.user._id;
    const { id: bookingId } = req.params;

    const booking = await bookingService.cancelBookingByProvider(bookingId, providerId);

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      booking
    });

  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
};


const cancelBookingBySeeker = async (req, res) => {
  try {
    const seekerId = req.user._id;
    const { id: bookingId } = req.params;

    const booking = await bookingService.cancelBookingBySeeker(bookingId, seekerId);

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      booking
    });

  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
};

export default {
  createBooking,
  getAllBookingsAdmin,
  verifyPayment,
  rejectPayment,
  getProviderBookings,
  getMyBookings,
  sendCompletionOTP,
  verifyCompletionOTP,
  cancelBookingByProvider,
  cancelBookingBySeeker
};