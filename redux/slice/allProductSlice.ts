import { Product, UserProductResponse } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  allProduct: UserProductResponse;
}

const initialState: ProductState = {
  allProduct: {
    products: [],
    totalPages: 0,
    totalProducts: 0,
  },
};
const allProductSlice = createSlice({
  name: "allProduct",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<UserProductResponse>) {
      state.allProduct = action.payload;
    },
  },
});

export const { setProducts } = allProductSlice.actions;
export default allProductSlice.reducer;
