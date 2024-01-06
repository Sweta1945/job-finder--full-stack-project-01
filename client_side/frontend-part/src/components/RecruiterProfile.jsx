import React from 'react'
import { Link } from 'react-router-dom';
import recruiterImg from '../assets/recruiterImage.jpg'


function RecruiterPage() {
  return (
    <div>
      
       <div className='leftDiv-recruiter'>
       <img src={recruiterImg} alt='recruiterImage' ></img>
       </div>
       <div className='righDiv-recruiter'>
        
       </div>
    </div>
  )
}

export default RecruiterPage