const express = require("express");
const{studentLogin, confirmVerified} = require("../Controllers/addStudent");

const Route = express.Router();

Route.route("/student/login").post(studentLogin);
Route.route("/verifyStudent/:studentid").post(confirmVerified);

