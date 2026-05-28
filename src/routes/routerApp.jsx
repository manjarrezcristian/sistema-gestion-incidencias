import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AddEditIncidence from "../pages/AddEditIncidence";
import ProtectedRoute from "../components/ProtectedRoute";

export const routerApp = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/nueva",
    element: (
      <ProtectedRoute>
        <AddEditIncidence />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/editar/:id",
    element: (
      <ProtectedRoute>
        <AddEditIncidence />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
];
