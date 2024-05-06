// EditProfilePage.jsx
import React, { useState, useEffect } from "react";
import "./EditProfilePage.css";
import { useNavigate } from "react-router-dom";
import IconHome from "./IconHome";
import ImageProfile from "./ImageProfile";
import InputFieldFirstName from "./InputFieldFirstName";
import InputFieldEmail from "./InputFieldEmail";
import InputFieldLastName from "./InputFieldLastName";
import InputFieldOrganization from "./InputFieldOrganization";
import InputFieldPhone from "./InputFieldPhone";
import InputFieldPostalCode from "./InputFieldPostalCode";
import InputFieldState from "./InputFieldState";
import InputFieldStreetAddress from "./InputFieldStreetAddress";
import InputFieldTitle from "./InputFieldTitle";
import TextTitle from "./TextTitle";
import TextStreetAddress from "./TextStreetAddress";
import TextState from "./TextState";
import TextPostalCode from "./TextPostalCode";
import TextPhone from "./TextPhone";
import TextOrganization from "./TextOrganization";
import TextLastName from "./TextLastName";
import TextHeader from "./TextHeader";
import TextFirstName from "./TextFirstName";
import TextEmail from "./TextEmail";
import TextCity from "./TextCity";
import InputFieldCity from "./InputFieldCity";
import TextPhoto from "./TextPhoto";
import CardSideBar from "./CardSideBar";
import IconLogout from "./IconLogout";
import ButtonSave from "./ButtonSave";
import Popup from "./Popup";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";

const styles = {
  customFileInput: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const EditProfilePage = () => {
  const navigate = useNavigate();
  // State variables for user details
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    organization: "",
    title: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    state: "",
  });

  const [validationErrors, setValidationErrors] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [popupTextColor, setPopupTextColor] = useState("");
  const [userData, setUserData] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  const updateValidationErrors = (hasErrors) => {
    setValidationErrors(hasErrors);
  };

  const areAllFieldsFilled = () => {
    // Check if all the necessary fields in formData are filled
    const allFieldsFilled =
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.organization.trim() !== "" &&
      formData.title.trim() !== "" &&
      formData.streetAddress.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.state.trim() !== "" &&
      formData.postalCode.trim() !== "" &&
      !validationErrors;

    console.log("All fields filled:", allFieldsFilled);
    console.log("Form Data:", formData);

    return allFieldsFilled;
  };

  // Function to handle image upload
  const handleImageChange = async (file) => {
    console.log("triggered");
    // Handle the selected image file here, you can set it in state or perform any other actions
    setImageFile(file);

    // Continue with your logic, such as uploading the File object to the backend
    console.log(file);
    uploadImageToBackend(file, userData.id); // Pass userId as an argument
  };

  const uploadImageToBackend = async (file, userId) => {
    try {
      // Convert image file to Base64 string
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1]; // Extract base64 string without data:image/png;base64,

        // Make POST request to backend endpoint
        const response = await fetch(`${API_URL}/auth/update-profile-picture`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image, userId }), // Send image data and userId as Base64 string in JSON format
        });

        // Check if request was successful
        if (response.ok) {
          console.log("Image uploaded successfully.");
          setPopupMessage("Image uploaded successfully.");
          setPopupType("success");
          setPopupTextColor("green");
        } else {
          console.error("Failed to upload image.");
          setPopupMessage("Failed to upload image (File too big).");
          setPopupType("error");
          setPopupTextColor("red");
        }
        setShowPopup(true);
        setTimeout(() => window.location.reload(), 1500);
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      setPopupMessage("Error uploading image.");
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  // Function to retrieve token from cookie
  const getTokenFromCookie = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "token") {
        return value;
      }
    }
    return null;
  };

  useEffect(() => {
    // Check if the user is authenticated
    const token = getTokenFromCookie();
    if (!token) {
      // User is not authenticated, redirect to login page
      navigate("/login");
    } else {
      // Fetch user data if user is authenticated
      fetchUserData(token);
    }
  }, [navigate]);

  const clearToken = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  // Function to fetch user data
  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/get-user`, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        console.log("ud: ", userData);
      } else {
        console.error("Failed to fetch user data");
        clearToken();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      clearToken();
      window.location.reload();
    }
  };

  // Function to handle changes in input fields and log their values
  const handleChange = (fieldName, value) => {
    let formattedValue = value;
    setIsButtonDisabled(false);

    // Check if the field is the firstName or lastName
    if (fieldName === "firstName" || fieldName === "lastName") {
      // Remove leading and trailing spaces
      formattedValue = formattedValue.trim();
      // Capitalize the first letter
      formattedValue =
        formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
    }

    if (
      fieldName === "streetAddress" ||
      fieldName === "city" ||
      fieldName === "title" ||
      fieldName === "organization"
    ) {
      // Capitalize the start of each word
      formattedValue = formattedValue
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    // If the field is the phone number, format it
    if (fieldName === "phone") {
      // Remove all non-digit characters
      const phoneNumber = value.replace(/\D/g, "");

      // Apply phone number format if it matches a specific pattern
      if (phoneNumber.length > 3 && phoneNumber.length <= 6) {
        formattedValue = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      } else if (phoneNumber.length > 6) {
        formattedValue = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
          3,
          6
        )}-${phoneNumber.slice(6, 10)}`;
      }
    }

    if (fieldName === "postalCode") {
      // Remove all non-digit characters
      const postalCode = value.replace(/\D/g, "");

      // Limit the length to 5 digits
      formattedValue = postalCode.slice(0, 5);
    }

    // Update the form data state
    setFormData({
      ...formData,
      [fieldName]: formattedValue,
    });

    // Log the updated formData
    console.log("FormData:", formData);
  };

  const handleLogout = () => {
    // Clear the authentication token from cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect user to login page
    navigate("/login");
  };

  const updateUserProfile = async () => {
    const requestBody = {
      userId: userData.id, // Include the user ID
      ...formData, // Include the updated form data
    };
    try {
      const response = await fetch(`${API_URL}/auth/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Optionally, include any authentication headers if required
        },
        body: JSON.stringify(requestBody), // Pass updated user data in the request body
      });

      if (response.ok) {
        setPopupMessage("User profile updated successfully.");
        setPopupType("success");
        setPopupTextColor("green");
      } else {
        setPopupMessage("Failed to update user profile.");
        setPopupType("error");
        setPopupTextColor("red");
      }
      setShowPopup(true);
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Error updating user profile:", error);
      setPopupMessage("Error updating user profile");
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const handleSaveButtonClick = () => {
    // Call updateUserProfile function when Save button is clicked
    updateUserProfile();
  };
  const handleToHome = () => {
    navigate("/pmhs");
  };

  return (
    userData && (
      <div className="editProfile">
        <div className="logoutBtn">
          {/* <IconLogout onClick={handleLogout} /> */}
          <MdOutlineLogout onClick={handleLogout} />
        </div>
        {/* First Column */}
        {/* <div style={{ flex: 1, minHeight: "100vh", maxWidth: "3%" }}>
          <CardSideBar>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                alignItems: "center",
              }}
            >
              <div>
                <IconHome />
              </div>
              <div>
                <IconLogout onClick={handleLogout} />
              </div>
            </div>
          </CardSideBar>
        </div> */}
        {/* Second Column */}
        <div style={{ flex: 1, maxWidth: "97%", height: "100%" }}>
          <div className="editHeader">
            <div>
              <AiFillHome onClick={handleToHome} />
              <h3>My Profile</h3>
            </div>
            <ButtonSave
              label="Save"
              onClick={handleSaveButtonClick}
              disabled={isButtonDisabled || validationErrors}
            />
          </div>
          {/* Main Content */}
          <div className="editForm">
            <div className="editLogo">
              <ImageProfile userData={userData} />
              <label htmlFor="file-input" style={styles.customFileInput}>
                Choose File
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            {/* Row 1 */}
            <div className="editFormMain">
              <div className="inputHolder">
                <div className="inputColumn">
                  <label>First Name:</label>

                  {/* Center the input field horizontally */}
                  <InputFieldFirstName
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    updateValidationErrors={updateValidationErrors}
                    userData={userData}
                  />
                </div>
                <div className="inputColumn">
                  <label>Last Name:</label>

                  {/* Center the input field horizontally */}
                  <InputFieldLastName
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    updateValidationErrors={updateValidationErrors}
                    userData={userData}
                  />
                </div>
              </div>
              {/* Row 2 */}
              <div className="inputHolder">
                <div className="inputColumn">
                  <label>Title:</label>

                  {/* Center the input field horizontally */}
                  <InputFieldTitle
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    updateValidationErrors={updateValidationErrors}
                    userData={userData}
                  />
                </div>
                <div className="inputColumn">
                  <label>Phone:</label>

                  {/* Center the input field horizontally */}
                  <InputFieldPhone
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    updateValidationErrors={updateValidationErrors}
                    userData={userData}
                  />
                </div>
              </div>
              {/* Row 3 */}
              <div className="inputHolder">
                <div className="inputColumn">
                  <label>Organization:</label>

                  {/* Center the input field horizontally */}
                  <InputFieldOrganization
                    value={formData.organization}
                    onChange={(e) =>
                      handleChange("organization", e.target.value)
                    }
                    updateValidationErrors={updateValidationErrors}
                    userData={userData}
                  />
                </div>
                <div className="inputColumn">
                  <label>Street Address:</label>

                  {/* Center the input field horizontally */}
                  <InputFieldStreetAddress
                    value={formData.streetAddress}
                    onChange={(e) =>
                      handleChange("streetAddress", e.target.value)
                    }
                    updateValidationErrors={updateValidationErrors}
                    userData={userData}
                  />
                </div>
              </div>
              {/* Row 4 */}

              {/* Row 5 */}
              <div className="inputHolder">
                <div className="inputColumn">
                  <label>City:</label>

                  {/* Center the input field horizontally */}
                  <InputFieldCity
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    updateValidationErrors={updateValidationErrors}
                    userData={userData}
                  />
                </div>
                <div className="inputColumn">
                  <label>State:</label>

                  {/* Center the input field horizontally */}
                  <InputFieldState
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    updateValidationErrors={updateValidationErrors}
                    userData={userData}
                  />
                </div>
              </div>
              {/* Row 6 */}
              <div className="inputHolder">
                <div className="inputColumn">
                  <label>Postal Code:</label>

                  {/* Center the input field horizontally */}
                  <InputFieldPostalCode
                    value={formData.postalCode}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                    updateValidationErrors={updateValidationErrors}
                    userData={userData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <Popup
            message={popupMessage}
            type={popupType}
            textColor={popupTextColor}
          />
        )}
      </div>
    )
  );
};

export default EditProfilePage;
