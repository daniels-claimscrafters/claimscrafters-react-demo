import React, { useState } from "react";
import "./NPC3.css";

import HorizontalDivider from "./HorizontalDivider";
import { AiFillHome } from "react-icons/ai";

import InputFieldSalesTax from "./InputFieldSalesTax";
import DropdownDepreciation from "./DropdownDepreciation";
import CardSalesTax from "./CardSalesTax";
import CardDepreciation from "./CardDepreciation";
import ButtonBack from "./ButtonBack";
import ButtonContinue from "./ButtonContinue";
import TextCardHeaderSalesTax from "./TextCardHeaderSalesTax";
import TextCardBodySalesTax from "./TextCardBodySalesTax";
import TextCardHeaderDepreciation from "./TextCardHeaderDepreciation";
import TextCardBodyDepreciation from "./TextCardBodyDepreciation";
import { useNavigate } from "react-router-dom";

const NPC3 = (props) => {
  const navigate = useNavigate();
  const { npcData, onInputChange, onNext, onPrevious } = props;
  console.log("npcData:", npcData);
  const isContinueDisabled =
    !npcData.salesTax ||
    !npcData.depreciationRange ||
    npcData.depreciationRange === "Please Select";
  console.log("salesTax:", npcData.salesTax);
  console.log("deprecationRange:", npcData.deprecationRange);
  console.log("isContinueDisabled:", isContinueDisabled);

  const [isSalesTaxPopupOpen, setIsSalesTaxPopupOpen] = useState(false);
  const [isDepreciationPopupOpen, setIsDepreciationPopupOpen] = useState(false);

  const handleSalesTaxIconClick = () => {
    setIsSalesTaxPopupOpen(!isSalesTaxPopupOpen);
    // Close the Depreciation popup if it's open
    setIsDepreciationPopupOpen(false);
  };

  const handleDepreciationIconClick = () => {
    setIsDepreciationPopupOpen(!isDepreciationPopupOpen);
    // Close the Sales Tax popup if it's open
    setIsSalesTaxPopupOpen(false);
  };
  const handleToHome = () => {
    navigate("/pmhs");
  };

  return (
    <div className="npc3FormCreation">
      {/* Row 1 */}
      <div className="npc3">
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
              background: "white",
              color: "#132A58",
              fontWeight: "bold",
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {/* New Middle Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            margin: "auto",
          }}
        >
          {/* Left Column: Sales Tax */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "150px",
              width: "80%",
            }}
          >
            {/* <TextSalesTax /> */}
            <label htmlFor="tax">Sales Tax %</label>
            <div style={{ width: "100%" }}>
              <InputFieldSalesTax
                value={npcData.salesTax}
                onChange={onInputChange}
              />
              {/* Icon for Sales Tax Popup */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  cursor: "pointer", // Add cursor pointer to indicate clickability
                }}
                onClick={handleSalesTaxIconClick}
              >
                {isSalesTaxPopupOpen ? "Close ▲" : "What's this? ▼"}
              </div>
            </div>
            {/* Popup for Sales Tax */}
          </div>

          {/* Right Column: Depreciation */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              height: "150px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                height: "150px",
                width: "80%",
              }}
            >
              <label htmlFor="depreciation">Depreciation Range</label>
              <div>
                <DropdownDepreciation
                  value={npcData.depreciationRange}
                  onChange={onInputChange}
                />
                {/* Icon for Depreciation Popup */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    cursor: "pointer", // Add cursor pointer to indicate clickability
                  }}
                  onClick={handleDepreciationIconClick}
                >
                  {isDepreciationPopupOpen ? "Close ▲" : "What's this? ▼"}
                </div>
              </div>
            </div>
            {/* Popup for Depreciation */}
          </div>
        </div>

        <div>
          {/* Render CardSalesTax if isSalesTaxPopupOpen is true */}
          {isSalesTaxPopupOpen && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <CardSalesTax>
                <TextCardHeaderSalesTax />
                <TextCardBodySalesTax />
              </CardSalesTax>
            </div>
          )}
          {/* Render CardDepreciation if isDepreciationPopupOpen is true */}
          {isDepreciationPopupOpen && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <CardDepreciation>
                <TextCardHeaderDepreciation />
                <TextCardBodyDepreciation />
              </CardDepreciation>
            </div>
          )}
        </div>

        {/* Third Row: Buttons with 10px spacing */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            marginTop: "20px",
          }}
        >
          <div style={{ marginRight: "5px" }}>
            <ButtonBack label="Back" onClick={onPrevious} />
          </div>
          <div style={{ marginLeft: "5px" }}>
            <ButtonContinue
              label="Continue"
              onClick={onNext}
              disabled={isContinueDisabled}
            />
          </div>
        </div>

        {/* Footer Section */}
      </div>
    </div>
  );
};

export default NPC3;
