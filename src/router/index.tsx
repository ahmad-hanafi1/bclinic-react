import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
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
            <HomeScreen />
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
            <PatientScreen />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginScreen /> },
]);

export default router;
