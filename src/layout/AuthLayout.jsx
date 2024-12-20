import { Navigate, Outlet } from "react-router";
import { Container } from "@mui/material";
const AuthLayout = () => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) return <Navigate to="/" replace />;
  return (
    <Container component="main" maxWidth="xs">
      <Outlet />
    </Container>
  );
};

export default AuthLayout;
