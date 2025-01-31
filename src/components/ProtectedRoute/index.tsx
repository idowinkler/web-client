import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import SideBar from "../SideBar/SideBar";

const ProtectedRoute = () => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
