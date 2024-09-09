import Link from "next/link";
import React from "react";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-ebgaramond">
      <div className="bg-white shadow-md rounded-lg p-8 md:p-12 max-w-lg">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Thank You for Your Purchase!
        </h2>
        <p className="text-gray-700 mb-6">
          Your order has been successfully placed. You will receive a
          confirmation email shortly.
        </p>

        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            Order Summary
          </h4>
          <p className="text-gray-700">Order Number: #123456</p>
          <p className="text-gray-700">Total: $89.99</p>
          <p className="text-gray-700">Shipping Address: 123 Main St, City</p>
          <p className="text-gray-700">Estimated Delivery: 5-7 Business Days</p>
        </div>

        <Link href="/">
          <a className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300">
            Continue Shopping
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
