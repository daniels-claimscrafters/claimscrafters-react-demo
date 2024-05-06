import React, { useState } from "react";
import "./NPC4.css";

import HorizontalDivider from "./HorizontalDivider";

import TextAdditional from "./TextAdditional";
import TextFinancialInputs from "./TextFinancialInputs";
import TextHeader from "./TextHeader";
import TextInsuredInformation from "./TextInsuredInformation";
import TextInstructions from "./TextInstructions";
import TextLossDetails from "./TextLossDetails";
import TextPayment from "./TextPayment";
import TextProvidePersonal from "./TextProvidePersonal";

import IconUpload from "./IconUpload";
import ButtonUpload from "./ButtonUpload";
import TextUpload from "./TextUpload";
import ButtonBack from "./ButtonBack";
import ButtonContinue from "./ButtonContinue";
import CardUpload from "./CardUpload";
import CardSubupload from "./CardSubupload";
import ButtonTemplate from "./ButtonTemplate";
import { motion } from "framer-motion";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const NPC4 = (props) => {
  const navigate = useNavigate();
  const { npcData, onInputChange, onNext, onPrevious } = props;
  const [fileName, setFileName] = useState("");
  const isContinueDisabled = !npcData.spreadsheetUpload;
  const [animationKey, setAnimationKey] = useState(0);
  const handleFileUpload = (uploadedFile, fileContent) => {
    // Handle the file upload logic here

    console.log("File name uploaded in NPC4:", uploadedFile);

    setFileName(uploadedFile);

    // Pass both the file name and content to the parent component
    props.onFileUpload(uploadedFile, fileContent);

    // Increment the animation key to trigger animation
    setAnimationKey((prevKey) => prevKey + 1);
  };
  const handleToHome = () => {
    navigate("/pmhs");
  };
  return (
    <div className="npc4FormCreation">
      {/* Row 1 */}
      <div className="npc4">
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
              background: "white",
              color: "#132A58",
              fontWeight: "bold",
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

      <div
        style={{
          height: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* New Section with TextHeader2 and TextSubtitle */}
        <ButtonTemplate />
        <CardUpload
          onFileUpload={handleFileUpload}
          onClick={() => console.log("CardUpload clicked in NPC4")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardSubupload />

          {/* Flex container for centering with adjusted vertical position */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <TextInstructions />
            <ButtonUpload />
            <motion.div
              key={animationKey} // Key to trigger animation when it changes
              initial={{ scale: 0 }} // Initial scale set to 0 (hidden)
              animate={{ scale: 1 }} // Animate to full scale
              exit={{ scale: 0 }} // Animate back to scale 0 when component exits
              transition={{ duration: 0.9 }} // Transition duration
            >
              <TextUpload fileName={fileName} />
            </motion.div>
          </div>
        </CardUpload>

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

export default NPC4;
