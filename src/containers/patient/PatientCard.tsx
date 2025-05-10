import { Card, CardContent, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  Patient,
  updatePatient,
} from "../../data/features/patient/patientSlice";
import { showModal } from "../../data/features/modal/modalSlice";
import { useAppDispatch } from "../../utils/hooks";

export default function PatientCard({ patient }: { patient: Patient }) {
  const navigate = useNavigate();
  const age = dayjs().diff(dayjs(patient.date_of_birth), "year");
  const dispatch = useAppDispatch();
  return (
    <Card
      onClick={() => navigate(`/patients/${patient.id}`)}
      sx={{
        height: 180,
        width: "100%",
        minWidth: 250,
        flexBasis: 250,
        flexGrow: 1,
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      {/* Edit Button */}
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(
            showModal({
              title: "Edit Patient",
              type: "patient",
              props: { patient: patient },
              onSubmit: (data) =>
                dispatch(updatePatient({ id: patient.id, values: data })),
            })
          );
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "white",
          "&:hover": { backgroundColor: "#f0f0f0" },
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {patient.name}
        </Typography>
        <Typography variant="body1">Age: {age}</Typography>
        <Typography variant="body1">gender: {patient.gender}</Typography>
        <Typography variant="body1">Phone: {patient.phone}</Typography>
      </CardContent>
    </Card>
  );
}
