// src/domain/stores/SkillSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Skill {
  id: number;
  name: string;
}

interface SkillState {
  skills: Skill[];
}

const initialState: SkillState = {
  skills: [],
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<Skill[]>) => {
      state.skills = action.payload;
    },
  },
});

export const { setSkills } = skillSlice.actions;
export default skillSlice.reducer;
