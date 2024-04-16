import React, { useState } from 'react';
import CardCircleMain from './CardCircleMain';
import CardCircle from './CardCircle';
import HorizontalDivider from './HorizontalDivider';
import IconHome from './IconHome';
import ImageLogo from './ImageLogo';
import Text1 from './Text1';
import Text2 from './Text2';
import Text3 from './Text3';
import Text4 from './Text4';
import Text5 from './Text5';
import Text6 from './Text6';
import TextAdditional from './TextAdditional';
import TextFinancialInputs from './TextFinancialInputs';
import TextHeader from './TextHeader';
import TextInsuredInformation from './TextInsuredInformation';
import TextInstructions from './TextInstructions';
import TextLossDetails from './TextLossDetails';
import TextPayment from './TextPayment';
import TextProvidePersonal from './TextProvidePersonal';
import TextSubheader from './TextSubheader';
import TextHeader2 from './TextHeader2';
import ImageFooterLogo from './ImageFooterLogo';
import CardFooterBackground from './CardFooterBackground';
import IconUpload from './IconUpload';
import ButtonUpload from './ButtonUpload';
import TextUpload from './TextUpload';
import ButtonBack from './ButtonBack';
import ButtonContinue from './ButtonContinue';
import CardUpload from './CardUpload';
import CardSubupload from './CardSubupload';
import ButtonTemplate from './ButtonTemplate';
import { motion } from "framer-motion";

const NPC4 = (props) => {
  const { npcData, onInputChange, onNext, onPrevious } = props;
  const [fileName, setFileName] = useState('');
  const isContinueDisabled = !npcData.spreadsheetUpload;
  const [animationKey, setAnimationKey] = useState(0);
  const handleFileUpload = (uploadedFile, fileContent) => {
    // Handle the file upload logic here
    
    console.log('File name uploaded in NPC4:', uploadedFile);

    setFileName(uploadedFile);
  
    // Pass both the file name and content to the parent component
    props.onFileUpload(uploadedFile, fileContent);

    // Increment the animation key to trigger animation
    setAnimationKey(prevKey => prevKey + 1);
  };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', height: '100vh' }}>
        {/* Row 1 */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Assuming ImageLogo, TextHeader, and other components */}
            <ImageLogo />
            <div style={{ marginLeft: '10px' }}>
              <TextHeader />
              {/* Other components go here */}
            </div>
          </div>
          <div style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
            <IconHome />
          </div>
        </div>
  
        {/* Row 2 Centered */}
  <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
    <HorizontalDivider />
  
    {/* Card Circle 1 */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardCircle>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Text1 style={{ margin: 0 }}>1</Text1>
        </div>
      </CardCircle>
      <TextInsuredInformation />
    </div>
  
    <HorizontalDivider />
  
    {/* Card Circle 2 */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardCircle>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Text2 style={{ margin: 0 }}>2</Text2>
        </div>
      </CardCircle>
      <TextLossDetails />
    </div>
  
    <HorizontalDivider />
  
    {/* Card Circle 3 */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardCircle>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Text3 style={{ margin: 0 }}>3</Text3>
        </div>
      </CardCircle>
      <TextFinancialInputs />
    </div>
  
    <HorizontalDivider />
  
    {/* Card Circle 4 */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardCircleMain>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Text4 style={{ margin: 0 }}>4</Text4>
        </div>
      </CardCircleMain>
      <TextProvidePersonal />
    </div>
  
    <HorizontalDivider />
  
    {/* Card Circle 5 */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardCircle>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Text5 style={{ margin: 0 }}>5</Text5>
        </div>
      </CardCircle>
      <TextAdditional />
    </div>
  
    <HorizontalDivider />
  
    {/* Card Circle 6 */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardCircle>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Text6 style={{ margin: 0 }}>6</Text6>
        </div>
      </CardCircle>
      <TextPayment />
    </div>
  
    <HorizontalDivider />
  </div>

  <div style={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  {/* New Section with TextHeader2 and TextSubtitle */}
  <ButtonTemplate />
  <CardUpload onFileUpload={handleFileUpload} onClick={() => console.log('CardUpload clicked in NPC4')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <CardSubupload />

    {/* Flex container for centering with adjusted vertical position */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '10px'}}>
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
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '80%', marginTop: '20px' }}>
    <div style={{ marginRight: '5px' }}>
      <ButtonBack label="Back" onClick={onPrevious}/>
    </div>
    <div style={{ marginLeft: '5px' }}>
      <ButtonContinue label="Continue" onClick={onNext} disabled={isContinueDisabled} />
    </div>
  </div>

  {/* Footer Section */}
</div>
</div>
  );
};
  
export default NPC4;