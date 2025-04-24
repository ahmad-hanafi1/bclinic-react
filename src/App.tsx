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

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <ThemeProvider theme={muiTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
