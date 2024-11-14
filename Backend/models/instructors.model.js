const mongoose=require('mongoose')

const instructorSchema=new mongoose.Schema({
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
    email:{
        type:String,
        unique:true,
        required:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
})

const Instructor=mongoose.model('Instructor',instructorSchema)

module.exports=Instructor;