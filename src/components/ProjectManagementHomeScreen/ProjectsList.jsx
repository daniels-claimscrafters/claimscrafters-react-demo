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
    <div style={{ height: "90%" }} className="projectList">
      
      {/* </CardButtonBackground> */}
      <motion.div
        style={{ flex: "1", height: "100%" }}
        initial={{ scale: 0, opacity: 0 }} // Initial scale and opacity
        animate={{ scale: 1, opacity: 1 }} // Animate to scale 1 and opacity 1
        transition={{ delay: 1.5, duration: 0.5 }} // Delay animation by 0.5 seconds
      >
        <CardProjects projects={projects} filter={filter} />
      </motion.div>
    </div>
  );
};

export default ProjectsList;
