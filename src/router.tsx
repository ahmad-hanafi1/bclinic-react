import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "./containers/home/home";
// import HomeScreen from "./containers/home/Home";
// import LoginScreen from "./containers/login/Login";
// import RegisterScreen from "./containers/register/Register";
// import CompanyHomeScreen from "./containers/company/home/Home";
// import LoadingScreen from "./containers/loading/Loading";
// import CandidateScreen from "./containers/company/home/candidate/Candidate";
const router = createBrowserRouter([
  { path: "/", element: <HomeScreen /> },
  //   { path: "/company/home", element: <CompanyHomeScreen /> },
  //   { path: "/company/home/candidate", element: <CandidateScreen /> },
  //   { path: "/", element: <LoginScreen /> },
  //   { path: "/register", element: <RegisterScreen /> },
  //   { path: "/redirecting", element: <LoadingScreen /> },
]);

export default router;
