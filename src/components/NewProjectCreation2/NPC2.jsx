// NPC2.jsx
import React, { useState } from "react";
import "./NPC2.css";

import HorizontalDivider from "./HorizontalDivider";
import { AiFillHome } from "react-icons/ai";

import InputFieldCarrier from "./InputFieldCarrier";
import DropdownLossType from "./DropdownLossType";
import InputFieldAdjusterFirstName from "./InputFieldAdjusterFirstName";
import InputFieldAdjusterLastName from "./InputFieldAdjusterLastName";

import InputFieldAdjusterPhone from "./InputFieldAdjusterPhone";
import InputFieldAdjusterEmail from "./InputFieldAdjusterEmail";
import ButtonBack from "./ButtonBack";
import ButtonContinue from "./ButtonContinue";
import { useNavigate } from "react-router-dom";

const NPC2 = (props) => {
  const navigate = useNavigate();
  const { npcData, onInputChange, onNext, onPrevious } = props;
  const [validationErrors, setValidationErrors] = useState(false);
  // Function to update validationErrors
  const updateValidationErrors = (hasErrors) => {
    setValidationErrors(hasErrors);
  };

  const areAllFieldsFilled = () => {
    // Check if all the necessary fields in npcData are filled
    const allFieldsFilled =
      npcData.lossType.trim() !== "" &&
      npcData.carrier.trim() !== "" &&
      npcData.adjusterFirstName.trim() !== "" &&
      npcData.adjusterLastName.trim() !== "" &&
      npcData.adjusterPhone.trim() !== "" &&
      npcData.adjusterEmail.trim() !== "" &&
      !validationErrors;

    return allFieldsFilled;
  };

  const handleToHome = () => {
    navigate("/pmhs");
  };
  return (
    <div className="npc2FormCreation">
      {/* Row 1 */}
      <div className="npc2">
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
              background: "#132A58",
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
              background: "white",
              color: "#132A58",
              fontWeight: "bold",
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

      <div className="npc2FormContainer">
        {/* Form Section */}
        <form className="npc2Form">
          {/* Loss Type and Carrier Information Section */}
          <div className="npc2FormInputContainer">
            <div>
              {/* <TextLossType /> */}
              <label htmlFor="loss">Loss Type</label>
              <DropdownLossType
                value={npcData.lossType}
                onChange={onInputChange}
              />
            </div>
            <div>
              {/* <TextCarrier /> */}
              <label htmlFor="carrier">Carrier</label>
              <InputFieldCarrier
                value={npcData.carrier}
                onChange={onInputChange}
              />
            </div>
          </div>

          {/* Adjuster Information Section */}
          <div className="npc2FormInputContainer">
            <div>
              {/* <TextAdjusterFirstName /> */}
              <label htmlFor="asjudter-firstName">Adjuster First Name</label>
              <InputFieldAdjusterFirstName
                value={npcData.adjusterFirstName}
                onChange={onInputChange}
              />
            </div>
            <div>
              {/* <TextAdjusterLastName /> */}
              <label htmlFor="adjuster-lastName">Adjuster Last Name</label>
              <InputFieldAdjusterLastName
                value={npcData.adjusterLastName}
                onChange={onInputChange}
              />
            </div>
          </div>

          {/* Other Adjuster Information Fields */}
          <div className="npc2FormInputContainer">
            <div>
              {/* <TextAdjusterPhone /> */}
              <label htmlFor="adjuster-phone">Adjuster Phone</label>
              <InputFieldAdjusterPhone
                value={npcData.adjusterPhone}
                onChange={onInputChange}
                updateValidationErrors={updateValidationErrors}
              />
            </div>
            <div>
              {/* <TextAdjusterEmail /> */}
              <label htmlFor="adjuster-email">Adjuster Email</label>
              <InputFieldAdjusterEmail
                value={npcData.adjusterEmail}
                onChange={onInputChange}
                updateValidationErrors={updateValidationErrors}
              />
            </div>
          </div>

          {/* Buttons for navigation with spacing */}
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <ButtonBack label="Back" onClick={onPrevious} />

            <ButtonContinue
              label="Continue"
              onClick={onNext}
              disabled={!areAllFieldsFilled()}
            />
          </div>
        </form>

        {/* Footer Section */}
      </div>
    </div>
  );
};

export default NPC2;
