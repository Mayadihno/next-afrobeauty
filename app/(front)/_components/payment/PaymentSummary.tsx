import React from "react";
import UserData from "./UserData";
import PayementCard from "./PayementCard";
import PaymentInfo from "./PaymentInfo";

const PaymentSummary = () => {
  return (
    <div className="w-[85%] mx-auto my-10">
      <div className="grid md:grid-cols-6 gap-5 grid-cols-1">
        <div className="overflow-x-auto px-4 py-3 col-span-3 bg-[#ffffff] shadow-md">
          <UserData />
        </div>
        <div className="col-span-3 h-fit">
          <PaymentInfo />
          {/* <PayementCard /> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
