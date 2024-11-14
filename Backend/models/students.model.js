const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    phone:{
        type:String
    },
    image:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    dateOfBirth:{
        type:Date
    },
    enrollmentDate:{
        type:Date,
        default:Date.now
    },
    address:{
        type:String
    },
    fatherName:{
        type:String
    },
    fatherPhone:{
        type:String
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }
})

const Student=mongoose.model('Student',studentSchema);

module.exports=Student;