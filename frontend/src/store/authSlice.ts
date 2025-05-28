import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  authString: string | null;
}

const initialState: AuthState = {
  user: null,
  authString: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: string; authString: string }>) {
      state.user = action.payload.user;
      state.authString = action.payload.authString;
    },
    logout(state) {
      state.user = null;
      state.authString = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
