import { Shop } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface CartItem {
//   id: number;
//   title: string;
//   image: string;
//   price: number;
//   discountPrice?: number;
//   weight?: number;
//   seller?: string;
//   category?: string;
//   stock?: string;
//   qty: number;
//   brand?: string;
//   sellerId?: string;
// }

export interface CartItem {
  _id: string;
  name: string;
  image: any;
  price: number;
  discountPrice?: number;
  category: { label: string; value: string }[];
  shop: Shop;
  shopId: string;
  qty: number;
  colors?: { label: string; value: string }[];
  gender?: string;
  processingTime?: { label: string; value: string };
  size?: string;
}

interface CartState {
  cartItems: CartItem[];
}

const getInitialCartItems = (): CartItem[] => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        return JSON.parse(storedCart);
      }
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
    }
  }
  return [];
};

const initialState: CartState = {
  cartItems: getInitialCartItems(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i._id === item._id);
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    updateCartItemQty: (
      state,
      action: PayloadAction<{ _id: string; qty: number }>
    ) => {
      const { _id, qty } = action.payload;
      const item = state.cartItems.find((i) => i._id === _id);
      if (item) {
        item.qty = qty;
      }
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        localStorage.removeItem("cart");
      }
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  updateCartItemQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
