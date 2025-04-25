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
        <Box
          sx={
            {
              // height: "100vh", // height of AppBar and filter bar
              // overflowY: "scroll",
            }
          }
        >
          <Calender person={person} />
        </Box>
      </Box>
    </>
  );
}
