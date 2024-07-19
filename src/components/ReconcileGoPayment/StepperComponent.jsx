import React from "react";
import Stepper from "react-stepper-horizontal";

const StepperComponent = ({ currentStep }) => {
  return (
    <Stepper
      steps={[{ title: "Insured Information" }, { title: "Payment" }]}
      activeStep={currentStep}
      activeColor="#007bff"
      completeColor="#28a745"
      circleFontColor="#fff"
      size={50}
      circleFontSize={20}
      completeBarColor="#28a745"
    />
  );
};

export default StepperComponent;