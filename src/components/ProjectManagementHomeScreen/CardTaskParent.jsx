// CardTaskParent.jsx

import React, { useState } from 'react';
import TextSubject from './TextSubject';
import IconExit from './IconExit';
import IconSave from './IconSave';
import CardTask from './CardTask';
import axios from 'axios'; // Import Axios
import Popup from './Popup';
import moment from 'moment';

const styles = {
  CardTaskParent: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '9999',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 1.5)', // Add box shadow for elevation
    
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  contentContainer: {
    paddingLeft: '20px',
    paddingRight: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    alignItems: 'center', // Optional: Align elements vertically in the center
  },

  fieldContainer: {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  label: {
    color: '#030303',
    fontSize: '18px',
    fontFamily: 'Poppins',
    marginBottom: '5px',
  },
  headerTextField: {
    width: '80%',
    padding: '8px',
    color: '#030303',
    fontSize: '32px',
    fontFamily: 'Poppins',
    fontWeight: 800,
    border: 'none',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  textField: {
    width: '80%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    color: '#030303',
    fontSize: '18px',
    fontFamily: 'Poppins',
  },
  bigTextField: {
    width: '90%',
    height: '125px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#cddef2',
    resize: 'none',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'flex-end', // Align items to the right
    paddingTop: '10px',
    marginRight: '20px',
  },
};

const CardTaskParent = ({ onClick, onClose, userData }) => {
  const userDataId = userData.id;
  console.log('hiiii"', userDataId);
  const API_URL = process.env.REACT_APP_API_URL;

  const [taskData, setTaskData] = useState({
    subject: '',
    start_date: '',
    due_date: '',
    status: '',
    priority: '',
    description: '',
    UserId: userDataId
  });
  const [errorMessage, setErrorMessage] = useState('');

  console.log('123', taskData);

  const [popup, setPopup] = useState(null);

  const handleFieldChange = (fieldName, value) => {
    setTaskData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));
  };

  const handleSubmit = () => {
    setErrorMessage('');
    if (
      !taskData.subject ||
      !taskData.start_date ||
      !taskData.due_date ||
      !taskData.status ||
      !taskData.priority ||
      !taskData.description
    ) {
      setErrorMessage('All fields are required');
      // Optionally, display an error message to the user or handle it in any other way
      return;
    }
  
    // Convert start_date and due_date to Date objects
    const startDate = moment(taskData.start_date).utc().toDate();
    console.log('sd ', startDate);
    const dueDate = moment(taskData.due_date).utc().toDate();
    console.log('dd ', dueDate);
  
    // Check if the due date is before the start date
    if (dueDate < startDate) {
      setErrorMessage('Due date cannot be before start date');
      // Optionally, display an error message to the user or handle it in any other way
      return;
    }
  
    // If all validations pass, proceed with form submission
    console.log('Submitting task:', taskData);
  

    // Send POST request to your server
    axios.post(`${API_URL}/tasks/create-task`, taskData)
      .then(response => {
        console.log('Task submitted successfully:', response.data);
        // Optionally, clear the form fields after submission
        setTaskData({
          subject: '',
          start_date: '',
          due_date: '',
          status: '',
          priority: '',
          description: '',
          UserId: userDataId,
        });
        setPopup({ message: 'Task submitted successfully', type: 'success' });
        setTimeout(() => window.location.reload(), 2500);
      })
      .catch(error => {
        console.error('Error submitting task:', error);
        // Handle error
        setPopup({ message: 'Error submitting task', type: 'error' });
        setTimeout(() => window.location.reload(), 2500);
      });
  };

  return (
    <div style={styles.CardTaskParent}>
      <CardTask>

        
      
      <div style={styles.iconContainer}>
      {errorMessage && <p style={{ color: 'red', marginRight: '28%' }}>{errorMessage}</p>}
            <IconSave onClick={handleSubmit} />
            <IconExit onClick={onClose} /> {/* Call onClose function to close the popup */}
          </div>
        <div style={styles.headerContainer}>
          
          <input
            type="text"
            style={styles.headerTextField}
            placeholder="<Enter Subject>"
            value={taskData.subject}
            onChange={(e) => handleFieldChange('subject', e.target.value)}
          />
        </div>
        
        <div style={styles.contentContainer}>
        
          
        
              <div style={styles.fieldContainer}>
                <label style={styles.label}>Start Date:</label>
                <input 
                  type="date" 
                  style={styles.textField} 
                  value={taskData.start_date} 
                  onChange={(e) => handleFieldChange('start_date', e.target.value)} 
                />
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.label}>Due Date:</label>
                <input 
                  type="date" 
                  style={styles.textField} 
                  value={taskData.due_date} 
                  onChange={(e) => handleFieldChange('due_date', e.target.value)} 
                />
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.label}>Status:</label>
                <select 
                  style={styles.textField} 
                  value={taskData.status} 
                  onChange={(e) => handleFieldChange('status', e.target.value)} 
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.label}>Priority:</label>
                <select 
                  style={styles.textField} 
                  value={taskData.priority} 
                  onChange={(e) => handleFieldChange('priority', e.target.value)} 
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Description:</label>
            <textarea 
              style={styles.bigTextField} 
              value={taskData.description} 
              onChange={(e) => handleFieldChange('description', e.target.value)} 
            />
            
          </div>
          
        
      </CardTask>
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)} // Close popup when clicked
          textColor={popup.type === 'error' ? 'red' : 'green'} // Set text color based on popup type
        />
      )}
    </div>
  );
};

export default CardTaskParent;
