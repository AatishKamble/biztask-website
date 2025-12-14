import bookingModel from "../models/booking.modal.js";

const createBooking = async (userId, reqData) => {
  try {
    const booking = new bookingModel({
      service: reqData.serviceId,
      provider: reqData.providerId,
      seeker: userId,

      seekerName: reqData.seekerName,
      seekerPhone: reqData.seekerPhone,
      seekerEmail: reqData.seekerEmail,
      seekerAddress: reqData.seekerAddress,

      transactionId: reqData.transactionId,
      packageSelected:reqData.price.toString(),
      paymentStatus: "PENDING",
      bookingStatus: "REQUESTED"
    });

    const newBooking = await booking.save();

    return newBooking;

  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllBookingsAdmin = async () => {
  try {
    const bookings = await bookingModel
      .find()
      .populate("service")
      .populate("provider")
      .populate("seeker")
      .sort({ createdAt: -1 });

    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
};

//verify
const verifyBooking = async (bookingId) => {
  try {
    const booking = await bookingModel.findByIdAndUpdate(
      bookingId,
      { paymentStatus: "VERIFIED", bookingStatus: "CONFIRMED" },
      { new: true }
    ).populate("service provider seeker");

   
    return booking;
  } catch (error) {
    throw new Error(error.message);
  }
};

const rejectBooking = async (bookingId) => {
  try {
    const booking = await bookingModel.findByIdAndUpdate(
      bookingId,
      { paymentStatus: "FAILED", bookingStatus: "REJECTED" },
      { new: true }
    ).populate("service provider seeker");

    return booking;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getBookingsBySeeker = async (seekerId) => {
  return await bookingModel
    .find({ seeker: seekerId })
    .populate("service")
    .populate("provider")
    .sort({ createdAt: -1 });
};

const getBookingsByProvider = async (providerId) => {
 
  return await bookingModel
    .find({ provider: providerId })
    .populate("service")
    .populate("seeker")
    .sort({ createdAt: -1 });
};


const generateCompletionOTP = async (bookingId) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const booking = await bookingModel.findByIdAndUpdate(
    bookingId,
    {
      completionOTP: otp,
      otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000) 
    },
    { new: true }
  )
  .populate("provider")
  .populate("seeker")
  .populate("service");

  return booking;
};

const verifyCompletionOTP = async (bookingId, otp) => {
  const booking = await bookingModel.findById(bookingId).populate("service")
    .populate("provider").populate("seeker");;

  if (!booking) throw new Error("Booking not found");

  if (
    booking.completionOTP !== otp ||
    booking.otpExpiresAt < new Date()
  ) {
    throw new Error("Invalid or Expired OTP");
  }

  booking.bookingStatus = "COMPLETED";
  booking.completionOTP = null;
  booking.otpExpiresAt = null;

  await booking.save();
  return booking;
};



const cancelBookingByProvider = async (bookingId, providerId) => {
  const booking = await bookingModel.findById(bookingId).populate("service")
    .populate("provider").populate("seeker");;

  if (!booking) throw new Error("Booking not found");

  
  if (booking.provider._id.toString() !== providerId.toString()) {
    throw new Error("Unauthorized provider");
  }

 
  if (booking.bookingStatus === "COMPLETED") {
    throw new Error("Completed bookings cannot be cancelled");
  }

  
  booking.bookingStatus = "CANCELLED_BY_PROVIDER";
  booking.paymentStatus = "REFUNDED";

  await booking.save();
  return booking;
};

const cancelBookingBySeeker = async (bookingId, seekerId) => {
 
  const booking = await bookingModel.findById(bookingId).populate("service")
    .populate("provider").populate("seeker");
  
  if (!booking) throw new Error("Booking not found");

  
  if (booking.seeker._id.toString() !== seekerId.toString()) {
    throw new Error("Unauthorized seeker");
  }

 
  if (booking.bookingStatus === "COMPLETED") {
    throw new Error("Completed bookings cannot be cancelled");
  }

    if (booking.bookingStatus === "CONFIRMED") {
    throw new Error("Confirmed bookings cannot be cancelled");
  }
  
  booking.bookingStatus = "CANCELLED";
   booking.paymentStatus = "REFUNDED";

  await booking.save();
  return booking;
};

export default {
  createBooking,
  getAllBookingsAdmin,
  verifyBooking,
  rejectBooking,
  getBookingsBySeeker
  ,getBookingsByProvider,
  generateCompletionOTP,
  verifyCompletionOTP,
  cancelBookingByProvider,
  cancelBookingBySeeker
};