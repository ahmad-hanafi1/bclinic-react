import React, { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import { SettingError03Icon } from "../../assets/icons/setting_error";
// import { Alert01Icon } from "../../assets/icons/warning";
// import { Tick04Icon } from "../../assets/icons/tick";

interface SnackbarContextType {
  showMessage: (
    message: string,
    severity?: "error" | "warning" | "info" | "success"
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("success");

  const showMessage = (
    msg: string,
    severityType: "error" | "warning" | "info" | "success" = "success"
  ) => {
    setMessage(msg);
    setSeverity(severityType);
    setOpen(true);
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // const getIcon = (severity: "error" | "warning" | "info" | "success") => {
  //   switch (severity) {
  //     case "error":
  //       return <SettingError03Icon fontSize="inherit" color="#ffffff" />;
  //     case "warning":
  //       return <Alert01Icon fontSize="inherit" />;
  //     case "info":
  //       return <Alert01Icon fontSize="inherit" />;
  //     case "success":
  //       return <Tick04Icon fontSize="inherit" color="#ffffff" />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          // icon={getIcon(severity)}
          sx={{
            width: "100%",
            ...(severity === "success" && {
              backgroundColor: "#22C09B",
              color: "white",
            }),
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
