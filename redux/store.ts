import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import wishList from "./slice/wishList";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    wishList: wishList,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
