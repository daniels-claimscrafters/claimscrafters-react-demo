// ProjectsList/CardProjects.jsx

import React, { useState } from 'react';
import StatusCard from './statusCard'; // Update 'statuscard' to 'statusCard'


const styles = {
  Card: {
    top: '306px',
    left: '586px',
    width: '100%',
    height: '93%', // Adjust the height as needed
    backgroundColor: '#1e1f26',
    borderRadius: '20px',
    border: '2px solid #cddef2',
    boxSizing: 'border-box',
    padding: '20px',
    overflowY: 'auto', // Make the container scrollable vertically
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    
  },
  th: {
    color: '#ffffff',
    padding: '12px 8px',
    textAlign: 'center',
    borderBottom: '2px solid #cddef2',
    fontSize: '14px',
    fontFamily: 'Red Hat Display',
    fontWeight: 1000,
  },
  td: {
    paddingTop: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #cddef2',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'Red Hat Display',
    fontWeight: 500,
    textAlign: 'center',
  },
};

const CardProjects = ({ projects, filter }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Check if projects is null or undefined
  const filteredProjects = (projects && projects['projects']) ? (filter === 'All' ? projects['projects'] : 
                          projects['projects'].filter(project => {
                            return project.status === filter;
                          })) : [];

  console.log('Filtered Projects:', filteredProjects);
  filteredProjects.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const searchFilteredProjects = filteredProjects.filter(project => {
    const searchLower = searchQuery.toLowerCase();
    return project.claimNumber.toLowerCase().includes(searchLower) ||
           `${project.insuredFirstName} ${project.insuredLastName}`.toLowerCase().includes(searchLower) ||
           project.lossAddress.toLowerCase().includes(searchLower) ||
           project.lossCity.toLowerCase().includes(searchLower) ||
           project.lossState.toLowerCase().includes(searchLower) ||
           project.status.toLowerCase().includes(searchLower);
  });

  
  return (
    
    <div style={styles.Card}>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ display: 'block' ,margin : '0 auto', padding: '10px', width: '95%', borderRadius: '12px', color: '#1d1d1f', fontSize: '14px', fontFamily: 'Poppins', outline: 'none', backgroundColor: '#f0f0f0', border: '1px solid #ceced3' }}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>View</th>
            <th style={styles.th}>Claim Number</th>
            <th style={styles.th}>Insured</th>
            <th style={styles.th}>Loss Address</th>
            <th style={styles.th}>City</th>
            <th style={styles.th}>State</th>
            <th style={styles.th}>Status</th> {/* New column for Status */}
          </tr>
        </thead>
        
        <tbody>
  {searchFilteredProjects.length > 0 ? (
    searchFilteredProjects.map((project, index) => (
      <tr key={index}>
        <td style={styles.td}>
          <a href={`/projectDetails?projectId=${project.id}`} style={{ fontWeight: 500, fontFamily: 'Red Hat Display', color: '#2a84ea', textDecoration: 'underline', fontSize: '14px' }}>View</a>
        </td>
        <td style={styles.td}>{project.claimNumber}</td>
        <td style={styles.td}>{`${project.insuredFirstName} ${project.insuredLastName}`}</td>
        <td style={styles.td}>{project.lossAddress}</td>
        <td style={styles.td}>{project.lossCity}</td>
        <td style={styles.td}>{project.lossState}</td>
        <td style={{ ...styles.td, padding: 0 }}>
          {/* Render your card component here */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
            {/* Replace 'CardComponent' with your actual card component */}
            <StatusCard status={project.status} />
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" style={{ textAlign: 'center', fontStyle: 'italic', paddingTop: '10px', color: 'white' }}>No Projects</td>
    </tr>
  )}
</tbody>
    </table>
    </div>
  );
};

export default CardProjects;