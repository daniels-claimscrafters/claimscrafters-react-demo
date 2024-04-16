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
import TextSalesTax from './TextSalesTax';
import TextDepreciation from './TextDepreciation';
import InputFieldSalesTax from './InputFieldSalesTax';
import DropdownDepreciation from './DropdownDepreciation';
import CardSalesTax from './CardSalesTax';
import CardDepreciation from './CardDepreciation';
import ButtonBack from './ButtonBack';
import ButtonContinue from './ButtonContinue';
import TextCardHeaderSalesTax from './TextCardHeaderSalesTax';
import TextCardBodySalesTax from './TextCardBodySalesTax';
import TextCardHeaderDepreciation from './TextCardHeaderDepreciation';
import TextCardBodyDepreciation from './TextCardBodyDepreciation';

const NPC3 = (props) => {
  const { npcData, onInputChange, onNext, onPrevious } = props;
  console.log("npcData:", npcData);
  const isContinueDisabled = !npcData.salesTax || !npcData.depreciationRange || npcData.depreciationRange === "Please Select";
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

    return (
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', alignItems: 'center' }}>
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
  <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
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
      <CardCircleMain>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Text3 style={{ margin: 0 }}>3</Text3>
        </div>
      </CardCircleMain>
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
      {/* New Middle Section */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '80%', marginTop: '10px' }}>
        {/* Left Column: Sales Tax */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px', height: '150px' }}>
          <TextSalesTax />
          <div >
            <InputFieldSalesTax
              value={npcData.salesTax}
              onChange={onInputChange}
            />
            {/* Icon for Sales Tax Popup */}
            <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer', // Add cursor pointer to indicate clickability
  }} onClick={handleSalesTaxIconClick}>
              {isSalesTaxPopupOpen ? "Close ▲" : "What's this? ▼"}
            </div>
          </div>
          {/* Popup for Sales Tax */}
        </div>

        {/* Right Column: Depreciation */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '10px', height: '150px' }}>
          <TextDepreciation />
          <div style={{ marginBottom: '20px' }}>
            <DropdownDepreciation
              value={npcData.depreciationRange}
              onChange={onInputChange}
            />
            {/* Icon for Depreciation Popup */}
            <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer', // Add cursor pointer to indicate clickability
  }}onClick={handleDepreciationIconClick}>
              {isDepreciationPopupOpen ? "Close ▲" : "What's this? ▼"}
            </div>
          </div>
          {/* Popup for Depreciation */}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {/* Render CardSalesTax if isSalesTaxPopupOpen is true */}
        {isSalesTaxPopupOpen && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CardSalesTax>
              <TextCardHeaderSalesTax />
              <TextCardBodySalesTax />
            </CardSalesTax>
          </div>
        )}
        {/* Render CardDepreciation if isDepreciationPopupOpen is true */}
        {isDepreciationPopupOpen && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CardDepreciation>
              <TextCardHeaderDepreciation />
              <TextCardBodyDepreciation />
            </CardDepreciation>
          </div>
        )}
      </div>

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
  
export default NPC3;