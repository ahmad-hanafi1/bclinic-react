// src/domain/stores/StateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  id: number;
  name: string;
  country_id: unknown[];
}

interface StateState {
  states: State[];
}

const initialState: StateState = {
  states: [],
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setStates: (state, action: PayloadAction<State[]>) => {
      state.states = action.payload;
    },
  },
});

export const { setStates } = stateSlice.actions;
export default stateSlice.reducer;
