import { Navigate } from "react-router-dom";
import { useAuth } from "./forms/AuthContext";
import { loginApi } from "../apis/LoginApi";
import { isNil } from "lodash";

export function PrivateRoute({ children }) {
  const user = loginApi.getUser();

  return !isNil(user) ? children : <Navigate to="/auth/login" replace />;
}
