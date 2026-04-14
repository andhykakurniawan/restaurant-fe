import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export default function PublicRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    const landingPage =
      user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
        ? "/admin/dashboard"
        : "/dashboard";

    return <Navigate to={landingPage} replace />;
  }

  return children ?? <Outlet />;
}
