import { Card, Typography, Box, Avatar, Button, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from './StudentForm';
import AdminNav from './AdminNav';


function SudentCardDetails() {
    const { id } = useParams();
    const [student, setStudent] = useState({});
    const [course, setCourse] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        fetchDetails();
    }, [id]);

    const handleEdit = () => {
        setOpenForm(true);
    }

    const handleDelete = async (id) => {
        try {
            await axios({
                method: "DELETE",
                url: `http://localhost:5000/api/student/${id}`,
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials:true
            })
            navigate("/admin");
            fetchDetails();
        }
        catch (err) {
            console.log(err);
            navigate("/admin");
            fetchDetails();
        }
    }

    const handleClose = () => {
        setOpenForm(false);
    }


    const fetchDetails = async () => {
        try {
            const studentResponse = await axios({
                method: "GET",
                url: `http://localhost:5000/api/student/`,
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials:true
            })

            console.log(studentResponse)

            console.log(studentResponse.data.find((s) => s._id == id));
            setStudent(studentResponse.data.find((s) => s._id == id))
            // console.log(response.data[0])

            // if(response.ok) {
            // const data=await response.json();

            // console.log(data)
            // }

            // 6721be2041040ef496e46e5f
            // setStudent(studentResponse.data[0]);
            // console.log(studentResponse.data[0]);

            const studentdata = studentResponse.data.find((s) => s._id == id);

            console.log(studentdata);

            const courseResponse = await axios({
                method: "GET",
                url: `http://localhost:5000/api/course/${studentdata?.course}`,
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials:true
            })

            console.log(courseResponse.data);
            console.log(courseResponse.data.courseName)
            setCourse(courseResponse.data.courseName);


        }
        catch (err) {
            console.error(err);
        }

    }


    return (
        <>
        <AdminNav/>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Card sx={{backgroundImage: 'url(https://img.freepik.com/free-vector/winter-blue-pink-gradient-background-vector_53876-117275.jpg?t=st=1731558231~exp=1731561831~hmac=1ed06fb03faacf93e496b9041ab3d0f1f153a7518ee4224331dd8c92a3a9cfc6&w=740)', backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px", height: "500px", width: "500px", bgcolor: "lightblue",
                // boxShadow:"10px 10px 10px rgb(72,72,72)",
                transition: "all 0.3s ease-in-out",
                "&:hover": { boxShadow: "10px 10px 10px 0 gray", transform: "translate(5px,5px)" },
                borderRadius: "9px", p: "30px"
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
                    <Avatar sx={{ height: "150px", width: "150px", border: "2px solid gray" }}></Avatar>
                    <hr style={{ width: '400px' }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center", gap: "40px" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', gap: "10px" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
                            <Typography>firstname:</Typography>
                            <Typography>{student.firstName} </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
                            <Typography>lastname:</Typography>
                            <Typography>{student.lastName} </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
                            <Typography>email:</Typography>
                            <Typography>{student.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
                            <Typography>phone:</Typography>
                            <Typography>{student.phone}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
                            <Typography>DateOfBirth:</Typography>
                            <Typography>{student.dateOfBirth?.split('T')[0] || 'N/A'}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', gap: "10px" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
                            <Typography>fatherName:</Typography>
                            <Typography>{student.fatherName}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
                            <Typography>fatherPhone:</Typography>
                            <Typography>{student.fatherPhone}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
                            <Typography>course:</Typography>
                            <Typography>{course}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
                            <Typography>enrollmentDate:</Typography>
                            <Typography>{student.enrollmentDate?.split('T')[0] || "N/A"}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: "10px" }}>
                            <Typography>address:</Typography>
                            <Typography>{student.address}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Container sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "end", gap: "20px", mt: "40px" }}>
                    <Button variant="contained" sx={{backgroundImage:"linear-gradient(to right, rgb(52, 232, 158), rgb(15, 52, 67));"}} onClick={handleEdit} >edit</Button>
                    <Button variant="contained" sx={{backgroundImage:"linear-gradient(109.6deg, rgb(247, 30, 30) 11.2%, rgb(0, 0, 0) 100.3%)"}} onClick={()=>handleDelete(student._id)}>delete</Button>
                </Container>
            </Card>
            <StudentForm open={openForm}
                studentsData={student}
                handleClose={handleClose}
                refreshStudents={() => navigate('/admin')} />
        </div>
        </>
    )
}

export default SudentCardDetails


// "_id": "6720f2ecf006a3351a12d152",
//     "firstName": "John",
//     "lastName": "Doe",dateOfBirth
//     "phone": "123-456-7890",
//     "email": "john.doe@example.com",
//     "": "2000-05-15T00:00:00.000Z",
//     "enrollmentDate": "2023-08-01T00:00:00.000Z",
//     "address": "123 Main St, Springfield",
//     "fatherName": "Michael Doe",
//     "fatherPhone": "098-765-4321",
//     "course": "64b7f93f36a7c3e5bcd4812d",
//     "__v": 0