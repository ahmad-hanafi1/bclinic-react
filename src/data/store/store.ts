// store.tsx
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/modalSlice";
import authReducer from "../features/auth/authSlice";
import patientReducer from "../features/patient/patientSlice";
import doctorReducer from "../features/doctor/doctorSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    patient: patientReducer,
    doctor: doctorReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
