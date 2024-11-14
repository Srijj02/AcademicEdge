// const cookieParser=require('cookie-parser')
const jwt=require('jsonwebtoken');
// const express=require("express");

// const app=express();

// app.use(cookieParser());


exports.authenicationMiddleware=(req,res,next)=> {
    const token=req.cookies.token || req.header('Authorization')?.split(" ")[1];
    if(!token) return res.status(401).json({message:"access denied no token provided"});

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded;
        next()
    }
    catch(err) {
        console.log(err);
        res.status(400).json({message:"invalid token"});
    }
} 