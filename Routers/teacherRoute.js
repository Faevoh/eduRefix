const express = require("express");
const {roleAuth} = require("../Utils/authorization");
const {teacherLogin,Forgotpassword,resetpassword,changePassword,teacherLogOut} = require("../Controllers/addTeacher");



const Route = express.Router();
Route.route("/teacher/login").post(teacherLogin); //checked
// Route.route("/teacher/forgotPassword").post(Forgotpassword);
// Route.route("/teacher/resetPassword/teacherId").post(resetpassword);
// Route.route("/teacher/changePassword/:teacherId").patch(changePassword);
Route.route("/teacher/logout/:teacherId").post(teacherLogOut); //checked


module.exports = Route