const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Jobs = require('../models/jobs.js'); 
const authenticate = require('../Middlewares/verifyToken.js'); // Import your authentication middleware


//api to create a job post

const jobPostRoute=router.post('/job-form', async(req, res, next) => {

    const{companyName,logoUrl, position, salary, jobType ,jobPlace, location, description, skills, about, additionalInfo}=req.body;

    const recruiterName = req.user ? req.user.name : 'Unknown'; // Check if req.user exists before accessing its properties



   let skillsArray = skills //here we are putting the skills that we fetched above from req.body inside skillsArray to seperate out from commas

   if (typeof skillsArray === 'string') {
    skillsArray = skillsArray.split(',').map(skill => skill.trim());
}


   const newJob = new Jobs({
    recruiterName, companyName,logoUrl, position, salary, jobType ,jobPlace, location, description, about, skillsRequired: skillsArray, additionalInfo

   })
 
   try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
} catch (err) {
    console.error('Error occurred while processing job-form:', err);
   return  res.status(500).json({ message: `you have not logged in ${err.message }`});
}

})

//api to update the filed in existing job post

const editJobPostRoute=router.put('/edit-job-posts/:id', async(req, res, next) => {

    const jobId = req.params.id;
    const updatedField=req.body; //as req.body is containing all the field tat job-post has and can be updated

    try{
        const updateJob= await Jobs.findByIdAndUpdate( jobId,
                                                      {$set: updatedField}, 
                                                      {new:true}
                                                    );

                //if job with id is not found
                if(!updateJob){
                    return res.status(404).json({message: 'Job not found'});
                }   
                //else return success message
                return res.status(200).json({message: 'Job updated successfully'})                                     
    } catch(err) {
        console.log(err);
        return res.status(500).json({message:'error in updating the job'})
    }

})


//api to get all the job post using the skills filter user has listed

//for testing->http://localhost:3000/allJobs-bySkillsAndTitle?skills=JavaScript,React&position=developer



// The & symbol is used in URLs to separate multiple query parameters. In a URL, query parameters are typically appended to the URL using ? to start the query string, and subsequent parameters are separated by &.

const allJobBySkills=router.get('/allJobs-bySkillsAndTitle', async(req, res, next) => {
    try{

    const skills= req.query.skills;
    const title=req.query.position
    //or we can write as-> " const {skills}=req.query ";

    if(!skills && !title)
    {
        return res.send(400).json({message: 'No skills and Title'});
    }
    
    let jobPosts = [];
    if (skills || title) {

    const skillsArray = skills.split(',').map(skill=>skill.trim())
    
     jobPosts = await Jobs.find({
        $or: [
          { skillsRequired: { $in: skillsArray } },
          { position: { $regex: title, $options: 'i' } }, // Case-insensitive regex search for title
        ],
      }).sort({ createdAt: -1 });
    
    
  
    // If there are no jobs matching the skills array, attempt to find jobs for individual skills
    //ie,
    
// If you want to retrieve jobs that match at least one of the provided skills and ignore skills that 
// do not have any matches in the database, you can modify the query logic to handle such scenarios.
if (jobPosts.length === 0) {
    const individualJobPosts = [];
    for (let i = 0; i < skillsArray.length; i++) {
      const jobsForSkill = await Jobs.find({ skillsRequired: skillsArray[i] }).sort({ createdAt: -1 });
      if (jobsForSkill.length > 0) {
        individualJobPosts.push(...jobsForSkill);
      }
    }

    res.status(200).json({ jobPosts: individualJobPosts });
  } else {
    res.status(200).json({ jobPosts });
  }
} }catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Error fetching jobs by skills' });
}
});



// Route to get the detailed description of a job post by ID
const viewDetails=router.get('/job-details/:id', async (req, res) => {
    try {
        const jobId = req.params.id;

        // Fetch the job post details by ID from the database
        const job = await Jobs.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // If the job is found, send its detailed description in the response
        res.status(200).json({ description: job.description, logo:job.logoUrl, location:job.location, position:job.position, about:job.about, companyName:job.companyName, salary:job.salary, jobType: job.jobType, jobPlace: job.jobPlace, skills:job.skillsRequired, date:job.createdAt, addInfo: job.additionalInfo }); // Assuming description is a field in your Job model
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching job details' });
    }
});
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URL; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectDB();

const jobinfo=router.get('/job-info', async (req, res) => {
  try {
    const db = client.db('demo'); // Replace with your database name
    const collection = db.collection('jobs'); // Replace with your collection name

    // Fetch all job documents from the collection
    const jobs = await collection.find({}).toArray();

    res.json({ jobPosts: jobs }); // Return the array of job objects
  } catch (err) {
    console.error('Error fetching job info:', err);
    res.status(500).json({ error: 'Error fetching job info' });
  }
});

module.exports = {
  jobPostRoute: jobPostRoute,
  editJobPostRoute: editJobPostRoute,
  allJobBySkills: allJobBySkills,
  viewDetails: viewDetails,
  jobinfo: jobinfo
};
