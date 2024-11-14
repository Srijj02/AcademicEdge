const express = require('express');
const {getCourse,getCourseById,updateCourse,deleteCourse,createCourse} = require('../Controllers/courses.controller')
const {authenicationMiddleware}= require('../Middlware/Authentication.middlware')
const {roleBasedAthorization} = require('../Middlware/RoleAuthorization.middleware')

const router = express.Router();

router.use(authenicationMiddleware);

router.get('/',getCourse);

router.get('/:id',getCourseById);

router.post('/',roleBasedAthorization('admin'),createCourse);

router.put('/:id',roleBasedAthorization('admin'),updateCourse);

router.delete('/:id',roleBasedAthorization('admin'),deleteCourse);


module.exports = router;

