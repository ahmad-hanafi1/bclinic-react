import { Snackbar, Alert } from "@mui/material";

import { closeSnackbar } from "../../data/features/snackbar/snackbarSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const GlobalSnackbar = () => {
  const dispatch = useAppDispatch();
  const { message, severity, open } = useAppSelector((state) => state.snackbar);

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: "100%",
          bgcolor: severity === "success" ? "green.600" : undefined,
          color: "white",
          borderRadius: "10px",
        }}
        elevation={6}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
