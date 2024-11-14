import { Container, Dialog, DialogContent, FormControl, Grid2, TextField, Button, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function StudentForm({ open, handleClose, refreshStudents, studentsData }) {

    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        dateOfBirth: "",
        enrollmentDate: "",
        address: "",
        fatherName: "",
        fatherPhone: "",
        course: "",
        image:""
    })
    // const[formOpen,setFormOpen]=useState(false);


    useEffect(() => {
        if (studentsData) {
            console.log("hiiiiiiiiiiii")
            setStudent({
                ...studentsData,
                enrollmentDate: studentsData.enrollmentDate ? studentsData.enrollmentDate.split("T")[0] : "",
                dateOfBirth: studentsData.dateOfBirth ? studentsData.dateOfBirth.split("T")[0] : ""
            })
        }
        else {
            setStudent({
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                dateOfBirth: "",
                enrollmentDate: "",
                address: "",
                fatherName: "",
                fatherPhone: "",
                course: "",
                image:"",
            })
        }
    }, [studentsData])

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setStudent({
            ...student,
            [name]: value
        })
    }


    const refresh = () => {
        setStudent({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            dateOfBirth: "",
            enrollmentDate: "",
            address: "",
            fatherName: "",
            fatherPhone: "",
            course: "",
            image:""
        })
    }



    const handleOnSubmit = async (event) => {
        event.preventDefault();
        console.log('hello')
        console.log(student)
        try {
            if (student._id) {
                const studentData = await axios({
                    method: "PUT",
                    url: `http://localhost:5000/api/student/${student._id}`,
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: student,
                    withCredentials:true
                })

                console.log(studentData)
            }
            else {
                const studentData = await axios({
                    method: "POST",
                    url: "http://localhost:5000/api/student",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: student,
                    withCredentials:true
                })

                console.log(studentData)
            }

            refreshStudents();
            handleClose();
            refresh();
        }
        catch (err) {
            console.log(err);
        }



    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} >
                <DialogContent>
                    <Typography variant="h4" sx={{ textAlign: "center", pb: "10px" }}>Student From</Typography>
                    <form onSubmit={(event) => handleOnSubmit(event)}>
                        <FormControl>
                            <Grid2 container spacing={2} alignItems="center" justifyContent="center" >
                                <Grid2 container spacing={2}>
                                    <TextField label="FirstName" name='firstName' required value={student.firstName} onChange={handleOnChange} />
                                    <TextField label="LastName" name='lastName' required value={student.lastName} onChange={handleOnChange} />
                                </Grid2>
                                <Grid2 container spacing={2}>
                                    <TextField label="Phone" type='tel' name='phone' required value={student.phone} onChange={handleOnChange} />
                                    <TextField label="Email" type='email' name='email' required value={student.email} onChange={handleOnChange} />
                                </Grid2>

                                {/* <TextField label="EnrollmentDate" name='enrollmentDate' required /> */}
                                <Grid2 container spacing={2}>
                                    <TextField label="FatherName" name='fatherName' required value={student.fatherName} onChange={handleOnChange} />
                                    <Grid2>
                                    <TextField label="FatherPhone" name='fatherPhone' required value={student.fatherPhone} onChange={handleOnChange} />
                                    <TextField label="image" name='image' value={student.image} onChange={handleOnChange}/>
                                    </Grid2>
                                </Grid2>
                                <Grid2 container spacing={2}>
                                    <TextField label="Address" name='address' required multiline rows={3} sx={{ width: "222px" }} value={student.address} onChange={handleOnChange} />
                                    <TextField label="EnrollmentDate" type='date' name='enrollmentDate' required InputLabelProps={{ shrink: true }} sx={{ width: "222px" }} value={student.enrollmentDate} onChange={handleOnChange} />
                                </Grid2 >
                                <Grid2 container spacing={2}>
                                    <TextField label="DateOfBirth" type='date' name='dateOfBirth' required InputLabelProps={{ shrink: true }} sx={{ width: "222px" }} value={student.dateOfBirth} onChange={handleOnChange} />
                                    <TextField label="Course" name='course' required value={student.course} onChange={handleOnChange} />
                                </Grid2>

                            </Grid2>
                        </FormControl>
                        <Container sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center", justifyContent: "end", mt: 2 }}>
                            <Button type='submit' variant="contained" >Submit</Button>
                            <Button variant="contained" onClick={handleClose}>Cancel</Button>
                        </Container>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default StudentForm


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

