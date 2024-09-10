import React from "react";
import UserData from "./UserData";
import PaymentInfo from "./PaymentInfo";

const PaymentSummary = () => {
  return (
    <div className="md:w-[85%] w-full mx-auto md:my-10">
      <div className="grid md:grid-cols-6 gap-5 grid-cols-1">
        <div className="overflow-x-auto px-4 py-3 col-span-3 bg-[#ffffff] shadow-md">
          <UserData />
        </div>
        <div className="col-span-3 h-fit">
          <PaymentInfo />
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
