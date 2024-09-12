import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, Divider, IconButton, Collapse } from '@mui/material';
import { FaFileDownload } from 'react-icons/fa';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import the expand icon
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#000', // Black background
  color: '#fff', // White text
  borderRadius: '16px',
  border: `1px solid ${theme.palette.grey[700]}`,
  width: '50%',
  height: 'auto',
  padding: '1rem',
  boxSizing: 'border-box',
  overflow: 'hidden',
}));

const HeaderWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
});

const Header = styled(Typography)({
  fontSize: '16px',
  fontFamily: 'Poppins',
  fontWeight: 600,
});

const StyledButton = styled(Button)({
  color: '#fff',
  fontSize: '1.5rem',
  minWidth: 'unset',
});

const EntryList = styled(List)({
  padding: '0',
  margin: '0',
  overflowY: 'auto',
  maxHeight: '200px', // Adjust based on your needs
});

const EntryItem = styled(ListItem)({
  padding: '10px',
  borderBottom: '1px solid #333',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 600,
});

const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  color: "#fff", // Set the icon color to white
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardChangelog = ({ projectDetails }) => {
  const [entries, setEntries] = useState([]);
  const [expanded, setExpanded] = useState(true); // State for collapse

  const projectId = projectDetails.project.id;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/npc/get-changelog?projectId=${projectId}`, {
      headers: {
        'ngrok-skip-browser-warning': '69420',
        // Add any other headers you need
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch changelog entries');
        }
      })
      .then((data) => {
        setEntries(data.entries); // Set the entries state with the fetched data
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors
      });
  }, [projectId, API_URL]);

  const handleDownload = () => {
    const downloadData = entries
      .map((entry) => entry.entry.replace(/DepreciationDisplay/g, 'Depreciation'))
      .join('\n');

    const blob = new Blob([downloadData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'changelog.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard>
      <CardContent>
        <HeaderWrapper>
          <Header variant="h6">Changelog Entries</Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledButton onClick={handleDownload}>
              <FaFileDownload />
            </StyledButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              style={{ marginLeft: '8px' }}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
        </HeaderWrapper>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <EntryList>
            {entries
              .slice()
              .reverse()
              .map((entry) => {
                if (/\bDepreciationDisplay\b/.test(entry.entry)) {
                  return null; // Skip entries with "DepreciationDisplay"
                }
                return (
                  <EntryItem key={entry.id}>
                    <ListItemText
                      primary={
                        entry.entry
                          .split(/(User ID: \d+|DepreciationDisplay)/)
                          .map((part, index) => {
                            let textStyle = {};
                            if (/User ID: \d+/.test(part)) {
                              textStyle.color = 'blue';
                            } else if (part === 'DepreciationDisplay') {
                              part = 'Depreciation';
                            }
                            textStyle.color = 'inherit';
                            return (
                              <span key={index} style={textStyle}>
                                {part}
                              </span>
                            );
                          })
                      }
                    />
                  </EntryItem>
                );
              })}
          </EntryList>
        </Collapse>
      </CardContent>
    </StyledCard>
  );
};

export default CardChangelog;
