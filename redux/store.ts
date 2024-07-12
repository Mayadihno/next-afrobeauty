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

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducers = combineReducers({
  cart: cartSlice,
  wishList: wishList,
  users: userSlice,
  loading: loadingSlice,
  order: orderSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
