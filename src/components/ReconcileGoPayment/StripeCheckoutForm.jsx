import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
//import "./StripeCheckoutForm.css"; // Import CSS file for custom styling

const StripeCheckoutForm = ({ formData, price, emailData }) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      const paymentData = {
        paymentMethodId: paymentMethod.id,
        price: price * 100, // Convert price to cents
        description: `Processed per line`, // Adjust description as per your logic
        receipt_email: formData.email,
        useTestMode: true, // Example logic for setting test mode
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobilePhone: formData.mobilePhone,
        client_email: formData.email,
        finalDateToClose: formData.finalDateToClose, // Ensure this matches your form structure
        carrier: emailData.carrier,
      adjusterFirstName: emailData.adjusterFirstName,
      adjusterLastName: emailData.adjusterLastName,
      };

      fetch(`${process.env.REACT_APP_API_URL}/npc/payrg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Payment successful:", data);
          // Handle successful payment and form submission here
        })
        .catch((error) => {
          console.error("Error processing payment:", error);
          // Handle payment error here
        });
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h4 className="text-center mb-3">Payment Information</h4>
      <div className="form-group">
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
        <label className="form-label" htmlFor="email">Receipt Email</label>
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
    </form>
  );
};

export default StripeCheckoutForm;
