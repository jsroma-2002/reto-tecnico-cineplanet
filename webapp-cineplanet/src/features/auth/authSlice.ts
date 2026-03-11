import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  picture: string;
}

interface AuthState {
  user: User;
  isAuthenticated: boolean;
  isGuest: boolean;
}

const initialState: AuthState = {
  user: {
    name: "",
    email: "",
    picture: "",
  },
  isAuthenticated: false,
  isGuest: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isGuest = false;
    },
    loginGuest(state) {
      state.user = { name: "", email: "", picture: "" };
      state.isAuthenticated = false;
      state.isGuest = true;
    },
    logout(state) {
      state.user = { name: "", email: "", picture: "" };
      state.isAuthenticated = false;
      state.isGuest = false;
    },
  },
});

export const { loginSuccess, loginGuest, logout } = authSlice.actions;
export default authSlice.reducer;
