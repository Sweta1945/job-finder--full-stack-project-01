import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import formImg from '../assets/jobFormImg.png'
import  "../styles/JobForm.css"

function JobDetailPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    logoUrl: '',
    position: '',
    salary: '',
    jobType: '',
    jobPlace: '', // Remote or Office
    location: '',
    description: '',
    about: '',
    skills: '',
    
  });

  const handleSubmitJobDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-server-1yct.onrender.com/job/job-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Job details submitted:', data);
        // Optionally, redirect to another page or perform any necessary action upon successful submission
        window.alert("Job Added successfully!");

        navigate('/homePage')
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
         className='input_company'
         placeholder='Enter your company name here'
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
         className='input_position'
         placeholder='Enter job position'
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
         placeholder="Enter Location"

              onChange={handleChangeDetail}/>
        </label>
        <label className='label_jobDescription'> Job Description
        <input type='text' value={formData.description}
         id="description"
         className='input_description'
         placeholder='Type the job description'
              onChange={handleChangeDetail}/>
        </label>
        <label className='label_about'>About Company
        <input type='text' value={formData.about}
         id="about"
         className='input_about'
         placeholder='Type about your company'
              onChange={handleChangeDetail}/>
        </label>
        <label className='label_skills'> Skills Required
        <input type='text'  value={formData.skills}
         id="skills"
         className='input_skills'
         placeholder="Enter the must have skills seperated by commma(,)"

              onChange={handleChangeDetail}/>
        </label>
        
        <div className='buttonDiv'>
       <Link to='/homePage'> <button  className="cancelB" >cancel</button></Link>
        <button  className="addJobB" onClick={handleSubmitJobDetails}>+ Add Job</button>
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

export default JobDetailPage