import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: string;
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
      const exist = state.cartItems.find((x) => x.id === item.id);
      if (exist) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === item.id ? { ...exist, qty: exist.qty + 1 } : x
        );
      } else {
        state.cartItems = [...state.cartItems, { ...item, qty: 1 }];
      }
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const itemIndex = state.cartItems.findIndex((x) => x.id === itemId);

      if (itemIndex === -1) return;

      const item = state.cartItems[itemIndex];

      if (item.qty === 1) {
        state.cartItems = state.cartItems.filter((x) => x.id !== itemId);
      } else {
        state.cartItems[itemIndex] = { ...item, qty: item.qty - 1 };
      }
    },
  },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;
