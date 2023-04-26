import { createSlice } from "@reduxjs/toolkit";

export const tockenSlice = createSlice({
  name: "tocken",
  initialState: {
    tocken: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.tocken = action.payload;
    },
    clearUser: (state) => {
      state.tocken = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = tockenSlice.actions;

export default tockenSlice.reducer;
