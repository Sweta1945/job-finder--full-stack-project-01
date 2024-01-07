import React, { useState, useEffect } from 'react';
import '../styles/LoginPage.css'; // Import your CSS file
import loginImage from '../assets/picture.png'; // Update this import based on the image path
import { useNavigate } from 'react-router-dom';
import text2 from '../assets/personalJobFinder.png';
 import text1 from '../assets/alreadyHaveAccount.png';


 import { Link } from "react-router-dom";





function LoginPage() {

  const [loginData, setLoginData]=useState({});
  const [error, setError]=useState();
  const navigate = useNavigate();
  

  

  const handleChange=(e)=>{
    setLoginData({...loginData, [e.target.id]:e.target.value})
    
    
      }


      const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
          });
          console.log(loginData);
          console.log(response);
          if (response.ok) {
            const data = await response.json();
            console.log('Response Data:', data);
            // Assuming the server sends a success flag or a token upon successful login
            if (data.success) {
              localStorage.setItem('token', data.jwttoken);
              console.log('JWT token stored in localStorage:', data.token);
              navigate('/homePage');
            } else {
              console.error('Invalid credentials');
              setError('Invalid attempt');
              // Handle invalid credentials scenario here, like showing an error message
            }
          } else {
            console.error('Request failed');
            console.error('Response Text:', await response.text());
            setError("Invalid Attempt")
            // Handle other errors, like network issues
          }
        } catch (error) {
          console.error('Error:', error);
          setError('Unexpected error occurred')
          // Handle unexpected errors
        }
      };
      
  return (
    <div className='login-container'>
      <div className='left-side'>
<img src={text1}></img> 
<img src={text2} alt='img'></img>
        <form className='form' >
         
            <input type='email' onChange={handleChange}  value={loginData.email} id="email" placeholder='Email'  className='email'/>
       
            <input type='password' onChange={handleChange}  value={loginData.password}  id="password" placeholder='Password' className='password'/>

         <button onClick={handleSubmitLogin} className='submitButton'>Sign in</button>
         {/* yha use navigation kar lo */}
          <p>Don't have an account? <Link to='/register'><strong  className='signUp'>Sign up</strong></Link></p>
        </form>
        <div style={{color:'red'}}>
        {error && <p>{error}</p>}
        </div>
      </div>
      <div className='right-side'>
        <img src={loginImage} alt='Login' />
      </div>
    </div>
  );
}

export default LoginPage;
