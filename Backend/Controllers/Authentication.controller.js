const User = require('../models/users.models');
const jwt = require('jsonwebtoken');

const cookieOptions={
    httpOnly:true,
    secure: process.env.NODE_ENV==='production',
    sameSite:"Strict",
    maxAge: 60*60*5000,
}


const handleErrors=(err)=> {

    const error={username:"", password:"",role:""}
    

    if(err.errors) {
        Object.values(err.errors).map(({properties})=> {
            error[properties.path]=properties.message;
        })
    }
    

    // checking the unique value
    if(err.code==11000) {
        error.username="this username or email is already present"
        return error;
    }


    console.log("this is cosstomized error object" + JSON.stringify(error))

    return error;
}


exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const data = await User.create({
            username, password, role
        })
        console.log(data);
        res.status(201).json({message:"user successfully registered"})
    }
    catch(err) {

        console.log(err);
        const errors=handleErrors(err);
        
        res.status(400).json(errors)
    }

}

exports.login = async (req,res)=> {
    try {
        const {username, password}=req.body;
        const user=await User.findOne({username});
        if((!user) || (! await user.comparePassword(password))) {
            return res.status(401).json({message:"invalid credentials"})
        }

        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'5h'})

        console.log(token);
        console.log(user);

        res.cookie("token",token,cookieOptions)
        res.status(200).json({message:"successfully logged in",
            role:user.role
        })
    }

    catch(err) {
        console.log(err);
        res.status(500).json({message:err.message})
    }
}


exports.logOut=(req,res)=> {
    try {

        // console.log("hello"+JSON.stringify(req))
        console.log("pressed logout");
    res.cookie("token","",{...cookieOptions , maxAge:0});
    return res.status(200).json({ message: "Successfully logged out" });
    }
    catch(err) {
        console.log(err);
    }
    
    // console.log("hello");
    // res.redirect("/login");
}
