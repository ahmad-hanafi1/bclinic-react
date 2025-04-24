// store.tsx
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from '../features/modal/modalSlice';
// import authReducer from "../../domain/stores/AuthStore";
// import profileReducer from "../../domain/stores/ProfileStore";
// import countryReducer from "../../domain/stores/masterTables/CountryStore";
// import stateReducer from "../../domain/stores/masterTables/StateStore";
// import organizationReducer from "../../domain/stores/masterTables/OrgsStore";
// import fieldOfStudyReducer from "../../domain/stores/masterTables/FieldOfStudyStore";
// import SpecialtyReducer from "../../domain/stores/masterTables/SpecialtyStore";
// import authorityReducer from "../../domain/stores/masterTables/AuthorityStore";
// import skillReducer from "../../domain/stores/masterTables/SkillStore";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    // auth: authReducer,
    // profile: profileReducer,
    // country: countryReducer,
    // state: stateReducer,
    // specialty: SpecialtyReducer,
    // organization: organizationReducer,
    // fieldOfStudy: fieldOfStudyReducer,
    // authority: authorityReducer,
    // skill: skillReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch