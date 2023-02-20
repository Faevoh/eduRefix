const express = require("express");
const{newAdmin, confirmVerify,adminLogin, updateProfile,adminLogOut, getAllAdmin,Forgotpassword, resetpassword, changePassword} = require("../Controllers/adminController");
const{newStudent,getAllStudents, deleteStudents,AllStudentsperClass} = require("../Controllers/addStudent");
const{newClass,allClass, oneClass, updateClass, deleteClass} = require("../Controllers/addClass");
const{addSubject,allSubject, oneSubject, updateSubject, deleteSubject} = require("../Controllers/addSubject");
const {roleAuth} = require("../Utils/authorization");
// const Image = require("../Utils/multer");


const Route = express.Router();

// Route For Admin 
Route.route("/admin/sign").post(newAdmin); //checked
Route.route("/userVerify/:id").post(confirmVerify); //checked
Route.route("/admin/login").post(adminLogin);  //checked
Route.route("/admin/logout/:adminId").post(adminLogOut); //checked
Route.route("/admin/allAdmin").get(getAllAdmin);  //checked
Route.route("/admin/updatedProfile/:adminid").post(updateProfile);  //checked
Route.route("/admin/forgotPassword").post(Forgotpassword); //checked
Route.route("/admin/resetPassword/:Resetid").post(resetpassword);  //checked
Route.route("/admin/changePassword").patch(changePassword);

// Route For Students with Admin authorization
Route.route("/admin/:userid/:classId").post(roleAuth, newStudent);  //checked
Route.route("/admin/allStudent/:userid").get(roleAuth, getAllStudents);
Route.route("/admin/allStudentsPerClass/:userid").get(roleAuth, AllStudentsperClass);
Route.route("/admin/deleteStudent/:userid/:studentid").delete(roleAuth,deleteStudents);

// Route For Teachers with Admin authorization
Route.route("/admin/:userId/:classId").post(roleAuth, newStudent);
Route.route("/admin/allStudent/:userId").get(roleAuth, getAllStudents);
Route.route("/admin/allStudentsPerClass/:userid").get(roleAuth, AllStudentsperClass);
Route.route("/admin/deleteStudent/:userid/:studentid").delete(roleAuth,deleteStudents);

// Route For Class with Admin authorization
Route.route("/admin/newClass/:userid").post(roleAuth,newClass);  //problems with authorization
Route.route("/admin/allClass/:userid").get(roleAuth, allClass); //checked
Route.route("/admin/oneClass/:userid/:classId").get(roleAuth, oneClass); //checked
Route.route("/admin/updateClass/:userid/:classId").patch(roleAuth, updateClass);
Route.route("/admin/deleteClass/:userid/:classId").delete(roleAuth, deleteClass);

// Route For Subjects with Admin authorization
Route.route("/admin/newSubject/:userid").post(roleAuth, addSubject);
Route.route("/admin/allSubject/:userid").get(roleAuth, allSubject);
Route.route("/admin/oneSubject/:userid/:subjectId").get(roleAuth, oneSubject);
Route.route("/admin/updateSubject/:userid/:subjectId").patch(roleAuth, updateSubject);
Route.route("/admin/deleteSubject/:userid/:subjectId").delete(roleAuth, deleteSubject);


module.exports = Route