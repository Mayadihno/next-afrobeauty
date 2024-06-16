import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishListItem {
  id: number;
  title: string;
  price: string;
  image: string;
}

interface WishListState {
  wishListItems: WishListItem[];
}

const getInitialWishListItems = (): WishListItem[] => {
  try {
    const storedCart = localStorage.getItem("wishlist");
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  } catch (error) {
    console.error("Failed to parse wishlist items from localStorage", error);
  }
  return [];
};

const initialState: WishListState = {
  wishListItems: getInitialWishListItems(),
};

const cartSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addProductToWishList: (state, action: PayloadAction<WishListItem>) => {
      const item = action.payload;
      const exist = state.wishListItems.find((x) => x.id === item.id);
      if (exist) {
        state.wishListItems = state.wishListItems.map((x) =>
          x.id === item.id ? { ...exist } : x
        );
      } else {
        state.wishListItems = [...state.wishListItems, { ...item }];
      }
    },
    removeProductFromWishList: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const itemIndex = state.wishListItems.findIndex((x) => x.id === itemId);
      if (itemIndex >= 0) {
        state.wishListItems.splice(itemIndex, 1);
      }
    },
  },
});

export const { addProductToWishList, removeProductFromWishList } =
  cartSlice.actions;
export default cartSlice.reducer;
