import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: null as any, // 👈 Make sure user is null instead of an empty string
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string, user: any }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user

    },
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string; user: any }>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = null; 
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;