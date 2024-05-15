import React, { useState } from "react";
import TextSubject from "./TextSubject";
import IconExit from "./IconExit";
import IconSave from "./IconSave";
import CardTask from "./CardTask"; // Import CardTask component
import axios from "axios"; // Import Axios
import Popup from "./Popup";

const styles = {
  CardTaskParent: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 1.5)", // Add box shadow for elevation
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  contentContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Optional: Align elements vertically in the center
    overflow: "auto",
  },

  fieldContainer: {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  label: {
    color: "#030303",
    fontSize: "18px",
    fontFamily: "Poppins",
    marginBottom: "5px",
  },
  headerTextField: {
    width: "80%",
    padding: "8px",
    color: "#030303",
    fontSize: "32px",
    fontFamily: "Poppins",
    fontWeight: 800,
    border: "none",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
  },
  textField: {
    width: "80%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    color: "#030303",
    fontSize: "18px",
    fontFamily: "Poppins",
    backgroundColor: "white",
  },
  bigTextField: {
    width: "90%",
    height: "125px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    resize: "none",
    color: "black",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-end", // Align items to the right
    paddingTop: "10px",
    marginRight: "20px",
  },
};

const CardTaskParentEdit = ({ task, onClose }) => {
  const [taskData, setTaskData] = useState({
    subject: task.subject,
    start_date: task.start_date.slice(0, 10), // Extract only the date part
    due_date: task.due_date.slice(0, 10), // Extract only the date part
    status: task.status,
    priority: task.priority,
    description: task.description,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  console.log("heeeeere", taskData);

  const [popup, setPopup] = useState(null);

  const handleFieldChange = (fieldName, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    if (
      !taskData.subject ||
      !taskData.start_date ||
      !taskData.due_date ||
      !taskData.status ||
      !taskData.priority ||
      !taskData.description
    ) {
      setErrorMessage("All fields are required");
      // Optionally, display an error message to the user or handle it in any other way
      return;
    }

    // Convert start_date and due_date to Date objects
    const startDate = new Date(taskData.start_date);
    console.log("check1", startDate);
    const dueDate = new Date(taskData.due_date);
    console.log("check2", dueDate);

    // Check if the due date is before the start date
    if (dueDate < startDate) {
      setErrorMessage("Due date cannot be before start date");
      // Optionally, display an error message to the user or handle it in any other way
      return;
    }
    try {
      console.log(task.id, taskData);
      const response = await axios.patch(
        `${API_URL}/tasks/edit-task?taskId=${task.id}`,
        taskData
      );

      if (response.status === 200) {
        console.log("Task updated successfully:", response.data);
        setPopup({ message: "Task updated successfully", type: "success" });
        setTimeout(() => window.location.reload(), 1500);
      } else {
        console.error("Failed to update task:", response.statusText);
        setPopup({ message: "Failed to update task", type: "error" });
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setPopup({ message: "Error updating task", type: "error" });
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const handleClose = () => {
    // Call the onClose function provided by props
    onClose();
  };

  return (
    <div style={styles.CardTaskParent}>
      <CardTask>
        {" "}
        {/* Include CardTask component */}
        <div style={styles.iconContainer}>
          {errorMessage && (
            <p style={{ color: "red", marginRight: "28%" }}>{errorMessage}</p>
          )}
          <IconSave onClick={handleSubmit} />
          <IconExit onClick={handleClose} />
        </div>
        <div style={styles.headerContainer}>
          <input
            type="text"
            style={styles.headerTextField}
            placeholder="<Enter Subject>"
            value={taskData.subject}
            onChange={(e) => handleFieldChange("subject", e.target.value)}
          />
        </div>
        <div style={styles.contentContainer}>
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Start Date:</label>
            <input
              type="date"
              style={styles.textField}
              value={taskData.start_date}
              onChange={(e) => handleFieldChange("start_date", e.target.value)}
            />
          </div>
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Due Date:</label>
            <input
              type="date"
              style={styles.textField}
              value={taskData.due_date}
              onChange={(e) => handleFieldChange("due_date", e.target.value)}
            />
          </div>
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Status:</label>
            <select
              style={styles.textField}
              value={taskData.status}
              onChange={(e) => handleFieldChange("status", e.target.value)}
            >
              <option value="None">Select Status</option>
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
              onChange={(e) => handleFieldChange("priority", e.target.value)}
            >
              <option value="None">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Description:</label>
            <textarea
              style={styles.bigTextField}
              value={taskData.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
            />
          </div>
        </div>
      </CardTask>
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
          textColor={popup.type === "error" ? "red" : "green"}
        />
      )}
    </div>
  );
};

export default CardTaskParentEdit;
