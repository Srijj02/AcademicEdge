const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    courseCode:{
        type:String,
        required:true
    },
    credits:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    instructor:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:'Instructor'
        type:String
    },
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }]
})

const Course=mongoose.model('Course',courseSchema);

module.exports=Course