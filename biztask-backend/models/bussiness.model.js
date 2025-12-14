import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "users",
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
     
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    businessCategory: {
      type: String,
      required: true,
    },

    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    // Company Logo Upload
    companyLogo: {
      imageUrl: { type: String, required: false },
      publicId: { type: String, required: false },
    },

    // Address
    houseNumber: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: false,
    },
    area: {
      type: String,
      required: true,
    },
    subDistrict: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Pin Code must be 6 digits"],
    },

    // Operating Hours
    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
    },

    workingDays: {
      type: [String],
      required: true,
    },

    services: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "services",
        default: [],
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

const businessModel =
  mongoose.models.bussiness || mongoose.model("bussiness", businessSchema);

export default businessModel;
