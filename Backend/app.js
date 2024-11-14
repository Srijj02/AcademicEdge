const express= require('express');
const dotenv= require('dotenv');
const connectDB=require('./config/db.js')
const bodyParser =require('body-parser');
const cors=require('cors');
const cookieParser =require('cookie-parser')

dotenv.config();
connectDB();

const app=express();


const corsOptions={
    origin:"http://localhost:5173",
    credentials:true,
    optionsSuccessStatus:200,
    methods:['GET','POST','PUT','DELETE']
}

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/student",require('./Router/studentRouter.js'))
app.use("/api/course",require('./Router/courseRouter.js'))
app.use("/api/auth",require('./Router/authenticationRouter.js'))




module.exports = app;