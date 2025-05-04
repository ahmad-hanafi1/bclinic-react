// src/domain/stores/SpecialtySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Specialty {
  id: number;
  name: string;
}

interface SpecialtyState {
  specialties: Specialty[];
}

const initialState: SpecialtyState = {
  specialties: [],
};

const SpecialtySlice = createSlice({
  name: "specialty",
  initialState,
  reducers: {
    setSpecialty: (state, action: PayloadAction<Specialty[]>) => {
      state.specialties = action.payload;
    },
  },
});

export const { setSpecialty } = SpecialtySlice.actions;
export default SpecialtySlice.reducer;
