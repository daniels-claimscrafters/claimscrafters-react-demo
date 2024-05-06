// CardChangelog.jsx

import { color } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaFileDownload } from "react-icons/fa";

const styles = {
  cardContainer: {
    width: "200px",
    minHeight: "150px",
    maxHeight: "250px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#1E1F26",
    borderTop: "2px solid white",
    borderBottom: "2px solid white",
    padding: "10px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column", // Align children vertically
    alignItems: "center", // Center children horizontally
    bordeRadius: "15px",
  },
  header: {
    textAlign: "center", // Center text horizontally
    color: "white",
    fontSize: "10px",
    fontFamily: "Poppins",
    fontWeight: 600,
  },
  entryContainer: {
    flex: "1",
    overflowY: "auto",
  },
  entryList: {
    padding: "0",
    margin: "0",
    listStyleType: "none",
  },
  entryItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    color: "white",
    fontSize: "8px",
    fontWeight: 600,
  },
  button: { color: "white", fontSize: "1.5rem", padding: "0" },
};

const CardChangelog = ({ projectDetails }) => {
  const [entries, setEntries] = useState([]);

  const projectId = projectDetails.project.id;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/npc/get-changelog?projectId=${projectId}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        // Add any other headers you need
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch changelog entries");
        }
      })
      .then((data) => {
        console.log(data);
        setEntries(data.entries); // Set the entries state with the fetched data
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  }, []);

  // Function to handle download
  const handleDownload = () => {
    // Convert entries to a string format
    const downloadData = entries
      .map((entry) => {
        // Replace "DepreciationDisplay" with "Depreciation"
        const modifiedEntry = entry.entry.replace(
          /DepreciationDisplay/g,
          "Depreciation"
        );
        return modifiedEntry;
      })
      .join("\n");

    // Create a Blob from the data
    const blob = new Blob([downloadData], { type: "text/plain" });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "changelog.txt"; // Set the filename and extension
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.cardContainer}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <h1 style={styles.header}>Changelog Entries</h1>
        <button style={styles.button} onClick={handleDownload}>
          <FaFileDownload />
        </button>
      </div>
      <div style={styles.entryContainer}>
        <ul style={styles.entryList}>
          {entries
            .slice()
            .reverse()
            .map(
              (entry, index) =>
                // Check if the entry contains the word "Depreciation" among other words
                !/\bDepreciation\b/.test(entry.entry) && (
                  <li key={entry.id} style={{ ...styles.entryItem }}>
                    {/* Split the entry text into different parts */}
                    {entry.entry
                      .split(/(User ID: \d+|DepreciationDisplay)/)
                      .map((part, index) => {
                        let textStyle = {}; // Define an empty object to hold the style for this part
                        // Apply blue color to the user information part
                        if (/User ID: \d+/.test(part)) {
                          textStyle.color = "blue";
                        } else if (part === "DepreciationDisplay") {
                          part = "Depreciation";
                        }
                        // Default color for other parts
                        textStyle.color = "inherit";

                        // Render the part with the applied style
                        return (
                          <span key={index} style={textStyle}>
                            {part}
                          </span>
                        );
                      })}
                  </li>
                )
            )}
        </ul>
      </div>
    </div>
  );
};

export default CardChangelog;
