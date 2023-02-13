const express = require("express");
const{newStudent,getAllStudents, deleteStudents,confirmVerified,studentLogin,AllStudentsperClass} = require("../Controllers/addStudent");

const Route = express.Router();

// Route For  Student 
Route.route("/student/login").post(studentLogin);
Route.route("/verifyStudent/:studentid").post(confirmVerified);

// Route For Students with Admin authorization
Route.route("/admin/:userId/:classId").post(roleAuth, newStudent);
Route.route("/admin/allStudent/:userId").get(roleAuth, getAllStudents);
Route.route("/admin/allStudentsPerClass/:userId").get(roleAuth, AllStudentsperClass);
Route.route("/admin/deleteStudent/:userId/:studentid").delete(roleAuth,deleteStudents);
