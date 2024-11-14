import React, { useEffect, useState } from 'react'
import { Card, Typography, Button, Grid2, FormControl } from "@mui/material"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import CourseForm from './CourseForm';

function CourseCard() {

  const [course, setCourse] = useState([]);
  const navigate=useNavigate();
  const [openForm,setOpenForm] = useState(false)

  const handleOnClick=(id)=>{
    navigate(`/courses/${id}`);
  }

  useEffect(() => {
    fetchCourseDetails()
  }, [])

  const fetchCourseDetails = async () => {
    const courseDetails = await axios({
      method: "GET",
      url: "http://localhost:5000/api/course",
      headers: {
        "Content-Type": "appliaction/json"
      },
      withCredentials:true
    })

    console.log(courseDetails.data);
    setCourse(courseDetails.data);
  }
  // fetchCourseDetails();



  return (
    <div>
      <Button variant="contained" onClick={()=>(setOpenForm(true))}>Add new Course</Button>
      <Grid2 container spacing={4} justifyContent="center" alignItems="center">
        {
          (course)?(course.map((data, index) => (
            <Card key={data._id} sx={{ 
              
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px", height: "300px", width: "300px", bgcolor: "lightblue",
              // boxShadow:"10px 10px 10px rgb(72,72,72)",
              transition: "all 0.3s ease-in-out",
              "&:hover": { boxShadow: "10px 10px 10px 0 gray", transform: "translate(5px,5px)",border:"3px solid #002D62" },
              borderRadius: "9px",
              pb: "30px",
            }}>
              <img style={{ width: "300px", height: "230px" }} src={data.image} alt="Course Image" />
              <Typography>{data.courseName}</Typography>
              {/* <hr style={{ width: "200px" }} /> */}
              {/* <Typography sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', justifyContent: 'center' }}><EmailRoundedIcon /></Typography>
            <Typography sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', justifyContent: 'center' }}><CallRoundedIcon />{data.phone}</Typography> */}
              <Button variant='contained' sx={{backgroundImage:"radial-gradient(circle at 85.4% 50.8%, rgb(14, 72, 222) 0%, rgb(3, 22, 65) 74.2%)"}} onClick={() => handleOnClick(data._id)} >View</Button>
            </Card>
          ))):(<div>loading..........</div>)
          
        }
      </Grid2>
      {/* <Typography variant='h1' >hiiiiiiiii</Typography> */}
      <CourseForm open={openForm} handleClose={()=>(setOpenForm(false))} refreshCourses={fetchCourseDetails}/>
    </div>
  )
}

export default CourseCard



// "courseName": "Machine Learning",
// "courseCode": "CS102",
// "credits": 3,
// "description": "An introductory course on computer science fundamentals.",
// "instructor": "64aefb3b2a8e3f0f1b6c9a7e",
// "students": [
//     "6721be8441040ef496e46e61",
//     "6720f2ecf006a3351a12d152"
// ],
// "__v": 0
// }


