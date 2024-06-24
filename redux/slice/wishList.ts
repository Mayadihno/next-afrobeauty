import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishListItem {
  id: number;
  title: string;
  image: string;
  price: number;
  discountPrice?: number;
  weight?: number;
  seller?: string;
  category?: string;
  stock?: string;
  qty?: number;
  brand?: string;
}

interface WishListState {
  wishListItems: WishListItem[];
}

const getInitialWishListItems = (): WishListItem[] => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      const storedWishList = localStorage.getItem("wishlist");
      if (storedWishList) {
        return JSON.parse(storedWishList);
      }
    } catch (error) {
      console.error("Failed to parse wishlist items from localStorage", error);
    }
  }
  return [];
};

const initialState: WishListState = {
  wishListItems: getInitialWishListItems(),
};

const wishlistSlice = createSlice({
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
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        localStorage.setItem("wishlist", JSON.stringify(state.wishListItems));
      }
    },
    removeProductFromWishList: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const itemIndex = state.wishListItems.findIndex((x) => x.id === itemId);
      if (itemIndex >= 0) {
        state.wishListItems.splice(itemIndex, 1);
      }
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        localStorage.setItem("wishlist", JSON.stringify(state.wishListItems));
      }
    },
  },
});

export const { addProductToWishList, removeProductFromWishList } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
