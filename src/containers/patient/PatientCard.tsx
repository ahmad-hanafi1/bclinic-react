import { Card, CardContent, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface PatientCardProps {
  id: number;
  name: string;
  phone: string;
  date_of_birth: string;
}

export default function PatientCard({
  name,
  phone,
  date_of_birth,
  id,
}: PatientCardProps) {
  const navigate = useNavigate();
  const age = dayjs().diff(dayjs(date_of_birth), "year");
  return (
    <Card
      onClick={() => navigate(`/patients/${id}`)}
      sx={{
        height: 180,
        width: "100%",
        minWidth: 250,
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
          {name}
        </Typography>
        <Typography variant="body1">Age: {age}</Typography>
        <Typography variant="body1">Phone: {phone}</Typography>
        <Typography variant="body1">Phone: {phone}</Typography>
      </CardContent>
    </Card>
  );
}
