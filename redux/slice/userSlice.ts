import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: number;
  avatar?: string;
}

interface Admin {
  data: { [key: string]: any };
  token: string;
}

interface Seller extends Omit<User, "name"> {
  token: string;
  image: string;
  accountType: string;
  fullName: string;
  shopName: string;
  shopAddress: string;
  createdAt: string;
}

interface Buyer {
  data: User[];
}

interface AuthState {
  allUsers: {
    data: User[];
    pagination: { [key: string]: any };
  };
  allSellers: {
    data: User[];
    pagination: { [key: string]: any };
  };
  admin: {
    data: User[] | null;
    token: string;
  };
  seller: {
    data: Seller | null;
  };
  buyer: {
    data: User | null;
  };
  sessionToken: string | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  allUsers: {
    data: [],
    pagination: {},
  },
  allSellers: {
    data: [],
    pagination: {},
  },
  admin: {
    data: null,
    token: "",
  },
  seller: {
    data: null,
  },
  buyer: {
    data: null,
  },
  sessionToken: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAllUsers(
      state,
      action: PayloadAction<{
        data: User[];
        pagination: { [key: string]: any };
      }>
    ) {
      state.allUsers.data = action.payload.data;
      state.allUsers.pagination = action.payload.pagination;
    },
    setAllSellers(
      state,
      action: PayloadAction<{
        data: User[];
        pagination: { [key: string]: any };
      }>
    ) {
      state.allSellers.data = action.payload.data;
      state.allSellers.pagination = action.payload.pagination;
    },
    setBuyer(
      state,
      action: PayloadAction<{
        data: User;
      }>
    ) {
      state.buyer.data = action.payload.data;
      state.isAuthenticated = true;
    },
    setSeller(
      state,
      action: PayloadAction<{
        data: Seller | null;
      }>
    ) {
      state.seller.data = action.payload.data;
      state.isAuthenticated = true;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setSessionToken(state, action: PayloadAction<string | null>) {
      state.sessionToken = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    logout(state) {
      state.buyer = { data: null };
      state.seller = { data: null };
      state.sessionToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setAllUsers,
  setAllSellers,
  setBuyer,
  setSeller,
  setError,
  setSessionToken,
  setLoading,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
