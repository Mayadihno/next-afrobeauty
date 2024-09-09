import Stepper from "@/components/stepper/Stepper";
import React from "react";
import PaymentSummary from "./PaymentSummary";

const Payment = () => {
  return (
    <div className="w-full mt-10">
      <Stepper active={2} />
      <PaymentSummary />
    </div>
  );
};

export default Payment;
