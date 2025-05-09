/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/patients/patientSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosTokenInstance from "../../../api/axiosInstance";
import { showSnackbar } from "../snackbar/snackbarSlice";

interface Patient {
  id: number;
  name: string;
  phone: string | false;
  gender: string;
  date_of_birth: string;
  nationality_id: [number, string];
  is_patient: boolean;

  referral?: string;
  is_vip?: boolean;
  registration_date?: string;
  name_arabic?: string;
  whatsapp?: string;
  emergency_contact_person?: string;
  emergency_contact_no?: string;
  father_name?: string;
  mother_name?: string;
  border_number?: string;
  uid?: string;
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
  gender: string;
  date_of_birth: string;
  is_patient: boolean;
  nationality: { name: string; id: number };

  referral?: string;
  is_vip?: boolean;
  registration_date?: string;
  name_arabic?: string;
  whatsapp?: string;
  emergency_contact_person?: string;
  emergency_contact_no?: string;
  father_name?: string;
  mother_name?: string;
  border_number?: string;
  uid?: string;
}

const PATIENT_FIELDS = [
  "id",
  "name",
  "phone",
  "gender",
  "date_of_birth",
  "is_patient",
  "referral",
  "is_vip",
  "registration_date",
  "name_arabic",
  "whatsapp",
  "emergency_contact_person",
  "emergency_contact_no",
  "father_name",
  "mother_name",
  "border_number",
  "uid",
  "nationality_id",
];

const PATIENT_DOMAIN = [["is_patient", "=", true]];

function mapCreateInputToPatient(
  input: CreatePatientInput,
  id: number
): Patient {
  return {
    id,
    name: input.name,
    phone: input.phone,
    gender: input.gender,
    date_of_birth: input.date_of_birth,
    is_patient: true,
    nationality_id: [input.nationality.id, input.nationality.name],

    ...(input.referral && { referral: input.referral }),
    ...(input.is_vip !== undefined && { is_vip: input.is_vip }),
    ...(input.registration_date && {
      registration_date: input.registration_date,
    }),
    ...(input.name_arabic && { name_arabic: input.name_arabic }),
    ...(input.whatsapp && { whatsapp: input.whatsapp }),
    ...(input.emergency_contact_person && {
      emergency_contact_person: input.emergency_contact_person,
    }),
    ...(input.emergency_contact_no && {
      emergency_contact_no: input.emergency_contact_no,
    }),
    ...(input.father_name && { father_name: input.father_name }),
    ...(input.mother_name && { mother_name: input.mother_name }),
    ...(input.border_number && { border_number: input.border_number }),
    ...(input.uid && { uid: input.uid }),
  };
}
// Fetch all patients
export const fetchPatients = createAsyncThunk<Patient[]>(
  "patients/fetchAll",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosTokenInstance.get(
        `/api/search_read?model=res.partner&db=network&fields=${PATIENT_FIELDS}&domain=${PATIENT_DOMAIN}`
      );
      return response.data;
    } catch (err: any) {
      dispatch(
        showSnackbar({ message: "Failed to load patients", severity: "error" })
      );
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch patients"
      );
    }
  }
);

// Fetch a single patient by ID
export const fetchPatientById = createAsyncThunk<Patient, number>(
  "patients/fetchById",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosTokenInstance.get(
        `/api/search_read?model=res.partner&db=network&fields=["name","id","phone"]&domain=[["is_patient","=",true]]&id=${id}`
      );

      return response.data[0];
    } catch (err: any) {
      dispatch(
        showSnackbar({ message: "Failed to load patient", severity: "error" })
      );
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch patient"
      );
    }
  }
);

export const createPatient = createAsyncThunk(
  "patients/create",
  async (patientData: CreatePatientInput, { rejectWithValue, dispatch }) => {
    try {
      const values: Record<string, any> = {
        name: patientData.name,
        phone: patientData.phone,
        gender: patientData.gender,
        date_of_birth: patientData.date_of_birth,
        nationality_id: patientData.nationality.id,
        is_patient: true,
      };

      // Add optional fields if present
      const optionalFields = [
        "referral",
        "is_vip",
        "registration_date",
        "name_arabic",
        "whatsapp",
        "emergency_contact_person",
        "emergency_contact_no",
        "father_name",
        "mother_name",
        "border_number",
        "uid",
      ];

      optionalFields.forEach((key) => {
        const value = (patientData as any)[key];
        if (value !== undefined && value !== "") {
          values[key] = value;
        }
      });
      const query = new URLSearchParams({
        values: JSON.stringify(values),
      });
      console.log(JSON.stringify(values));
      const response = await axiosTokenInstance.post(
        `/api/create?model=res.partner&db=network&${query.toString()}`
      );
      const newId = response.data[0];
      dispatch(
        showSnackbar({
          message: "Patient created successfully",
          severity: "success",
        })
      );
      console.log(mapCreateInputToPatient(patientData, newId));
      return mapCreateInputToPatient(patientData, newId);
    } catch (err: any) {
      dispatch(
        showSnackbar({
          message: "Failed to create patient",
          severity: "error",
        })
      );
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
