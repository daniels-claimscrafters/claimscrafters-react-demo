// CardMyTasks.jsx

import React, { useState } from "react";
import IconPlus from "./IconPlus";
import CardTaskParentEdit from "./CardTaskParentEdit";
import { motion } from "framer-motion";

const CardMyTasks = ({ showCardTaskParent, toggleCardTaskParent, tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  // Sort tasks by due date in ascending order
  const sortedTasks = tasks
    ? tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    : [];
  // Function to format the date from "yyyy-mm-dd" to "mm/dd/yyyy"
  const formatDate = (dateString) => {
    // Extract only the date part (yyyy-mm-dd) from the dateString
    const datePart = dateString.split("T")[0];
    // Split the date part by hyphen to extract year, month, and day
    const [year, month, day] = datePart.split("-");
    return `${month}/${day}/${year}`;
  };
  console.log("hereee5", sortedTasks);

  // Format due dates for all tasks
  const upcomingTasks = sortedTasks.map((task) => ({
    ...task,
    due_date: formatDate(task.due_date),
  }));
  console.log("heyy", upcomingTasks);

  // Function to handle click on the details icon
  const handleDetailsClick = (taskId) => {
    // Find the task by its ID
    const task = tasks.find((task) => task.id === taskId);
    // Set the selected task
    setSelectedTask(task);
  };

  const onClose = () => {
    // Call whatever logic you need to close the component
    // For example, you might want to reset the selectedTask state to null
    setSelectedTask(null);
  };

  return (
    <div className="taskCard">
      <div className="newTaskBtn">
        <h3>My Tasks</h3>
        <motion.div
          whileTap={{ scale: 0.9, transition: { duration: 0.2 } }} // Animation properties for tap/click
          //onClick={handleOnClick} // Handle the click event
        >
          {/* <IconPlus className="plusIcon" onClick={toggleCardTaskParent} /> */}
          <button className="plusIcon" onClick={toggleCardTaskParent}>
            +
          </button>
        </motion.div>
      </div>

      {/* Render column headers */}
      <div className="taskHeader">
        <div>Subject</div>
        <div>Status</div>
        <div>Due Date</div>
        <div>Priority</div>
        <div>Details</div>
      </div>
      {/* Map through all tasks and display them */}
      <div>
        {upcomingTasks.length === 0 ? (
          <div>No tasks yet</div>
        ) : (
          upcomingTasks.map((task, index) => (
            <div key={index} className="taskValue">
              <div>{task.subject}</div>
              <div>{task.status}</div>
              <div>{task.due_date}</div>
              <div>{task.priority}</div>
              <div>
                {/* Button for the details trigger */}
                <button onClick={() => handleDetailsClick(task.id)}>
                  Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {selectedTask && (
        <CardTaskParentEdit task={selectedTask} onClose={onClose} />
      )}
    </div>
  );
};

export default CardMyTasks;
