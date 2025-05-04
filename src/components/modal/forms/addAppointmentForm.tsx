import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  // TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { useForm, Controller } from "react-hook-form";
import { hideModal } from "../../../data/features/modal/modalSlice";
import { createEvent } from "../../../data/features/calender/calenderSlice";

interface AppointmentFormInputs {
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  patient: number;
  // phoneNumber: string;
  doctor: number;
}

const AddAppointmentForm = () => {
  const dispatch = useAppDispatch();

  const { patients } = useAppSelector((state) => state.patient);
  const { doctors } = useAppSelector((state) => state.doctor);
  const { props } = useAppSelector((state) => state.modal);

  const { control, handleSubmit, setValue } = useForm<AppointmentFormInputs>({
    defaultValues: {
      date: null,
      startTime: null,
      endTime: null,
      patient: 0,
      doctor: 0,
      // phoneNumber: null,
    },
  });

  useEffect(() => {
    const initialDate = dayjs(props?.dateTime as string);
    setValue("date", initialDate.toDate());
    setValue("startTime", initialDate.toDate());
    setValue("endTime", initialDate.add(1, "hour").toDate());
  }, [props?.dateTime, setValue]);

  const submitFunction = (data: AppointmentFormInputs) => {
    console.log(data);
    const date = dayjs(data.date).format("YYYY-MM-DD");
    const startTime = dayjs(data.startTime).format("HH:mm:ss");
    const endTime = dayjs(data.endTime).format("HH:mm:ss");
    dispatch(
      createEvent({
        appointment_start: date + " " + startTime,
        appointment_end: date + " " + endTime,
        patient_id: data?.patient,
        doctor_id: data?.doctor,
      })
    );
    dispatch(hideModal());
  };

  return (
    <form
      onSubmit={handleSubmit(submitFunction)}
      id="modal-form"
      style={{ display: "flex", gap: 3, flexDirection: "column" }}
    >
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Date"
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
          />
        )}
      />

      <Controller
        name="startTime"
        control={control}
        render={({ field }) => (
          <TimePicker
            label="Start Time"
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
          />
        )}
      />

      <Controller
        name="endTime"
        control={control}
        render={({ field }) => (
          <TimePicker
            label="End Time"
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
          />
        )}
      />

      {/* <TextField
        autoFocus
        required
        margin="dense"
        label="Patient Name"
        fullWidth
        variant="outlined"
        {...register("patientName", { required: true })}
      /> */}

      <FormControl fullWidth margin="dense">
        <InputLabel id="doctor-label">Patient</InputLabel>
        <Controller
          name="patient"
          control={control}
          render={({ field }) => (
            <Select
              labelId="patient-label"
              label="Patient"
              value={field.value}
              onChange={field.onChange}
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

      {/* <TextField
        required
        margin="dense"
        label="Patient Phone Number"
        fullWidth
        variant="outlined"
        {...register("phoneNumber", { required: true })}
      /> */}

      <FormControl fullWidth margin="dense">
        <InputLabel id="doctor-label">Doctor</InputLabel>
        <Controller
          name="doctor"
          control={control}
          render={({ field }) => (
            <Select
              labelId="doctor-label"
              label="Doctor"
              value={field.value}
              onChange={field.onChange}
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
    </form>
  );
};

export default AddAppointmentForm;
