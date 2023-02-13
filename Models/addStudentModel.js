const mongoose = require("mongoose");
const Schema = mongoose.Schema

const addStudent = new mongoose.Schema({
    studentName: {
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
    regNumber: {
        type: String
    },
    nameOfClass: {
        type: String
    },
    admissionYear: {
        type: String
    },
    guardianPhoneNumber: {
        type: String
    },
    DOB: {
        type: String
    },
    classes:{
        type: Schema.Types.ObjectId,
        ref: "addClass"
    },
    isStudent: {
        type: Boolean,
        default: true
    },
    token: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    cloudId: {
        type: String
    }
},{
    timestamps: true
});

const AddStudent = mongoose.model("addStudent", addStudent)

module.exports = AddStudent