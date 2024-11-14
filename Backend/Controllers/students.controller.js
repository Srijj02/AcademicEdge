const Student=require('../models/students.model');

exports.createStudent=async (req,res)=>{
    try{
        // console.log("hello")
        const student= await Student.create(req.body);
        // console.log("hello1")
        res.status(201).json(student)
    }
    catch(err) {
        console.log(err);
        res.status(400).json({message: err.message});
    }
}


exports.getStudents=async (req,res)=> {
    try{
        const students=await Student.find({});
        res.status(200).json(students);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
}


exports.getStudentById=async (req,res)=> {
    try {
        const {id}=req.params
        const student= await Student.findById(id);
        if(!student) {
            return res.status(404).json({message: "Student not found"})
        }
        res.status(200).json(student);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: err.messege})
    }
}


exports.updateStudent=async (req,res)=> {
    try {
        const {id}=req.params
        const updatedStudent=await Student.updateOne({_id:id},req.body);
        if(updatedStudent.modifiedCount===0) {
            return res.status(404).json({message:"student not found"})
        }
        res.status(200).json(updatedStudent);
    }
    catch(err) {
        console.log(err);
        res.status(400).json({message:err.message});
    }
}


exports.deleteStudent=async (req,res)=> {
    try {
        const {id}=req.params;
        const deletedSudent=await  Student.deleteOne({_id:id});
        if(deletedSudent.deletedCount==0) {
            return res.status(404).json({message:"student not found"})
        }
        res.status(200).json({message:"deleted successfully"})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
}