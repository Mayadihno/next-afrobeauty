"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import wishList from "./slice/wishList";
import userSlice from "./slice/userSlice";
import loadingSlice from "./slice/loadingSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import orderSlice from "./slice/orderSlice";
import productSlice from "./slice/productSlice";
import productApi from "./rtk/products";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import allProductSlice from "./slice/allProductSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart", "wishList", "order", "users"],
  blacklist: ["allProduct"],
};

const rootReducers = combineReducers({
  cart: cartSlice,
  wishList: wishList,
  users: userSlice,
  loading: loadingSlice,
  order: orderSlice,
  products: productSlice,
  allProduct: allProductSlice,
  [productApi.reducerPath]: productApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
