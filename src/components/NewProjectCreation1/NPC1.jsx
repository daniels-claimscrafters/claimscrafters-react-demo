//NPC1.jsx

import React, { useState } from 'react';
import ButtonContinue from './ButtonContinue';
import CardCircle from './CardCircle';
import CardCircleMain from './CardCircleMain';
import DropdownLossState from './DropdownLossState';
import HorizontalDivider from './HorizontalDivider';
import IconHome from './IconHome';
import ImageLogo from './ImageLogo';
import InputFieldClaimNumber from './InputFieldClaimNumber';
import InputFieldDateofLoss from './InputFieldDateofLoss';
import InputFieldFirstName from './InputFieldFirstName';
import InputFieldLastName from './InputFieldLastName';
import InputFieldLossAddress from './InputFieldLossAddress';
import InputFieldLossCity from './InputFieldLossCity';
import InputFieldLossPostalCode from './InputFieldLossPostalCode';
import Text1 from './Text1';
import Text2 from './Text2';
import Text3 from './Text3';
import Text4 from './Text4';
import Text5 from './Text5';
import Text6 from './Text6';
import TextAdditional from './TextAdditional';
import TextClaimNumber from './TextClaimNumber';
import TextDateOfLoss from './TextDateOfLoss';
import TextFinancialInputs from './TextFinancialInputs';
import TextHeader from './TextHeader';
import TextHeader2 from './TextHeader2';
import TextInsuredFirstName from './TextInsuredFirstName';
import TextInsuredInformation from './TextInsuredInformation';
import TextInsuredLastName from './TextInsuredLastName';
import TextLossAddress from './TextLossAddress';
import TextLossCity from './TextLossCity';
import TextLossDetails from './TextLossDetails';
import TextLossPostalCode from './TextLossPostalCode';
import TextLossState from './TextLossState';
import TextPayment from './TextPayment';
import TextProvidePersonal from './TextProvidePersonal';
import TextSubheader from './TextSubheader';
import ImageFooterLogo from './ImageFooterLogo';
import CardFooterBackground from './CardFooterBackground';

const NPC1 = (props) => {
  const { npcData, onInputChange, onNext } = props;
  const [validationErrors, setValidationErrors] = useState(false);
  // Function to update validationErrors
  const updateValidationErrors = (hasErrors) => {
    setValidationErrors(hasErrors);
  };

  const areAllFieldsFilled = () => {
    // Check if all the necessary fields in npcData are filled
    const allFieldsFilled =
      npcData.claimNumber.trim() !== '' &&
      npcData.dateOfLoss.trim() !== '' &&
      npcData.insuredFirstName.trim() !== '' &&
      npcData.insuredLastName.trim() !== '' &&
      npcData.lossAddress.trim() !== '' &&
      npcData.lossCity.trim() !== '' &&
      npcData.lossState.trim() !== '' &&
      npcData.lossPostalCode.trim() !== '' &&
      !validationErrors;
  
    console.log('All fields filled:', allFieldsFilled);
    console.log('NPC Data:', npcData);
  
    return allFieldsFilled;
  };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh'  }}>
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
    <CardCircleMain >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <Text1 style={{ margin: 0 }}>1</Text1>
      </div>
    </CardCircleMain>
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



      {/* Financial Inputs Section */}
<div style={{ width: '100%', height: '80vh', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
  {/* Input Fields Section */}
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
    {/* Claim Number and Date of Loss */}
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
      <div style={{ marginRight: '20px' }}>
        <TextClaimNumber />
        <InputFieldClaimNumber
          value={npcData.claimNumber}
          onChange={onInputChange}
          updateValidationErrors={updateValidationErrors}
        />
      </div>
      <div>
        <TextDateOfLoss />
        <InputFieldDateofLoss
          value={npcData.dateOfLoss}
          onChange={onInputChange}
          updateValidationErrors={updateValidationErrors}
        />
      </div>
    </div>

    {/* Insured Information */}
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
      <div style={{ marginRight: '20px' }}>
        <TextInsuredFirstName />
        <InputFieldFirstName 
          value={npcData.insuredFirstName}
          onChange={onInputChange}
          updateValidationErrors={updateValidationErrors}
        />
      </div>
      <div>
        <TextInsuredLastName />
        <InputFieldLastName 
          value={npcData.insuredLastName}
          onChange={onInputChange}
          updateValidationErrors={updateValidationErrors}
        />
      </div>
    </div>

    {/* Loss Information */}
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
      <div style={{ marginBottom: '10px' }}>
        <TextLossAddress />
        <InputFieldLossAddress 
          value={npcData.lossAddress}
          onChange={onInputChange}
          updateValidationErrors={updateValidationErrors}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '30px' }}>
        <div style={{ marginRight: '20px' }}>
          <TextLossCity />
          <InputFieldLossCity 
            value={npcData.lossCity}
            onChange={onInputChange}
            updateValidationErrors={updateValidationErrors}
          />
        </div>
        <div style={{ marginRight: '20px' }}>
          <TextLossState />
          <DropdownLossState 
            value={npcData.lossState}
            onChange={onInputChange}
            updateValidationErrors={updateValidationErrors}
          />
        </div>
        <div>
        <TextLossPostalCode />
        <InputFieldLossPostalCode 
          value={npcData.lossPostalCode}
          onChange={onInputChange}
          updateValidationErrors={updateValidationErrors}
        />
      </div>
      </div>
      
    </div>
  </div>

  {/* Continue Button */}
  <ButtonContinue label="Continue" onClick={onNext} disabled={!areAllFieldsFilled()} />
</div>
</div>
  );
};
  
export default NPC1;