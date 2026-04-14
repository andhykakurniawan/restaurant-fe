import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        {/* PROTECTED ADMIN AREA */}
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]} />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path=":section" element={<DashboardPage />} />
        </Route>

        {/* REDIRECT OLD DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}