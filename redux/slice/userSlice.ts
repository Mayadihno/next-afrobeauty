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

interface Seller {
  data: User[];
  token: string;
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
    token: "";
  };
  seller: {
    data: User[] | null;
    token: "";
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
    data: [],
    token: "",
  },
  seller: {
    data: [],
    token: "",
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
  name: "users",
  initialState,
  reducers: {
    setAllUsers(
      state,
      action: PayloadAction<{
        data: User[];
        pagination: { [key: string]: any };
      }>
    ) {
      console.log(action.payload.data);
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
    setSessionToken(state, action: PayloadAction<string | null>) {
      state.sessionToken = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    logout(state) {
      state.buyer = { data: null };
      state.sessionToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAllUsers, setBuyer, setSessionToken, logout } =
  authSlice.actions;

export default authSlice.reducer;
