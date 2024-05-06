// npc6.jsx
import React, { useState } from "react";
import "./NPC6.css";

import HorizontalDivider from "./HorizontalDivider";
import ImageLogo from "./ImageLogo";

import TextAdditional from "./TextAdditional";
import TextFinancialInputs from "./TextFinancialInputs";
import TextInsuredInformation from "./TextInsuredInformation";
import TextLossDetails from "./TextLossDetails";
import TextPayment from "./TextPayment";
import TextProvidePersonal from "./TextProvidePersonal";
import ButtonContinue from "./ButtonContinue";
import ButtonBack from "./ButtonBack";
import Checkbox from "./Checkbox";
import InputFieldFullName from "./InputFieldFullName";
import TextBody from "./TextBody";
import TextCheckbox from "./TextCheckbox";

import ImageFooterLogo from "./ImageFooterLogo";
import CardFooterBackground from "./CardFooterBackground";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const NPC6 = ({
  npcData,
  onInputChange,
  onNext,
  onPrevious,
  resetParentData,
}) => {
  const navigate = useNavigate();
  const [didAcceptLegal, setDidAcceptLegal] = useState(false);
  const [acceptLegalFullName, setAcceptLegalFullName] = useState("");
  const [isInputFieldPopulated, setIsInputFieldPopulated] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = (isChecked, event) => {
    setDidAcceptLegal(isChecked);
    setIsCheckboxChecked(isChecked);
    // Update npcData directly in NPC6
    onInputChange("didAcceptLegal", isChecked);
  };

  const handleFullNameChange = (newValue) => {
    // Check if newValue has at least two characters
    if (newValue === "4729") {
      setAcceptLegalFullName(newValue);
      setIsInputFieldPopulated(true); // If newValue has at least two characters, set to true
      onInputChange("acceptLegalFullName", newValue);
    } else {
      setAcceptLegalFullName(newValue);
      setIsInputFieldPopulated(false); // If newValue has less than two characters, set to false
      // Optionally, you can clear the input field or show an error message here
      // You can add your logic here depending on your requirements
    }
  };

  const isContinueDisabled = !(isInputFieldPopulated && isCheckboxChecked);
  const handleToHome = () => {
    navigate("/pmhs");
  };
  return (
    <div className="npc6Div">
      {/* Row 1 */}
      <div className="npc6">
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
              background: "white",
              color: "#132A58",
              fontWeight: "bold",
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

      <div
        style={{
          height: "80%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Row 3 Centered */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* TextBody */}
          <TextBody />
        </div>

        {/* Row 4 Centered */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            <Checkbox
              checked={didAcceptLegal}
              onChange={handleCheckboxChange}
            />
            <TextCheckbox />
          </div>
          <InputFieldFullName
            value={acceptLegalFullName}
            onChange={handleFullNameChange} // Pass the onChange handler
          />
        </div>

        {/* Row 5 Centered */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "15px",
          }}
        >
          <div style={{ marginRight: "10px" }}>
            <ButtonBack
              resetParentData={resetParentData}
              onClick={onPrevious}
            />
          </div>
          <div style={{ marginLeft: "10px" }}>
            <ButtonContinue
              disabled={isContinueDisabled}
              label="Continue"
              onClick={onNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPC6;
