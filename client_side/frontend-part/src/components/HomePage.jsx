import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mainRect from "../assets/mainRect.png";
import searchIcon from "../assets/searchIcon.png";
import jobLogo from "../assets/jobLogo.jpg";
import indianFlag from "../assets/indian-flag.png";
import { useNavigate } from "react-router-dom";
import recruiterImage from "../assets/recruiterImage.jpg";
import rightRect from "../assets/rightRect.png";
import upperRect from "../assets/upperRect.png";
import leftRect from "../assets/leftRect.png";

import "../styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState({});
  const [jobList, setJobList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showFilteredList, setShowFilteredList] = useState(false);
  const [title, setTitle] = useState();
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [id, setId] = useState();

  const handleLogout = () => {
    // Perform any necessary logout actions (e.g., clearing tokens, etc.)
    // For example, clearing the token from localStorage:
    localStorage.removeItem("token");

    // Reset the isLoggedIn state to false
    setIsLoggedIn(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFilteredJob = async () => {
    try {
      const apiUrl = `http://localhost:3000/job/allJobs-bySkillsAndTitle?skills=${selectedSkills}&position=${title}`;
      console.log("API URL:", apiUrl); // Log the API URL before making the request
      const response = await fetch(apiUrl);
      // const response = await fetch(`http://localhost:3000/job/allJobs-bySkillsAndTitle?skills=${selectedSkills}&position=${title}`);
      if (response.ok) {
        const data = await response.json();
        setFilteredList(data.jobPosts || []);
        setShowFilteredList(true);
      }
    } catch (error) {
      console.error("Error fetching filtered jobs:", error);
    }
  };

  //handleing skills that i choose from drop down should get display at bottom
  const handleSkillSelection = (event) => {
    const selectedSkill = event.target.value; //here am getting the selected skills from drop down
   // Check if the selected skill already exists in the selectedSkills array
  if (!selectedSkills.includes(selectedSkill)) {
    const updatedSkills = [...selectedSkills, selectedSkill]; // Add the selected skill to the existing selectedSkills
    setSelectedSkills(updatedSkills); // Update the selectedSkills state with the new skill(s)
  }

  // Trigger job filtering every time a skill is selected
  handleFilteredJob();
};

  //useeffect to check person is logged in or not
  useEffect(() => {
    // Check for the presence of the token in localStorage (or sessionStorage)
    const token = localStorage.getItem("token"); // Adjust this to your token key

    // If a token is found, the user is considered logged in
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
 
  //useeffct to fetch the details from job form from backend

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch("http://localhost:3000/job/job-info");

        if (response.ok) {
          // console.log(response);
          const data = await response.json();

          setJobList(data.jobPosts || []); // Handle potential empty or undefined jobPosts

          const allSkills = data.jobPosts.reduce((acc, job) => {
            job.skillsRequired.forEach((skill) => {
              if (!acc.includes(skill)) {
                acc.push(skill);
              }
            });
            return acc;
          }, []);

          // data.jobPosts.reduce((acc, job) => { ... }, []): This line starts a process called "reducing". It's like having a bag (acc) where we'll gather unique items (skills). The bag starts empty ([]). This line says, "Go through all the jobPosts in data, and for each one, do something."

          // job.skillsRequired.forEach(skill => { ... }): For each job in data.jobPosts, it looks at the skillsRequired list of that job.

          // if (!acc.includes(skill)) { acc.push(skill); }: For each skill in the skillsRequired list of a job, it checks if that skill is already in the bag (acc). If it's not in the bag, it adds (pushes) the skill into the bag.

          // return acc;: After going through all the jobs and their skills, this line says, "Here's the bag (acc) with all the unique skills collected."

          // In simpler terms, imagine having a bag (the acc variable) to collect unique toys (skills). You go through each box of toys (each job's skillsRequired list), check if you already have that toy in your bag,
          // and if not, put it in the bag. At the end, you have a bag filled with unique toys (the allSkills array has all the unique skills from all the job posts).

          setSkills(allSkills); // Set unique skills to state
        } else {
          console.error("failed to fetch job details");
        }
      } catch (error) {
        console.error("error", error);
      }
    }
    fetchJobDetails();
  }, []);
  // console.log(jobList);
  console.log(filteredList);

  const renderJobs = () => {
    if (showFilteredList) {
      return filteredList.map((job, index) => (
        <div className="renderingJob">
          <div key={index}>
            <div className="job-rendering">
              <div className="jobRender-leftDiv">
                <img
                  src={job.logoUrl} // Use the provided logo URL
                  onError={(e) => {
                    // If there's an error loading the image, use the default image
                    e.target.onerror = null; // Prevent infinite loop if default image also fails to load
                    e.target.src = jobLogo; // Use the default image URL
                  }}
                  alt="Job Logo"
                  style={{ width: "50px", height: "50px", marginTop:'30px' }} // Set your preferred styling
                />

                <div className="leftDiv-right">
                  <div style={{display: "flex", justifyContent:"space-between"}}>
                  <h3 className="companyName">{job.companyName}</h3>
                  <div className="skill-show">
                    {job.skillsRequired.map((skill, index) => (
                  <div key={index} className="skillRendering">
                    {skill}{" "}
                    
                  </div>
                ))}
                  </div>
                  </div>
                  <div className="class-one">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        
                      }}
                    >
                      <span class="material-symbols-outlined">groups</span>
                      <p >11-50</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span class="material-symbols-outlined">
                        currency_rupee
                      </span>
                      <p>{job.salary}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img src={indianFlag} alt="indian flag"></img>
                      <p>{job.location}</p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap:'37vw',
                    
                      marginTop:'0', marginBottom:'0',
                      height:'10px'
                    }}
                  >
                    <div  style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      marginTop:'0', marginBottom:'0',
                      height:'20px',
                    
                    }}>
                    <p style={{width:'80px'}}> {job.jobPlace}</p>
                    <p style={{width:'80px'}}>{job.jobType} </p>
                    </div>
                   
                    <div className="jobRender-rightDiv">
                {isLoggedIn && (
                  <>
                    <Link to={`/editJobForm/${job._id}`}>
                      <button className="editJob">Edit job </button>
                    </Link>
                  </>
                )}
                <Link to={`/jobDetail/${job._id}?isLoggedIn=${isLoggedIn}`}>
                  <button className="viewDetail">view details</button>
                </Link>
              </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ));
    } else {
      return jobList.map((job, index) => (
        <div className="renderingJob">
          <div key={index}>
            <div className="job-rendering">
              <div className="jobRender-leftDiv">
                <img
                  src={job.logoUrl} // Use the provided logo URL
                  onError={(e) => {
                    // If there's an error loading the image, use the default image
                    e.target.onerror = null; // Prevent infinite loop if default image also fails to load
                    e.target.src = jobLogo; // Use the default image URL
                  }}
                  alt="Job Logo"
                  style={{ width: "50px", height: "50px", marginTop:'30px' }} // Set your preferred styling
                />

                <div className="leftDiv-right">
                  <div style={{display: "flex", justifyContent:"space-between"}}>
                  <h3 className="companyName">{job.companyName}</h3>
                  <div className="skill-show">
                    {job.skillsRequired.map((skill, index) => (
                  <div key={index} className="skillRendering">
                    {skill}{" "}
                    
                  </div>
                ))}
                  </div>
                  </div>
                  <div className="class-one">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        
                      }}
                    >
                      <span class="material-symbols-outlined">groups</span>
                      <p >11-50</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span class="material-symbols-outlined">
                        currency_rupee
                      </span>
                      <p>{job.salary}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img src={indianFlag} alt="indian flag"></img>
                      <p>{job.location}</p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap:'37vw',
                    
                      marginTop:'0', marginBottom:'0',
                      height:'10px'
                    }}
                  >
                    <div  style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      marginTop:'0', marginBottom:'0',
                      height:'20px',
                    
                    }}>
                    <p style={{width:'80px'}}> {job.jobPlace}</p>
                    <p style={{width:'80px'}}>{job.jobType} </p>
                    </div>
                   
                    <div className="jobRender-rightDiv">
                {isLoggedIn && (
                  <>
                    <Link to={`/editJobForm/${job._id}`}>
                      <button className="editJob">Edit job </button>
                    </Link>
                  </>
                )}
                <Link to={`/jobDetail/${job._id}?isLoggedIn=${isLoggedIn}`}>
                  <button className="viewDetail">view details</button>
                </Link>
              </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ));
    }
  };

  
const handleClearSkills = () => {
  setSelectedSkills([]); // Set selectedSkills array to an empty array
};
  const handleCross = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(updatedSkills);
  };
  return (
    <div className="homepage">
      <div className="image-container">
        <img src={mainRect} alt="mainRect" className="mainRect"></img>
        <div className="mainRect-container">
          <img src={rightRect} alt="rightRect" className="rightRect"></img>
          <img src={upperRect} alt="upperRect" className="upperRect"></img>
          <img src={leftRect} alt="leftRect" className="leftRect"></img>
          <h2 className="jobFinder">Job Finder</h2>

        </div>
        <div className="top-part">

          {!isLoggedIn && (
            <>
              <Link to="/login">
                <button className="loginB">Login</button>
              </Link>
              <Link to="/register">
                <button className="registerB">Register</button>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <button onClick={handleLogout} className="logout">
                Logout
              </button>
            
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginRight: "100px",
                  marginTop: "60px",
                  width: "260px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                
                <h3 className="hello-recruiter">Hello! Recruiter</h3>
                <img
                  src={recruiterImage}
                  alt="recruiterImage"
                  className="recruiterImage"
                ></img>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="middle-part">
        <div className="container">
          <input
            className="findJobInput"
            type="text"
            placeholder="Type any job title to search"
            onChange={handleTitleChange}
          />
          <img
            src={searchIcon}
            className="search"
            onClick={handleFilteredJob}
          ></img>
          <br />
          <span className="skillAndClear">
            <select
              id="myDropdown"
              name="skills"
              className="dropdown"
              onChange={handleSkillSelection}
            >
              <option value="" disabled selected hidden>
                Skills
              </option>

              {skills.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <div className="skill displaying division">
              <div>
                {selectedSkills.map((selectedSkill, index) => (
                  <div key={index} className="skillRendering">
                    {selectedSkill}{" "}
                    <span
                      className="x"
                      onClick={() => handleCross(selectedSkill)}
                    >
                      {" "}
                      X
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {isLoggedIn && (
              <Link to="/jobForm">
                <button className="addJob">+ Add job</button>
              </Link>
            )}
            <br />
            <p className="clear" onClick={handleClearSkills}>Clear</p>
          </span>
          {/* <button onClick={handleFilteredJob}>find job</button> */}
        </div>
      </div>

      <div className="bottom-part">
        <ul>{renderJobs()}</ul>
      </div>
    </div>
  );
}

export default HomePage;
