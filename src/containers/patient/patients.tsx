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
      <div className="flex flex-wrap gap-7">
        {patients.map((patient) => (
          <PatientCard
            patient={patient}
          />
        ))}
      </div>
    </Box>
  );
}
