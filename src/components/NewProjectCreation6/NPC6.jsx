// npc6.jsx
import React, { useState } from 'react';
import CardCircle from './CardCircle';
import CardCircleMain from './CardCircleMain';
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
import TextLossDetails from './TextLossDetails';
import TextPayment from './TextPayment';
import TextProvidePersonal from './TextProvidePersonal';
import ButtonContinue from './ButtonContinue';
import ButtonBack from './ButtonBack';
import Checkbox from './Checkbox';
import InputFieldFullName from './InputFieldFullName';
import TextBody from './TextBody';
import TextCheckbox from './TextCheckbox';
import TextHeader2 from './TextHeader2';
import TextSubtitle from './TextSubtitle';
import ImageFooterLogo from './ImageFooterLogo';
import CardFooterBackground from './CardFooterBackground';


const NPC6 = ({ npcData, onInputChange, onNext, onPrevious, resetParentData }) => {
  const [didAcceptLegal, setDidAcceptLegal] = useState(false);
  const [acceptLegalFullName, setAcceptLegalFullName] = useState('');
  const [isInputFieldPopulated, setIsInputFieldPopulated] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);


  const handleCheckboxChange = (isChecked, event) => {
    setDidAcceptLegal(isChecked);
    setIsCheckboxChecked(isChecked);
    // Update npcData directly in NPC6
    onInputChange('didAcceptLegal', isChecked);
  };
  
  
  const handleFullNameChange = (newValue) => {
    // Check if newValue has at least two characters
    if (newValue.length >= 2) {
      setAcceptLegalFullName(newValue);
      setIsInputFieldPopulated(true); // If newValue has at least two characters, set to true
      onInputChange('acceptLegalFullName', newValue);
    } else {
      setAcceptLegalFullName(newValue);
      setIsInputFieldPopulated(false); // If newValue has less than two characters, set to false
      // Optionally, you can clear the input field or show an error message here
      // You can add your logic here depending on your requirements
    }
  };

  const isContinueDisabled = !(isInputFieldPopulated && isCheckboxChecked);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      {/* Row 1 */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ImageLogo />
          <div style={{ marginLeft: '10px' }}>
            <TextHeader />
          </div>
        </div>
        <div style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
          <IconHome />
        </div>
      </div>

     {/* Row 2 Centered */}
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '10px', marginBottom: '10px' }}>
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
      <CardCircle>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Text4 style={{ margin: 0 }}>4</Text4>
        </div>
      </CardCircle>
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
      <CardCircleMain>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Text6 style={{ margin: 0 }}>6</Text6>
        </div>
      </CardCircleMain>
      <TextPayment />
    </div>
  
    <HorizontalDivider />
  </div>

  <div style={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  {/* Row 3 Centered */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
    {/* TextBody */}
    <TextBody />
  </div>

  {/* Row 4 Centered */}
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '20px' }}>
      <Checkbox checked={didAcceptLegal} onChange={handleCheckboxChange} />
      <TextCheckbox />
    </div>
    <InputFieldFullName 
      value={acceptLegalFullName} 
      onChange={handleFullNameChange} // Pass the onChange handler
    />
  </div>

  {/* Row 5 Centered */}
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '15px' }}>
    <div style={{ marginRight: '10px' }}>
      <ButtonBack resetParentData={resetParentData} onClick={onPrevious} />
    </div>
    <div style={{ marginLeft: '10px' }}>
      <ButtonContinue disabled={isContinueDisabled} label="Continue" onClick={onNext} />
    </div>
  </div>
</div>
</div>
  );
};

export default NPC6;