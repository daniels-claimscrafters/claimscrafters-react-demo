// NPC2.jsx
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
import TextSubheader from './TextSubheader';
import TextHeader2 from './TextHeader2';
import ImageFooterLogo from './ImageFooterLogo';
import CardFooterBackground from './CardFooterBackground';
import TextCarrier from './TextCarrier';
import TextLossType from './TextLossType';
import InputFieldCarrier from './InputFieldCarrier';
import DropdownLossType from './DropdownLossType';
import InputFieldAdjusterFirstName from './InputFieldAdjusterFirstName';
import InputFieldAdjusterLastName from './InputFieldAdjusterLastName';
import TextAdjusterPhone from './TextAdjusterPhone';
import TextAdjusterEmail from './TextAdjusterEmail';
import InputFieldAdjusterPhone from './InputFieldAdjusterPhone';
import InputFieldAdjusterEmail from './InputFieldAdjusterEmail';
import ButtonBack from './ButtonBack';
import ButtonContinue from './ButtonContinue';
import TextAdjusterFirstName from './TextAdjusterFirstName';
import TextAdjusterLastName from './TextAdjusterLastName';

const NPC2 = (props) => {
  const { npcData, onInputChange, onNext, onPrevious } = props;
  const [validationErrors, setValidationErrors] = useState(false);
  // Function to update validationErrors
  const updateValidationErrors = (hasErrors) => {
    setValidationErrors(hasErrors);
  };

  const areAllFieldsFilled = () => {
    // Check if all the necessary fields in npcData are filled
    const allFieldsFilled =
      npcData.lossType.trim() !== '' &&
      npcData.carrier.trim() !== '' &&
      npcData.adjusterFirstName.trim() !== '' &&
      npcData.adjusterLastName.trim() !== '' &&
      npcData.adjusterPhone.trim() !== '' &&
      npcData.adjusterEmail.trim() !== '' &&

      !validationErrors;

      return allFieldsFilled;
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
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
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
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
    <CardCircleMain>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <Text2 style={{ margin: 0 }}>2</Text2>
      </div>
    </CardCircleMain>
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
    <CardCircle>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <Text6 style={{ margin: 0 }}>6</Text6>
      </div>
    </CardCircle>
    <TextPayment />
  </div>

  <HorizontalDivider />
</div>

      {/* New Section with TextHeader2 and TextSubtitle */}
      

      <div style={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {/* Form Section */}
      <form style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center', marginTop: '20px' }}>
        {/* Loss Type and Carrier Information Section */}
        <div style={{ flex: '48%', padding: '10px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>
            <TextLossType />
            <DropdownLossType 
              value={npcData.lossType}
              onChange={onInputChange}
            />
          </div>
          <div>
            <TextCarrier />
            <InputFieldCarrier 
              value={npcData.carrier}
              onChange={onInputChange}
            />
          </div>
        </div>

        {/* Adjuster Information Section */}
        <div style={{ flex: '100%', padding: '10px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>
            <TextAdjusterFirstName />
            <InputFieldAdjusterFirstName 
              value={npcData.adjusterFirstName}
              onChange={onInputChange}
            />
          </div>
          <div>
            <TextAdjusterLastName />
            <InputFieldAdjusterLastName 
              value={npcData.adjusterLastName}
              onChange={onInputChange}
            />
          </div>
        </div>

        {/* Other Adjuster Information Fields */}
        <div style={{ flex: '100%', padding: '10px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>
            <TextAdjusterPhone />
            <InputFieldAdjusterPhone 
              value={npcData.adjusterPhone}
              onChange={onInputChange}
              updateValidationErrors={updateValidationErrors}
            />
          </div>
          <div>
            <TextAdjusterEmail />
            <InputFieldAdjusterEmail 
              value={npcData.adjusterEmail}
              onChange={onInputChange}
              updateValidationErrors={updateValidationErrors}
            />
          </div>
        </div>

        {/* Buttons for navigation with spacing */}
        <div style={{ flex: '100%', padding: '10px', display: 'flex', justifyContent: 'center' }}>
          <ButtonBack label="Back" onClick={onPrevious}/>
          <div style={{ marginRight: '10px' }} />
          <ButtonContinue label="Continue" onClick={onNext} disabled={!areAllFieldsFilled()} />
        </div>
      </form>

      {/* Footer Section */}
    </div>
    </div>
  );
};

export default NPC2;
