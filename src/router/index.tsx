import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import HomeScreen from "../containers/home/home";
import LoginScreen from "../containers/login/Login";
import ProtectedRoute from "./ProtectedRoute";

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
    ],
  },
  { path: "/login", element: <LoginScreen /> },
]);

export default router;
