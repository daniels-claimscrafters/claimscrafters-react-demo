// ProjectsList.jsx

import React, { useState } from "react";
import ButtonCreateNew from "./ButtonCreateNew";
import ButtonProjectsAll from "./ButtonProjectsAll";
import ButtonProjectsProgress from "./ButtonProjectsProgress";
import ButtonProjectsCompleted from "./ButtonProjectsCompleted";
import ButtonProjectsClosed from "./ButtonProjectsClosed";
import CardButtonBackground from "./CardButtonBackground";
import CardProjects from "./CardProjects";
import ButtonProjectsStarted from "./ButtonProjectsStarted";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectsList = ({ projects, filter }) => {
  
  const navigate = useNavigate();

  

  console.log("ProjectsList: ", projects);
  return (
    <div style={{ height: "90%", marginTop: "20px" }} className="projectList">
      
      {/* </CardButtonBackground> */}
      
        <CardProjects projects={projects} filter={filter} />
      
    </div>
  );
};

export default ProjectsList;
