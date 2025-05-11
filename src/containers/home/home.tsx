import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import Calender from "../../components/calender";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchPatients } from "../../data/features/patient/patientSlice";
import { fetchDoctors } from "../../data/features/doctor/doctorSlice";
import { fetchAppointments } from "../../data/features/calender/calenderSlice";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  // const { token } = useAppSelector((state) => state.auth);
  // const { patients } = useAppSelector((state) => state.patient);
  const { doctors } = useAppSelector((state) => state.doctor);
  // const { appointments } = useAppSelector((state) => state.calender);
  const [doctor, setDoctor] = useState(-1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAppointments({ doctorId: doctor, status }));
  }, [dispatch, doctor, status]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 64px)", // height of AppBar
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 64, // height of AppBar
            zIndex: 1,
            backgroundColor: "white",
            p: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <FormControl sx={{ width: { xs: "100%", sm: 200 } }} margin="dense">
            <InputLabel id="doctor-label">Doctor</InputLabel>
            <Select
              labelId="doctor-label"
              label="Doctor"
              onChange={(e) => {
                setDoctor(Number(e.target.value));
              }}
              defaultValue={-1}
            >
              <MenuItem key={0} value={-1}>
                All
              </MenuItem>
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", sm: 200 } }} margin="dense">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              label="Status"
              onChange={(e) => {
                if (e.target.value === "all") setStatus("");
                else setStatus(e.target.value);
              }}
              defaultValue={"all"}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="scheduled">Scheduled</MenuItem>
              <MenuItem value="delayed">Delayed</MenuItem>
              <MenuItem value="checked_in">Checked In</MenuItem>
              <MenuItem value="running">Running</MenuItem>
              <MenuItem value="checked_out">Checked Out</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Calender />
        </Box>
      </Box>
    </>
  );
}
