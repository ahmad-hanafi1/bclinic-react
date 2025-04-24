import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../utils/hooks";

const AddAppointmentForm = () => {
  const { props } = useAppSelector((state) => state.modal);
  const [doctor, setDoctor] = useState("");
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [timeStartValue, setTimeStartValue] = useState<Dayjs | null>(null);
  const [timeEndValue, setTimeEndValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    setDateValue(dayjs(props?.dateTime as string));
    setTimeStartValue(dayjs(props?.dateTime as string));
    setTimeEndValue(dayjs(props?.dateTime as string).add(1, "hour"));
  }, [props?.dateTime]);

  return (
    <>
      <DatePicker
        name="date"
        label="Date"
        value={dateValue ? dateValue.toDate() : null}
        onChange={(newValue) => setDateValue(newValue ? dayjs(newValue) : null)}
      />
      <TimePicker
        label="Start Time"
        name="startTime"
        value={timeStartValue ? timeStartValue.toDate() : null}
        onChange={(newValue) =>
          setTimeStartValue(newValue ? dayjs(newValue) : null)
        }
      />
      <TimePicker
        label="End Time"
        name="endTime"
        value={timeEndValue ? timeEndValue.toDate() : null}
        onChange={(newValue) =>
          setTimeEndValue(newValue ? dayjs(newValue) : null)
        }
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="patientName"
        name="patientName"
        label="Patient Name"
        type="text"
        fullWidth
        variant="outlined"
      />
      <TextField
        required
        margin="dense"
        id="phoneNumber"
        name="phoneNumber"
        label="Patient Phone Number"
        type="text"
        fullWidth
        variant="outlined"
      />
      <FormControl>
        <InputLabel id="doctor-label">Doctor</InputLabel>
        <Select
          labelId="doctor-label"
          id="doctor"
          value={doctor}
          label="Doctor"
          onChange={(event) => setDoctor(event.target.value as string)}
        >
          <MenuItem value={"alice"}>Alice</MenuItem>
          <MenuItem value={"bob"}>Bob</MenuItem>
          <MenuItem value={"charlie"}>Charlie</MenuItem>
          <MenuItem value={"diana"}>Diana</MenuItem>
          <MenuItem value={"ethan"}>Ethan</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default AddAppointmentForm;
