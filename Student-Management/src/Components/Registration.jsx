import { Button, Select, FormControl, Card, InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Registration() {


    const [role, setRole] = useState("")
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        role: role
    })
    const navigate = useNavigate();

    // const onRoleChange=(e)=> {
    //     setRole(e.target.value);
    // }


    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(userData);
        try {
            const data = await axios({
                method: "POST",
                url: "http://localhost:5000/api/auth/register",
                headers: {
                    "Content-Type": "application/json"
                },
                data: userData
            })

            console.log(data);
            navigate('/login')

        }
        catch (err) {

            // alert(err);
            if (err.response) {

                let message = "";
                Object.values(err.response.data).map((val) => {
                    if (val != "" || val != " ") {
                        message += val + "\n"
                    }

                })

                alert(message);
            }
            else {
                alert("unexpected error")
            }
            console.log(err);
        }
    }



    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw"
        }}>
            <Card sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "500px",
                width: "350px",
                gap: "20px",
                boxShadow: "10px 10px 10px rgba(56, 56, 58, 0.5)",
                borderRadius: "9px",
                bgcolor: "#b2e9dbc2"
            }}>
                <Typography variant="h4">Registration</Typography>
                <FormControl sx={{ gap: "20px" }}>
                    {/* <TextField
                        label="Name"
                        type="text"
                    // sx={{m:"20px"}}
                    /> */}
                    <TextField
                        label="Email_ID"
                        name="username"
                        type="text"
                        onChange={handleChange}
                    // sx={{m:"20px"}}
                    />
                    <TextField
                        label="Password"
                        type='password'
                        name="password"
                        onChange={handleChange}
                    // sx={{m:"20px"}}
                    />
                    <FormControl>
                        <InputLabel id="selectRole" >Role</InputLabel>
                        <Select labelId="selectRole" label="Role" value={userData.role || ""} name="role" onChange={handleChange}>
                            <MenuItem value="admin">Admin</MenuItem>

                            <MenuItem value="user">User</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Age"
                    // onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select> */}
                </FormControl>
                <Button variant='contained' type="submit" onClick={handleSubmit}>Register</Button>
                <Typography sx={{ color: "#318CE7", cursor:"pointer" }} onClick={() => { navigate('/login') }} >Have account? login </Typography>
            </Card>
        </div>
    )
}

export default Registration


// {
//     username:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:String,
//         enum:['student','admin'],
//         required:true
//     }
// }

