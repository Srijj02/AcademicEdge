import { useState } from 'react'
import Login from './Components/Login'
import Registration from './Components/Registration'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import SudentCard from './Components/Admin/SudentCard'
import SudentCardDetails from './Components/Admin/SudentCardDetails'
import React from 'react'
import AdminNav from './Components/Admin/AdminNav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CourseCard from './Components/Admin/CourseCard'
import CourseCardDetails from './Components/Admin/CourseCardDetails'
import CourseForm from './Components/Admin/CourseForm'
import StudentForm from './Components/Admin/StudentForm'

import AdminStudents from './Components/Pages/Admin/AdminStudents'
import AdminCourses from './Components/Pages/Admin/AdminCourses'
import StudentCourseCards from "./Components/Student/StudentCourseCards"
import StudentCourseDetails from './Components/Student/StudentCourseDetails'
import StudentApplicationForm from './Components/Student/StudentApplicationForm'
import StudentCourses from "./Components/Pages/Student/StudentCourses"



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>

      {/* <Login/> */}
      {/* <Registration/> */}
      {/* <SudentCard/> */}
      {/* <SudentCardDetails/> */}
      {/* <AdminNav/> */}
      {/* <CourseCard/> */}
      {/* <CourseCardDetails/> */}
      {/* <CourseForm/> */}
      {/* <StudentForm/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Registration/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/admin' element={<AdminStudents/>} />
          <Route path='/admin/courses'element={<AdminCourses/>} />
          <Route path='/students' element={<SudentCard />} />
          <Route path='/students/:id' element={<SudentCardDetails />} />
          <Route path='/courses' element={<CourseCard />} />
          <Route path='/courses/:id' element={<CourseCardDetails />} />


          {/* this may change */}
          <Route path='/student/courses' element={<StudentCourseCards/>} />
          <Route path='/student/courses/:id' element={<StudentCourseDetails/>}/>

          <Route path='/student' element={<StudentCourses/>}/>

        </Routes>
      </BrowserRouter>

      
      {/* <StudentCourseCards/> */}
      {/* <StudentApplicationForm/> */}



    </>
  )
}

export default App
