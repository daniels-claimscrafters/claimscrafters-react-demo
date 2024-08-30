// ProjectDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, CircularProgress, Box } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import "./ProjectDetails.css";
import CardChangelog from "./CardChangelog";
import CardValuation from "./CardValuation";
import CardDetails from "./CardDetails";
import CardContents from "./CardContents";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { AiFillHome } from "react-icons/ai";
import CardInventory from "./CardInventory";

const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const projectId = urlParams.get("projectId");
  // This will log '59'
  const [projectDetails, setProjectDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;
  const [userData, setUserData] = useState(null);

  const [filteredData, setFilteredData] = useState([]);

  const handleFilteredData = (filteredData) => {
    // Update the filtered data state
    setFilteredData(filteredData);
  };

  console.log('here', filteredData);

  

  const isPageTallEnough = useMediaQuery({ minHeight: 750 });
  // Function to retrieve token from cookie
  const getTokenFromCookie = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "token") {
        return value;
      }
    }
    return null;
  };

  useEffect(() => {
    // Check if the user is authenticated
    const token = getTokenFromCookie();
    if (!token) {
      // User is not authenticated, redirect to login page
      navigate("/login");
    } else {
      // Fetch user data if user is authenticated
      fetchUserData(token);
    }
  }, [navigate]);

  // Function to fetch user data
  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/get-user`, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
      } else {
        console.error("Failed to fetch user data");
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    }
  };

  useEffect(() => {
    // Fetch project details from the server using the extracted project ID
    fetch(`${API_URL}/npc/details?projectId=${projectId}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received project details:", data);
        setProjectDetails(data);
        setIsLoading(false); // Update loading state when data is fetched

        console.log("userdata: ", userData.id);
        console.log("projectdetails: ", data.project.userId);

        const isUserIdMatch = userData && data.project.userId === userData.id;

        console.log("User ID match:", isUserIdMatch);

        if (!isUserIdMatch) {
          console.log("User ID does not match. Redirecting...");
          navigate("/pmhs");
        }
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
        //navigate('/pmhs');
      });
  }, [projectId]); // Re-run effect whenever projectId changes

  const handleUpdateProjectDetails = (updatedDetails) => {
    setProjectDetails(updatedDetails);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!projectDetails) {
    return <div>Error: Unable to fetch project details</div>;
  }
  const handleToHome = () => {
    navigate("/pmhs");
  };

  return (
    <div className="projectDetailsPage">
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
  <Toolbar sx={{ justifyContent: 'space-between' }}>
    {/* Left-aligned text */}
    

    {/* Center-aligned logo */}
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
      <img
        src="https://assets.api.uizard.io/api/cdn/stream/ffd9fb9d-25b1-4238-aa81-10979a405a8e.png"
        className="pmhsLogo"
        alt="PMHS Logo"
      />
    </Link>

    {/* Right-aligned icon */}
    <IconButton color="inherit" onClick={handleToHome}>
      <HomeIcon />
    </IconButton>
  </Toolbar>
</AppBar>


      <div className="projectDetails">
        <div>
          <div>
            <CardDetails projectDetails={projectDetails} />
          </div>
          <div className="cardChangeLog">
          <CardValuation projectDetails={projectDetails} filteredData={filteredData} />
            <CardChangelog projectDetails={projectDetails} />
          </div>
        </div>
        <div>
        <CardContents
            projectDetails={projectDetails}
            setProjectDetails={handleUpdateProjectDetails}
            userData={userData}
            onFilter={handleFilteredData}
          />
        
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
