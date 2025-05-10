import { Box, Typography, Grid } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchPatients } from "../../data/features/patient/patientSlice";
import PatientCard from "./PatientCard";

export default function PatientsScreen() {
  const dispatch = useAppDispatch();
  const { patients } = useAppSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Patients
      </Typography>
      <Grid container spacing={3}>
        {patients.map((patient) => (
          <Grid item xs={12} sm={6} md={4}>
            <PatientCard
              id={patient.id}
              name={patient.name}
              phone={patient.phone as string}
              date_of_birth={patient.date_of_birth}
              gender={patient.gender}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
