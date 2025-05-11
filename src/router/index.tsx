import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomeScreen from "../containers/home/home";
import LoginScreen from "../containers/login/Login";
import ProtectedRoute from "./ProtectedRoute";
import PatientsScreen from "../containers/patient/patients";
import PatientScreen from "../containers/patient/patient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <></>
          </ProtectedRoute>
        ),
      },
      {
        path: "calender",
        element: (
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "patients",
        element: (
          <ProtectedRoute>
            <PatientsScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "patients/:id",
        element: (
          <ProtectedRoute>
            <PatientScreen key={location.pathname} />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginScreen /> },
]);

export default router;
