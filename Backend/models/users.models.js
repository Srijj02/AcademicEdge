const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');
const { isEmail } = require('validator')


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please enter the username"],
        unique:true,
        validate:[isEmail , "please enter valid email or username"]
    },
    password:{
        type:String,
        required:[true,"please enter the password"],
        minlength:[6,"minimum password length is 6"]
    },
    role:{
        type:String,
        enum:['user','admin'],
        required:[true,"please enter the role"]
    }
},{timestamps:true})


// this will work just before saving the document pre hook
userSchema.pre("save",async function(next) {
    if(!this.isModified('password')) return next();

    // const salt=await bcrypt.getSalt(); 
    this.password=await bcrypt.hash(this.password,10);
    next();
})




//  post hook it will work after saving the document
// userSchema.post('save',async function (doc,next) {

// })



userSchema.methods.comparePassword= async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
}




User=mongoose.model("User",userSchema)


module.exports=User;