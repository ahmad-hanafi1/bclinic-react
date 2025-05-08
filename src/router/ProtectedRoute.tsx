import { Navigate } from "react-router-dom";
import { useAppSelector } from "../utils/hooks";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  console.log("ProtectedRoute: ", isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
