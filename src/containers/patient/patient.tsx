import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchPatients } from "../../data/features/patient/patientSlice";

export default function PatientScreen() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { patients } = useAppSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const patient = patients.find((p) => p.id === Number(id));

  if (!patient) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Patient not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">{patient.name}</Typography>
      <Typography variant="body1">Email: {patient.email}</Typography>
      <Typography variant="body1">Phone: {patient.phone}</Typography>
      <Typography variant="body1">Age: {patient.age}</Typography>
      {/* Add more patient fields as needed */}
    </Box>
  );
}
