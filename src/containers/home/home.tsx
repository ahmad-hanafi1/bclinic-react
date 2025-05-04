import { Box, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import Calender from "../../components/calender";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchPatients } from "../../data/features/patient/patientSlice";
import { fetchDoctors } from "../../data/features/doctor/doctorSlice";
import { fetchAppointments } from "../../data/features/calender/calenderSlice";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { patients } = useAppSelector((state) => state.patient);
  const { doctors } = useAppSelector((state) => state.doctor);
  const { appointments } = useAppSelector((state) => state.calender);
  console.log("Redux token: ", token);
  console.log("LocalStorage token: ", localStorage.getItem("access_token"));
  console.log("patients: ", patients);
  console.log("doctors: ", doctors);
  console.log("appointments: ", appointments);

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchDoctors());
    dispatch(fetchAppointments());
  }, [dispatch]);

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
            padding: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            // boxShadow: 1,
          }}
        >
          <Select
            labelId="doctor-label"
            label="Doctor"
            onChange={(e) => {
              dispatch(fetchAppointments(Number(e.target.value)));
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
        </Box>
        <Box>
          <Calender />
        </Box>
      </Box>
    </>
  );
}
