// CheckoutForm.jsx

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css'; // Import CSS file for custom styling

const CheckoutForm = ({ handleSubmit, npcData }) => {
  const [paymentError, setPaymentError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: ''
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: customerDetails.name,
        email: customerDetails.email,
      }
    });

    setLoading(false);

    if (error) {
      setPaymentError(error.message);
    } else {
      const updatedNpcData = {
        ...npcData,
        cardholderName: customerDetails.name,
        stripeEmail: customerDetails.email,
      };
      handleSubmit(paymentMethod.id, updatedNpcData);
      // Optionally, you can show a success message or redirect the user to a confirmation page.
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <img src="https://assets.api.uizard.io/api/cdn/stream/616c0541-6abe-4fb7-aedb-96cdcde8c0bd.png" alt="Your Image" className="image-above-card" />
        <label className="form-label" htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" className="card-element" />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="name">Cardholder Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={customerDetails.name}
          onChange={handleInputChange}
          className="form-input custom-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="email">Reciept Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={customerDetails.email}
          onChange={handleInputChange}
          className="form-input custom-input"
          required
        />
      </div>
      <button type="submit" className="submit-button" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {paymentError && <div className="error-message">{paymentError}</div>}
      <img src="https://assets.api.uizard.io/api/cdn/stream/2c34548d-9012-4ac6-8166-4882b653b05c.png" alt="Your Image" className="image-below-button" />
    </form>
  );
};

export default CheckoutForm;