import React, { useState, useEffect } from "react";
import axios from "axios";

const styles = {
  ImageContainer: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "1px solid #c2c2c2",
    boxSizing: "border-box",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
};

const ImageProfile = ({ userData }) => {
  const [profileImageUrl, setProfileImageUrl] = useState(
    "https://assets.api.uizard.io/api/cdn/stream/616c0541-6abe-4fb7-aedb-96cdcde8c0bd.png"
  );
  const userId = userData?.id; // Use optional chaining to prevent errors if userData is null or undefined
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (userId) {
      // Check if userId is truthy
      // Define your headers
      const headers = {
        "Content-Type": "application/json", // Adjust content type if needed
        "ngrok-skip-browser-warning": "69420", // Include your access token
      };

      // Fetch the user's profile image URL from the server
      axios
        .get(`${API_URL}/auth/get-profile-picture?userId=${userId}`, {
          headers: headers, // Pass the headers object here
        })
        .then((response) => {
          console.log(response.data);
          setProfileImageUrl(response.data.profilePictureUrl);
        })
        .catch((error) => {
          console.error("Error fetching profile picture:", error);
        });
    }
  }, [userId]); // Include userId in the dependency array

  // If userId is not available or profileImageUrl is null, render null
  if (!userId || !profileImageUrl) {
    return null;
  }

  return (
    <div
      style={{
        ...styles.ImageContainer,
        backgroundImage: `url(${profileImageUrl})`,
      }}
    />
  );
};

export default ImageProfile;
