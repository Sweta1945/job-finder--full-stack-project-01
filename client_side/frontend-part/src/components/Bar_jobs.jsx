import React from 'react';
import { Link } from 'react-router-dom';



function Bar_jobs({jobList}) {
  return (
    <div>

<Link to='/jobForm'> <button>edit </button></Link>
  <Link to ='/jobDetail'><button>details </button></Link>  
   {/* <div>
      <h2>Jobs</h2>
      <ul>
        console.log(jobList.jobposts);
        {jobList.jobposts.map((job) => (
          <li key={index}>
            <h3>{job.companyName}</h3>
            <p>Position: {job.position}</p>
            <p>Location: {job.location}</p>
            
          </li>
        ))}
      </ul>
        </div> */}

    </div> 
  )
}

export default Bar_jobs