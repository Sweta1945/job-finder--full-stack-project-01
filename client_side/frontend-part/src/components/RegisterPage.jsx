import axios from 'axios';
import React, { useState } from 'react';
import '../styles/RegisterPage.css'; // Import your CSS file
 import registerImage from '../assets/picture.png'; 
//  import text1 from './assets/alreadyHaveAccount.png';
 import text2 from '../assets/personalJobFinder.png';
 import text3 from '../assets/createAccount.png';
 import text4 from '../assets/personalJobFinder-small.png'
 import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


function RegisterPage() {
  const navigateTo = useNavigate();

  const [formData, setFormData] =useState({});
  const [nameValue, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailValue, setEmail] = useState("");
  const [mobileValue, setMobile] = useState("");
  const [isChecked, setIsChecked] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [mobileErrorMsg, setMobileErrorMsg] = useState("");
  const [isCheckedErrorMsg, setIsCheckedErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(formData)

 const handleName=(e)=>{
const input=e.target.value;
if(input)
{
  setName(input)
  setNameErrorMsg('');
}

else
{
  setName('')
  setNameErrorMsg('Field is required')
}
  }

  const handlePassword=(e)=>{
    const input=e.target.value;
if(input)
{
  setPassword(input)
  setPasswordErrorMsg('');
}
else
{
  setPassword('');
  setPasswordErrorMsg('Field is required')
}
  }

const handleMobile=(e)=>{
  const input = e.target.value;

    if (input.length < 10) {
      setMobile(input);
      setMobileErrorMsg("Mobile number is too short!");
    } else if (input.length > 10) {
      setMobile(input);
      setMobileErrorMsg("Mobile number is too long!");
    } else {
      setMobile(input);
      setMobileErrorMsg("");
    }
    if (!input) {
      setMobileErrorMsg("Field is required!");
    }
}

const handleEmail = (e) => {
  const email = e.target.value;

    // Regular expression for a basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(email)) {
      setEmail(email);
      setEmailErrorMsg("");
    } else {
      setEmail(email);
      setEmailErrorMsg("Please enter a valid email address only!");
    }
    if (!email) {
      setEmailErrorMsg("Field is reqired!");
    }

}

const handleCheck = (e) => {
  const isChecked = e.target.checked;

  if (isChecked) {
    setIsCheckedErrorMsg("");
    setIsChecked(isChecked);
  } else {
    setIsCheckedErrorMsg("Check this box if you want to proceed!");
  }
};
  //we going to use async in handle submit coz form data submission will take some time we will aslos show this to user using loading function
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const res = await axios.get('http:localhost:3000/api/signup');
    
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Handle the error
  //   }
  // };
  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true)
    if(nameErrorMsg!==''|| mobileErrorMsg!==''|| passwordErrorMsg!==''|| emailErrorMsg!==''|| isCheckedErrorMsg!==''){
      return;
    }

    
    let hasError=false;
    if (nameValue == "") {
      setNameErrorMsg("Field is required!");
      hasError=true
      
    } 
    if (password == "") {
      setPasswordErrorMsg("Field is required!");
      hasError=true
      
    } 
    if (emailValue == "") {
      setEmailErrorMsg("Field is required!");
      hasError=true
    
    } 
    if (mobileValue == "") {
      setMobileErrorMsg("Field is required!");
      hasError=true
      
    } 
      if (!isChecked) {
        setIsCheckedErrorMsg("Check this box if you want to proceed!");
        hasError=true
        
      
    }

    if(hasError==true)
    {
      return;
    }
    const formData = {
      name: nameValue,
      email: emailValue,
      mobile: mobileValue,
      password: password,
     
    };
    
    // setFormData(prevState => ({ ...prevState, name: nameValue, email: emailValue, mobile: mobileValue, password: password}));
    console.log(formData);

  
    try {
      
      const response = await axios.post('http://localhost:3000/api/signup',formData, {
          headers: {
            'Content-Type': 'application/json'
          },
        });
        console.log(response);
        
        setIsLoading(false)
         // Assuming the response contains a token upon successful registration
    const token = response.data.token; // Adjust this based on your server response

    // Store the token securely (e.g., in local storage)
    localStorage.setItem('token', token);

    // After successful registration, automatically navigate to the homepage
    navigateTo("/homePage");

    } catch (error) {
      console.error('Error:', error);
      
      setIsLoading(false)

    
    }
    window.alert("Form submitted successfully!");
     navigateTo("/homePage");

  };
  
  return (
   
    <div className='register-container'>
     
       
      <div className='left-side'>
      <img src={text3} className='text3'/>
      <br/>
      <img src={text4} className='text4'/>
        
      
        <form onSubmit={handleSubmit} className='form'>
          
            <input
              type='text'
              className='name'
              id="name"
              value={nameValue}
              onChange={handleName}
              placeholder='Name'
            />
          
            {/* If errorMsg is not an empty string (or a falsy value), it will render the div element with the error message.
        If errorMsg is an empty string (or a falsy value), it will not render anything (because a div with an empty string as content doesn't display anything). */}
        {nameErrorMsg && <div className="error">{nameErrorMsg}</div>}
            <input
              type='email'
              className='email'
              id="email"
              value={emailValue}
              onChange={handleEmail}
              placeholder='Email'
            />
                 {emailErrorMsg && <div className="error">{emailErrorMsg}</div>}

            
            <input
              type='tel'
              className='mobile'
              id="mobile"
              value={mobileValue}
              onChange={handleMobile}
              placeholder='Mobile'
            />
          
          {mobileErrorMsg && <div className="error">{mobileErrorMsg}</div>}

            <input
              type='password'
              className='password'
              id="password"
              value={password}
              onChange={handlePassword}
              placeholder='Password'
            />
                {passwordErrorMsg && <div className="error">{passwordErrorMsg}</div>}

          <span>
          <input type='checkbox' className='checkbox' id="checkbox" onChange={handleCheck} value={isChecked}/>
            By creating an account, I agree to our terms of use and privacy policy        
          </span>
          {isCheckedErrorMsg && <div className="error">{isCheckedErrorMsg}</div>}

          <button type='submit' className='submitButton'>          {isLoading ? 'Loading...' : 'Create Account'}
</button>

            
          <p>
            Already have an account?
            <Link to='/login'>
              <strong >Sign in</strong>
            </Link>
          </p>
        </form>
      </div>
      <div className='right-side'>
        <img className='registerimg' src={registerImage} alt='Registration' />
      </div>
    </div>
  );
}

export default RegisterPage;
