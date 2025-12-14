import mongoose from "mongoose";

const userApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.ObjectId,
        ref: "jobsDetails",
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    availability: [{
        type: String
    }],
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    hasTools: {
        type: Boolean,
        default: false
    },
    profileImage: {
        imageUrl: {
            type: String,
            default: ""
        },
        publicId: {
            type: String,
            default: ""
        }
    },
     status: {
    type: String,
    enum: ["Pending", "Shortlisted", "Rejected", "Interview Scheduled", "Hired"],
    default: "Pending"
  },
  adminMessage: {
  type: String,
  default: ""
},
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { minimize: false });

const userApplicationModel = mongoose.model.userApplications || mongoose.model("userApplications", userApplicationSchema);

export default userApplicationModel;
