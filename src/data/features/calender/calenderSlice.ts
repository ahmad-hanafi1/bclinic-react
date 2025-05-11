import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosTokenInstance from "../../../api/axiosInstance";
import axios from "axios";
import dayjs from "dayjs";
import { showSnackbar } from "../snackbar/snackbarSlice";

const doctorColorPalette = [
  "#1E3A8A", // dark blue
  "#2563EB", // blue
  "#1D4ED8", // deep blue
  "#4338CA", // indigo
  "#6D28D9", // violet
  "#7C3AED", // purple
  "#8B5CF6", // purple bright
  "#A21CAF", // fuchsia dark
  "#DB2777", // pink
  "#EC4899", // pink bright
  "#BE185D", // rose dark
  "#EF4444", // red
  "#991B1B", // dark red
  "#B91C1C", // slightly brighter red
  "#EA580C", // orange deep
  "#F97316", // orange bright
  "#F59E0B", // amber
  "#CA8A04", // amber dark
  "#65A30D", // lime green
  "#4D7C0F", // olive
  "#16A34A", // green
  "#059669", // emerald
  "#0F766E", // teal dark
  "#14B8A6", // teal bright
  "#0EA5E9", // sky blue
  "#0284C7", // blue dark
  "#0369A1", // blue deeper
  "#6B7280", // gray medium
  "#374151", // gray dark
  "#44403C", // warm gray
  "#7F1D1D", // red brown
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
  patientId?: number | null;
  status?: string | null;
}

export const fetchAppointments = createAsyncThunk<
  CalendarEvent[],
  FetchAppointmentsArgs
>(
  "calendar/fetchAppointments",
  async (
    { doctorId = -1, status = "", patientId = -1 },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const domainParts: string[] = [];

      if (doctorId !== -1) {
        domainParts.push(`["doctor_id","=",${doctorId}]`);
      }

      if (patientId !== -1) {
        domainParts.push(`["patient_id","=",${patientId}]`);
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
  CalendarEvent,
  { id: number; values: Partial<CreateEventInput> }
>(
  "calendar/updateEvent",
  async ({ id, values }, { rejectWithValue, dispatch }) => {
    try {
      const payload: Record<string, unknown> = {
        ...values,
        ...(values.doctor && { doctor_id: values.doctor.id }),
        ...(values.patient && { patient_id: values.patient.id }),
      };

      delete payload.doctor;
      delete payload.patient;

      const query = new URLSearchParams({
        values: JSON.stringify(payload),
      });

      const response = await axiosTokenInstance.put(
        `/api/write?model=clinic.appointment&db=network&ids=[${id}]&${query.toString()}`
      );

      if (!Array.isArray(response.data) || !response.data.includes(id)) {
        return rejectWithValue("Failed to update appointment");
      }

      dispatch(
        showSnackbar({
          message: "Appointment updated successfully!",
          severity: "success",
        })
      );

      return {
        id,
        name: values.name ?? "",
        appointment_start: values.appointment_start ?? "",
        appointment_end: values.appointment_end ?? "",
        method: values.method ?? "in_person",
        status: values.status ?? "scheduled",
        remarks: values.remarks ?? "",
        comments: values.comments ?? "",
        doctor: values.doctor ?? { id: -1, name: "Unknown" },
        patient: values.patient ?? { id: -1, name: "Unknown" },
        start: values.appointment_start
          ? dayjs(values.appointment_start).format("YYYY-MM-DD HH:mm")
          : "",
        end: values.appointment_end
          ? dayjs(values.appointment_end).format("YYYY-MM-DD HH:mm")
          : "",
        color: values.doctor ? getDoctorColor(values.doctor.id) : "#999999",
      };
    } catch (err: unknown) {
      dispatch(
        showSnackbar({
          message: "Failed to update appointment",
          severity: "error",
        })
      );
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(
          err.response.data?.detail || "Failed to update appointment"
        );
      }
      return rejectWithValue("Failed to update appointment");
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
      .addCase(
        updateEvent.fulfilled,
        (state, action: PayloadAction<CalendarEvent>) => {
          const index = state.appointments.findIndex(
            (e) => e.id === action.payload.id
          );
          if (index !== -1) {
            state.appointments[index] = action.payload;
          }
        }
      );
  },
});

export default appointmentSlice.reducer;
