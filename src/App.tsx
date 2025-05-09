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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalSnackbar from "./components/snackbar";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={muiTheme}>
            <RouterProvider router={router} />
            <GlobalSnackbar />
            <Modal />
          </ThemeProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
