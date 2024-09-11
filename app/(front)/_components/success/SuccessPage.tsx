"use client";
import Link from "next/link";
import React from "react";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-[30px] bg-gray-50 font-ebgaramond">
      <div className="bg-white shadow-md rounded-lg p-8 md:p-12 max-w-lg">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Thank You for Your Purchase!
        </h2>
        <p className="text-gray-700 mb-6">
          Your order has been successfully placed. You will receive a
          confirmation email shortly.
        </p>

        <Link href="/">
          <span className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300">
            Continue Shopping
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
