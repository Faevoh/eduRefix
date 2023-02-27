const express = require("express");
const {roleAuth} = require("../Utils/authorization");
const {teacherLogin,Forgotpassword,resetpassword,changePassword,teacherLogOut} = require("../Controllers/addTeacher");
const { addImage } = require("../Controllers/teacherTimeTable");



const Route = express.Router();
Route.route("/teacher/login").post(teacherLogin); //checked
Route.route("/teacher/forgotPassword").post(Forgotpassword); //checked
Route.route("/teacher/resetPassword/:teacherId").post(resetpassword); //checked
Route.route("/teacherNewPassword/:teacherId").patch(changePassword); //checked
Route.route("/teacher/logout/:teacherId").post(teacherLogOut); //checked
// Route.route("/teacher/timetable/:teacherId").post(addImage)


module.exports = Route