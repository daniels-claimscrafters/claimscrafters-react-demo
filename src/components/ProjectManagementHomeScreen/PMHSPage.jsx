// PMHSPAge.jsx

import React, { useState, useEffect } from "react";
import { Box, Drawer, List, ListItem, ListItemText, Divider, IconButton, Fab } from "@mui/material";
import "./PHMSPage.css";
import { Link, useNavigate } from "react-router-dom";
import TextUsername from "./TextUsername";
import TextTotalInt from "./TextTotalInt";
import TextTotal from "./TextTotal";
import TextSubtitle from "./TextSubtitle";
import TextMyProjects from "./TextMyProjects";
import TextInProcessInt from "./TextInProcessInt";
import TextInProcess from "./TextInProcess";
import TextHeader from "./TextHeader";
import TextCompletedInt from "./TextCompletedInt";
import TextCompleted from "./TextCompleted";
import InputFieldSearch from "./InputFieldSearch";
import ImageProfile from "./ImageProfile";
import IconTotal from "./IconTotal";
import IconSearch from "./IconSearch";
import IconHome from "./IconHome";
import IconCompleted from "./IconCompleted";
import IconInProcess from "./IconInProgress";
import CardTotalSubcard from "./CardTotalSubcard";
import CardSideBar from "./CardSideBar";
import CardInProcessSubcard from "./CardInProcessSubcard";

import CardCompletedSubcard from "./CardCompletedSubcard";
import CardButtonBackground from "./CardButtonBackground";
import ButtonCreateNew from "./ButtonCreateNew";
import ButtonProjectsClosed from "./ButtonProjectsClosed";
import ButtonProjectsCompleted from "./ButtonProjectsCompleted";
import ButtonProjectsProgress from "./ButtonProjectsProgress";
import CardActivityTracker from "./CardActivityTracker";
import CardProjects from "./CardProjects";
import TextActivityTracker from "./TextActivityTracker";
import IconLogout from "./IconLogout";
import TasksList from "./TasksList";
import ProjectsList from "./ProjectsList";
import CardTaskParent from "./CardTaskParent";
import { motion } from "framer-motion";
import MenuIcon from "./MenuIcon";
import { TiTick } from "react-icons/ti";
import { PiSigmaBold } from "react-icons/pi";
import { IoIosRefresh } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 240;

const PMHSPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);
  const [showCardTaskParent, setShowCardTaskParent] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [inProcess, setInProcess] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const [tasks, setTasks] = useState(null);
  const [userData, setUserData] = useState(null);
  const [filter, setFilter] = useState("All");
  const API_URL = process.env.REACT_APP_API_URL;

  

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

  const clearToken = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

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
        console.log(userData);
      } else {
        console.error("Failed to fetch user data");
        clearToken();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      clearToken();
      window.location.reload();
    }
  };

  useEffect(() => {
    console.log("Projects before counting:", projects); // Log the projects before counting
    countStatusTypes(projects);
  }, [projects]);

  const countStatusTypes = (projects) => {
    if (!projects) return; // Check if projects is null or undefined

    let inProcessCount = 0;
    let completedCount = 0;
    let totalCount = projects.length;

    console.log("Total projects:", totalCount); // Log the total number of projects

    projects.forEach((project) => {
      console.log("Project status:", project.status); // Log the status of each project
      if (project.status === "In Process") {
        inProcessCount++;
      } else if (project.status === "Completed") {
        completedCount++;
      }
    });

    console.log("In process count:", inProcessCount); // Log the count of projects in process
    console.log("Completed count:", completedCount); // Log the count of completed projects

    setInProcess(inProcessCount);
    setCompleted(completedCount);
    setTotal(totalCount);
  };

  const toggleCardTaskParent = () => {
    console.log("it worked");
    setShowCardTaskParent(!showCardTaskParent);
    console.log("it worked");
  };

  useEffect(() => {
    // If user data is available, fetch projects
    if (userData && userData.id) {
      fetchProjects(userData.id);
    }
  }, [userData]);

  // Function to fetch projects
  const fetchProjects = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/npc/get-projects`, {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Pass userId in the request body
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects);
        setPageReady(true);
      } else {
        console.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Function to fetch tasks by user ID
  const fetchTasksByUserId = async (userId) => {
    try {
      const response = await fetch(
        `${API_URL}/tasks/get-all-tasks?UserId=${userId}`,
        {
          method: "GET", // Use GET method
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // Process the fetched tasks data
        console.log("Tasks:", data.tasks);
        setTasks(data.tasks);
        // You can set the tasks state here if needed
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    // If userData is available and contains the user ID
    if (userData && userData.id) {
      fetchTasksByUserId(userData.id);
    }
  }, [userData]); // Empty dependency array to trigger the effect only once on mount

  const handleLogout = () => {
    // Clear the authentication token from cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect user to login page
    navigate("/login");
  };
  const handleClick = () => {
    navigate("/editprofile");
  };
  const handleToHome = () => {
    navigate("/");
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    console.log("filter", filter);
  };

  const handleCreateProject = () => {
    navigate("/npcpc"); // Navigate to the Create Project page
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: 'black',
            color: 'white',
          },
        }}
      >
        {/* Sidebar Content */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '10px' }}>
          
           {/* Sidebar: Profile Picture at the Top */}
  <div className="profile-photo" onClick={handleClick}>
    <ImageProfile userData={userData} />
    <p>
      Hello,{" "}
      {userData && userData.firstName
        ? userData.firstName
        : "<User First Name>"}
    </p>
  </div>

  {/* Spacer to push the list to the center */}
  <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {/* List Options */}
    <List style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', // Full width for better alignment
        padding: 0,
        margin: 0
      }}>
        {/* List Item Styling */}
        <ListItem 
          button 
          onClick={() => handleFilterChange("All")} 
          style={{ 
            margin: '10px 0', 
            borderRadius: '8px', 
            padding: '10px 20px', 
            transition: 'background-color 0.3s ease',
            backgroundColor: '#333', // Dark background for list items
            color: '#fff', // White text color
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333'}
        >
          <ListItemText primary="All Projects" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItem>
        <ListItem 
          button 
          onClick={() => handleFilterChange("Started")} 
          style={{ 
            margin: '10px 0', 
            borderRadius: '8px', 
            padding: '10px 20px', 
            transition: 'background-color 0.3s ease',
            backgroundColor: '#333',
            color: '#fff',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333'}
        >
          <ListItemText primary="Projects Started" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItem>
        <ListItem 
          button 
          onClick={() => handleFilterChange("In Process")} 
          style={{ 
            margin: '10px 0', 
            borderRadius: '8px', 
            padding: '10px 20px', 
            transition: 'background-color 0.3s ease',
            backgroundColor: '#333',
            color: '#fff',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333'}
        >
          <ListItemText primary="Projects In Process" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItem>
        <ListItem 
          button 
          onClick={() => handleFilterChange("Completed")} 
          style={{ 
            margin: '10px 0', 
            borderRadius: '8px', 
            padding: '10px 20px', 
            transition: 'background-color 0.3s ease',
            backgroundColor: '#333',
            color: '#fff',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333'}
        >
          <ListItemText primary="Projects Completed" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItem>
        <ListItem 
          button 
          onClick={() => handleFilterChange("Closed")} 
          style={{ 
            margin: '10px 0', 
            borderRadius: '8px', 
            padding: '10px 20px', 
            transition: 'background-color 0.3s ease',
            backgroundColor: '#333',
            color: '#fff',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333'}
        >
          <ListItemText primary="Projects Closed" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItem>
      </List>
  </div>

  {/* Divider */}
  <Divider />

  {/* Logout Icon */}
  <div style={{ padding: '10px', textAlign: 'center' }}>
  <Tooltip title="Logout">
    <LogoutIcon 
      style={{ color: 'white', cursor: 'pointer' }} 
      onClick={handleLogout} // Use the handleLogout function
    />
  </Tooltip>
</div>
</div>
      </Drawer>
  
      {/* Main Content */}
      <main style={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: 'black', // Dark background color
        color: 'white' // Light text color for contrast
      }}>
        {/* ProjectsList Component */}
        <ProjectsList 
          projects={projects}
          filter={filter}  
          pageReady={pageReady}
        />
      </main>
      <Tooltip title="Create Project" aria-label="create-project">
        <Fab 
          color="primary" 
          aria-label="add" 
          style={{ position: 'fixed', bottom: 24, right: 48 }}
          onClick={handleCreateProject}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default PMHSPage;