import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import  "../styles/JobForm.css"
import formImg from '../assets/jobFormImg.png'


function EditJob() {
  const navigate = useNavigate();
  const { jobId } = useParams(); 
  const [formData, setFormData] = useState({
    companyName: '',
    logoUrl: '',
    position: '',
    salary: '',
    jobType: '',
    jobPlace: '',
    location: '',
    description: '',
    about: '',
    skills: '',
    information: ''
  });

  // Fetch job details based on jobId when component mounts
  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch(`https://backend-server-1yct.onrender.com/job/job-info`);
        if (response.ok) {
          const data = await response.json();
          const jobPost = data.jobPosts.find(post => post._id === jobId); // Find the specific job post by ID

         console.log(jobPost);
          setFormData({
            companyName: jobPost.companyName,
            logoUrl: jobPost.logoUrl,
            position: jobPost.position,
            salary: jobPost.salary,
            jobType: jobPost.jobType,
            jobPlace: jobPost.jobPlace,
            location: jobPost.location,
            description: jobPost.description,
            about: jobPost.about,
            skills: jobPost.skillsRequired || [], // Handle empty skills array
            information: jobPost.about || ''
          }); 
         
        } else {
          console.error('Failed to fetch job details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchJobDetails();
  }, [jobId]);

  const handleSubmitJobDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backend-server-1yct.onrender.com/job/edit-job-posts/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Job details updated:', data);
        navigate('/homePage'); // Redirect upon successful update
      } else {
        console.error('Request failed');
        console.error('Response Text:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChangeDetail = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className='addJobForm'>
    <div className='form-leftSide'>
      <form  className='formAddJob'>
      <h1 className='addJobText'>Add job description</h1>
      <label className='label_companyName'> Company Name 
      <input type='text' value={formData.companyName}
       id="companyName"
       placeholder='Enter your company name here'
       className='input_company'
            onChange={handleChangeDetail}/>
      </label>
      <label className='label_logo'> Add logo URL
          <input type='text' value={formData.logoUrl}
           id="logoUrl"
           className='input_logo'

           placeholder='Enter the link'
            onChange={handleChangeDetail}/>
      </label>
      <label className='label_position'> Job position
      <input type='text' value={formData.position}
       id="position"
       placeholder='Enter job position'
       className='input_position'
            onChange={handleChangeDetail}/>
      </label>
      <label className='label_salary'> Monthly salary
      <input type='text' value={formData.salary}
       id="salary"
       placeholder='Enter Amount in rupees'
       className='input_salary'
            onChange={handleChangeDetail}/>
      </label>
      <label className='label_type'> Job Type
      
      <select type='text'value={formData.jobType}
       id="jobType"
       className='input_type'
            onChange={handleChangeDetail}>
              <option value="" disabled selected hidden>
              select
            </option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>


            </select>
      </label>
      <label className='remoteOrOffice'> Remote/office
      <select type='text' value={formData.jobPlace}
       id="jobPlace"
       className='input_remoteOrOffice'
            onChange={handleChangeDetail}>
              <option value="" disabled selected hidden>
             select
            </option>
              <option value="Remote">Remote</option>
              <option value="Office">Office</option>
            </select>
      </label>
      <label className='label_location'> Location
      <input type='text' value={formData.location}
       id="location"
       className='input_location'
       placeholder='Enter Location'
            onChange={handleChangeDetail}/>
      </label>
      <label className='label_jobDescription'> Job Description
      <input type='text' value={formData.description}
       id="description"
       placeholder='Type the job description'
       className='input_description'
            onChange={handleChangeDetail}/>
      </label>
      <label className='label_about'>About Company
      <input type='text' placeholder='Type about your company' value={formData.about}
       id="about"
       className='input_about'
            onChange={handleChangeDetail}/>
      </label>
      <label className='label_skills'> Skills Required
      <input type='text' placeholder='Enter the must have skills seperated by comma(,)' value={formData.skills}
       id="skills"
       className='input_skills'
            onChange={handleChangeDetail}/>
      </label>
      
      <div className='buttonDiv'>
     <Link to='/homePage'> <button  className="cancelB" >cancel</button></Link>
      <button  className="addJobB" onClick={handleSubmitJobDetails}>+ Edit Job</button>
      </div>
      </form>
      </div>
      <div className='form-rightSide'>
    <img src={formImg}></img>
    <h3 className='rightSideText'>Recruiter add job details here</h3>

      </div>
  </div>
)
}

export default EditJob