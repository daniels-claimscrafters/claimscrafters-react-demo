// NPC7.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardNumberOfLines from './CardNumberOfLines';
import ButtonPay from './ButtonPay';
import CardPriceBreakdown from './CardPriceBreakdown';
import CardPricing from './CardPricing';
import IconHome from './IconHome';
import ImageLogo from './ImageLogo';
import InputFieldCardholderName from './InputFieldCardholderName';
import InputFieldCardNumber from './InputFieldCardNumber';
import InputFieldCVV from './InputFieldCVV';
import InputFieldExpiration from './InputFieldExpiration';
import TextCardholderName from './TextCardholderName';
import TextCardNumber from './TextCardNumber';
import TextCVV from './TextCVV';
import TextExpiration from './TextExpiration';
import TextHeader from './TextHeader';
import TextHeader2 from './TextHeader2';
import TextHeader3 from './TextHeader3';
import TextHeader4 from './TextHeader4';
import TextNumberOfLinesHeader from './TextNumberOfLinesHeader';
import TextNumberOfLinesNum from './TextNumberOfLinesNum';
import TextNumberOfLinesSubheader from './TextNumberOfLinesSubheader';
import TextPricingHeader from './TextPricingHeader';
import TextPricingNum from './TextPricingNum';
import TextPricingSubHeader from './TextPricingSubHeader';
import TextSubheader4 from './TextSubheader4';
import TextStripeEmail from './TextStripeEmail';
import InputFieldStripeEmail from './InputFieldStripeEmail';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51NiiAZCjhYpSpOvRGjQmKbqADIMOaR1nvbnfy4UNdQ7d39Y9hkuMth2JT7WicwuuxcYDHLfCjBmJ7X5HYDLNMw2B00OpdnRxnO');

const NPC7 = ({ updateLoadingState, npcData, onInputChange, onPrevious, numberOfLines, onSubmit }) => {
  // Define state variables to hold the total price and credit card information
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState(false);
  const [useTestMode, setUseTestMode] = useState(true);
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardholderName: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
    stripeEmail: '',
  });

  const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const areAllFieldsFilled = () => {
    // Check if all the necessary fields in npcData are filled
    const allFieldsFilled =
      npcData.cardholderName.trim() !== '' &&
      npcData.cardNumber.trim() !== '' &&
      npcData.expiration.trim() !== '' &&
      npcData.cvv.trim() !== '' &&
      npcData.stripeEmail.trim() !== '' &&

      !validationErrors;

      console.log(allFieldsFilled);

      return allFieldsFilled;
  };

  const updateValidationErrors = (hasErrors) => {
    setValidationErrors(hasErrors);
  };

  useEffect(() => {
    // Update npcData with the total price whenever it changes
    onInputChange('price', totalPrice);
  }, [totalPrice]);

  const handleBlur = (name) => {
    // You can implement your validation logic here
    console.log(`Input blurred for field: ${name}`);
    // Implement your validation logic here
  };

  // Define functions to handle input changes for each field
  const handleInputChange = (name, value) => {
    // Update npcData with credit card information
    onInputChange(name, value);
  };

  const handleSubmit1 = async (paymentMethodId, updatedNpcData) => {
    // Call your server-side endpoint to complete the payment
    try {
      const response = await fetch(`${API_URL}/npc/charge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethodId, updatedNpcData, useTestMode }), // Include npcData in the request body
      });
      if (response.ok) {
        // Payment successful, handle success case
        console.log('Payment successful!');
        //updateLoadingState(true);
        //setTimeout(() => {navigate('/pmhs');}, 10000);
      } else {
        // Payment failed, handle error case
        const errorData = await response.json();
        console.error('Payment failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  // Define a function to calculate the total price based on the number of lines
  const calculateTotalPrice = (numberOfLines) => {
    let totalPrice = 0;
    if (numberOfLines <= 100) {
      totalPrice = 250.00;
    } else if (numberOfLines <= 300) {
      totalPrice = 250.00 + (numberOfLines - 100) * 2.25;
    } else if (numberOfLines <= 500) {
      totalPrice = 250.00 + 200 * 2.25 + (numberOfLines - 300) * 2.00;
    } else if (numberOfLines <= 700) {
      totalPrice = 250.00 + 200 * 2.25 + 200 * 2.00 + (numberOfLines - 500) * 1.75;
    } else if (numberOfLines <= 900) {
      totalPrice = 250.00 + 200 * 2.25 + 200 * 2.00 + 200 * 1.75 + (numberOfLines - 700) * 1.50;
    } else {
      totalPrice = 250.00 + 200 * 2.25 + 200 * 2.00 + 200 * 1.75 + 200 * 1.50 + (numberOfLines - 900) * 1.25;
    }
    return totalPrice.toFixed(2); // Round the total price to 2 decimal places
  };

  // Update the total price whenever the number of lines changes
  useEffect(() => {
    const newTotalPrice = calculateTotalPrice(numberOfLines);
    setTotalPrice(newTotalPrice);
  }, [numberOfLines]); 

  return (
    <div style={{ height: '100vh', minHeight: '720px', minWidth: '1280px'  }}>
      {/* Header Content */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
          <ImageLogo />
        </div>
        <div>
          <TextHeader />
        </div>
        <div>
          <IconHome onPrevious={onPrevious}/>
        </div>
      </div>

      <div style={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  {/* Two Columns */}
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', maxWidth: '100%' }}>
      {/* Left Side Column */}
      <div style={{ flex: 1, marginRight: '10px' }}>
        <TextHeader2 />
        <CardNumberOfLines>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%',  }}>
            <div>
              <TextNumberOfLinesHeader />
              <TextNumberOfLinesSubheader />
            </div>
            <TextNumberOfLinesNum numberOfLines={npcData.numberOfLines} />
          </div>
        </CardNumberOfLines>
        <CardPricing>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%',  }}>
            <div>
              <TextPricingHeader />
              <TextPricingSubHeader />
            </div>
            <TextPricingNum totalPrice={totalPrice} />
          </div>
        </CardPricing>
        <CardPriceBreakdown />
      </div>

      {/* Right Side Column */}
      <div style={{ flex: 1, marginLeft: '10px' }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm handleSubmit={handleSubmit1} npcData={npcData} />
        </Elements>
      </div>
    </div>
  </div>
</div>
</div>

  );
};

export default NPC7;