const express = require("express");
const{newAdmin, confirmVerify,adminLogin, updateProfile,adminLogOut, getAllAdmin,Forgotpassword, resetpassword, changePassword} = require("../Controllers/adminController");
const{newStudent,getAllStudents, deleteStudents,AllStudentsperClass, updateStudent} = require("../Controllers/addStudent");
const{newClass,allClass, oneClass, updateClass, deleteClass} = require("../Controllers/addClass");
const {newTeacher,getAllTeachers,AllTeachersperClass,deleteTeacher,updateTeacher} = require("../Controllers/addTeacher")
const {roleAuth} = require("../Utils/authorization");
// const Image = require("../Utils/multer");


const Route = express.Router();

// Route For Admin 
Route.route("/admin/sign").post(newAdmin); //checked
Route.route("/userVerify/:id").post(confirmVerify); //checked
Route.route("/admin/login").post(adminLogin);  //checked
Route.route("/admin/logout/:adminId").post(adminLogOut); //checked
Route.route("/admin/allAdmin").get(getAllAdmin);  //checked
Route.route("/admin/updatedProfile/:adminid").patch(updateProfile);  //checked
Route.route("/admin/forgotPassword").post(Forgotpassword); //checked
Route.route("/admin/resetPassword/:Resetid").post(resetpassword);  //checked
Route.route("/admin/changePassword/:adminId").patch(changePassword); //checked

// Route For Students with Admin authorization
Route.route("/admin/:userid/:classId").post(roleAuth, newStudent);  //checked
Route.route("/admin/allStudent/:userid").get(roleAuth,getAllStudents);  //checked
Route.route("/admin/allStudentsPerClass/:userid/:classId").get(roleAuth, AllStudentsperClass); //checked
Route.route("/student/:userid/:studentId").patch(roleAuth,updateStudent); //checked
Route.route("/admin/deleteStudent/:studentid/:classId").delete(deleteStudents); //checked

// Route For Teachers with Admin authorization
Route.route("/newTeacher/:classId").post(newTeacher); //checked
Route.route("/admin/allTeacher/:userid").get(roleAuth,getAllTeachers); //checked
Route.route("/admin/allTeachersPerClass/:userid/:classId").get(roleAuth,AllTeachersperClass); //checked
Route.route("/teacher/:userid/:teacherId").patch(roleAuth,updateTeacher); //checked
Route.route("/admin/deleteStudent/:userid/:studentid").delete(roleAuth,deleteTeacher);

// Route For Class with Admin authorization
Route.route("/admin/newClass").post(newClass);  //checked
Route.route("/admin/allClass/:userid").get(roleAuth, allClass); //checked
Route.route("/admin/oneClass/:userid/:classId").get(roleAuth, oneClass); //checked
Route.route("/admin/:userid/class/:classId").patch(roleAuth, updateClass); //checked
Route.route("/admin/deleteClass/:userid/:classId").delete(roleAuth, deleteClass); //checked


module.exports = Route