import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  seller: string;
  stock: number;
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  qty: number;
}

interface CartState {
  cartItems: CartItem[];
}

const getInitialCartItems = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  } catch (error) {
    console.error("Failed to parse cart items from localStorage", error);
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
      const isItemExist = state.cartItems.find((i) => i.id === item.id);
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.id === isItemExist.id ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    updateCartItemQty: (
      state,
      action: PayloadAction<{ id: number; qty: number }>
    ) => {
      const { id, qty } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        item.qty = qty;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { addProductToCart, removeProductFromCart, updateCartItemQty } =
  cartSlice.actions;
export default cartSlice.reducer;
