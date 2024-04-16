// CardMyTasks.jsx

import React, { useState } from 'react';
import IconPlus from './IconPlus';
import CardTaskParentEdit from './CardTaskParentEdit';
import { motion } from "framer-motion";

const styles = {
  Card: {
    top: '699px',
    left: '92px',
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '32%'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#030303',
    fontSize: '20px',
    fontFamily: 'Poppins',
    fontWeight: 700,
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    overflow: 'auto',
    marginLeft: '10px'
  },
  plusIcon: {
    cursor: 'pointer',
    fontSize: '24px',
  },
  row1: {
    backgroundColor: '#f0f0f0',
    height: '35px',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    width: '100%',
  },
  row2: {
    backgroundColor: '#f0f0f0',
    height: '35px',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    width: '100%',
  },
  column: {
    flex: 1, // Each column takes up equal space
    display: 'flex',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    width: '146px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: '#030303',
    fontSize: '12px',
    fontFamily: 'Poppins',
  },
  columnContainer: {
    overflow: 'auto',   
  },
  columnHeader: {
    flex: 1, // Each column takes up equal space
    display: 'flex',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    color: '#030303',
    fontSize: '16px',
    fontFamily: 'Poppins',
    fontWeight: 600,
    width: '142px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  // New style for the icon container
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer', // Add cursor pointer to indicate interactivity
  },
  button: {
    flex: 1, // Each button takes up equal space
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    maxWidth: '122px',
    maxHeight: '25px',
    borderRadius: '12px',
    backgroundColor: '#2a84ea',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'Poppins',
    outline: 'none',
    border: '0',
  },
  buttonContainer: {
    flex: 1, // Each button container takes up equal space
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const CardMyTasks = ({ showCardTaskParent, toggleCardTaskParent, tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  // Sort tasks by due date in ascending order
  const sortedTasks = tasks ? tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)) : [];
  // Function to format the date from "yyyy-mm-dd" to "mm/dd/yyyy"
  const formatDate = (dateString) => {
    // Extract only the date part (yyyy-mm-dd) from the dateString
    const datePart = dateString.split('T')[0];
    // Split the date part by hyphen to extract year, month, and day
    const [year, month, day] = datePart.split('-');
    return `${month}/${day}/${year}`;
};
  console.log('hereee5', sortedTasks);
  
  // Format due dates for all tasks
  const upcomingTasks = sortedTasks.map(task => ({
    ...task,
    due_date: formatDate(task.due_date)
  }));
  console.log('heyy', upcomingTasks);

  // Function to handle click on the details icon
  const handleDetailsClick = (taskId) => {
    // Find the task by its ID
    const task = tasks.find(task => task.id === taskId);
    // Set the selected task
    setSelectedTask(task);
  };
  

  const onClose = () => {
    // Call whatever logic you need to close the component
    // For example, you might want to reset the selectedTask state to null
    setSelectedTask(null);
  };


  return (
    <div style={styles.Card}>
      <div style={styles.header}>
        <div style={styles.title}>My Tasks</div>
        <motion.div
      whileTap={{ scale: 0.9, transition: { duration: 0.2 } }} // Animation properties for tap/click
      //onClick={handleOnClick} // Handle the click event
    >
      <IconPlus style={styles.plusIcon} onClick={toggleCardTaskParent} />
    </motion.div>
        
        
      </div>
      {/* Render column headers */}
      <div style={styles.row1}>
  <div style={styles.columnHeader}>Subject</div>
  <div style={styles.columnHeader}>Status</div>
  <div style={styles.columnHeader}>Due Date</div>
  <div style={styles.columnHeader}>Priority</div>
  <div style={styles.columnHeader}>Details</div>
</div>
      {/* Map through all tasks and display them */}
      <div style={{ overflowX: 'auto', paddingRight: '7px' }}>
  {upcomingTasks.length === 0 ? (
    <div style={{ textAlign: 'center', fontSize: '18px', color: '#999', marginTop: '20px' }}>
    No tasks yet
  </div>
  ) : (
    upcomingTasks.map((task, index) => (
      <div key={index} style={styles.row2}>
        <div style={styles.column}>{task.subject}</div>
        <div style={styles.column}>{task.status}</div>
        <div style={styles.column}>{task.due_date}</div>
        <div style={styles.column}>{task.priority}</div>
        <div style={styles.buttonContainer}>
          {/* Button for the details trigger */}
          <button style={styles.button} onClick={() => handleDetailsClick(task.id)}>Details</button>
        </div>
      </div>
    ))
  )}
</div>
      {selectedTask && <CardTaskParentEdit task={selectedTask} onClose={onClose}/>}
    </div>
  );
};

export default CardMyTasks;