// ProjectsList/CardProjects.jsx

import React, { useState } from "react";
import StatusCard from "./statusCard";

const CardProjects = ({ projects, filter }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Check if projects is null or undefined
  const filteredProjects =
    projects && projects["projects"]
      ? filter === "All"
        ? projects["projects"]
        : projects["projects"].filter((project) => {
            return project.status === filter;
          })
      : [];

  console.log("Filtered Projects:", filteredProjects);
  filteredProjects.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const searchFilteredProjects = filteredProjects.filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      project.claimNumber.toLowerCase().includes(searchLower) ||
      `${project.insuredFirstName} ${project.insuredLastName}`
        .toLowerCase()
        .includes(searchLower) ||
      project.lossAddress.toLowerCase().includes(searchLower) ||
      project.lossCity.toLowerCase().includes(searchLower) ||
      project.lossState.toLowerCase().includes(searchLower) ||
      project.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="card">
      <h3>Search In My Projects</h3>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="projectSearchBox"
      />

      <div className="projectTableBox">
        <table className="projectTable">
          <thead>
            <tr>
              <th>View</th>
              <th>Claim Number</th>
              <th>Insured</th>
              <th>Loss Address</th>
              <th>City</th>
              <th>State</th>
              <th>Status</th> {/* New column for Status */}
            </tr>
          </thead>

          <tbody>
            {searchFilteredProjects.length > 0 ? (
              searchFilteredProjects.map((project, index) => (
                <tr key={index}>
                  <td>
                    <a href={`/projectDetails?projectId=${project.id}`}>View</a>
                  </td>
                  <td>{project.claimNumber}</td>
                  <td>{`${project.insuredFirstName} ${project.insuredLastName}`}</td>
                  <td>{project.lossAddress}</td>
                  <td>{project.lossCity}</td>
                  <td>{project.lossState}</td>
                  <td>
                    {/* Render your card component here */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {/* Replace 'CardComponent' with your actual card component */}
                      {/* <statuscard status={project.status} /> */}
                      <StatusCard status={project.status} />
                      {/* <div className="projectStatusBtn">{project.status}</div> */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    paddingTop: "10px",
                    color: "white",
                  }}
                >
                  No Projects
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardProjects;
