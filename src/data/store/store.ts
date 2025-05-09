// store.tsx
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import modalReducer from "../features/modal/modalSlice";
import patientReducer from "../features/patient/patientSlice";
import doctorReducer from "../features/doctor/doctorSlice";
import calenderReducer from "../features/calender/calenderSlice";
import nationalityReducer from "../features/nationality/nationalitySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    modal: modalReducer,
    patient: patientReducer,
    doctor: doctorReducer,
    calender: calenderReducer,
    nationality: nationalityReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
