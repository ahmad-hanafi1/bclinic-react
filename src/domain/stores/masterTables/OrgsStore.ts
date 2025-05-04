// src/domain/stores/StateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Organization {
  id: number;
  name: string;
}

interface OrganizationState {
  orgs: Organization[];
}

const initialState: OrganizationState = {
  orgs: [],
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganizations: (state, action: PayloadAction<Organization[]>) => {
      state.orgs = action.payload;
    },
  },
});

export const { setOrganizations } = organizationSlice.actions;
export default organizationSlice.reducer;
