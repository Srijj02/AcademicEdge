import React, { useEffect, useState } from 'react'
import { Dialog, TextField, DialogContent, Typography, FormControl, Grid2, Button, Container } from "@mui/material"
import axios from 'axios';

function StudentApplicationForm({open,courseData,handleClose,refreshCourses}) {


    const [students, setStudents] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        dateOfBirth: "",
        enrollmentDate: "",
        address: "",
        fatherName: "",
        fatherPhone: "",
        course: ""
    });

    

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setStudents({
            ...students,
            course:courseData._id,
            [name]: value
        })
    }


    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(courseData);
        console.log(students);
        try {
            const studentData=await axios({
                method:"POST",
                url:"http://localhost:5000/api/student",
                headers:{
                    "Content-Type":"application/json"
                },
                data:students,
                withCredentials:true
            })
        }
        catch(err) {
            console.error(err);

        }
        refresh();
        handleClose();
    }

    

    const refresh = () => {
        setStudents({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            dateOfBirth: "",
            enrollmentDate: "",
            address: "",
            fatherName: "",
            fatherPhone: "",
            course: ""
        })
    }






    return (
        <div>
            <Dialog open={open} >
                <DialogContent>
                    <Typography variant="h4" sx={{ textAlign: "center", pb: "10px" }}>Student From</Typography>
                    <form onSubmit={handleSubmit} >
                        <FormControl>
                            <Grid2 container spacing={2} alignItems="center" justifyContent="center" >
                                <Grid2 container spacing={2}>
                                    <TextField label="FirstName" name='firstName' required value={students.firstName} onChange={handleOnChange} />
                                    <TextField label="LastName" name='lastName' required value={students.lastName} onChange={handleOnChange} />
                                </Grid2>
                                <Grid2 container spacing={2}>
                                    <TextField label="Phone" type='tel' name='phone' required value={students.phone} onChange={handleOnChange} />
                                    <TextField label="Email" type='email' name='email' required value={students.email} onChange={handleOnChange} />
                                </Grid2>

                                {/* <TextField label="EnrollmentDate" name='enrollmentDate' required /> */}
                                <Grid2 container spacing={2}>
                                    <TextField label="FatherName" name='fatherName' required value={students.fatherName} onChange={handleOnChange} />
                                    <TextField label="FatherPhone" name='fatherPhone' required value={students.fatherPhone} onChange={handleOnChange} />
                                </Grid2>
                                <Grid2 container spacing={2}>
                                    <Grid2  >
                                        <TextField label="Address" name='address' required multiline rows={4} sx={{ width: "222px" }} value={students.address} onChange={handleOnChange} />
                                    </Grid2>
                                    <Grid2 display="flex" flexDirection="column" gap={2} >
                                        <TextField label="EnrollmentDate" type='date' name='enrollmentDate' required InputLabelProps={{ shrink: true }} sx={{ width: "222px" }} value={students.enrollmentDate} onChange={handleOnChange} />
                                        <TextField label="DateOfBirth" type='date' name='dateOfBirth' required InputLabelProps={{ shrink: true }} sx={{ width: "222px" }} value={students.dateOfBirth} onChange={handleOnChange} />
                                    </Grid2>

                                </Grid2 >
                                {/* <Grid2 container spacing={2}>
                                    <TextField label="DateOfBirth" type='date' name='dateOfBirth' required InputLabelProps={{ shrink: true }} sx={{ width: "222px" }} />
                                    <TextField label="Course" name='course' required   value={students.course} onChange={handleOnChange} />
                                </Grid2> */}

                            </Grid2>
                        </FormControl>
                        <Container sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center", justifyContent: "end", mt: 2 }}>
                            <Button type='submit' variant="contained">Submit</Button>
                            <Button variant="contained" onClick={handleClose} >Cancel</Button>
                        </Container>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default StudentApplicationForm


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