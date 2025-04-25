import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout"; // adjust path as needed
import HomeScreen from "../containers/home/home";
// import other screens...

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout wraps children
    children: [
      { path: "", element: <HomeScreen /> },
      // { path: "company/home", element: <CompanyHomeScreen /> },
      // { path: "company/home/candidate", element: <CandidateScreen /> },
    ],
  },
  // Outside layout
  // { path: "/login", element: <LoginScreen /> },
  // { path: "/register", element: <RegisterScreen /> },
  // { path: "/redirecting", element: <LoadingScreen /> },
]);

export default router;
