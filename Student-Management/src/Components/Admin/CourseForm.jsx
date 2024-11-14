import { Button, Container, Dialog, DialogContent, FormControl, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

function CourseForm({courseData, open, handleClose,refreshCourses }) {

  const [course,setCourse]=useState({
    courseName:"",
    courseCode:"",
    credits:"",
    instructor:"",
    description:"",
    image:""

  })

  useEffect(()=>{
    if(courseData) {
      setCourse(courseData)
    }
    else {
      setCourse({courseName:"",
        courseCode:"",
        credits:"",
        instructor:"",
        description:"",
        image:""})
    }
    
  },[courseData])

  

  
  const handleChange=(e)=>{
    const {name,value}=e.target;

    setCourse({
      ...course,
      [name]:value
    })
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    console.log(course);

    try {
      if(course._id) {
        const courseData=await axios({
          method:"PUT",
          url:`http://localhost:5000/api/course/${course._id}`,
          headers:{
            "Content-Type":"application/json"
          },
          data:course,
          withCredentials:true
        })
        console.log("successssssssssssssss")
        console.log(courseData)
      } 
      else {
        const courseData=await axios({
          method:"POST",
          url:"http://localhost:5000/api/course",
          headers:{
            "Content-Type":"application/json"
          },
          data:course,
          withCredentials:true
        })
        console.log(courseData)
      }
      
      refreshCourses();
      handleClose();
      refresh();
    }
    catch(err) {
      console.log(err);
      // refresh();
    }

    
  }

  const refresh=()=>{
    setCourse({
      courseName:"",
      courseCode:"",
      credits:"",
      instructor:"",
      description:"",
      image:""
  
    })
  }



  return (
    <div>
      
      <Dialog open={open} onClose={handleClose} BackdropProps={{ style: {backgroundColor:"rgba(80, 80, 82, 0.8)"}}}>
        <DialogContent sx={{ bgcolor: "lightblue", p: "10px",width:{xs:"100%",sm:"80%",md:"450px",},maxWidth:"100vw" }}>
        
          <Typography variant='h4' sx={{ mb: 1, textAlign: "center" }} >Course From</Typography>
          <form onSubmit={(event)=>handleSubmit(event)}>
          <FormControl sx={{ display: "flex", flexDirection: "column", gap: "10px",width:"100%" }}>
            <TextField label="CourseName" name='courseName' value={course.courseName} required fullWidth onChange={handleChange} />
            <TextField label="CourseCode" name='courseCode' value={course.courseCode} required onChange={handleChange}/>
            <TextField label="CourseImage" name='image' value={course.image} required onChange={handleChange}/>
            <TextField label="Credits" type='number' name='credits' value={course.credits} required onChange={handleChange}/>
            <TextField label='Instructor' name='instructor' value={course.instructor} required onChange={handleChange}/>
            {/* <TextField label='Students' name='students' required/> */}
            <TextField label='Description' name='description' value={course.description} rows={3} required multiline onChange={handleChange}/>
            <Container sx={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "center", justifyContent: "end", pt: 1 }}>
              <Button type='submit' variant='contained' >Submit</Button>
              <Button variant="contained" onClick={handleClose}>Cancel</Button>
            </Container>
          </FormControl>
          </form>
        
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CourseForm



// {
//     "_id": "6721be2041040ef496e46e5f",
//     "courseName": "Web Development",
//     "courseCode": "CS100",
//     "credits": 3,
//     "instructor": "64aefb3b2a8e3f0f1b6c9a7e",
//     "students": [
//         "6721be8441040ef496e46e61",
//         "6720f2ecf006a3351a12d152"
//     ],
//     "__v": 0,
//     "description": "fdbsfvh ajknfybfjnzn md efhunfnv c c uhufbsydbfdsfdsfu sudfhsdf u",
//     "image": "https://img.freepik.com/free-vector/business-people-working-laptop-development_1262-18907.jpg?t=st=1730440354~exp=1730443954~hmac=2fd3b4d3f6e45e429272abe13908f8076204ef694af03181461396321af8b1f4&w=740"
// }