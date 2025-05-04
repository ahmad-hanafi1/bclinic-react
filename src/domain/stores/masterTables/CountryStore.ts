// src/domain/stores/CountrySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Country {
  id: number;
  name: string;
}

interface CountryState {
  countries: Country[];
}

const initialState: CountryState = {
  countries: [],
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;
export default countrySlice.reducer;
