// NPC5.jsx
import React from 'react';
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
import TextLossDetails from './TextLossDetails';
import TextPayment from './TextPayment';
import TextProvidePersonal from './TextProvidePersonal';
import TextSubheader from './TextSubheader';
import TextHeader2 from './TextHeader2';
import TextCardButton from './TextCardButton.jsx';
import ImageMain from './ImageMain.jsx';
import TextMain from './TextMain.jsx';
import CardButton from './CardButton.jsx';
import ImageFooterLogo from './ImageFooterLogo';
import CardFooterBackground from './CardFooterBackground';
import ButtonBack from './ButtonBack';
import ButtonContinue from './ButtonContinue';
import PreviewData from './PreviewData';

const NPC5 = ({ npcData, resetParentData, onNext, onPrevious, onColumnsSelected }) => {
    console.log('NPC5 - Excel Data:', npcData.spreadsheetUpload);
    const handleColumnsSelected = (selectedColumns) => {
      // Handle the selected columns data in NPC5 or pass it to NPCParentComponent
      console.log('Selected Columns:', selectedColumns);
      onColumnsSelected(selectedColumns);
    };
    
    const isContinueDisabled = npcData.selectedColumnsData.length === 0;


    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', minHeight: '720px', minWidth: '1280px' }}>
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
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
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
      <CardCircleMain>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Text5 style={{ margin: 0 }}>5</Text5>
        </div>
      </CardCircleMain>
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
  <div style={{ height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  {/* New Section with TextHeader2 and TextSubtitle */}
  <PreviewData
    excelData={npcData.spreadsheetUpload}
    onColumnsSelected={handleColumnsSelected}
    resetParentData={resetParentData} 
  />

  <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}> {/* Container for TextMain and CardButton */}
    <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}> {/* Flex container for TextMain */}
      <TextMain />
    </div>
    <CardButton style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
        <TextCardButton text={npcData.numberOfLines.toString()} />
      </div>
    </CardButton>
  </div>

  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '80%', marginTop: '10px' }}>
    <div style={{ marginRight: '5px' }}>
      <ButtonBack resetParentData={resetParentData}  onBack={onPrevious} />
    </div>
    <div style={{ marginLeft: '5px' }}>
      <ButtonContinue disabled={isContinueDisabled} label="Continue" onClick={onNext} />
    </div>
  </div>
</div>
</div>
  );
};
  
export default NPC5;