import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider,
  Stack,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchPatients } from "../../data/features/patient/patientSlice";
import { fetchAppointments } from "../../data/features/calender/calenderSlice";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";

export default function PatientScreen() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { patients } = useAppSelector((state) => state.patient);
  const { appointments } = useAppSelector((state) => state.calender);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAppointments({ patientId: Number(id) }));
  }, [dispatch, id]);

  const patient = patients.find((p) => p.id === Number(id));

  if (!patient) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Patient not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Patient Info */}
      <Paper
        elevation={3}
        sx={{ p: 3, borderRadius: 2, mb: 4, position: "relative" }}
      >
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "white",
            boxShadow: 1,
            "&:hover": { backgroundColor: "#f5f5f5" },
          }}
          onClick={() => {
            // TODO: trigger your edit modal or navigation
            console.log("Edit patient profile", patient.id);
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Typography variant="h5">{patient.name}</Typography>
          {patient.is_vip && (
            <Tooltip title="VIP Patient">
              <VerifiedIcon color="warning" />
            </Tooltip>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {/* Basic Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              <strong>Gender:</strong> {patient.gender || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Date of Birth:</strong>{" "}
              {patient.date_of_birth
                ? dayjs(patient.date_of_birth).format("YYYY/MM/DD")
                : "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Nationality:</strong>{" "}
              {Array.isArray(patient.nationality_id)
                ? patient.nationality_id[1]
                : "N/A"}
            </Typography>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              <strong>Phone:</strong> {patient.phone || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>WhatsApp:</strong> {patient.whatsapp || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Emergency Contact:</strong>{" "}
              {patient.emergency_contact_no || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Contact Person:</strong>{" "}
              {patient.emergency_contact_person || "N/A"}
            </Typography>
          </Grid>

          {/* Parental Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              <strong>Father's Name:</strong> {patient.father_name || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Mother's Name:</strong> {patient.mother_name || "N/A"}
            </Typography>
          </Grid>

          {/* Registration Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1">
              <strong>UID:</strong> {patient.uid || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Border Number:</strong> {patient.border_number || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Registration Date:</strong>{" "}
              {patient.registration_date
                ? dayjs(patient.registration_date).format("YYYY/MM/DD")
                : "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Referral:</strong> {patient.referral || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Appointments Section */}
      <Typography variant="h6" gutterBottom>
        Appointments
      </Typography>
      <Stack spacing={2}>
        {appointments.map((appt) => (
          <Card
            key={appt.id}
            sx={{
              borderLeft: `6px solid ${appt.color}`,
              p: 1,
              boxShadow: 2,
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {appt.name}
              </Typography>

              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {dayjs(appt.start).format("YYYY/MM/DD")} -{" "}
                    {dayjs(appt.start).format("HH:mm A")} →{" "}
                    {dayjs(appt.end).format("HH:mm A")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Doctor: {appt.doctor?.name || "Unknown"}
                  </Typography>
                </Grid>
              </Grid>

              <Box mt={2}>
                <Chip
                  label={appt.status}
                  size="small"
                  sx={{
                    backgroundColor:
                      appt.status === "scheduled"
                        ? "primary.main"
                        : appt.status === "checked_out"
                        ? "success.main"
                        : appt.status === "delayed"
                        ? "warning.main"
                        : "grey.500",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
        {appointments.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No appointments found for this patient.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
