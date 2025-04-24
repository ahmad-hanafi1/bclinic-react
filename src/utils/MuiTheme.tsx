import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  typography: {
    fontFamily: "Rubik",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#22C09B", // Primary color
      light: "linear-gradient(45deg, #22C09B 30%, #1198BE 70%)", // Gradient for light variation
      dark: "linear-gradient(45deg, #2B3686 30%, #091D3D 90%)", // Gradient for dark variation
    },
    secondary: {
      main: "#091D3D", // Secondary color
      light: "linear-gradient(45deg, #091D3D 30%, #5DC1C0 90%)", // Gradient for light variation
      dark: "linear-gradient(45deg, #2B3686 30%, #091D3D 90%)", // Gradient for dark variation
    },
    info: {
      main: "#5DC1C0",
    },
    error: {
      main: "#D6123C",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        subtitle2: {
          color: "#9E9E9E",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "14px",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          justifyContent: "flex-end",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px", // Adjust this value to control the roundness of the dialog
        },
      },
    },
  },
});

export default muiTheme;
