/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/patients/patientSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosTokenInstance from "../../../api/axiosInstance";

interface Patient {
  id: number;
  name: string;
  phone: string | false;
}

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  loading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null,
};

interface CreatePatientInput {
  name: string;
  phone: string;
  is_patient: boolean;
}

// Fetch all patients
export const fetchPatients = createAsyncThunk<Patient[]>(
  "patients/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosTokenInstance.get(
        // `/api/search_read?model=res.partner&db=network&fields=["name","id","phone"]&domain=[["is_patient","=",true]]`,
        `/api/search_read?model=res.partner&db=network&fields=["name","id","phone"]&domain=[["is_patient","=",true]]`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch patients"
      );
    }
  }
);

// Fetch a single patient by ID
export const fetchPatientById = createAsyncThunk<Patient, number>(
  "patients/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosTokenInstance.get(
        `/api/search_read?model=res.partner&db=network&fields=["name","id","phone"]&domain=[["is_patient","=",true]]&id=${id}`
      );
      return response.data[0];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch patient"
      );
    }
  }
);

export const createPatient = createAsyncThunk(
  "patients/create",
  async (patientData: CreatePatientInput, { rejectWithValue }) => {
    try {
      const response = await axiosTokenInstance.post(
        `/api/create?model=res.partner&db=network&values={"name":"${patientData.name}","phone":"${patientData.phone}","is_patient":true}`
      );

      const newId = response.data[0];

      return {
        id: newId,
        name: patientData.name,
        phone: patientData.phone,
      };
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to create patient"
      );
    }
  }
);

// TODO: Implement the following in the future
// export const updatePatient = createAsyncThunk<Patient, Patient>(...)
// export const deletePatient = createAsyncThunk<number, number>(...)

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPatients.fulfilled,
        (state, action: PayloadAction<Patient[]>) => {
          state.loading = false;
          state.patients = action.payload;
        }
      )
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPatientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPatientById.fulfilled,
        (state, action: PayloadAction<Patient>) => {
          state.loading = false;
          state.selectedPatient = action.payload;
        }
      )
      .addCase(fetchPatientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createPatient.fulfilled,
        (state, action: PayloadAction<Patient>) => {
          state.loading = false;
          state.patients.push(action.payload);
        }
      )
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default patientSlice.reducer;
