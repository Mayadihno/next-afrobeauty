import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    loadStart: (state) => {
      state.isLoading = true;
    },
    loadStop: (state) => {
      state.isLoading = false;
    },
  },
});

export const { loadStart, loadStop } = loadingSlice.actions;

export default loadingSlice.reducer;
