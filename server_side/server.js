
require('dotenv').config();
const express=require('express');
const errorHandler = require('../Middlewares/errorHandlingMiddleware.js'); // Importing the error handler middleware
const authenticateUser  = require("./Middlewares/verifyToken.js");


const app = express();

app.use(errorHandler);

//health checkpoint

app.get('/health' , (req, res, next)=>{
    res.status(200).json({status:"server is setup succesfully!!!"})
    const err=new Error();
    next(err);

})
//sending 

//starting the server

app.listen(process.env.PORT, ()=>{
    console.log("server is running");
})