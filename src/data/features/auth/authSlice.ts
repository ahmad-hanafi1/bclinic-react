// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

interface AuthState {
  token: string | null;
  expiresIn: number | null;
  tokenType: string | null;
  scope: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  expiresIn: null,
  tokenType: null,
  scope: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

// Async thunk to fetch the access token
export const loginUser = createAsyncThunk<TokenResponse>(
  "auth/loginUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post<TokenResponse>(
        "/api/authentication/oauth2/token?db=network",
        {
          grant_type: "client_credentials",
          client_secret: "qrWxRQeWK246C6bYnsuHKv7EvL5mZNy0NTzlEqEE",
          client_id: "DS7T7KuYHKtTft8wu0xkTEg8vQpqmLYUhojWys4e",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Store the access token in local storage
      localStorage.setItem("access_token", response.data.access_token);

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data?.detail || "Login failed");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.expiresIn = null;
      state.tokenType = null;
      state.scope = null;
      state.isAuthenticated = false;
      localStorage.removeItem("access_token");
    },
    loadTokenFromStorage(state) {
      const token = localStorage.getItem("access_token");
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<TokenResponse>) => {
          state.loading = false;
          state.token = action.payload.access_token;
          state.expiresIn = action.payload.expires_in;
          state.tokenType = action.payload.token_type;
          state.scope = action.payload.scope;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, loadTokenFromStorage } = authSlice.actions;
export default authSlice.reducer;
