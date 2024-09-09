"use client";
import Stepper from "@/components/stepper/Stepper";
import React from "react";
import BillingAddress from "./BillingAddress";

const Checkout = () => {
  return (
    <div className="w-full mt-10">
      <Stepper active={1} />
      <BillingAddress />
    </div>
  );
};

export default Checkout;
