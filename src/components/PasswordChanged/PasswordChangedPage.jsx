// PasswordResetPage.jsx

import React from 'react';
import Button from './Button';
import IconMain from './IconMain';
import ImageMain from './ImageMain';
import Text1 from './Text1';
import Text2 from './Text2';
import TextHeader from './TextHeader';

const PasswordResetPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ margin: '10px' }}>
        <ImageMain />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <IconMain />
        <TextHeader />
        <Text1 />
        <Text2 />
        <Button />
      </div>
    </div>
  );
};

export default PasswordResetPage;