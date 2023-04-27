import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    tocken: null,
    email: null,
    emailVerified: null,
    password: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.tocken = action.payload.tocken;
      state.email = action.payload.email;
      state.emailVerified = action.payload.emailVerified;
      state.password = action.payload.password;
    },
    clearUser: (state) => {
      state.tocken = null;
      state.email = null;
      state.emailVerified = null;
      state.password = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
