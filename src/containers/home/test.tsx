import { Box, Button, useTheme } from "@mui/material";
import { useState } from "react";
import Calender from "../../components/calender";

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "red",
        padding: 2,
      }}
    >
      <Box sx={{ width: "px", height: "400px", background: "blue" }}>
        <Calender person={person} />
      </Box>
    </Box>
  );
}
