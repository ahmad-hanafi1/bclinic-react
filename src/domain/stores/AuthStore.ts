// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken?: string;
  tokenType?: string;
  isAuthenticated: boolean;
}

const loadInitialState = (): AuthState => {
  const accessToken = sessionStorage.getItem("access_token");
  const tokenType = sessionStorage.getItem("token_type");
  return {
    accessToken: accessToken || undefined,
    tokenType: tokenType || undefined,
    isAuthenticated: !!accessToken,
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { accessToken, tokenType } = action.payload;
      state.accessToken = accessToken;
      state.tokenType = tokenType;
      state.isAuthenticated = !!accessToken;
    },
    logout: (state) => {
      state.accessToken = undefined;
      state.tokenType = undefined;
      state.isAuthenticated = false;
      sessionStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
