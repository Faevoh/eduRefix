const express = require("express");
const{studentLogin} = require("../Controllers/addStudent");



const Route = express.Router();

// Route For  Student 
Route.route("/student/login").post(studentLogin);  //checked


module.exports = Route