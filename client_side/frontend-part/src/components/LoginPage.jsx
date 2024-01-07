import React, { useState, useEffect } from "react";
import "../styles/LoginPage.css"; // Import your CSS file
import loginImage from "../assets/picture.png"; // Update this import based on the image path
import { useNavigate } from "react-router-dom";
import text2 from "../assets/personalJobFinder.png";
import text1 from "../assets/alreadyHaveAccount.png";
import axios from "axios";

import { Link } from "react-router-dom";

function LoginPage() {
  const [loginData, setLoginData] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const health = await axios.get("http://localhost:3000/api/health");
      console.log(health);
      // console.log(loginData);
      const response = await axios.post(
        "http://localhost:3000/api/login",loginData,{
          headers: {
              'Content-Type': 'application/json',
          }
      }

      );
      console.log(response);
      if(response.data){
        localStorage.setItem('token',response.data.jwttoken);
        navigate("/homePage");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Unexpected error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <img src={text1}></img>
        <img src={text2} alt="img"></img>
        <form className="form">
          <input
            type="email"
            onChange={handleChange}
            value={loginData.email}
            id="email"
            placeholder="Email"
            className="email"
          />

          <input
            type="password"
            onChange={handleChange}
            value={loginData.password}
            id="password"
            placeholder="Password"
            className="password"
          />

          <button onClick={handleSubmitLogin} className="submitButton">
            Sign in
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/register">
              <strong className="signUp">Sign up</strong>
            </Link>
          </p>
        </form>
        <div style={{ color: "red" }}>{error && <p>{error}</p>}</div>
      </div>
      <div className="right-side">
        <img src={loginImage} alt="Login" />
      </div>
    </div>
  );
}

export default LoginPage;
