import { Shop } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishListItem {
  _id: string;
  name: string;
  image: string[];
  price: number;
  discountPrice?: number;
  category: { label: string; value: string }[];
  shop: Shop;
  shopId: string;
  qty: number;
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
      const exist = state.wishListItems.find((x) => x._id === item._id);
      if (exist) {
        state.wishListItems = state.wishListItems.map((x) =>
          x._id === item._id ? { ...exist } : x
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
    removeProductFromWishList: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const itemIndex = state.wishListItems.findIndex((x) => x._id === itemId);
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
