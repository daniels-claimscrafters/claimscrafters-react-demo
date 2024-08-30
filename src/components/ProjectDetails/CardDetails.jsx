import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, MenuItem, Select, Grid, Collapse, IconButton } from "@mui/material";
import Popup from "./Popup";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#000", // Set background to black
  height: "auto", // Adjust height as needed
  borderRadius: "16px", // Rounded corners
  border: `1px solid ${theme.palette.grey[700]}`, // Border outline
  padding: "1px", // Padding inside the card
  margin: "10px",
}));

const StyledInput = styled(Typography)({
  color: "#fff", // Text color for black background
  backgroundColor: "#333", // Background for input-like appearance
  padding: "8px",
  borderRadius: "8px",
});

const Label = styled(Typography)({
  color: "#fff", // Label color for black background
  marginBottom: "4px",
});

const HeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center', // Center horizontally
  alignItems: 'center', // Center vertically if needed
  marginBottom: '1px',
});

const Header = styled(Typography)({
  color: "#fff",
  fontSize: "18px",
  fontWeight: "bold",
});

const CardDetails = ({ projectDetails }) => {
  const [selectedStatus, setSelectedStatus] = useState(
    projectDetails.project.status
  );
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [popupTextColor, setPopupTextColor] = useState("");
  const [collapsed, setCollapsed] = useState(false); // State to manage collapse
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (projectDetails) {
      setSelectedStatus(projectDetails.project.status);
    }
  }, [projectDetails]);

  if (!projectDetails) {
    return <div>Loading...</div>;
  }

  const projectStatusOptions = ["Started", "In Process", "Completed", "Closed"];

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    updateProjectStatus(newStatus);
  };

  const updateProjectStatus = async (newStatus) => {
    try {
      const projectId = projectDetails.project.id;

      const response = await fetch(`${API_URL}/npc/update-status`, {
        method: "PUT",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, status: newStatus }),
      });

      if (response.ok) {
        setPopupMessage("Project status updated successfully");
        setPopupType("success");
        setPopupTextColor("green");
      } else {
        setPopupMessage("Failed to update project status");
        setPopupType("error");
        setPopupTextColor("red");
      }
      setShowPopup(true);
    } catch (error) {
      console.error("Error updating project status:", error);
      setPopupMessage("Failed to update project status");
      setPopupType("error");
      setPopupTextColor("red");
      setShowPopup(true);
    }
  };

  const formatAddress = (address, city, state, postalCode) => {
    return `${address}, ${city}, ${state} ${postalCode}`;
  };

  const formatAdjusterName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
  };

  const formatInsuredName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
  };

  return (
    <StyledCard>
      <CardContent>
        {/* Centered Header Section */}
        <HeaderContainer>
        
          <Header>Project Details</Header>
          <IconButton
          onClick={() => setCollapsed(!collapsed)}
          style={{ color: "#fff", marginRight: "1px" }}
        >
          {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
        </HeaderContainer>
        
        

        <Collapse in={!collapsed}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <div>
                <Label variant="body2">Claim Number:</Label>
                <StyledInput>{projectDetails.project.claimNumber}</StyledInput>
              </div>
              <div>
                <Label variant="body2">Insured Name:</Label>
                <StyledInput>
                  {formatInsuredName(
                    projectDetails.project.insuredFirstName,
                    projectDetails.project.insuredLastName
                  )}
                </StyledInput>
              </div>
              <div>
                <Label variant="body2">Carrier:</Label>
                <StyledInput>{projectDetails.project.carrier}</StyledInput>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div>
                <Label variant="body2">Project Status:</Label>
                <Select
  value={selectedStatus}
  onChange={handleStatusChange}
  variant="outlined"
  style={{ 
    width: "100%", 
    color: "#fff", 
    backgroundColor: "#0D1B45",
    padding: "1px",  // Match padding to StyledInput
    height: "40px"   // Set a consistent height
  }}
>
  {projectStatusOptions.map((status, index) => (
    <MenuItem key={index} value={status}>
      {status}
    </MenuItem>
  ))}
</Select>
              </div>
              <div>
                <Label variant="body2">Insured Address:</Label>
                <StyledInput>
                  {formatAddress(
                    projectDetails.project.lossAddress,
                    projectDetails.project.lossCity,
                    projectDetails.project.lossState,
                    projectDetails.project.lossPostalCode
                  )}
                </StyledInput>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div>
                <Label variant="body2">Adjuster Name:</Label>
                <StyledInput>
                  {formatAdjusterName(
                    projectDetails.project.adjusterFirstName,
                    projectDetails.project.adjusterLastName
                  )}
                </StyledInput>
              </div>
              <div>
                <Label variant="body2">Adjuster Email:</Label>
                <StyledInput>{projectDetails.project.adjusterEmail}</StyledInput>
              </div>
              <div>
                <Label variant="body2">Adjuster Phone:</Label>
                <StyledInput>{projectDetails.project.adjusterPhone}</StyledInput>
              </div>
            </Grid>
          </Grid>
        </Collapse>
      </CardContent>
      {showPopup && (
        <Popup
          message={popupMessage}
          type={popupType}
          textColor={popupTextColor}
        />
      )}
    </StyledCard>
  );
};

export default CardDetails;
