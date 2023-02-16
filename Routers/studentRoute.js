const express = require("express");
const{newStudent,getAllStudents, deleteStudents,confirmVerified,studentLogin,AllStudentsperClass} = require("../Controllers/addStudent");
const {roleAuth} = require("../Utils/authorization");


const Route = express.Router();

// Route For  Student 
Route.route("/student/login").post(studentLogin);


module.exports = Route