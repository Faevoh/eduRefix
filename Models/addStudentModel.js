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
    offeeredSubject: [{
        type: String
    }],
    classes:{
        type: Schema.Types.ObjectId,
        ref: "addClass"
    },
    attendance:{
        type: Schema.Types.ObjectId,
        ref: "studentAttendance"
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
    }
},{
    timestamps: true
});

const AddStudent = mongoose.model("addStudent", addStudent)

module.exports = AddStudent