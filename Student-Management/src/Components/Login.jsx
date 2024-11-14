import React,{useState} from 'react'
import {Button, Card,TextField, Typography} from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() {
  const navigate= useNavigate()
  const [loginData,setLoginData]=useState({
    username:"",
    password:""
  })
  const [errors,setErrors]=useState({});


  const validation=()=> {
    if(loginData.username.trim()=="" ) {
      errors.username="please enter the username";
      alert("please enter the username");
    }
    if(loginData.password.trim()=="") {
      errors.password="please enter the password";
      alert("please enter the password");
    }
    if(loginData.username)
    return true;
  }

  const handleChange=(e)=> {
    const {value,name}=e.target;

    setLoginData({
      ...loginData,
      [name]:value
    })
  }

  const onSubmit=async (e)=> {

    if(validation() == false) {
      return ;
    }
    e.preventDefault()
    console.log(loginData);

    try {
      const response=await axios({
        method:"POST",
        url:"http://localhost:5000/api/auth/login",
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true,
        data:loginData
      })

      console.log(response);
      // const {role}=response.data.role;

      // console.log(role);
      const role=response.data.role;

      if(role=='admin') {
        navigate('/admin')
      }
      else {
        navigate('/student')
      }
    }
    catch(err) {
      alert(err.response.data.message);
      console.log(err);
    }
  }

  return (
    <div style={{display:"flex", 
    alignItems:"center", 
    justifyContent:"center",
    height:"100vh",
    width:"100vw"
    }}>
      <Card sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        height:"400px",
        width:"300px",
        gap:"2px",
        boxShadow:"10px 10px 10px rgba(56, 56, 58, 0.5)",
        borderRadius:"9px",
        bgcolor:"#b2e9dbc2",
        // backgroundImage:"url(https://img.freepik.com/free-vector/gradient-connection-background_23-2150462053.jpg?t=st=1731412277~exp=1731415877~hmac=8f1c7a7defede4707ca1269de38c8da0ae514596c5ca5a08895a6bb945838c99&w=740)",
        // backgroundRepeat:"no-repeat"
        }}>
        <Typography variant="h4" sx={{color:"lightblue"}}>Login</Typography>
        <TextField 
        className='textField'
        label="UserName" 
        type="text"
        name='username'
        onChange={handleChange}
        sx={{m:"20px"}}
        
        />
        <TextField 
        label="Password" 
        type='password'
        name='password'
        onChange={handleChange}
        sx={{m:"20px"}}
        />
        <Button type="submit" onClick={onSubmit} variant='contained'>Login</Button>
        <Typography sx={{ mt:2, color: "#318CE7", cursor:"pointer" }} onClick={() => { navigate('/') }} > Create new account </Typography>
      </Card>
    </div>
  )
}

export default Login


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