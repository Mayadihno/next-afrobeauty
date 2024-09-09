"use client";

import Spinner from "@/components/spinner/Spinner";
import { persistor, store } from "@/redux/store";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div>
            <Spinner />
          </div>
        }
        persistor={persistor}
      >
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Providers;
