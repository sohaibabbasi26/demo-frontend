// store/slices/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isUnauthorized: boolean;
}

const initialState: AuthState = {
  isUnauthorized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUnauthorized: (state, action) => {
      state.isUnauthorized = action.payload;
    },
    resetAuthState: (state) => {
      state.isUnauthorized = false;
    },
  },
});

export const { setUnauthorized, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
