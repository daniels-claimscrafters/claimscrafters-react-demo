import React, { useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./NPC5.css";

import HorizontalDivider from "./HorizontalDivider";
import PreviewData from "./PreviewData";
import ButtonBack from "./ButtonBack";
import ButtonContinue from "./ButtonContinue";
import TextCardButton from "./TextCardButton.jsx";
import CardButton from "./CardButton.jsx";

// Modal component for the tutorial prompt with inline styles
const TutorialModal = ({ onClose, onYes }) => {
  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    content: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      width: "300px",
      color: "#000",
    },
    button: {
      margin: "10px",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    },
    buttonYes: {
      backgroundColor: "#132A58",
      color: "#fff",
    },
    buttonNo: {
      backgroundColor: "#ccc",
      color: "#000",
    },
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Would you like a tutorial on how to upload your data?</h2>
        <div>
          <button
            style={{ ...modalStyles.button, ...modalStyles.buttonYes }}
            onClick={onYes}
          >
            YES
          </button>
          <button
            style={{ ...modalStyles.button, ...modalStyles.buttonNo }}
            onClick={onClose}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

const NPC5 = ({
  npcData,
  resetParentData,
  onNext,
  onPrevious,
  onColumnsSelected,
}) => {
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(true);

  const handleColumnsSelected = (selectedColumns) => {
    console.log("Selected Columns:", selectedColumns);
    onColumnsSelected(selectedColumns);
  };

  const isContinueDisabled = npcData.selectedColumnsData.length === 0;

  const handleToHome = () => {
    navigate("/pmhs");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleYesClick = () => {
    window.open("https://app2.getreprise.com/launch/ZXBoMyv/", "_blank");
    handleCloseModal();
};

  useEffect(() => {
    // Modal will be visible on initial load
    setModalVisible(true);
  }, []);

  return (
    <div className="npc5Div">
      {isModalVisible && <TutorialModal onClose={handleCloseModal} onYes={handleYesClick} />}
      <div className="npc5">
        <div>
          <img className="logoImg" src="ContentsIQ.png" alt="" />
          <div style={{ marginLeft: "10px" }}>
            <h3>New Project Creation</h3>
          </div>
        </div>
        <div onClick={handleToHome}>
          <AiFillHome />
        </div>
      </div>

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
          
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
          <div style={{ marginRight: "10px" }}>
          <ButtonBack resetParentData={resetParentData} onBack={onPrevious} />
          </div>
          <div>
            <ButtonContinue
              onClick={onNext}
              disabled={isContinueDisabled}
              text="Continue"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPC5;
