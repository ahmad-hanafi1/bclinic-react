import { Box, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Calender from "../../components/calender";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchPatients } from "../../data/features/patient/patientSlice";
import { fetchDoctors } from "../../data/features/doctor/doctorSlice";

const doctorFilters = [
  { name: "All", value: "all" },
  { name: "Alice", value: "alice", color: "#a02920" },
  { name: "Bob", value: "bob", color: "#5D576B" },
  { name: "Charlie", value: "charlie", color: "#202b90" },
  { name: "Diana", value: "diana", color: "#7067CF" },
  { name: "Ethan", value: "ethan", color: "#7B287D" },
];

export default function HomeScreen() {
  const [person, setPerson] = useState("all");
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { patients } = useAppSelector((state) => state.patient);
  const { doctors } = useAppSelector((state) => state.doctor);
  console.log("Redux token: ", token);
  console.log("LocalStorage token: ", localStorage.getItem("access_token"));
  console.log("patients: ", patients);
  console.log("doctors: ", doctors);

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchDoctors());
  }, [dispatch]);

  // useEffect(() => {
  //   fetch(
  //     `/api/search_read?model=res.partner&db=network&fields=["name","id","phone"]&domain=[["is_patient","=",true]]`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         Authorization: `Bearer Sewwim3wxOInisl6fXq8pKb9FT3tch`,
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log("✅ Success:", data))
  //     .catch((err) => console.error("❌ Error:", err));
  // }, []);

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
          {doctorFilters.map(({ name, value, color }) => (
            <Button
              key={value}
              variant="contained"
              sx={{
                backgroundColor: color || theme.palette.primary.main,
              }}
              onClick={() => setPerson(value)}
            >
              {name}
            </Button>
          ))}
        </Box>
        <Box>
          <Calender person={person} />
        </Box>
      </Box>
    </>
  );
}
