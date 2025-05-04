// src/domain/stores/FieldOfStudySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FieldOfStudy {
  id: number;
  name: string;
}

interface FieldOfStudyState {
  fields: FieldOfStudy[];
}

const initialState: FieldOfStudyState = {
  fields: [],
};

const fieldsOfStudySlice = createSlice({
  name: "field of study",
  initialState,
  reducers: {
    setFieldsOfStudy: (state, action: PayloadAction<FieldOfStudy[]>) => {
      state.fields = action.payload;
    },
  },
});

export const { setFieldsOfStudy } = fieldsOfStudySlice.actions;
export default fieldsOfStudySlice.reducer;
