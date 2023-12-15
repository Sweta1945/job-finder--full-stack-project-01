
require('dotenv').config();
const express=require('express');
const app=express();


//health checkpoint

app.get('/health' , (req, res)=>{
    res.status(200).json({status:"server is setup succesfully!!!"})

})


//starting the server

app.listen(process.env.PORT, ()=>{
    console.log("server is running");
})