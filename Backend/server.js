const app=require('./app.js')


const port=process.env.PORT||5000;

app.listen(5000,()=>{
    console.log(`listening at http://localhost:${port} `)
})