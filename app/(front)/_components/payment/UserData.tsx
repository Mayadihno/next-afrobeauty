"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { formatCurrency } from "@/utils/formatter";
import { useState, useEffect } from "react";

const UserData = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [orderData, setOrderData] = useState({
    shippingFee: { shippingCompany: "", shippingPrice: 0 },
    totalPrice: 0,
    userData: {
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      state: "",
    },
  });

  useEffect(() => {
    const storedOrderData = JSON.parse(
      localStorage.getItem("orderData") || "{}"
    );
    setOrderData(storedOrderData);
  }, []);

  return (
    <div className="md:px-5 px-2 md:py-5 py-2 pt-1 flex flex-col font-urbanist">
      <div className="py-2 border-b-2 text-sm text-nowrap">
        <h2 className="text-2xl font-semibold">Buyer Information</h2>
        <div className="flex justify-between space-y-4 md:space-y-0 md:flex-row flex-col py-2 md:items-center">
          <h2>
            <span className="font-semibold mr-1"> Name:</span>
            <span>{orderData.userData.name}</span>
          </h2>
          <h2>
            <span className="font-semibold mr-1"> Email:</span>
            <span>{orderData.userData.email}</span>
          </h2>
        </div>
        <div className="flex justify-between space-y-4 md:space-y-0 md:flex-row flex-col py-2 md:items-center">
          <h2>
            <span className="font-semibold mr-1">Phone Number:</span>
            <span>{orderData.userData.phone}</span>
          </h2>
          <h2>
            <span className="font-semibold mr-1">Country:</span>
            <span>{orderData.userData.country}</span>
          </h2>
        </div>
        <div className="flex justify-between space-y-4 md:space-y-0 md:flex-row flex-col py-2 md:items-center">
          <h2>
            <span className="font-semibold mr-1"> State:</span>
            <span>{orderData.userData.state}</span>
          </h2>
          <h2>
            <span className="font-semibold mr-1"> Address:</span>
            <span>{orderData.userData.address}</span>
          </h2>
        </div>
      </div>
      <h2 className="text-2xl font-medium pt-2">
        <span className="font-semibold">Item Quantity: </span>
        <span className="ml-2">{cartItems.length}</span>
      </h2>
      <div className="flex flex-col py-2 justify-center font-urbanist border-b-2">
        {cartItems.map((item) => {
          return (
            <div
              className="flex justify-between py-1 text-sm font-normal"
              key={item._id}
            >
              <h2>{item.name}</h2>
              <div className="flex space-x-2">
                <h4>
                  {formatCurrency(item.price)} * {item.qty}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center py-2 border-b-2">
        <h2 className="text-lg font-semibold">Shipping Fee:</h2>
        <div className="flex space-x-2 text-sm">
          <h4 className="font-semibold capitalize">
            {orderData.shippingFee.shippingCompany}
          </h4>
          <h4>{formatCurrency(orderData.shippingFee.shippingPrice)}</h4>
        </div>
      </div>
      <div className="py-2 flex justify-between items-center text-lg font-semibold">
        <h2>Total:</h2>
        <h4>{formatCurrency(orderData.totalPrice)}</h4>
      </div>
    </div>
  );
};

export default UserData;
