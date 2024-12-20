import { Outlet } from "react-router";
import { AuthProvider } from "../components/forms/AuthContext";

const AppLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default AppLayout;
