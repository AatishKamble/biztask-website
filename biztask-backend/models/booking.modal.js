import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.ObjectId,
    ref: "services",
    required: true
  },

  provider: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true
  },

  seeker: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true
  },

  seekerName: {
    type: String,
    required: true
  },

  seekerPhone: {
    type: String,
    required: true
  },

  seekerEmail: {
    type: String,
    required: true
  },

  seekerAddress: {
    type: String,
    required: true
  },

  transactionId: {
    type: String,
    required: true
  },
  packageSelected: {
    type: String,
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["PENDING", "VERIFIED", "FAILED","REFUNDED"],
    default: "PENDING"
  },

  bookingStatus: {
    type: String,
    enum: ["REQUESTED", "CONFIRMED","REJECTED", "COMPLETED","CANCELLED","CANCELLED_BY_PROVIDER"],
    default: "REQUESTED"
  },

  completionOTP: { type: String },
  otpExpiresAt: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now
  }

}, { minimize: false });

const bookingModel = mongoose.models.bookings || mongoose.model("bookings", bookingSchema);

export default bookingModel;
