// PMHSPAge.jsx

import React, { useState, useEffect } from "react";
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

  return (
    <div className="PHMS">
      <div className="logoutBtn">
        {/* <IconLogout onClick={handleLogout} /> */}
        <MdOutlineLogout onClick={handleLogout} />
      </div>
      {/* Sidebar Section */}
      <div>
        <div className="PhmsNav">
          {/* Left Section: ImageLogo */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <AiFillHome
              onClick={handleToHome}
              style={{ fontSize: "1.8rem", color: "white", cursor: "pointer" }}
            />
            <motion.div
              style={{ width: "100%", height: "100%" }}
              initial={{ scale: 0 }} // Initial scale is 0
              animate={{ scale: 1 }} // Animate to scale 1
              transition={{ duration: 0.5 }} // Transition duration
            >
              <Link to="/">
                <img
                  src="https://assets.api.uizard.io/api/cdn/stream/ffd9fb9d-25b1-4238-aa81-10979a405a8e.png"
                  className="pmhsLogo"
                />
              </Link>
            </motion.div>
          </div>
          {/* Middle Section: TextHeader and TextSubtitle */}
          <div className="header-content">
            <h2>Project Management</h2>
            <h4>Welcome to ContentsIQ</h4>
          </div>
          {/* Right Section: ImageProfile, TextUsername, and IconLogout */}
          <div className="profile-photo" onClick={handleClick}>
            {/* ImageProfile */}
            <ImageProfile userData={userData} />
            <p>
              Hello,{" "}
              {userData && userData.firstName
                ? userData.firstName
                : "<User First Name>"}
            </p>
            {/* TextUsername */}

            {/* <TextUsername userData={userData} /> */}
          </div>
        </div>
      </div>
      {/* Main Content Section */}

      {/* Main Content */}
      <div>
        {/* Top Row */}

        {/* Cards and Project Buttons Section */}
        <div className="projectTask">
          {/* Left Section: TasksList */}

          {/* ProjectsList */}

          {/* <TextMyProjects /> */}
          <ProjectsList projects={projects} pageReady={pageReady} />

          <div className="projectStatus">
            <div className="projectStates">
              <div className="projectStateHeading">
                <IoIosRefresh />
                <p>In Process ({inProcess})</p>
              </div>
              <div className="projectStateHeading">
                <TiTick />
                <p>Completed ({completed})</p>
              </div>
              <div className="projectStateHeading">
                <PiSigmaBold />
                <p>Total ({total})</p>
              </div>
            </div>
            <div className="activityBox">
              {/* TasksList */}

              <motion.div
                style={{ width: "100%", height: "80%" }}
                initial={{ scale: 0, opacity: 0 }} // Initial scale and opacity
                animate={{ scale: 1, opacity: 1 }} // Animate to scale 1 and opacity 1
                transition={{ delay: 1.0, duration: 0.5 }} // Delay animation by 0.5 seconds
              >
                <TasksList
                  showCardTaskParent={showCardTaskParent}
                  toggleCardTaskParent={toggleCardTaskParent}
                  tasks={tasks}
                />
              </motion.div>

              {/* Render CardTaskParent if showCardTaskParent is true */}
              {showCardTaskParent && (
                <CardTaskParent
                  userData={userData}
                  onClose={toggleCardTaskParent}
                />
              )}
            </div>
          </div>
          {/* Right Section: ProjectsList */}
        </div>
      </div>
    </div>
  );
};

export default PMHSPage;
