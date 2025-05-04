import "./App.css";
import { ThemeProvider } from "@mui/material";
import muiTheme from "./utils/MuiTheme";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { pdfjs } from "react-pdf";
import store from "./data/store/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Modal from "./components/modal";
import { SnackbarProvider } from "./domain/hooks/SnackbarHook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAppDispatch } from "./utils/hooks";
import { useEffect } from "react";
import { loadTokenFromStorage } from "./data/features/auth/authSlice";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <ThemeProvider theme={muiTheme}>
              <AppInitializer />
              <RouterProvider router={router} />
              <Modal />
            </ThemeProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </Provider>
  );
}

function AppInitializer() {
  const dispatch = useAppDispatch();

  // Load the token from local storage when the app loads
  useEffect(() => {
    dispatch(loadTokenFromStorage());
  }, [dispatch]);

  return null; // this component only runs the effect
}

export default App;
