import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosTokenInstance from "../../../api/axiosInstance";
import axios from "axios";
import dayjs from "dayjs";

interface ApiResponse {
  id: number;
  appointment_start: string;
  appointment_end: string | false;
  name: string;
  display_name: string;
  doctor_id: [number, string] | null;
  patient_id: [number, string] | null;
}

export interface CalendarEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  color: string;
  doctor: { id: number; name: string };
  patient: { id: number; name: string };
}

// Slice state
interface CalendarState {
  appointments: CalendarEvent[];
  loading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  appointments: [],
  loading: false,
  error: null,
};

interface CreateEventInput {
  doctor_id: number;
  patient_id: number;
  appointment_start: string;
  appointment_end: string;
}

export const fetchAppointments = createAsyncThunk<
  CalendarEvent[],
  number | null | undefined
>(
  "calendar/fetchAppointments",
  async (doctorId = null, { rejectWithValue }) => {
    try {
      const domain =
        doctorId === null || doctorId === -1
          ? `[]` 
          : `[["doctor_id","=",${doctorId}]]`;

      const response = await axiosTokenInstance.get(
        `/api/search_read?db=network&domain=${domain}&fields=["appointment_start","appointment_end","name","display_name","doctor_id","patient_id","id"]&model=clinic.appointment`
      );

      const transformed = response.data.map(
        (item: ApiResponse): CalendarEvent => {
          const start = dayjs(item.appointment_start);
          const end = item.appointment_end
            ? dayjs(item.appointment_end)
            : start.add(1, "hour");

          return {
            id: item.id,
            title: item.name,
            start: start.format("YYYY-MM-DD HH:mm"),
            end: end.format("YYYY-MM-DD HH:mm"),
            color: "#a02920",
            doctor: {
              id: item.doctor_id?.[0] ?? -1,
              name: item.doctor_id?.[1] ?? "Unknown",
            },
            patient: {
              id: item.patient_id?.[0] ?? -1,
              name: item.patient_id?.[1] ?? "Unknown",
            },
          };
        }
      );

      return transformed;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(
          err.response.data?.detail || "Failed to fetch appointments"
        );
      }
      return rejectWithValue("Failed to fetch appointments");
    }
  }
);

export const createEvent = createAsyncThunk<CalendarEvent, CreateEventInput>(
  "calendar/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({
        values: JSON.stringify({
          doctor_id: eventData.doctor_id,
          patient_id: eventData.patient_id,
          appointment_start: eventData.appointment_start,
          appointment_end: eventData.appointment_end,
        }),
      });

      const response = await axiosTokenInstance.post(
        `/api/create?model=clinic.appointment&db=network&${query.toString()}`
      );

      const newId = response.data[0];
      const start = dayjs(eventData.appointment_start);
      const end = dayjs(eventData.appointment_end);

      return {
        id: newId,
        title: " placeholder",
        start: start.format("YYYY-MM-DD HH:mm"),
        end: end.format("YYYY-MM-DD HH:mm"),
        color: "#a02920",
        doctor: {
          id: eventData.doctor_id,
          name: "Unknown", // placeholder – unless you pass it in
        },
        patient: {
          id: eventData.patient_id,
          name: "Unknown", // placeholder
        },
      };
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(
          err.response.data?.detail || "Failed to create event"
        );
      }
      return rejectWithValue("Failed to create event");
    }
  }
);

// Slice
const appointmentSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAppointments.fulfilled,
        (state, action: PayloadAction<CalendarEvent[]>) => {
          state.loading = false;
          state.appointments = action.payload;
        }
      )
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createEvent.fulfilled,
        (state, action: PayloadAction<CalendarEvent>) => {
          state.loading = false;
          state.appointments.push(action.payload);
        }
      )
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default appointmentSlice.reducer;
