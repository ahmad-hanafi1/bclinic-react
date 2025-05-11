import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { useForm, Controller, useWatch } from "react-hook-form";
import { hideModal } from "../../../data/features/modal/modalSlice";
import { CalendarEvent } from "../../../data/features/calender/calenderSlice";

interface AppointmentFormInputs {
  name: string;
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  patient: { name: string; id: number };
  doctor: { name: string; id: number };
  remarks: string;
  comments: string;
  method: "online" | "in_person";
  status: "scheduled" | "delayed" | "checked_in" | "running" | "checked_out";
}

const AppointmentForm = () => {
  const dispatch = useAppDispatch();
  const { appointments } = useAppSelector((state) => state.calender);
  const { patients } = useAppSelector((state) => state.patient);
  const { doctors } = useAppSelector((state) => state.doctor);
  const { props, onSubmit } = useAppSelector((state) => state.modal);
  const editingAppointment = props?.appointment as CalendarEvent | undefined;

  const [doctorAppointments, setDoctorAppointments] = useState<CalendarEvent[]>(
    []
  );
  const [formError, setFormError] = useState<string | null>(null);

  const { control, handleSubmit, setValue } = useForm<AppointmentFormInputs>({
    defaultValues: {
      name: editingAppointment?.name || "",
      date: editingAppointment?.start
        ? dayjs(editingAppointment.start).toDate()
        : null,
      startTime: editingAppointment?.start
        ? dayjs(editingAppointment.start).toDate()
        : null,
      endTime: editingAppointment?.end
        ? dayjs(editingAppointment.end).toDate()
        : null,
      patient: editingAppointment?.patient || {},
      doctor: editingAppointment?.doctor || {},
      remarks: editingAppointment?.remarks || "",
      comments: editingAppointment?.comments || "",
      method: editingAppointment?.method || "in_person",
      status: editingAppointment?.status || "scheduled",
    },
  });

  const doctor = useWatch({ control, name: "doctor" });
  const startTime = useWatch({ control, name: "startTime" });
  const endTime = useWatch({ control, name: "endTime" });
  const date = useWatch({ control, name: "date" });

  function roundToNext5Minutes(date: dayjs.Dayjs) {
    const remainder = 5 - (date.minute() % 5);
    return date
      .add(remainder === 5 ? 0 : remainder, "minute")
      .startOf("minute");
  }

  useEffect(() => {
    if (!doctor?.id) return;
    setDoctorAppointments(
      appointments.filter(
        (entry) =>
          entry.doctor.id === doctor.id && entry.id !== editingAppointment?.id 
      )
    );
  }, [doctor, appointments, editingAppointment?.id]);

  useEffect(() => {
    if (!props?.dateTime || editingAppointment) return;
    const initialDate = dayjs(props.dateTime as string);
    const roundedStart = roundToNext5Minutes(initialDate);
    const roundedEnd = roundedStart.add(1, "hour");

    setValue("date", roundedStart.toDate());
    setValue("startTime", roundedStart.toDate());
    setValue("endTime", roundedEnd.toDate());
  }, [props?.dateTime, editingAppointment, setValue]);

  useEffect(() => {
    if (!startTime || !endTime || !date || !doctorAppointments.length) return;

    const newStart = dayjs(
      `${dayjs(date).format("YYYY-MM-DD")} ${dayjs(startTime).format(
        "HH:mm:ss"
      )}`
    );
    const newEnd = dayjs(
      `${dayjs(date).format("YYYY-MM-DD")} ${dayjs(endTime).format("HH:mm:ss")}`
    );

    const isOverlapping = doctorAppointments.some((appt) => {
      const apptStart = dayjs(appt.start);
      const apptEnd = dayjs(appt.end);
      return newStart.isBefore(apptEnd) && newEnd.isAfter(apptStart);
    });

    setFormError(
      isOverlapping
        ? "This doctor already has an appointment during the selected time."
        : null
    );
  }, [startTime, endTime, date, doctorAppointments]);

  const submitForm = (data: AppointmentFormInputs) => {
    if (formError) return;
    if (onSubmit) onSubmit(data);
    dispatch(hideModal());
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} id="modal-form">
      {formError && (
        <Box sx={{ mb: 2, color: "error.main", fontWeight: 500 }}>
          {formError}
        </Box>
      )}
      <Grid container spacing={2} marginTop={2}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="Appointment Title"
              fullWidth
              size="small"
              {...field}
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Date"
              {...field}
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
            />
          )}
        />

        <Controller
          name="startTime"
          control={control}
          render={({ field }) => (
            <TimePicker
              minutesStep={5}
              label="Start Time"
              {...field}
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
            />
          )}
        />

        <Controller
          name="endTime"
          control={control}
          render={({ field }) => (
            <TimePicker
              minutesStep={5}
              minTime={startTime || undefined}
              label="End Time"
              {...field}
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
            />
          )}
        />

        <FormControl fullWidth size="small">
          <InputLabel id="patient-label">Patient</InputLabel>
          <Controller
            name="patient"
            control={control}
            render={({ field }) => (
              <Select
                labelId="patient-label"
                label="Patient"
                value={field.value?.id || ""}
                onChange={(e) => {
                  const selected = patients.find(
                    (p) => p.id === Number(e.target.value)
                  );
                  field.onChange(selected || null);
                }}
              >
                {patients.map((patient) => (
                  <MenuItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="doctor-label">Doctor</InputLabel>
          <Controller
            name="doctor"
            control={control}
            render={({ field }) => (
              <Select
                labelId="doctor-label"
                label="Doctor"
                value={field.value?.id || ""}
                onChange={(e) => {
                  const selected = doctors.find(
                    (d) => d.id === Number(e.target.value)
                  );
                  field.onChange(selected || null);
                }}
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="method"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth size="small">
              <InputLabel id="method-label">Method</InputLabel>
              <Select
                labelId="method-label"
                label="Method"
                value={field.value}
                onChange={field.onChange}
              >
                <MenuItem value="in_person">In Person</MenuItem>
                <MenuItem value="online">Online</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth size="small">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                value={field.value}
                onChange={field.onChange}
              >
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="delayed">Delayed</MenuItem>
                <MenuItem value="checked_in">Checked In</MenuItem>
                <MenuItem value="running">Running</MenuItem>
                <MenuItem value="checked_out">Checked Out</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="remarks"
          control={control}
          render={({ field }) => (
            <TextField label="Remarks" fullWidth size="small" {...field} />
          )}
        />

        <Controller
          name="comments"
          control={control}
          render={({ field }) => (
            <TextField label="Comments" fullWidth size="small" {...field} />
          )}
        />
      </Grid>
    </form>
  );
};

export default AppointmentForm;
