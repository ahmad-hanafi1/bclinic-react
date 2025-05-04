// src/domain/stores/StateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Authority {
  id: number;
  name: string;
}

interface AuthorityState {
  authorities: Authority[];
}

const initialState: AuthorityState = {
  authorities: [],
};

const authoritySlice = createSlice({
  name: "authority",
  initialState,
  reducers: {
    setAuthorities: (state, action: PayloadAction<Authority[]>) => {
      state.authorities = action.payload;
    },
  },
});

export const { setAuthorities } = authoritySlice.actions;
export default authoritySlice.reducer;
