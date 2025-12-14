import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        default: ""

    },
    email: {

        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: String,
        default: "0000000000"
    },
    district: {
        type: String,
        default: ""
    },

    subDistrict: {
        type: String,
        default: ""
    },
    village: {
        type: String,
        default: ""
    },
    area: {
        type: String,
        default: ""
    },
    pinCode: {
        type: String,
        default: ""
    },
    houseNumber: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        ImageUrl: {
            type: String,
            default: ""
        },
        publicId: {
            type: String,
            default: ""
        }
    },
    appliedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jobsDetails',
            default: []
        }
    ],
    businesses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bussiness',
            default: []
        }
    ],
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },

}, { minimize: false });


const userModel = mongoose.models.users || mongoose.model('users', userSchema);

export default userModel;