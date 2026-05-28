import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../utils/local-storage";

/**
 * Componente de Ruta Protegida.
 * Redirecciona al usuario a /login si no cuenta con una sesión activa.
 */
function ProtectedRoute({ children, componente }) {
  const sesion = getLocalStorage("sesionUsuario");

  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : componente;
}

export default ProtectedRoute;
