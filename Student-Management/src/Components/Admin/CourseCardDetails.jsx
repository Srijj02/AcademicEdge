import { Card, Typography, Box, Container, Button, } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CourseForm from './CourseForm'
import CourseCard from './CourseCard'
import AdminNav from './AdminNav'

function CourseCardDetails() {
  const {id}=useParams();
  const [course,setCourse]=useState({});
  const [courseToEdit,setCourseToEdit]=useState(null)
  const [formOpen,setFormOpen]=useState(false);
  const navigate=useNavigate();


  const handleEdit=()=>{
    setFormOpen(true);
  }

  const handleOnClose=()=>{
    setFormOpen(false);
  }

  const handleDelete=async (id)=>{
    try {
      await axios({
        method:"DELETE",
        url:`http://localhost:5000/api/course/${id}`,
        headers:{
          "Content-Type":"application/json",
          // Authorization:`Bearer ${token}`,
        },
        withCredentials:true
      })
      navigate("/admin/courses")
      fetchCourseDetails();
    }
    catch(err) {
      alert("failed to delete");
      navigate("/admin/courses")
      fetchCourseDetails();
    }

  }

  useEffect(()=>{
    
    fetchCourseDetails();
  },[id])


  const fetchCourseDetails= async ()=>{
    try {
      const courseDetails=await axios({
        method:"GET",
        url:`http://localhost:5000/api/course`,
        headers:{
          "Content-Type":"application/json"
          
        },
        withCredentials:true
      })
  
      console.log(courseDetails.data.find((data)=>data._id === id ))
      // console.log("hello"+courseDetails);
      setCourse(courseDetails.data.find((data)=>data._id === id ))

      
    }
    catch(err) {
      console.log(err);
    }
    
  }



  return (
    <>
    <AdminNav/>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Card sx={{backgroundImage: 'url(https://img.freepik.com/free-vector/winter-blue-pink-gradient-background-vector_53876-117275.jpg?t=st=1731558231~exp=1731561831~hmac=1ed06fb03faacf93e496b9041ab3d0f1f153a7518ee4224331dd8c92a3a9cfc6&w=740)', backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', width: "900px" ,display: 'flex', flexDirection: 'column',justifyContent: "center",alignItems:"center",p:"30px",transition: "all 0.3s ease-in-out",
            "&:hover": { boxShadow: "10px 10px 10px 0 gray", transform: "translate(5px,5px)" }  }}>
        <Typography variant='h4'>Course Details</Typography>
        <hr style={{width:'650px'}}/>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: "10px", justifyContent: "center", alignItems: "left" }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
            <Typography >Course Name:</Typography>
            <Typography>{course.courseName}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
            <Typography>Course Code:</Typography>
            <Typography>{course.courseCode}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
            <Typography>Course Credits:</Typography>
            <Typography>{course.credits}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
            <Typography whiteSpace='nowrap' >Course Description:</Typography>
            <Typography>{course.description}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
            <Typography whiteSpace='nowrap' >Course Instuctor:</Typography>
            <Typography>{course.instructor}</Typography>
          </Box>
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
            <Typography whiteSpace='nowrap' >Students:</Typography>
            <Typography>{course.students}</Typography>
          </Box> */}
        </Box>
        <Container sx={{display:"flex", flexDirection:"row", gap:2,justifyContent:"end",alignItems:"center"}}>
          <Button variant='contained' sx={{backgroundImage:"linear-gradient(to right, rgb(52, 232, 158), rgb(15, 52, 67));"}}  onClick={handleEdit}>edit</Button>
          <Button variant='contained' sx={{backgroundImage:"linear-gradient(109.6deg, rgb(247, 30, 30) 11.2%, rgb(0, 0, 0) 100.3%)"}} onClick={()=>handleDelete(course._id)} >delete</Button>
        </Container>
      </Card>
      <CourseForm open={formOpen}
      courseData={course} 
      handleClose={handleOnClose}
      refreshCourses={(()=>(navigate('/admin/courses')))} />
    </div>
    </>
  )
}

export default CourseCardDetails


// {
//     "courseName": "Machine Learning",
//     "courseCode": "CS102",
//     "image":"https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg?uid=R167907260&ga=GA1.1.75651942.1725641451&semt=ais_hybrid",
//     "credits": 3,
//     "description": "An introductory course on computer science fundamentals.",
//     "instructor": "64aefb3b2a8e3f0f1b6c9a7e",
//     "students": [
//         "6721be8441040ef496e46e61",
//         "6720f2ecf006a3351a12d152"
//     ],
//     "__v": 0
// }


