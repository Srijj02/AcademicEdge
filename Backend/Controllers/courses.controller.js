const Course = require('../models/courses.model')
const Student=require('../models/students.model')

exports.createCourse = async (req, res)=> {
    try {
        const course = await Course.create(req.body);

        // const students= await Student.find({course:course.courseCode});
        // console.log(students);
        res.status(201).json(course);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}


exports.getCourse = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}


exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findOne({ _id:id });
        if(!course) {
            return res.status(404).json({message:"Course not found"})
        }
        res.status(200).json(course);
        
    }
    catch(err) {
        res.status(500).json({message:err.message});
    }
}


exports.updateCourse=async (req,res)=> {
    try {
        const {id}=req.params;
        const updatedCourse=await Course.updateOne({_id:id},req.body);

        if(updatedCourse.modifiedCount===0) {
            return res.status(404).json({message:"Course not found"});
        }

        
        res.status(200).json(updatedCourse);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
}


exports.deleteCourse=async (req,res)=> {
    try {
        const {id}=req.params;
        const deletedCourse=await Course.deleteOne({_id:id});
        res.status(200).json(deletedCourse);
        if(deletedCourse.modifiedCount===0) {
            return res.status(404).json({message:"Course not found"});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}