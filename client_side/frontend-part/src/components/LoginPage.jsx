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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // console.log(loginData);
      const response = await axios.post(
        "https://backend-server-1yct.onrender.com/api/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(response.data);
      // Check if the login was successful based on the response status or data
      if (response.data.status === "success") {
        // Modify this condition based on the expected successful response status
        localStorage.setItem("token", response.data.jwttoken);

        /*
so the user section value from local storage will be remove(which previously kept registered user name or any other users name who previously logged in maybe )
and it will put current logged in user's name
*/

        // Remove the stored username from local storage
        localStorage.removeItem("user");

        // Set the user's name from response.data.user.name to local storage
        localStorage.setItem("user", response.data.user.name);

        window.alert("You Logged-In successfully!");

        navigate("/homePage");
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        setError(error.response.data.message || "Unexpected error occurred");
      } else if (error.request) {
        // Request was made but no response received
        setError("No response received from the server");
      } else {
        // Something else happened while setting up the request
        setError("Unexpected error occurred");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <img src={text1} className="text1"></img>
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
            {isLoading ? "Loading..." : "  Sign in"}
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
        <img src={loginImage} alt="Login" className="registerimg" />
        <img src={text2} alt="img" className="text2"></img>
      </div>
    </div>
  );
}

export default LoginPage;
