"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import React from "react";

const Dashboard = () => {
  const { seller } = useAppSelector((state) => state.users);
  return (
    <div className="">
      <h2>{seller.data?.fullName}</h2>
    </div>
  );
};

export default Dashboard;
