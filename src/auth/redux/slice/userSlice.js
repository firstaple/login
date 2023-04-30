import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    tocken: null,
    email: null,
    emailVerified: null,
    name: null,
    photoURL: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.tocken = action.payload.tocken;
      state.email = action.payload.email;
      state.emailVerified = action.payload.emailVerified;
      state.name = action.payload.name;
      state.photoURL = action.payload.photoURL;
    },
    clearUser: (state) => {
      state.tocken = null;
      state.email = null;
      state.emailVerified = null;
      state.name = null;
      state.photoURL = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
