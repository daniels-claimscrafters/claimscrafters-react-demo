import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Using react-icons for the back icon
import "./RGPPage.css";
import StepperComponent from "./StepperComponent";
import StripeCheckoutForm from "./StripeCheckoutForm";

const ReconcileGoPayment = () => {
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const projectId = urlParams.get("projectId");
  const [currentStep, setCurrentStep] = useState(0);
  const [projectDetails, setProjectDetails] = useState(null);
  const [numOfLines, setNumOfLines] = useState(200); // Example value
  const [price, setPrice] = useState(200);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobilePhone: "",
    email: "",
    finalDateToClose: "",
  });

  const [emailData, setEmailData] = useState({
    carrier: "",
    adjusterFirstName: "",
    adjusterLastName: "",
    // Add other fields like rcv, acv, depreciationAmount here
  });

  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
const validatePhone = (phone) => /^[0-9]{10}$/.test(phone); // Adjust the regex based on the expected phone number format
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    // Fetch project details from the server using the extracted project ID
    fetch(`${API_URL}/npc/details?projectId=${projectId}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received project details:", data);
        setProjectDetails(data);

        console.log(data.project.carrier);

        // Extract data and set variables
      const carrier = data.project.carrier;
      const adjusterFirstName = data.project.adjusterFirstName;
      const adjusterLastName = data.project.adjusterLastName;

      // Set emailData with the extracted values
      setEmailData({
        carrier,
        adjusterFirstName,
        adjusterLastName,
        // Add other values as needed: rcv, acv, depreciationAmount
      });

      

        const numberOfLines = data.project.numberOfLines;
        setNumOfLines(numberOfLines);
        setPrice(calculatePrice(numberOfLines));

        
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
        //navigate('/pmhs');
      });
  }, [projectId]); // Re-run effect whenever projectId changes

  const calculatePrice = (numOfLines) => {
    if (numOfLines <= 100) return 750;
    if (numOfLines <= 300) return 950;
    if (numOfLines <= 500) return 1150;
    if (numOfLines <= 700) return 1350;
    if (numOfLines <= 999) return 1550;
    return 1750;
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1); // Navigate back to the previous page
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      validateForm(updatedData); // Pass the updated data to validate the form
      return updatedData;
    });
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted");
  };

  const validateForm = (data) => {
    const { firstName, lastName, mobilePhone, email, finalDateToClose } = data;
    const newErrors = {};
    
    if (!validateName(firstName)) newErrors.firstName = "Invalid first name";
    if (!validateName(lastName)) newErrors.lastName = "Invalid last name";
    if (!validatePhone(mobilePhone)) newErrors.mobilePhone = "Invalid phone number";
    if (!validateEmail(email)) newErrors.email = "Invalid email address";
    
    // Check if the date is provided
    if (!finalDateToClose) {
        newErrors.finalDateToClose = "Date is required";
    } else {
        const selectedDate = new Date(finalDateToClose);
        const currentDate = new Date();
        
        // Check if the selected date is in the past
        if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
            newErrors.finalDateToClose = "Date cannot be in the past";
        }
    }
    
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
};

  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  return (
    <Container fluid className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} className="mb-4">
          <header className="d-flex justify-content-between align-items-center">
            <div className="logo">
              <img src="ReconcileGo_BLACK.png" alt="Logo" className="logo-img" />
            </div>
            <div className="title text-center flex-grow-1">
              <h1 className="bold-header">ReconcileGo Receipt Reconciler</h1>
            </div>
            <div className="back-icon">
              <Button variant="link" onClick={handleBack}>
                <FaArrowLeft size={24} />
              </Button>
            </div>
          </header>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <StepperComponent currentStep={currentStep} />
          {currentStep === 0 && (
            <div className="mb-4">
          
            {/* Header above Text Block */}
            <h2 className="text-center mb-3">Receipt Reconciler Information</h2>
            {/* Text Block */}
            <div className="text-block mb-3">
              <p className="d-text">Welcome to ContentsIQ's ReconcileGo Receipt Reconciler, designed to streamline the recoverable depreciation process. Insured clients will be able to access ReconcileGo,  review and approve suggested valuations via a link sent to them via email. Once the contents valuations has been approved by the insured, they gain access to the ReconcileGo mobile app, simplifying receipt scanning and item reconciliations.</p>
            </div>
            {/* Header above First Input Field */}
            <h2 className="text-center mb-3">Insured Primary Contact Info</h2>
            {/* Four Input Fields */}
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
          type="text"
          placeholder="Contact First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          isInvalid={!!errors.firstName && touched.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.firstName}
        </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
          type="text"
          placeholder="Contact Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          isInvalid={!!errors.lastName && touched.lastName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.lastName}
        </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile Phone</Form.Label>
                    <Form.Control
          type="text"
          placeholder="Contact Mobile Phone"
          name="mobilePhone"
          value={formData.mobilePhone}
          onChange={handleInputChange}
          isInvalid={!!errors.mobilePhone && touched.mobilePhone}
        />
        <Form.Control.Feedback type="invalid">
          {errors.mobilePhone}
        </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
          type="text"
          placeholder="Contact Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          isInvalid={!!errors.email && touched.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              {/* Another Header */}
              <h2 className="text-center mb-3">Claim Settlement Detail</h2>
              {/* One More Input Field */}
              <Form.Group className="mb-3 text-center">
  <Form.Label>Final Date to Close</Form.Label>
  <div className="d-flex justify-content-center">
  <Form.Control
        type="date"
        placeholder="Enter final date to close"
        name="finalDateToClose"
        value={formData.finalDateToClose}
        onChange={handleInputChange}
        id="finalDateToCloseInput"
        className="w-50" // Adjust the width as needed
        isInvalid={!!errors.finalDateToClose && touched.finalDateToClose}
      />
  </div>
  <Form.Control.Feedback type="invalid">
        {errors.finalDateToClose}
      </Form.Control.Feedback>
</Form.Group>
              {/* Bottom Button */}
              <div className="d-flex justify-content-center">
              <Button variant="primary" onClick={handleNext} disabled={!isFormValid}>
                    Continue
                  </Button>
                </div>
            </Form>
          </div>
          )}
          {currentStep === 1 && (
  <div className="mb-4">
    <Row>
      <Col md={6}>
        <h4 className="mb-3">Settlement Information</h4>
        <Card className="card-rect">
          <Card.Body className="d-flex flex-column p-0">
            <Row className="flex-grow-1">
              <Col xs={8} className="d-flex flex-column justify-content-center">
                <h5 className="card-title">ContentsIQ ReconcileGo</h5>
                <p className="card-text">Number Of Lines to be evaluated</p>
              </Col>
              <Col xs={4} className="d-flex align-items-center justify-content-end">
                <h1>{numOfLines}</h1>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="card-rect">
          <Card.Body className="d-flex flex-column p-0">
            <Row className="flex-grow-1">
              <Col xs={8} className="d-flex flex-column justify-content-center">
                <h5 className="card-title">ContentsIQ ReconcileGo</h5>
                <p className="card-text">Line Item Pricing</p>
                <p className="card-text">501 - 700 lines</p>
              </Col>
              <Col xs={4} className="d-flex align-items-center justify-content-end">
                <h1>${price.toFixed(2)}</h1>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <h4 className="mb-3">Additional Information</h4>
        <Card className="card-square">
          <Card.Body className="p-0">
            <h5 className="card-title">Pricing Structure</h5>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Number of Lines</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 - 100</td>
                    <td>$750</td>
                  </tr>
                  <tr>
                    <td>101 - 300</td>
                    <td>$950</td>
                  </tr>
                  <tr>
                    <td>301 - 500</td>
                    <td>$1150</td>
                  </tr>
                  <tr>
                    <td>501 - 700</td>
                    <td>$1350</td>
                  </tr>
                  <tr>
                    <td>701 - 999</td>
                    <td>$1550</td>
                  </tr>
                  <tr>
                    <td>1000+</td>
                    <td>$1750</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <StripeCheckoutForm formData={formData} price={price} emailData={emailData}/>
      </Col>
    </Row>
  </div>
)}
        </Col>
      </Row>
    </Container>
  );
};

export default ReconcileGoPayment;