//NPC1.jsx

import React, { useState } from "react";
import "./NPC1.css";
import { AiFillHome } from "react-icons/ai";
import ButtonContinue from "./ButtonContinue";

import DropdownLossState from "./DropdownLossState";
import HorizontalDivider from "./HorizontalDivider";
import InputFieldClaimNumber from "./InputFieldClaimNumber";
import InputFieldDateofLoss from "./InputFieldDateofLoss";
import InputFieldFirstName from "./InputFieldFirstName";
import InputFieldLastName from "./InputFieldLastName";
import InputFieldLossAddress from "./InputFieldLossAddress";
import InputFieldLossCity from "./InputFieldLossCity";
import InputFieldLossPostalCode from "./InputFieldLossPostalCode";
import { useNavigate } from "react-router-dom";

const NPC1 = (props) => {
  const navigate = useNavigate();
  const { npcData, onInputChange, onNext } = props;
  const [validationErrors, setValidationErrors] = useState(false);
  // Function to update validationErrors
  const updateValidationErrors = (hasErrors) => {
    setValidationErrors(hasErrors);
  };

  const areAllFieldsFilled = () => {
    // Check if all the necessary fields in npcData are filled
    const allFieldsFilled =
      npcData.claimNumber.trim() !== "" &&
      npcData.dateOfLoss.trim() !== "" &&
      npcData.insuredFirstName.trim() !== "" &&
      npcData.insuredLastName.trim() !== "" &&
      npcData.lossAddress.trim() !== "" &&
      npcData.lossCity.trim() !== "" &&
      npcData.lossState.trim() !== "" &&
      npcData.lossPostalCode.trim() !== "" &&
      !validationErrors;

    console.log("All fields filled:", allFieldsFilled);
    console.log("NPC Data:", npcData);

    return allFieldsFilled;
  };
  const handleToHome = () => {
    navigate("/pmhs");
  };
  return (
    <div className="npc1Creation">
      {/* Row 1 */}
      <div className="npc1">
        <div>
          {/* Assuming ImageLogo, TextHeader, and other components */}
          <img className="logoImg" src="ContentsIQ.png" alt="" />
          <div style={{ marginLeft: "10px" }}>
            <h3>New Project Creation</h3>
            {/* Other components go here */}
          </div>
        </div>
        <div onClick={handleToHome}>
          <AiFillHome />
        </div>
      </div>

      {/* Row 2 Centered */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <HorizontalDivider />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "white",
              color: "#132A58",
              fontWeight: "bold",
            }}
          >
            1
          </div>
          <p
            style={{ fontSize: "10px", textAlign: "center", marginTop: "3px" }}
          >
            Insured Information
          </p>
        </div>

        <HorizontalDivider />

        {/* Card Circle 2 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#132A58",
            }}
          >
            2
          </div>
          <p
            style={{ fontSize: "10px", textAlign: "center", marginTop: "3px" }}
          >
            Loss details
          </p>
        </div>

        <HorizontalDivider />

        {/* Card Circle 3 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#132A58",
            }}
          >
            3
          </div>
          <p
            style={{ fontSize: "10px", textAlign: "center", marginTop: "3px" }}
          >
            Financial Inputs
          </p>
        </div>

        <HorizontalDivider />

        {/* Card Circle 4 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#132A58",
            }}
          >
            4
          </div>
          <p
            style={{ fontSize: "10px", textAlign: "center", marginTop: "3px" }}
          >
            Data Upload
          </p>
        </div>

        <HorizontalDivider />

        {/* Card Circle 5 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#132A58",
            }}
          >
            5
          </div>
          <p
            style={{ fontSize: "10px", textAlign: "center", marginTop: "3px" }}
          >
            Column Mapping
          </p>
        </div>

        <HorizontalDivider />

        {/* Card Circle 6 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#132A58",
            }}
          >
            6
          </div>
          <p
            style={{ fontSize: "10px", textAlign: "center", marginTop: "3px" }}
          >
            Legal disclaimer
          </p>
        </div>

        <HorizontalDivider />
      </div>

      {/* New Section with TextHeader2 and TextSubtitle */}

      {/* Financial Inputs Section */}
      <div className="npc1FormContainer">
        {/* Input Fields Section */}
        <div className="npc1Form">
          {/* Claim Number and Date of Loss */}
          <div className="npc1FormInputContainer">
            <div className="npc1FormInput">
              <label>Claim Number</label>
              <InputFieldClaimNumber
                value={npcData.claimNumber}
                onChange={onInputChange}
                updateValidationErrors={updateValidationErrors}
              />
            </div>
            <div className="npc1FormInput">
              <label htmlFor="">Date of Loss</label>
              <InputFieldDateofLoss
                value={npcData.dateOfLoss}
                onChange={onInputChange}
                updateValidationErrors={updateValidationErrors}
              />
            </div>
          </div>

          {/* Insured Information */}
          <div className="npc1FormInputContainer">
            <div>
              <label htmlFor="firstName">Insured First Name</label>
              <InputFieldFirstName
                value={npcData.insuredFirstName}
                onChange={onInputChange}
                updateValidationErrors={updateValidationErrors}
              />
            </div>
            <div>
              <label htmlFor="lastName">Insured Last Name</label>
              <InputFieldLastName
                value={npcData.insuredLastName}
                onChange={onInputChange}
                updateValidationErrors={updateValidationErrors}
              />
            </div>
          </div>

          {/* Loss Information */}
          <div className="npc1FormInputContainer">
            <div>
              <label htmlFor="address">Loss Address</label>
              <InputFieldLossAddress
                value={npcData.lossAddress}
                onChange={onInputChange}
                updateValidationErrors={updateValidationErrors}
              />
            </div>
            <div>
              <label htmlFor="city">Loss City</label>
              <InputFieldLossCity
                value={npcData.lossCity}
                onChange={onInputChange}
                updateValidationErrors={updateValidationErrors}
              />
            </div>
          </div>
          <div className="npc1FormInputContainer">
            <div>
              <label htmlFor="state">Loss State</label>
              <DropdownLossState
                value={npcData.lossState}
                onChange={onInputChange}
                updateValidationErrors={updateValidationErrors}
              />
            </div>
            <div>
              <label htmlFor="postalCode">Loss Postal Code</label>
              <InputFieldLossPostalCode
                value={npcData.lossPostalCode}
                onChange={onInputChange}
                updateValidationErrors={updateValidationErrors}
              />
            </div>
          </div>
        </div>

        {/* Continue Button */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <ButtonContinue onClick={onNext} disabled={!areAllFieldsFilled}>
            Continue
          </ButtonContinue>
        </div>
      </div>
    </div>
  );
};

export default NPC1;
