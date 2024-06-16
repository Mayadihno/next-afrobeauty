"use client";
import store from "@/redux/store";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </Provider>
  );
};

export default Providers;
