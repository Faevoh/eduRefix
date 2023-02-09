const mongoose = require("mongoose");

const addTeacher = new mongoose.Schema({
    teacherName: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    image: {
        type: String
    },
    homeAddress: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    joiningDate: {
        type: String
    },
    educationLevel: {
        type: String
    },
    DOB: {
        type: String
    },
    experience: {
        type: String
    },
    salary: {
        type: String
    },
    isTeacher: {
        type: Boolean,
        default: true
    },
    token: {
        type: String
    },
    isVerified: {
        type: String,
        default: false
    }
},{
    timestamps: true
});

const AddTeacher = mongoose.model("addTeacher", addTeacher)

module.exports = AddTeacher