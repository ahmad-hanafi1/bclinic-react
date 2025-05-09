import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosTokenInstance from "../../../api/axiosInstance";
import axios from "axios";
import dayjs from "dayjs";
import { showSnackbar } from "../snackbar/snackbarSlice";

const doctorColorPalette = [
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#14B8A6",
  "#F97316",
  "#EF4444",
  "#6B7280",
  "#0EA5E9",
  "#7C3AED",
  "#059669",
  "#D946EF",
  "#EA580C",
  "#991B1B",
];

const getDoctorColor = (doctorId: number): string => {
  const index = doctorId % doctorColorPalette.length;
  return doctorColorPalette[index];
};

interface ApiResponse {
  id: number;
  appointment_start: string;
  appointment_end: string | false;
  name: string;
  display_name: string;
  doctor_id: [number, string] | null;
  patient_id: [number, string] | null;
  method: "online" | "in_person";
  status: "scheduled" | "delayed" | "checked_in" | "running" | "checked_out";
  remarks: string;
  comments: string;
}

export interface CalendarEvent {
  id: number;
  name: string;
  start: string;
  end: string;
  color: string;
  doctor: { id: number; name: string };
  patient: { name: string; id: number };
  method: "online" | "in_person";
  status: "scheduled" | "delayed" | "checked_in" | "running" | "checked_out";
  remarks: string;
  comments: string;
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
  name: string;
  appointment_start: string;
  appointment_end: string;
  doctor: { id: number; name: string };
  patient: { id: number; name: string };
  method: "online" | "in_person";
  status: "scheduled" | "delayed" | "checked_in" | "running" | "checked_out";
  remarks: string;
  comments: string;
}

interface UpdateEventInput {
  id: number;
  doctor_id?: number;
  patient_id?: number;
  appointment_start?: string;
  appointment_end?: string;
}

const APPOINTMENT_FIELDS = [
  "name",
  "id",
  "status",
  "appointment_start",
  "appointment_end",
  "comments",
  "remarks",
  "method",
  "patient_id",
  "doctor_id",
];
interface FetchAppointmentsArgs {
  doctorId?: number | null;
  status?: string | null;
}

export const fetchAppointments = createAsyncThunk<
  CalendarEvent[],
  FetchAppointmentsArgs
>(
  "calendar/fetchAppointments",
  async ({ doctorId = -1, status = "" }, { rejectWithValue, dispatch }) => {
    try {
      const domainParts: string[] = [];

      if (doctorId !== -1) {
        domainParts.push(`["doctor_id","=",${doctorId}]`);
      }

      if (status !== "") {
        domainParts.push(`["status","=","${status}"]`);
      }

      const domain =
        domainParts.length > 0 ? `[${domainParts.join(",")}]` : `[]`;

      const response = await axiosTokenInstance.get(
        `/api/search_read?db=network&domain=${domain}&fields=${JSON.stringify(
          APPOINTMENT_FIELDS
        )}&model=clinic.appointment`
      );

      const transformed = response.data.map(
        (item: ApiResponse): CalendarEvent => {
          const start = dayjs(item.appointment_start);
          const end = item.appointment_end
            ? dayjs(item.appointment_end)
            : start.add(1, "hour");

          return {
            id: item.id,
            name: item.name,
            start: start.format("YYYY-MM-DD HH:mm"),
            end: end.format("YYYY-MM-DD HH:mm"),
            color: getDoctorColor(item.doctor_id?.[0] ?? -1),
            method: item.method,
            status: item.status,
            remarks: item.remarks,
            comments: item.comments,
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
      dispatch(
        showSnackbar({
          message: "Failed to load appointments",
          severity: "error",
        })
      );
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
  async (eventData, { rejectWithValue, dispatch }) => {
    try {
      const values = {
        name: eventData.name,
        appointment_start: eventData.appointment_start,
        appointment_end: eventData.appointment_end,
        doctor_id: eventData.doctor.id,
        patient_id: eventData.patient.id,
        method: eventData.method,
        status: eventData.status,
        remarks: eventData.remarks,
        comments: eventData.comments,
      };

      const query = new URLSearchParams({
        values: JSON.stringify(values),
      });

      const response = await axiosTokenInstance.post(
        `/api/create?model=clinic.appointment&db=network&${query.toString()}`
      );

      const newId = response.data[0];
      const start = dayjs(eventData.appointment_start);
      const end = dayjs(eventData.appointment_end);
      dispatch(
        showSnackbar({
          message: "Appointment created!",
          severity: "success",
        })
      );
      return {
        id: newId,
        name: eventData.name,
        title: eventData.name,
        start: start.format("YYYY-MM-DD HH:mm"),
        end: end.format("YYYY-MM-DD HH:mm"),
        color: getDoctorColor(eventData.doctor.id),
        doctor: eventData.doctor,
        patient: eventData.patient,
        method: eventData.method,
        status: eventData.status,
        remarks: eventData.remarks,
        comments: eventData.comments,
      };
    } catch (err: unknown) {
      dispatch(
        showSnackbar({
          message: "Failed to create appointment",
          severity: "error",
        })
      );
      if (axios.isAxiosError(err) && err.response) {
        dispatch(
          showSnackbar({
            message: "Failed to create appointment",
            severity: "error",
          })
        );
        return rejectWithValue(
          err.response.data?.detail || "Failed to create event"
        );
      }
      return rejectWithValue("Failed to create event");
    }
  }
);

export const updateEvent = createAsyncThunk<
  { id: number; changes: Partial<CalendarEvent> },
  UpdateEventInput
>(
  "calendar/updateEvent",
  async (
    { id, doctor_id, patient_id, appointment_start, appointment_end },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const values: Record<string, unknown> = {};
      if (doctor_id !== undefined) values.doctor_id = doctor_id;
      if (patient_id !== undefined) values.patient_id = patient_id;
      if (appointment_start) values.appointment_start = appointment_start;
      if (appointment_end) values.appointment_end = appointment_end;
      console.log("Stringified values: ", JSON.stringify(values));
      const response = await axiosTokenInstance.put(
        `/api/write?model=clinic.appointment&db=network&ids=[${id}]&values=${JSON.stringify(
          values
        )}`
      );
      if (!Array.isArray(response.data) || !response.data.includes(id)) {
        return rejectWithValue("Failed to update event");
      }

      // Construct the partial update for the Redux state
      const changes: Partial<CalendarEvent> = {};
      if (appointment_start) {
        changes.start = dayjs(appointment_start).format("YYYY-MM-DD HH:mm");
      }
      if (appointment_end) {
        changes.end = dayjs(appointment_end).format("YYYY-MM-DD HH:mm");
      }
      if (doctor_id !== undefined) {
        changes.doctor = { id: doctor_id, name: "Updated" }; // Placeholder
        changes.color = getDoctorColor(doctor_id);
      }
      if (patient_id !== undefined) {
        changes.patient = { id: patient_id, name: "Updated" }; // Placeholder
      }
      dispatch(
        showSnackbar({
          message: "Appointment updated successfully!",
          severity: "success",
        })
      );
      return { id, changes };
    } catch (err: unknown) {
      dispatch(
        showSnackbar({
          message: "Failed to update appointment",
          severity: "error",
        })
      );
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(
          err.response.data?.detail || "Failed to update event"
        );
      }
      return rejectWithValue("Failed to update event");
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
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const { id, changes } = action.payload;
        const index = state.appointments.findIndex((event) => event.id === id);
        if (index !== -1) {
          state.appointments[index] = {
            ...state.appointments[index],
            ...changes,
          };
        }
      });
  },
});

export default appointmentSlice.reducer;
