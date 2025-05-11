import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchPatients } from "../../data/features/patient/patientSlice";
import { showModal } from "../../data/features/modal/modalSlice";
import PatientCard from "./PatientCard";

export default function PatientsScreen() {
  const dispatch = useAppDispatch();
  const { patients } = useAppSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Patients</Typography>
        <IconButton
          onClick={() =>
            dispatch(
              showModal({
                title: "Add Patient",
                type: "patient",
                props: {},
              })
            )
          }
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <div className="flex flex-wrap gap-7">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </Box>
  );
}
