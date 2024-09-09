import { Product } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    updateProductInState: (state, action) => {
      const { productId, newStatus } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product._id === productId
      );
      if (productIndex !== -1) {
        state.products[productIndex].isAvailable = newStatus;
      }
    },
    deleteProductById: (state, action) => {
      const { productId } = action.payload;
      state.products = state.products.filter(
        (product) => product._id !== productId
      );
    },
    updateImagesInState: (state, action) => {
      const { productId, updatedImages } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product._id === productId
      );
      if (productIndex !== -1) {
        state.products[productIndex].image = updatedImages;
      }
    },
    updateNewImagesInState: (
      state,
      action: PayloadAction<{ productId: string; updatedImages: string[] }>
    ) => {
      const { productId, updatedImages } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product._id === productId
      );
      if (productIndex !== -1) {
        state.products[productIndex].image = updatedImages;
      }
    },
  },
});

export const {
  setProduct,
  updateProductInState,
  deleteProductById,
  updateImagesInState,
  updateNewImagesInState,
} = productSlice.actions;

export default productSlice.reducer;
