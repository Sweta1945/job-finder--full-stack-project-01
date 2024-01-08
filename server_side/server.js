
require('dotenv').config();
const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {registerRoute, loginRoute} = require("./Routes/authRoute.js");
// const loginRoute = require("./routes/authRoute.js");
const { ConnectionToDB } = require("./db.js");
const {
    jobPostRoute,
    editJobPostRoute,
    allJobBySkills,
    viewDetails,
    jobinfo
  } = require("./Routes/jobpostRoute.js");
  // const editJobPostRoute=require("./routes/jobpostRoute.js");
// const allJobBySkills=require("./routes/jobpostRoute.js");
// const viewDetails=require("./routes/jobpostRoute.js");
// const jobinfo=require("./routes/jobpostRoute.js");






const app = express();



// Using body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//using cors
app.use(cors());


//health checkpoint

app.get('/api/health' , (req, res, next)=>{
    res.status(200).send({message : "Ok",status:"server is setup succesfully!!!"})

})
//using routers- resgitration, login and others

app.use('/api', registerRoute)//->it has to be tested as /api/signup
app.use('/api', loginRoute)//-> /api/login
app.use('/job', jobPostRoute)//->api to post the job
app.use('/job', editJobPostRoute)//->api to edit the current job post
app.use('/job', allJobBySkills) //->api to filter all job by skills
app.use('/job', viewDetails) //->api to view details of job by id
app.use('/job', jobinfo)//-api to get all job info



//starting the server
app.listen(process.env.PORT, () => {
    ConnectionToDB();
    console.log(`server is running on port ${process.env.PORT}`);
});
