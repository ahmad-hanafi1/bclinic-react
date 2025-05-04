// profileSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PartnerModel } from "../../containers/home/components/partner/Types";
import { toCamelCase } from "../../utils/CaseTransformers";

const initialState: PartnerModel = {
  id: -1,
  name: "",
  email: "",
  skillIds: [],
  languageIds: [],
  licenseIds: [],
  attachmentIds: [],
  certificateIds: [],
  workExperienceIds: [],
  medicalSpecialtyIds: [],
  jobPositionStatusIds: [],
  educationIds: [],
  jobPreferenceIds: [],
  positionIds: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<PartnerModel>) => {
      return { ...state, ...toCamelCase(action.payload) };
    },
    resetProfile: () => {
      return initialState;
    },
  },
});

export const { setProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
