/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/doctors/doctorSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosTokenInstance from "../../../api/axiosInstance";
import { showSnackbar } from "../snackbar/snackbarSlice";

// Doctor model
interface Doctor {
  id: number;
  name: string;
}

// Slice state
interface DoctorState {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  loading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  doctors: [],
  selectedDoctor: null,
  loading: false,
  error: null,
};

// Input for creating a doctor
interface CreateDoctorInput {
  name: string;
  is_doctor: boolean; // always true
}

// Fetch all doctors
export const fetchDoctors = createAsyncThunk<Doctor[]>(
  "doctors/fetchAll",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosTokenInstance.get(
        `/api/search_read?model=res.partner&db=network&fields=["name","id"]&domain=[["is_doctor","=",true]]`
      );
      return response.data;
    } catch (err: any) {
      dispatch(
        showSnackbar({ message: "Failed to fetch doctors", severity: "error" })
      );
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch doctors"
      );
    }
  }
);

// Create a new doctor
export const createDoctor = createAsyncThunk(
  "doctors/create",
  async (doctorData: CreateDoctorInput, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosTokenInstance.post(
        `/api/create?model=res.partner&db=network&values={"name":"${doctorData.name}","is_patient":true}`,
        new URLSearchParams({
          values: JSON.stringify({
            name: doctorData.name,
            is_doctor: true,
          }),
        })
      );

      const newId = response.data[0];
      dispatch(
        showSnackbar({
          message: "Doctor created successfully",
          severity: "success",
        })
      );
      return {
        id: newId,
        name: doctorData.name,
      };
    } catch (err: any) {
      dispatch(
        showSnackbar({
          message: "Failed to create doctor",
          severity: "error",
        })
      );
      return rejectWithValue(
        err.response?.data?.detail || "Failed to create doctor"
      );
    }
  }
);

// Slice
const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDoctors.fulfilled,
        (state, action: PayloadAction<Doctor[]>) => {
          state.loading = false;
          state.doctors = action.payload;
        }
      )
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createDoctor.fulfilled,
        (state, action: PayloadAction<Doctor>) => {
          state.loading = false;
          state.doctors.push(action.payload);
        }
      )
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default doctorSlice.reducer;
