// NPC5.jsx
import React from "react";
import "./NPC5.css";

import HorizontalDivider from "./HorizontalDivider";

import TextAdditional from "./TextAdditional";
import TextFinancialInputs from "./TextFinancialInputs";
import TextInsuredInformation from "./TextInsuredInformation";
import TextLossDetails from "./TextLossDetails";
import TextPayment from "./TextPayment";
import TextProvidePersonal from "./TextProvidePersonal";

import TextCardButton from "./TextCardButton.jsx";
import ImageMain from "./ImageMain.jsx";
import TextMain from "./TextMain.jsx";
import CardButton from "./CardButton.jsx";

import ButtonBack from "./ButtonBack";
import ButtonContinue from "./ButtonContinue";
import PreviewData from "./PreviewData";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const NPC5 = ({
  npcData,
  resetParentData,
  onNext,
  onPrevious,
  onColumnsSelected,
}) => {
  const navigate = useNavigate();
  console.log("NPC5 - Excel Data:", npcData.spreadsheetUpload);
  const handleColumnsSelected = (selectedColumns) => {
    // Handle the selected columns data in NPC5 or pass it to NPCParentComponent
    console.log("Selected Columns:", selectedColumns);
    onColumnsSelected(selectedColumns);
  };

  const isContinueDisabled = npcData.selectedColumnsData.length === 0;
  const handleToHome = () => {
    navigate("/pmhs");
  };
  return (
    <div className="npc5Div">
      {/* Row 1 */}
      <div className="npc5">
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
              background: "white",
              color: "#132A58",
              fontWeight: "bold",
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
      <div
        style={{
          height: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* New Section with TextHeader2 and TextSubtitle */}
        <PreviewData
          excelData={npcData.spreadsheetUpload}
          onColumnsSelected={handleColumnsSelected}
          resetParentData={resetParentData}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
            padding: "20px",
          }}
        >
          {" "}
          {/* Container for TextMain and CardButton */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            {" "}
            {/* Flex container for TextMain */}
            <TextMain />
          </div>
          <CardButton
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <TextCardButton text={npcData.numberOfLines.toString()} />
            </div>
          </CardButton>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            marginTop: "10px",
          }}
        >
          <div style={{ marginRight: "5px" }}>
            <ButtonBack resetParentData={resetParentData} onBack={onPrevious} />
          </div>
          <div style={{ marginLeft: "5px" }}>
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

export default NPC5;
