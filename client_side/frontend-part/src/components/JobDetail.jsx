import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../styles/JobDetail.css"
import jobImage from "../assets/mainRect.png";
import { Link } from "react-router-dom";
import jobLogo from "../assets/jobLogo.jpg";
import rightRect from "../assets/rightRect.png";
import upperRect from "../assets/upperRect.png";
import leftRect from "../assets/leftRect.png";
import mainRect from "../assets/mainRect.png";
import recruiterImage from "../assets/recruiterImage.jpg";

function JobDetail() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const location = useLocation();
  const isLoggedIn = new URLSearchParams(location.search).get("isLoggedIn");
  const [logIn, setLogin] = useState(isLoggedIn==='true');//check thats if isLoggedIn is true if it is true then logIn will becom true else false


  const [formData, setFormData] = useState({
    companyName: "",
    logoUrl: "",
    position: "",
    salary: "",
    jobType: "",
    jobPlace: "",
    location: "",
    description: "",
    about: "",
    skills: "",
    information: "",
    date: "",
    logo: "",
  });

  // Fetch job details based on jobId when component mounts
  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch(
          `https://backend-server-pet0.onrender.com/job/job-details/${jobId}`
        );
        if (response.ok) {
          const data = await response.json();

          console.log(data);

          setFormData({
            companyName: data.companyName || "",
            logoUrl: data.logoUrl || "",
            position: data.position || "",
            salary: data.salary || "",
            jobType: data.jobType || "",
            jobPlace: data.jobPlace || "",
            location: data.location || "",
            description: data.description || "",
            about: data.about || "",
            skills: data.skills || [],
            information: data.information || "",
            date: data.date || "",
            logo: data.logo,
          });
        } else {
          console.error("Failed to fetch job details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchJobDetails();
  }, [jobId]);
  const timeAgo = (dateString) => {
    const currentDate = new Date();
    const previousDate = new Date(dateString);
  
    const timeDifference = currentDate.getTime() - previousDate.getTime();
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeksDifference = Math.floor(daysDifference / 7);
  
    if (minutesDifference < 1) {
      return 'Just now';
    } else if (minutesDifference < 60) {
      return `${minutesDifference} min${minutesDifference > 1 ? 's' : ''} ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hr${hoursDifference > 1 ? 's' : ''} ago`;
    } else if (daysDifference < 7) {
      return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
    } else {
      return `${weeksDifference} w${weeksDifference > 1 ? 's' : ''} ago`;
    }
  };
  
  const handleLogout = () => {
    // Perform any necessary logout actions (e.g., clearing tokens, etc.)
    // For example, clearing the token from localStorage:
    localStorage.removeItem("token");
    setLogin(false);

  navigate('/homePage')
  };

  return (
    <div className="viewDetailPage">
      <div className="image-container">
      <img src={mainRect} alt="mainRect" className="mainRect"></img>
        <div className="mainRect-container">
          <img src={rightRect} alt="rightRect" className="rightRect"></img>
          <img src={upperRect} alt="upperRect" className="upperRect"></img>
          <img src={leftRect} alt="leftRect" className="leftRect"></img>
       ,<Link to='/homePage'>   <h2 className="jobFinder">Job Finder</h2></Link>

          </div>
          <div className="top-part">

          {!logIn && (
            <>
              <Link to="/login">
                <button className="loginB">Login</button>
              </Link>
              <Link to="/register">
                <button className="registerB">Register</button>
              </Link>
            </>
          )}
          {logIn && (
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
       
      
      <div className="part-two">
      <h3 style={{display: 'flex', justifyContent:"space-evenly", alignItems:"center"}}>
        {logIn && (
          <>
            <img
            className="logoImg"
              src={formData.logo} // Use the provided logo URL
              onError={(e) => {
                // If there's an error loading the image, use the default image
                e.target.onerror = null; // Prevent infinite loop if default image also fails to load
                e.target.src = jobLogo; // Use the default image URL
              }}
              alt="Job Logo"
              
            />
            
          </>
        )}
        {formData.position}{" "}
        {formData.jobPlace === "remote" || formData.jobPlace === "Remote"
          ? `work from home  Job / Internship at ${formData.companyName}`
          : ""}
      </h3>
      </div>
      </div>
      <div className="mainDiv">
        <div className="timePart">
          <p>{formData.date ? timeAgo(formData.date) : "Date not available"}</p>
          <p>{formData.jobType}</p>
        </div>
        <div className="positionAndLocationPart">
          <h1 className="positionPart">{formData.position}</h1>
          <p className="locationPart">{formData.location}</p>
          <div className="stipendAndDuration">
            <div>
           <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap:'20px', color:'#999999'}}>
            <span class="material-symbols-outlined" style={{color:'#999999'}}>payments</span>
            <p>Stipend</p>
            </div>
            <p style={{marginTop:'2px'}}>Rs {formData.salary}/month</p>
            </div>
            <div>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap:'20px', color:'#999999'}}>
            <span class="material-symbols-outlined" style={{color:'#999999'}}>calendar_clock</span>
            <p>Duration</p>
            </div>
            <p style={{marginTop:'2px'}}>6 Months</p>
            </div>
          </div>
          <h3 className="aboutCompany">About Company</h3>
          <p className="aboutCompanyPara">{formData.about}</p>
          <h3 className="aboutJob">About The Job/Internnship</h3>
          <p className="aboutJobPara">{formData.description}</p>
          <h3 className="skillReq">Skill(s) Required</h3>
          <div>
           
            <ul className="ul-skills">
              {formData.skills && formData.skills.length > 0 ? (
                formData.skills.map((skill, index) => (
                  <div className="skillReqPara" key={index}>{skill}</div>
                ))
              ) : (
                <li>No skills found</li>
              )}
            </ul>
          </div>
          <h3 className="additionalInfo">Additional Information</h3>
          <p className="additionalInfoPara">
            Stipend structure: This is a performance-based internship. In
            addition to the minimum-assured stipend, you will also be paid a
            performance-linked incentive (₹ 2500 per design).
          </p>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
