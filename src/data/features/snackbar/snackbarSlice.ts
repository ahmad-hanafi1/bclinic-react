import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  message: string | null;
  severity: "success" | "error" | "info" | "warning";
  open: boolean;
}

const initialState: SnackbarState = {
  message: null,
  severity: "info",
  open: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        severity?: SnackbarState["severity"];
      }>
    ) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity || "info";
      state.open = true;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
