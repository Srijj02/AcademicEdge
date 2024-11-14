const express = require('express');
const { createStudent, updateStudent, deleteStudent, getStudents, getStudentById } = require('../Controllers/students.controller');
const {authenicationMiddleware} = require("../Middlware/Authentication.middlware")
const {roleBasedAthorization} = require("../Middlware/RoleAuthorization.middleware")

const router = express.Router();

router.use(authenicationMiddleware)
router.get("/:id",getStudentById);

router.get("/", getStudents);

router.post("/",createStudent);

router.put("/:id",roleBasedAthorization('admin'),updateStudent);

router.delete("/:id",roleBasedAthorization('admin'),deleteStudent);


module.exports=router;