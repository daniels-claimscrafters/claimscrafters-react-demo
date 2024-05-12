// LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import "./Login.css";
import { AiFillHome } from "react-icons/ai";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(""); // State for error message
  const [authenticated, setAuthenticated] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ maxWidth: 1250 });

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking the presence of a JWT token in the cookie)
    const isAuthenticated = document.cookie.includes("token="); // Adjust this logic as per your cookie setup
    setAuthenticated(isAuthenticated);
  }, []);

  useEffect(() => {
    // Redirect authenticated users away from the login page
    if (authenticated) {
      navigate("/pmhs"); // Redirect to the home page or another route
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      console.log("Login response:", response); // Log the entire response object
      if (response.status === 200) {
        // Extract token from login response
        const { token } = response.data;

        // Store token as HTTP cookie
        document.cookie = `token=${token}; path=/;`;

        console.log("Token stored:", token); // Log the stored token
        // Redirect to PMHS page upon successful login
        navigate("/pmhs");
        console.log("Redirecting to PMHS page..."); // Log the redirection attempt
      } else {
        setError("Login failed. Please check your credentials and try again."); // Set error message
      }
    } catch (error) {
      console.error("Error during login", error);
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.error; // Get error message from backend response
        if (
          errorMessage ===
          "Email not confirmed. Please check your email for confirmation instructions."
        ) {
          setError(errorMessage); // Set error message for email not confirmed
        } else {
          setError(
            "Invalid credentials. Please check your email and password and try again."
          ); // Set error message for other 401 responses
        }
      } else {
        setError("An error occurred during login. Please try again later."); // Set generic error message
      }
    }
  };

  const handleRememberMeChange = (isChecked, event) => {
    console.log("Checkbox state:", isChecked);
    console.log("Email:", email);

    setRememberMe(isChecked);
    if (isChecked) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  };
  const handleToHome = () => {
    navigate("/");
  };

  return (
    <div className="loginPage">
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingRight: "20px",
          paddingTop: "20px",
        }}
        onClick={handleToHome}
      >
        <AiFillHome
          style={{ fontSize: "1.8rem", color: "white", cursor: "pointer" }}
        />
      </div>
      <div className="login">
        <form action="" className="loginForm" onSubmit={handleLogin}>
          {/* <div className="loginForm"> */}
          <div className="Logo">
            <motion.div
              style={{ height: "100%" }}
              initial={{ scale: 0 }} // Initial scale is 0
              animate={{ scale: 1 }} // Animate to scale 1
              transition={{ duration: 1.0 }} // Transition duration
            >
              <img
                // src="https://assets.api.uizard.io/api/cdn/stream/d661662c-a6d2-4ac0-bb25-6af76fb995bd.png"
                src="ContentsIQ.png"
                className="form-logo"
              />
            </motion.div>
          </div>
          <div className="formContent">
            <div className="form-header">
              <h1>Welcome Back</h1>
              <p>Enter your details to start valuing your content</p>
            </div>

            {/* Error message */}
            {error && (
              <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
            )}

            <div className="input-column">
              <label>Email:</label>
              <input
                type="email"
                required
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-column">
              <label>Password:</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="remember-me">
              <div className="remember-box">
                <label>Remember me</label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              </div>
              <Link to="/forgotpassword">Forgot your password?</Link>
            </div>
            <motion.div
              initial={{ scale: 0 }} // Initial scale is 0
              animate={{ scale: 1 }} // Animate to scale 1
              transition={{ duration: 1.0 }} // Transition duration
              whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
            >
              <button className="formBtn" type="submit">
                Log in
              </button>
            </motion.div>
            <p className="signupLink">
              I don't have an account yet. <Link to="/signup">Sign up</Link>
            </p>
          </div>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
