const express= require('express');
const { register, login, logOut } = require("../Controllers/Authentication.controller")
const router=express.Router();
const {roleBasedAthorization}=require('../Middlware/RoleAuthorization.middleware')

// router.get('./register',register)
// router.post('/login',login)



router.post('/register',register);
router.post('/login',login);
router.get('/logout',logOut)

module.exports=router; 

