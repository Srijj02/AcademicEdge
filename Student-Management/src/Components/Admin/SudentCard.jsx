import React, { useEffect, useState } from 'react'
import { Avatar, Card, Button, Typography, Grid2 } from '@mui/material'
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import StudentForm from './StudentForm';
import AdminNav from './AdminNav';

function SudentCard() {

  const [students,setStudents]=useState([]);
  const navigate=useNavigate();
  const [openForm,setOpenForm]=useState(false);

  const handleOnClick=(id)=> {
    console.log(id);
    navigate(`/students/${id}`)
  }

  useEffect(() => {
    fetchStudentDetails();
  },[])


  const fetchStudentDetails = async () => {
    try {
      const sudentDetails = await axios({
        method: 'GET',
        url: "http://localhost:5000/api/student",
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials:true
      })
      // console.log(sudentDetails.data);
      setStudents(sudentDetails.data);
    }
    catch(err) {
      console.log(err);
    }
    
  }

  return (
    <div> 
      {/* <AdminNav/> */}
      <Button variant='contained' onClick={()=>(setOpenForm(true))} >Add new Students</Button>
      <Grid2 container spacing={4} justifyContent="center" alignItems="center">
      {
        students.map((data,index)=>(
          <Card key={data._id} sx={{ 
            backgroundSize: 'cover',backgroundPosition: 'center',  
            backgroundRepeat: 'no-repeat',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px", height: "250px", width: "250px", bgcolor: "lightblue",
            // boxShadow:"10px 10px 10px rgb(72,72,72)",
            transition: "all 0.3s ease-in-out",
            "&:hover": { boxShadow: "10px 10px 10px 0 gray", transform: "translate(5px,5px)" },
            borderRadius: "9px", p: "30px"
          }}>
            <Avatar sx={{ border: "2px solid gray", width: "100px", height: "100px" }} src={data.image}/>
            <Typography>{data.firstName+" "+data.lastName}  </Typography>
            <hr style={{ width: "200px" }} />
            <Typography sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', justifyContent: 'center' }}><EmailRoundedIcon />{data.email}</Typography>
            <Typography sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', justifyContent: 'center' }}><CallRoundedIcon />{data.phone}</Typography>
            <Button variant='contained' sx={{backgroundImage:"radial-gradient(circle at 85.4% 50.8%, rgb(14, 72, 222) 0%, rgb(3, 22, 65) 74.2%)"}} onClick={()=>handleOnClick(data._id)}>View</Button>
          </Card>
        ))
        
      }
      </Grid2>
      <StudentForm open={openForm} 
      handleClose={()=> (setOpenForm(false))} 
      refreshStudents={fetchStudentDetails} />
    </div>
  )
}

export default SudentCard

// "_id": "6720f2ecf006a3351a12d152",
//     "firstName": "John",
//     "lastName": "Doe",
//     "phone": "123-456-7890",
//     "email": "john.doe@example.com",
//     "dateOfBirth": "2000-05-15T00:00:00.000Z",
//     "enrollmentDate": "2023-08-01T00:00:00.000Z",
//     "address": "123 Main St, Springfield",
//     "fatherName": "Michael Doe",
//     "fatherPhone": "098-765-4321",
//     "course": "64b7f93f36a7c3e5bcd4812d",
//     "__v": 0
