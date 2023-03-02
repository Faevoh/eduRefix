const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    attendance: {
        type: Schema.Types.ObjectId,
        ref: "teacherAttendance"
    },
    isTeacher: {
        type: Boolean,
        default: true
    },
    subjectToTeach:{
        type:String
    },
    teacherclass:{
        type: Schema.Types.ObjectId,
        ref: "addClass"
    },
    timetable:{
        type: Schema.Types.ObjectId,
        ref: "TeachertimeTable"
        // public_id: {
        //     type: String,
        // },
        // url:{ 
        //     type: String,
        // }
    },
    token: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

const AddTeacher = mongoose.model("addTeacher", addTeacher)

module.exports = AddTeacher