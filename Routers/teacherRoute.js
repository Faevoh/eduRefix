const express = require("express");
const {roleAuth} = require("../Utils/authorization");
const {newTeacher} = require("../Controllers/addTeacher");



const Route = express.Router();
Route.route("/admin/teacher/:userId/:classId").post(roleAuth, newTeacher);






module.exports = Route